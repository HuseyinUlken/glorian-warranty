<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExportController;
use App\Http\Controllers\ExportedFileController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\UtilsController;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

// Ana sayfa rotası - Öğrenci kullanıcıları için dashboard'a yönlendir
Route::get('/', function () {
    if (auth()->check() && auth()->user()->hasRole('student')) {
        return redirect()->route('student.dashboard');
    }
    return Inertia::render('welcome');
})->name('home');

// Kimlik doğrulama gerektiren rotalar
Route::middleware(['auth', 'verified'])->group(function () {
    // Ana dashboard - Rol bazlı yönlendirme
    Route::get('/dashboard', function () {
        if (auth()->user()->hasRole('student')) {
            return redirect()->route('student.dashboard');
        }
        return app(DashboardController::class)->index();
    })->name('dashboard');

    // Export edilen dosyalar modülü (tüm kullanıcılar için)
    Route::resource('exported-files', ExportedFileController::class)->except(['create', 'edit', 'store', 'update']);
    Route::get('exported-files/{exportedFile}/download', [ExportedFileController::class, 'download'])->name('exported-files.download');

    // Bildirimler modülü
    Route::get('notifications', [NotificationController::class, 'index'])->name('notifications.index');
    Route::get('notifications/{id}/get-notification-details', [NotificationController::class, 'show'])->name('notifications.show');
    Route::post('notifications/{id}/mark-as-read', [NotificationController::class, 'markAsRead'])->name('notifications.mark-as-read');
    Route::post('notifications/mark-all-as-read', [NotificationController::class, 'markAllAsRead'])->name('notifications.mark-all-as-read');
    Route::delete('notifications/{id}', [NotificationController::class, 'destroy'])->name('notifications.destroy');
    Route::delete('notifications', [NotificationController::class, 'destroyAll'])->name('notifications.destroy-all');
    Route::get('/notifications/unread-count', [NotificationController::class, 'getUnreadCount'])->name('notifications.unread-count');

    // Kullanıcı Yönetimi rotaları
    Route::resource('user-management', App\Http\Controllers\UserManagementController::class)
        ->names('user_management')
        ->parameters(['user-management' => 'user']);
    Route::get('user-management/roles/manage', [App\Http\Controllers\UserManagementController::class, 'manageRoles'])->name('user_management.manage_roles');
});

// API Routes (Auth gerektirmeyen)
Route::prefix('api')->group(function () {
    // Garanti Takip Sistemi - Public API'leri
    Route::prefix('warranty')->group(function () {
        Route::post('/check', [App\Http\Controllers\PublicInquiryController::class, 'apiCheck'])->name('warranty.api-check');
    });
});

// Garanti Takip Sistemi - Public Sayfaları (Auth gerektirmeyen)
Route::prefix('warranty')->name('warranty.')->group(function () {
    Route::get('/', [App\Http\Controllers\PublicInquiryController::class, 'index'])->name('check');
    Route::post('/check', [App\Http\Controllers\PublicInquiryController::class, 'check'])->name('check');
});

// Garanti Takip Sistemi - Admin Rotaları
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    // Bayi Yönetimi
    Route::resource('dealers', App\Http\Controllers\Admin\DealerController::class);

    // Ürün Yönetimi
    Route::resource('products', App\Http\Controllers\Admin\ProductController::class);

    // Hizmet Yönetimi
    Route::resource('services', App\Http\Controllers\Admin\ServiceController::class)->only(['index', 'show']);
});

// Garanti Takip Sistemi - Bayi Rotaları
Route::middleware(['auth', 'verified'])->prefix('dealer')->name('dealer.')->group(function () {
    // Hizmet Yönetimi
    Route::resource('services', App\Http\Controllers\Dealer\ServiceController::class);
    Route::post('services/{service}/start-warranty', [App\Http\Controllers\Dealer\ServiceController::class, 'startWarranty'])->name('services.start-warranty');
    Route::post('services/{service}/add-note', [App\Http\Controllers\Dealer\ServiceController::class, 'addNote'])->name('services.add-note');

    // Müşteri Arama
    Route::get('customers/search-by-phone', [App\Http\Controllers\Dealer\CustomerController::class, 'searchByPhone'])->name('customers.search-by-phone');

    // Hizmet Sorgu
    Route::get('service-inquiry', [App\Http\Controllers\Dealer\ServiceInquiryController::class, 'index'])->name('service-inquiry.index');
    Route::post('service-inquiry/{service}/add-note', [App\Http\Controllers\Dealer\ServiceInquiryController::class, 'addNote'])->name('service-inquiry.add-note');
    Route::post('service-inquiry/search', [App\Http\Controllers\Dealer\ServiceInquiryController::class, 'search'])->name('service-inquiry.search');
    Route::get('service-inquiry/api-search', [App\Http\Controllers\Dealer\ServiceInquiryController::class, 'apiSearch'])->name('service-inquiry.api-search');
});
Route::get('migrate:fresh', function () {
    Artisan::call('migrate:fresh', ['--seed' => true]);
    return redirect()->route('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
