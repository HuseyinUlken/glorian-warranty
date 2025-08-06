<?php

namespace App\Providers;

use Carbon\Carbon;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class ConfigurationServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Veritabanı migrasyonlarının yapılıp yapılmadığını kontrol eder
     *
     * @return bool
     */
    private function isMigrated(): bool
    {
        try {
            // Settings tablosunun varlığını kontrol et
            return Schema::hasTable('settings');
        } catch (\Exception $e) {
            // Veritabanı bağlantısı veya başka bir hata durumunda false döndür
            return false;
        }
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // Tarih ve saat ayarları için Türkçe dil desteği - Bu ayar veritabanına bağlı değil
        $this->configureDateTimeSettings();

        // Veritabanı migrasyonlarının yapılıp yapılmadığını kontrol et
        if (!$this->isMigrated()) {
            // Migrasyon yapılmamışsa, veritabanına bağlı konfigürasyonları atla
            return;
        }

        // URL ve güvenlik ayarlarını yapılandır
        $this->configureUrlSettings();
    }

    /**
     * Tarih ve saat ayarlarını yapılandır
     */
    private function configureDateTimeSettings(): void
    {
        try {
            // Tarih ve saat ayarları için Türkçe dil desteği
            Carbon::setLocale('tr');
            Date::setLocale('tr');
            setlocale(LC_TIME, 'tr_TR.UTF-8', 'tr_TR', 'tr', 'turkish');

            // MySQL için zaman dilimini ayarla
            Config::set('database.connections.mysql.timezone', '+03:00');
        } catch (\Exception $e) {
            Log::error('Tarih ve saat ayarları yapılandırılırken hata: ' . $e->getMessage());
        }
    }

    /**
     * URL ve güvenlik ayarlarını yapılandır
     */
    private function configureUrlSettings(): void
    {
        try {
            // Uygulama URL'sini al
            $appUrl = config('app.url');

            // URL şemasını zorla (https)
            URL::forceScheme('https');

            // URL oluşturma sırasında kullanılacak host'u belirle
            URL::forceRootUrl($appUrl);

            // Proxy arkasında çalışıyorsa güvenli bağlantıları zorla
            if (
                request()->server->has('HTTP_X_FORWARDED_PROTO') &&
                request()->server->get('HTTP_X_FORWARDED_PROTO') == 'https'
            ) {
                request()->server->set('HTTPS', 'on');
            }

            // Oturum çerezlerini güvenli yap
            config(['session.secure' => true]);

            // İmzalı URL'lerin doğru çalışması için
            // URL::defaults() kullanarak varsayılan parametreleri ayarla
            URL::defaults(['host' => parse_url($appUrl, PHP_URL_HOST)]);
        } catch (\Exception $e) {
            Log::error('URL ve güvenlik ayarları yapılandırılırken hata: ' . $e->getMessage());
        }
    }
}
