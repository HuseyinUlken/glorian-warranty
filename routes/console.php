<?php

use App\Models\Setting;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schedule;

/**
 * Yedekleme görevlerini zamanla
 * - backup:clean: Eski yedekleri temizler
 * - backup:run: Yeni yedek oluşturur
 */

// Eski yedekleri temizle (her 3 saatte bir)
Schedule::command('backup:clean')->everyFourHours();

// Yeni yedek oluştur (her 3 saatte bir)
Schedule::command('backup:run')->everyThreeHours()->onSuccess(function () {
    // Yedekleme başarılı olduğunda son yedekleme zamanını kaydet
    Setting::set('backup_last_run', now()->toDateTimeString(), 'backup');
    Log::info('Zamanlanmış yedekleme işlemi başarıyla tamamlandı.');
});
