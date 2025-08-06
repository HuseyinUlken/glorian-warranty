<?php

namespace App\Jobs;

use App\Models\Setting;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;

class BackupJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * İşin kaç kez yeniden deneneceği
     *
     * @var int
     */
    public $tries = 1;

    /**
     * İşin zaman aşımı süresi (saniye)
     *
     * @var int
     */
    public $timeout = 600;

    /**
     * Yeni bir iş örneği oluştur
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * İşi çalıştır
     *
     * @return void
     */
    public function handle()
    {
        try {
            // Yedekleme komutunu çalıştır
            $exitCode = Artisan::call('backup:run');

            if ($exitCode === 0) {
                // Son yedekleme zamanını kaydet
                Setting::set('backup_last_run', now()->toDateTimeString(), 'backup');
                Log::info('Yedekleme işlemi başarıyla tamamlandı.');
            } else {
                $output = Artisan::output();
                Log::error('Yedekleme komutu hata kodu ile tamamlandı: ' . $exitCode . ', Çıktı: ' . $output);

                // Hata durumunda işi başarısız olarak işaretle
                $this->fail(new \Exception('Yedekleme komutu hata kodu ile tamamlandı: ' . $exitCode));
            }
        } catch (\Exception $e) {
            Log::error('Yedekleme işlemi sırasında hata: ' . $e->getMessage());

            // Hata durumunda işi başarısız olarak işaretle
            $this->fail($e);
        }
    }

    /**
     * İş başarısız olduğunda çalıştırılacak
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function failed(\Exception $exception)
    {
        Log::error('Yedekleme işi başarısız oldu: ' . $exception->getMessage());
    }
}
