<?php

namespace App\Services;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Google_Client;
use Google_Service_Drive;

class GoogleDriveService
{
    /**
     * Google Client nesnesi
     *
     * @var Google_Client
     */
    protected $client;

    /**
     * Google Drive Service nesnesi
     *
     * @var Google_Service_Drive
     */
    protected $driveService;

    /**
     * Servis sınıfını oluştur
     */
    public function __construct()
    {
        // Lazy loading - sadece gerektiğinde başlat
    }

    /**
     * Google Client nesnesini başlat
     */
    protected function initClient(): void
    {
        // Config dosyasından ayarları al
        $config = Config::get('filesystems.disks.google_drive');

        $clientId = $config['clientId'] ?? '';
        $clientSecret = $config['clientSecret'] ?? '';
        $refreshToken = $config['refreshToken'] ?? '';
        $accessToken = $config['accessToken'] ?? '';

        // Google Client oluştur
        $this->client = new Google_Client();
        $this->client->setClientId($clientId);
        $this->client->setClientSecret($clientSecret);
        $this->client->setAccessType('offline');
        $this->client->setPrompt('consent');
        $this->client->setScopes([Google_Service_Drive::DRIVE]);

        // Access Token varsa ayarla
        if (!empty($accessToken)) {
            $this->client->setAccessToken($accessToken);
        }

        // Refresh Token varsa ayarla
        if (!empty($refreshToken)) {
            // Refresh token'ı access token içine ekle
            $tokens = $this->client->getAccessToken() ?: [];
            if (is_string($tokens)) {
                $tokens = json_decode($tokens, true);
            }
            $tokens['refresh_token'] = $refreshToken;
            $this->client->setAccessToken($tokens);
        }

        // Token süresi dolduysa yenile
        if ($this->client->isAccessTokenExpired()) {
            $this->refreshAccessToken();
        }

        // Drive Service oluştur
        $this->driveService = new Google_Service_Drive($this->client);
    }

    /**
     * Client'ın başlatılıp başlatılmadığını kontrol et
     */
    protected function ensureClientInitialized(): void
    {
        if (!$this->client) {
            $this->initClient();
        }
    }

    /**
     * Access Token'ı yenile
     */
    public function refreshAccessToken(): bool
    {
        try {
            $this->ensureClientInitialized();

            // Config dosyasından refresh token'ı al
            $config = Config::get('filesystems.disks.google_drive');
            $refreshToken = $config['refreshToken'] ?? '';

            if (empty($refreshToken)) {
                Log::error('Google Drive refresh token bulunamadı.');
                return false;
            }

            // Refresh token'ı ayarla
            $this->client->refreshToken($refreshToken);

            // Yeni access token'ı al
            $newAccessToken = $this->client->getAccessToken();

            // Config'i güncelle (bu sadece runtime'da geçerli olacak)
            Config::set('filesystems.disks.google_drive.accessToken', $newAccessToken['access_token']);

            return true;
        } catch (\Exception $e) {
            Log::error('Google Drive access token yenilenirken hata: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Token'ları kontrol et ve gerekirse yenile
     */
    public function checkAndRefreshToken(): bool
    {
        try {
            $this->ensureClientInitialized();

            $config = Config::get('filesystems.disks.google_drive');
            $accessToken = $config['accessToken'] ?? '';
            $refreshToken = $config['refreshToken'] ?? '';

            // Token yoksa false dön
            if (empty($accessToken) || empty($refreshToken)) {
                return false;
            }

            // Access token'i ayarla
            $this->client->setAccessToken([
                'access_token' => $accessToken,
                'refresh_token' => $refreshToken
            ]);

            // Token süresi dolmuşsa yenile
            if ($this->client->isAccessTokenExpired()) {
                return $this->refreshAccessToken();
            }

            return true;
        } catch (\Exception $e) {
            Log::error('Google Drive token kontrolü sırasında hata: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Google Drive'daki klasörleri listele
     */
    public function listFolders(string $parentId = 'root'): array
    {
        try {
            $this->ensureClientInitialized();

            if (!$this->checkAndRefreshToken()) {
                return ['success' => false, 'message' => 'Google Drive yetkilendirme başarısız.'];
            }

            $service = new \Google_Service_Drive($this->client);

            // Sadece klasörleri listele
            $optParams = [
                'q' => "mimeType='application/vnd.google-apps.folder' and trashed=false and '" . ($parentId ?: 'root') . "' in parents",
                'fields' => 'files(id, name, mimeType, createdTime)',
                'orderBy' => 'name'
            ];

            $results = $service->files->listFiles($optParams);
            $folders = [];

            foreach ($results->getFiles() as $file) {
                $folders[] = [
                    'id' => $file->getId(),
                    'name' => $file->getName(),
                    'createdTime' => $file->getCreatedTime()
                ];
            }

            return [
                'success' => true,
                'folders' => $folders
            ];
        } catch (\Exception $e) {
            Log::error('Google Drive klasörleri listelenirken hata: ' . $e->getMessage());
            return [
                'success' => false,
                'message' => 'Klasörler listelenirken bir hata oluştu: ' . $e->getMessage()
            ];
        }
    }

    /**
     * Disk yapılandırmasını güncelle
     */
    protected function updateDiskConfig(): void
    {
        $config = Config::get('filesystems.disks.google_drive');

        // Google Drive disk yapılandırmasını güncelle
        Config::set('filesystems.disks.google_drive', [
            'driver' => 'google',
            'clientId' => $config['clientId'] ?? '',
            'clientSecret' => $config['clientSecret'] ?? '',
            'refreshToken' => $config['refreshToken'] ?? '',
            'accessToken' => $config['accessToken'] ?? '',
            'folder' => $config['folder'] ?? '',
        ]);
    }

    /**
     * Dosya yükle
     *
     * @param string $path Dosya yolu
     * @param mixed $content Dosya içeriği
     * @param string $mimeType MIME türü (opsiyonel)
     * @return string|false Dosya ID'si veya hata durumunda false
     */
    public function upload(string $path, $content, string $mimeType = null)
    {
        try {
            $this->ensureClientInitialized();

            // Önce token'ı kontrol et ve gerekirse yenile
            if ($this->client->isAccessTokenExpired()) {
                $this->refreshAccessToken();
            }

            // Dosya adını al
            $fileName = basename($path);

            // Config'den klasör ID'sini al
            $config = Config::get('filesystems.disks.google_drive');
            $folderId = $config['folder'] ?? '';

            // Dosya metadata'sını oluştur
            $fileMetadata = new \Google_Service_Drive_DriveFile([
                'name' => $fileName,
            ]);

            // Eğer klasör ID'si varsa, dosyayı o klasöre yükle
            if (!empty($folderId)) {
                $fileMetadata->setParents([$folderId]);
            }

            // MIME türü belirtilmemişse, içerik türüne göre belirle
            if ($mimeType === null) {
                $mimeType = 'application/octet-stream';

                // Yaygın dosya uzantıları için MIME türlerini belirle
                $extension = pathinfo($fileName, PATHINFO_EXTENSION);
                switch (strtolower($extension)) {
                    case 'txt':
                        $mimeType = 'text/plain';
                        break;
                    case 'html':
                        $mimeType = 'text/html';
                        break;
                    case 'pdf':
                        $mimeType = 'application/pdf';
                        break;
                    case 'doc':
                        $mimeType = 'application/msword';
                        break;
                    case 'docx':
                        $mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
                        break;
                    case 'xls':
                        $mimeType = 'application/vnd.ms-excel';
                        break;
                    case 'xlsx':
                        $mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                        break;
                    case 'ppt':
                        $mimeType = 'application/vnd.ms-powerpoint';
                        break;
                    case 'pptx':
                        $mimeType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
                        break;
                    case 'png':
                        $mimeType = 'image/png';
                        break;
                    case 'jpg':
                    case 'jpeg':
                        $mimeType = 'image/jpeg';
                        break;
                    case 'gif':
                        $mimeType = 'image/gif';
                        break;
                    case 'zip':
                        $mimeType = 'application/zip';
                        break;
                }
            }

            // Dosyayı yükle
            $file = $this->driveService->files->create(
                $fileMetadata,
                [
                    'data' => $content,
                    'mimeType' => $mimeType,
                    'uploadType' => 'multipart',
                    'fields' => 'id'
                ]
            );

            return $file->getId();
        } catch (\Exception $e) {
            Log::error('Google Drive dosya yüklenirken hata: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Dosya indir
     *
     * @param string $fileId Dosya ID'si
     * @return string|false Dosya içeriği veya hata durumunda false
     */
    public function download(string $fileId)
    {
        try {
            $this->ensureClientInitialized();

            // Önce token'ı kontrol et ve gerekirse yenile
            if ($this->client->isAccessTokenExpired()) {
                $this->refreshAccessToken();
            }

            // Dosyayı indir
            $response = $this->driveService->files->get($fileId, ['alt' => 'media']);

            // Dosya içeriğini al
            $content = $response->getBody()->getContents();

            return $content;
        } catch (\Exception $e) {
            Log::error('Google Drive dosya indirilirken hata: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Dosya sil
     *
     * @param string $fileId Dosya ID'si
     * @return bool İşlem başarılı mı?
     */
    public function delete(string $fileId): bool
    {
        try {
            $this->ensureClientInitialized();

            // Önce token'ı kontrol et ve gerekirse yenile
            if ($this->client->isAccessTokenExpired()) {
                $this->refreshAccessToken();
            }

            // Dosyayı sil
            $this->driveService->files->delete($fileId);

            return true;
        } catch (\Exception $e) {
            Log::error('Google Drive dosya silinirken hata: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Klasördeki dosyaları listele
     *
     * @param string|null $folderId Klasör ID'si (null ise kök klasör)
     * @return array|false Dosya listesi veya hata durumunda false
     */
    public function listFiles(string $folderId = null)
    {
        try {
            $this->ensureClientInitialized();

            // Önce token'ı kontrol et ve gerekirse yenile
            if ($this->client->isAccessTokenExpired()) {
                $this->refreshAccessToken();
            }

            // Sorgu parametrelerini oluştur
            $query = 'trashed = false';

            // Eğer klasör ID'si belirtilmişse, o klasördeki dosyaları listele
            if (!empty($folderId)) {
                $query .= " and '$folderId' in parents";
            } else {
                // Klasör ID'si belirtilmemişse, config'deki klasör ID'sini kullan
                $config = Config::get('filesystems.disks.google_drive');
                $defaultFolderId = $config['folder'] ?? '';
                if (!empty($defaultFolderId)) {
                    $query .= " and '$defaultFolderId' in parents";
                } else {
                    // Klasör ID'si yoksa, kök klasördeki dosyaları listele
                    $query .= " and 'root' in parents";
                }
            }

            // Dosyaları listele
            $result = $this->driveService->files->listFiles([
                'q' => $query,
                'fields' => 'files(id, name, mimeType, size, createdTime, modifiedTime, webViewLink)',
                'orderBy' => 'name'
            ]);

            return $result->getFiles();
        } catch (\Exception $e) {
            Log::error('Google Drive dosyaları listelenirken hata: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Yetkilendirme URL'sini al
     *
     * @param string $redirectUri Yönlendirme URL'si
     * @return string Yetkilendirme URL'si
     */
    public function getAuthUrl(string $redirectUri): string
    {
        $this->ensureClientInitialized();
        $this->client->setRedirectUri($redirectUri);
        return $this->client->createAuthUrl();
    }

    /**
     * Yetkilendirme kodunu kullanarak token al
     *
     * @param string $authCode Yetkilendirme kodu
     * @param string $redirectUri Yönlendirme URL'si
     * @return bool İşlem başarılı mı?
     */
    public function fetchAccessTokenWithAuthCode(string $authCode, string $redirectUri): bool
    {
        try {
            $this->ensureClientInitialized();
            $this->client->setRedirectUri($redirectUri);
            $accessToken = $this->client->fetchAccessTokenWithAuthCode($authCode);

            if (isset($accessToken['access_token'])) {
                // Config'i güncelle (bu sadece runtime'da geçerli olacak)
                Config::set('filesystems.disks.google_drive.accessToken', json_encode($accessToken));

                // Refresh token varsa kaydet
                if (isset($accessToken['refresh_token'])) {
                    Config::set('filesystems.disks.google_drive.refreshToken', $accessToken['refresh_token']);
                }

                return true;
            }

            return false;
        } catch (\Exception $e) {
            Log::error('Google Drive token alınırken hata: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Yedekleme için klasör oluştur veya kontrol et
     *
     * @param string $folderName Klasör adı
     * @return string Klasör ID'si
     */
    public function createOrGetBackupFolder(string $folderName = 'Glorian CRM'): string
    {
        try {
            $this->ensureClientInitialized();

            // Token'ı kontrol et ve gerekirse yenile
            if (!$this->checkAndRefreshToken()) {
                Log::error('Google Drive yetkilendirme başarısız.');
                return '';
            }

            // Önce klasörün var olup olmadığını kontrol et
            $query = "mimeType='application/vnd.google-apps.folder' and name='$folderName' and trashed=false";
            $config = Config::get('filesystems.disks.google_drive');
            $folderId = $config['folder'] ?? '';

            // Belirli bir klasör içinde arama yap
            if (!empty($folderId) && $folderId !== 'root') {
                $query .= " and '$folderId' in parents";
            } else {
                $query .= " and 'root' in parents";
            }

            $results = $this->driveService->files->listFiles([
                'q' => $query,
                'fields' => 'files(id, name)'
            ]);

            $files = $results->getFiles();

            // Klasör zaten varsa ID'sini dön
            if (count($files) > 0) {
                return $files[0]->getId();
            }

            // Klasör yoksa yeni bir klasör oluştur
            $fileMetadata = new \Google_Service_Drive_DriveFile([
                'name' => $folderName,
                'mimeType' => 'application/vnd.google-apps.folder'
            ]);

            // Belirli bir klasör içinde oluştur
            if (!empty($folderId) && $folderId !== 'root') {
                $fileMetadata->setParents([$folderId]);
            }

            $folder = $this->driveService->files->create($fileMetadata, [
                'fields' => 'id'
            ]);

            return $folder->getId();
        } catch (\Exception $e) {
            Log::error('Google Drive yedekleme klasörü oluşturulurken hata: ' . $e->getMessage());
            return '';
        }
    }
}
