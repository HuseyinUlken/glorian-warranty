<?php

namespace App\Console\Commands;

use App\Models\Setting;
use App\Services\GoogleDriveService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use ZipArchive;

class BackupRestoreCommand extends Command
{
    /**
     * Komut adı ve parametreleri
     *
     * @var string
     */
    protected $signature = 'backup:restore 
                            {--filename= : Geri yüklenecek yedek dosyasının adı (belirtilmezse en son yedek kullanılır)}
                            {--password= : Şifreli yedek dosyası için şifre}
                            {--force : Onay istemeden işlemi gerçekleştir}';

    /**
     * Komut açıklaması
     *
     * @var string
     */
    protected $description = "Google Drive'dan yedek dosyasını indirip sistemi geri yükler";

    /**
     * Google Drive servisi
     *
     * @var GoogleDriveService
     */
    protected $driveService;

    /**
     * Geçici dizin
     *
     * @var string
     */
    protected $tempDir;

    /**
     * Komut oluşturulduğunda çalışır
     */
    public function __construct(GoogleDriveService $driveService)
    {
        parent::__construct();
        $this->driveService = $driveService;
        $this->tempDir = storage_path('app/backup-restore-temp');
    }

    /**
     * Komutu çalıştır
     */
    public function handle()
    {
        $this->info('Yedekten geri yükleme işlemi başlatılıyor...');

        // Geçici dizini temizle ve oluştur
        $this->prepareTemporaryDirectory();

        try {
            // Google Drive'dan dosyaları listele
            $backupFiles = $this->getBackupFiles();

            if (empty($backupFiles)) {
                $this->error("Google Drive'da yedek dosyası bulunamadı!");
                return 1;
            }

            // Yedek dosyasını seç
            $backupFile = $this->selectBackupFile($backupFiles);

            if (!$backupFile) {
                $this->error('Yedek dosyası seçilemedi!');
                return 1;
            }

            // Kullanıcı onayı - Kuyruğa eklenmiş komutlarda veya force seçeneği ile çalıştırıldığında onay isteme
            $isRunningInQueue = app()->runningInConsole() && app()->bound('queue.connection');

            if (!$this->option('force') && !$isRunningInQueue) {
                try {
                    if (!$this->confirm("Sistem \"$backupFile->name\" dosyasından geri yüklenecek. Bu işlem mevcut verilerin üzerine yazacak. Devam etmek istiyor musunuz?", false)) {
                        $this->info('İşlem iptal edildi.');
                        return 0;
                    }
                } catch (\Exception $e) {
                    // Onay alınamadıysa (muhtemelen STDIN hatası), işlemi devam ettir
                    $this->info('Kullanıcı onayı alınamadı, işlem devam ediyor...');
                    Log::info('Backup restore confirmation error: ' . $e->getMessage() . '. Continuing without confirmation.');
                }
            }

            // Yedek dosyasını indir
            $this->info('Yedek dosyası indiriliyor...');
            $zipPath = $this->downloadBackupFile($backupFile);

            if (!$zipPath) {
                $this->error('Yedek dosyası indirilemedi!');
                return 1;
            }

            // Zip dosyasını aç
            $this->info('Yedek dosyası açılıyor...');
            $extractPath = $this->extractZipFile($zipPath);

            if (!$extractPath) {
                $this->error('Yedek dosyası açılamadı!');
                return 1;
            }

            // Veritabanını geri yükle
            $this->info('Veritabanı geri yükleniyor...');
            $dbResult = $this->restoreDatabase($extractPath);

            if (!$dbResult) {
                $this->error('Veritabanı geri yüklenemedi!');
                return 1;
            }

            // Dosyaları geri yükle (isteğe bağlı)
            if (File::exists($extractPath . '/files') && $this->confirm('Dosyaları da geri yüklemek istiyor musunuz?', false)) {
                $this->info('Dosyalar geri yükleniyor...');
                $filesResult = $this->restoreFiles($extractPath);

                if (!$filesResult) {
                    $this->error('Dosyalar geri yüklenemedi!');
                }
            }

            // Önbelleği temizle
            $this->info('Önbellek temizleniyor...');
            $this->clearCache();

            $this->info('Geri yükleme işlemi tamamlandı!');
            return 0;
        } catch (\Exception $e) {
            $this->error('Geri yükleme sırasında bir hata oluştu: ' . $e->getMessage());
            Log::error('Backup restore error: ' . $e->getMessage());
            return 1;
        } finally {
            // Geçici dizini temizle
            $this->cleanupTemporaryDirectory();
        }
    }

    /**
     * Geçici dizini hazırla
     */
    protected function prepareTemporaryDirectory()
    {
        if (File::exists($this->tempDir)) {
            File::deleteDirectory($this->tempDir);
        }

        File::makeDirectory($this->tempDir, 0755, true, true);
    }

    /**
     * Geçici dizini temizle
     */
    protected function cleanupTemporaryDirectory()
    {
        if (File::exists($this->tempDir)) {
            File::deleteDirectory($this->tempDir);
        }
    }

    /**
     * Google Drive'dan yedek dosyalarını listele
     */
    protected function getBackupFiles()
    {
        $files = $this->driveService->listFiles();

        if ($files === false) {
            return [];
        }

        // Sadece zip dosyalarını ve prefix ile başlayanları filtrele
        $backupFiles = [];
        $prefix = config('backup.backup.destination.filename_prefix', 'Glorian_backup_');

        foreach ($files as $file) {
            if (
                strpos($file->getName(), $prefix) === 0 &&
                strtolower(pathinfo($file->getName(), PATHINFO_EXTENSION)) === 'zip'
            ) {
                $backupFiles[] = $file;
            }
        }

        // Tarihe göre sırala (en yeni en üstte)
        usort($backupFiles, function ($a, $b) {
            return strtotime($b->getCreatedTime()) - strtotime($a->getCreatedTime());
        });

        return $backupFiles;
    }

    /**
     * Yedek dosyasını seç
     */
    protected function selectBackupFile($backupFiles)
    {
        // Komut satırından belirtilen dosya
        $fileOption = $this->option('filename');

        if ($fileOption) {
            // Dosya adı belirtilmişse, o dosyayı bul
            foreach ($backupFiles as $file) {
                if ($file->getName() === $fileOption) {
                    return $file;
                }
            }

            $this->error('Belirtilen dosya bulunamadı: ' . $fileOption);
            return null;
        }

        // Dosya belirtilmemişse en son yedeği kullan veya seçim yap
        if (count($backupFiles) === 1 || $this->option('force')) {
            return $backupFiles[0];  // En son yedek
        }

        // Kullanıcıya seçim yaptır
        $options = [];
        foreach ($backupFiles as $index => $file) {
            $date = date('Y-m-d H:i:s', strtotime($file->getCreatedTime()));
            $size = round($file->getSize() / 1024 / 1024, 2) . ' MB';
            $options[$index] = $file->getName() . " ($date, $size)";
        }

        $selectedIndex = $this->choice('Hangi yedek dosyasını kullanmak istiyorsunuz?', $options, 0);
        return $backupFiles[array_search($selectedIndex, $options)];
    }

    /**
     * Yedek dosyasını indir
     */
    protected function downloadBackupFile($backupFile)
    {
        $content = $this->driveService->download($backupFile->getId());

        if ($content === false) {
            return false;
        }

        $zipPath = $this->tempDir . '/' . $backupFile->getName();
        File::put($zipPath, $content);

        return $zipPath;
    }

    /**
     * Zip dosyasını aç
     */
    protected function extractZipFile($zipPath)
    {
        $extractPath = $this->tempDir . '/extracted';
        File::makeDirectory($extractPath, 0755, true, true);

        $zip = new ZipArchive();
        $result = $zip->open($zipPath);

        if ($result === true) {
            // Şifreli dosya kontrolü
            if ($zip->status === ZipArchive::ER_NOPASSWD || $zip->status === ZipArchive::ER_WRONGPASSWD) {
                $password = $this->option('password');
                if (empty($password)) {
                    $password = $this->secret('Yedek dosyası şifreli. Lütfen şifreyi girin:');
                }

                if (!empty($password)) {
                    $zip->setPassword($password);
                } else {
                    $this->error('Şifre belirtilmedi!');
                    $zip->close();
                    return false;
                }
            }

            $zip->extractTo($extractPath);
            $zip->close();
            return $extractPath;
        }

        $this->error('Zip dosyası açılamadı. Hata kodu: ' . $result);
        return false;
    }

    /**
     * Veritabanını geri yükle
     */
    protected function restoreDatabase($extractPath)
    {
        $dbDumpsPath = $extractPath . '/db-dumps';

        if (!File::exists($dbDumpsPath)) {
            $this->error('Veritabanı yedekleri bulunamadı!');
            return false;
        }

        $dbConnection = config('database.default');

        // MySQL veritabanını geri yükle
        if ($dbConnection === 'mysql') {
            $dbName = config('database.connections.mysql.database');
            $mysqlDumpFile = $dbDumpsPath . "/mysql-$dbName.sql";

            if (File::exists($mysqlDumpFile)) {
                // DatabaseRestoreHelper kullanarak MySQL veritabanını geri yükle
                $result = \App\Helpers\DatabaseRestoreHelper::restoreMySqlFromFile($mysqlDumpFile, $dbConnection);

                if ($result) {
                    $this->info('MySQL veritabanı başarıyla geri yüklendi.');
                } else {
                    $this->error('MySQL veritabanı geri yüklenirken bir hata oluştu.');
                    return false;
                }
            } else {
                $this->error("MySQL yedek dosyası bulunamadı: $mysqlDumpFile");
                return false;
            }
        }

        // SQLite veritabanını geri yükle
        $sqliteDumpFile = $dbDumpsPath . '/sqlite-gemini.sqlite';
        if (File::exists($sqliteDumpFile)) {
            $sqliteDbPath = database_path('gemini.sqlite');

            // DatabaseRestoreHelper kullanarak SQLite veritabanını geri yükle
            $result = \App\Helpers\DatabaseRestoreHelper::restoreSqliteFromFile($sqliteDumpFile, $sqliteDbPath);

            if ($result) {
                $this->info('SQLite veritabanı başarıyla geri yüklendi.');
            } else {
                $this->error('SQLite veritabanı geri yüklenirken bir hata oluştu.');
                // SQLite hatası kritik değil, devam et
            }
        }

        return true;
    }

    /**
     * Dosyaları geri yükle
     */
    protected function restoreFiles($extractPath)
    {
        $filesPath = $extractPath . '/files';

        if (!File::exists($filesPath)) {
            $this->error('Dosya yedekleri bulunamadı!');
            return false;
        }

        // storage/app dizinini geri yükle
        $storagePath = $filesPath . '/storage/app';
        if (File::exists($storagePath)) {
            // Mevcut dosyaları yedekle
            $appPath = storage_path('app');
            if (File::exists($appPath)) {
                File::copyDirectory($appPath, $appPath . '.bak');
            }

            // Yedekten dosyaları kopyala
            File::copyDirectory($storagePath, $appPath);
            $this->info('Storage dosyaları geri yüklendi.');
        }

        return true;
    }

    /**
     * Önbelleği temizle
     */
    protected function clearCache()
    {
        Artisan::call('config:clear');
        $this->info('Config önbelleği temizlendi.');

        Artisan::call('cache:clear');
        $this->info('Uygulama önbelleği temizlendi.');

        Artisan::call('view:clear');
        $this->info('View önbelleği temizlendi.');

        Artisan::call('route:clear');
        $this->info('Route önbelleği temizlendi.');

        return true;
    }
}
