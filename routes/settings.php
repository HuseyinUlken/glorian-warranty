<?php

use App\Http\Controllers\Settings\FirebaseSettingsController;
use App\Http\Controllers\Settings\GeminiSettingsController;
use App\Http\Controllers\Settings\GoogleDriveSettingsController;
use App\Http\Controllers\Settings\InstructorProfileController;
use App\Http\Controllers\Settings\LogsController;
use App\Http\Controllers\Settings\MailSettingsController;
use App\Http\Controllers\Settings\NotificationSettingsController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\QueueMonitorController;
use App\Http\Controllers\Settings\StudentProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::redirect('settings', 'settings/profile');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/password', [PasswordController::class, 'edit'])->name('password.edit');
    Route::put('settings/password', [PasswordController::class, 'update'])->name('password.update');

    Route::get('settings/appearance', function () {
        return Inertia::render('settings/appearance');
    })->name('appearance');

    // Kuyruk izleme
    Route::get('settings/queue-monitor', [QueueMonitorController::class, 'index'])->name('queue-monitor.index');
    Route::post('settings/queue-monitor/retry', [QueueMonitorController::class, 'retryFailedJob'])->name('queue-monitor.retry');
    Route::post('settings/queue-monitor/retry-all', [QueueMonitorController::class, 'retryAllFailedJobs'])->name('queue-monitor.retry-all');
    Route::post('settings/queue-monitor/delete', [QueueMonitorController::class, 'deleteFailedJob'])->name('queue-monitor.delete');
    Route::post('settings/queue-monitor/clear-all', [QueueMonitorController::class, 'clearAllFailedJobs'])->name('queue-monitor.clear-all');
    Route::post('settings/queue-monitor/run-job', [QueueMonitorController::class, 'runJob'])->name('queue-monitor.run-job');

    // Yedekleme yönetimi rotaları
    Route::prefix('settings/backup')->name('backup-settings.')->group(function () {
        Route::get('/', [\App\Http\Controllers\Settings\BackupController::class, 'index'])->name('index');
        Route::post('/create', [\App\Http\Controllers\Settings\BackupController::class, 'create'])->name('create');
        Route::get('/restore/{fileName}', [\App\Http\Controllers\Settings\BackupController::class, 'showRestore'])->name('show-restore');
        Route::post('/restore', [\App\Http\Controllers\Settings\BackupController::class, 'restore'])->name('restore');
        Route::get('/download/{fileName}', [\App\Http\Controllers\Settings\BackupController::class, 'download'])->name('download');
    });

    // Sistem logları görüntüleme rotaları
    Route::get('settings/logs', [LogsController::class, 'index'])->name('logs.index');
    Route::get('settings/logs/data', [LogsController::class, 'getLogs'])->name('logs.data');
});
