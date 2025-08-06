<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;

class RestoreBackupJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Geri yüklenecek yedek dosyasının adı
     *
     * @var string
     */
    protected $fileName;

    /**
     * Yedek dosyasının şifresi (varsa)
     *
     * @var string|null
     */
    protected $password;

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
     * @param string $fileName Geri yüklenecek dosya adı
     * @param string|null $password Şifre (varsa)
     * @return void
     */
    public function __construct($fileName, $password = null)
    {
        $this->fileName = $fileName;
        $this->password = $password;
    }

    /**
     * İşi çalıştır
     *
     * @return void
     */
    public function handle()
    {
        try {
            // Geri yükleme komutunu oluştur
            $command = 'backup:restore --filename="' . $this->fileName . '" --force';

            // Şifre belirtilmişse ekle
            if (!empty($this->password)) {
                $command .= ' --password="' . $this->password . '"';
            }

            // Komutu çalıştır
            $exitCode = Artisan::call($command);

            if ($exitCode === 0) {
                Log::info('Yedekleme başarıyla geri yüklendi.');
            } else {
                $output = Artisan::output();
                Log::error('Yedekleme geri yükleme hatası: ' . $output);

                // Hata durumunda işi başarısız olarak işaretle
                $this->fail(new \Exception('Yedekleme geri yükleme hatası: ' . $output));
            }
        } catch (\Exception $e) {
            Log::error('Yedekleme geri yükleme işlemi sırasında hata: ' . $e->getMessage());

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
        Log::error('Yedekleme geri yükleme işi başarısız oldu: ' . $exception->getMessage());
    }
}
