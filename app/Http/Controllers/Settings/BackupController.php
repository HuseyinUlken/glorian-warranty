<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Jobs\BackupJob;
use App\Jobs\RestoreBackupJob;
use App\Models\Setting;
use App\Services\GoogleDriveService;
use App\Traits\PermissionTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BackupController extends Controller
{
    use PermissionTrait;

    /**
     * Google Drive servis sınıfı
     *
     * @var GoogleDriveService
     */
    protected $driveService;

    /**
     * Controller sınıfını oluştur
     */
    public function __construct(GoogleDriveService $driveService)
    {
        $this->initModule('settings.backup');
        $this->driveService = $driveService;
    }

    /**
     * Yedekleme ayarları sayfasını göster
     */
    public function index()
    {
        $authResult = $this->authorize('view');
        if ($authResult !== true) {
            return $authResult;
        }

        // Yedek dosyalarını listele
        $backupFiles = $this->listBackupFiles();

        return Inertia::render('settings/backup-settings', [
            'backupFiles' => $backupFiles,
            'lastBackup' => Setting::get('backup_last_run', null),
        ]);
    }

    /**
     * Yedekleme işlemini başlat
     */
    public function create(Request $request)
    {
        $authResult = $this->authorize('create');
        if ($authResult !== true) {
            return $authResult;
        }

        try {
            // Yedekleme işini kuyruğa ekle
            BackupJob::dispatch()->onQueue('default');

            return back()->with('success', 'Yedekleme işlemi kuyruğa eklendi. Birkaç dakika içinde tamamlanacaktır.');
        } catch (\Exception $e) {
            Log::error('Yedekleme işlemi sırasında hata: ' . $e->getMessage());
            return back()->with('error', 'Yedekleme işlemi sırasında bir hata oluştu: ' . $e->getMessage());
        }
    }

    /**
     * Yedekleme geri yükleme sayfasını göster
     */
    public function showRestore($fileName)
    {
        $authResult = $this->authorize('restore');
        if ($authResult !== true) {
            return $authResult;
        }

        // Yedek dosyasını bul
        $backupFiles = $this->listBackupFiles();
        $backupFile = null;

        foreach ($backupFiles as $file) {
            if ($file['name'] === $fileName) {
                $backupFile = $file;
                break;
            }
        }

        if (!$backupFile) {
            return back()->with('error', 'Belirtilen yedek dosyası bulunamadı.');
        }

        return Inertia::render('settings/backup-restore', [
            'backupFile' => $backupFile,
        ]);
    }

    /**
     * Yedekleme geri yükleme işlemini başlat
     */
    public function restore(Request $request)
    {
        $authResult = $this->authorize('restore');
        if ($authResult !== true) {
            return $authResult;
        }

        // Kullanıcı şifresini doğrula
        $user = $request->user();
        if (!Hash::check($request->password, $user->password)) {
            return back()->withErrors(['password' => 'Şifre doğru değil.']);
        }

        $validated = $request->validate([
            'file_name' => 'required|string',
            'backup_password' => 'nullable|string',
        ]);

        try {
            // Geri yükleme işini kuyruğa ekle
            RestoreBackupJob::dispatch(
                $validated['file_name'],
                $validated['backup_password'] ?? null
            )->onQueue('default');

            return redirect()
                ->route('backup-settings.index')
                ->with('success', 'Geri yükleme işlemi kuyruğa eklendi. Birkaç dakika içinde tamamlanacaktır.');
        } catch (\Exception $e) {
            Log::error('Yedekleme geri yükleme işlemi sırasında hata: ' . $e->getMessage());
            return back()->with('error', 'Geri yükleme işlemi sırasında bir hata oluştu: ' . $e->getMessage());
        }
    }

    /**
     * Yedek dosyasını indir
     */
    public function download($fileName)
    {
        $authResult = $this->authorize('view');
        if ($authResult !== true) {
            return $authResult;
        }

        try {
            // Dosya ID'sini bul
            $files = $this->driveService->listFiles();
            $fileId = null;

            if ($files !== false) {
                foreach ($files as $file) {
                    if ($file->getName() === $fileName) {
                        $fileId = $file->getId();
                        break;
                    }
                }
            }

            if (!$fileId) {
                return back()->with('error', 'Dosya bulunamadı.');
            }

            // Dosya içeriğini Google Drive'dan al
            $content = $this->driveService->download($fileId);

            if ($content === false) {
                return back()->with('error', 'Dosya indirilemedi.');
            }

            // Dosyayı indir
            return response($content)
                ->header('Content-Type', 'application/zip')
                ->header('Content-Disposition', 'attachment; filename="' . $fileName . '"');
        } catch (\Exception $e) {
            Log::error('Yedek dosyası indirilirken hata: ' . $e->getMessage());
            return back()->with('error', 'Dosya indirilirken bir hata oluştu: ' . $e->getMessage());
        }
    }

    /**
     * Yedek dosyalarını listele
     */
    protected function listBackupFiles()
    {
        try {
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
                    $backupFiles[] = [
                        'id' => $file->getId(),
                        'name' => $file->getName(),
                        'size' => $file->getSize(),
                        'created_at' => $file->getCreatedTime(),
                        'is_encrypted' => strpos($file->getName(), '_encrypted') !== false,
                    ];
                }
            }

            // Tarihe göre sırala (en yeni en üstte)
            usort($backupFiles, function ($a, $b) {
                return strtotime($b['created_at']) - strtotime($a['created_at']);
            });

            return $backupFiles;
        } catch (\Exception $e) {
            Log::error('Yedek dosyaları listelenirken hata: ' . $e->getMessage());
            return [];
        }
    }
}
