<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Traits\PermissionTrait;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GoogleDriveSettingsController extends Controller
{
    use PermissionTrait;

    public function __construct()
    {
        $this->initModule('settings.google_drive');
    }

    /**
     * Google Drive ayarları sayfasını göster
     */
    public function edit()
    {
        $authResult = $this->authorize('update');
        if ($authResult !== true) {
            return $authResult;
        }

        // Google Drive ayarlarını al
        $driveSettings = [
            'google_drive_client_id' => Setting::get('google_drive_client_id', ''),
            'google_drive_client_secret' => Setting::get('google_drive_client_secret', ''),
            'google_drive_access_token' => Setting::get('google_drive_access_token', ''),
            'google_drive_refresh_token' => Setting::get('google_drive_refresh_token', ''),
            'google_drive_folder' => Setting::get('google_drive_folder', ''),
            'google_drive_folder_name' => Setting::get('google_drive_folder_name', ''),
        ];

        return Inertia::render('settings/google-drive-settings', [
            'driveSettings' => $driveSettings,
            'lastUpdated' => Setting::get('google_drive_last_updated'),
            'csrfToken' => csrf_token()
        ]);
    }

    /**
     * Google Drive ayarlarını güncelle
     */
    public function update(Request $request)
    {
        $authResult = $this->authorize('update');
        if ($authResult !== true) {
            return $authResult;
        }

        $validated = $request->validate([
            'google_drive_client_id' => 'required|string|max:255',
            'google_drive_client_secret' => 'required|string|max:255',
            'google_drive_refresh_token' => 'required|string|max:255',
            'google_drive_access_token' => 'nullable|string',
            'google_drive_folder' => 'nullable|string|max:255',
            'google_drive_folder_name' => 'nullable|string|max:255',
        ]);

        // Ayarları veritabanına kaydet
        foreach ($validated as $key => $value) {
            Setting::set($key, $value, 'google_drive');
        }

        // Son güncelleme zamanını kaydet
        Setting::set('google_drive_last_updated', now(), 'google_drive');

        return back()->with('success', 'Google Drive ayarları başarıyla güncellendi.');
    }

    /**
     * Google Drive ayarlarını sıfırla
     */
    public function destroy()
    {
        $authResult = $this->authorize('update');
        if ($authResult !== true) {
            return $authResult;
        }

        // Tüm Google Drive ayarlarını sıfırla
        $settings = [
            'google_drive_client_id',
            'google_drive_client_secret',
            'google_drive_access_token',
            'google_drive_refresh_token',
            'google_drive_folder',
            'google_drive_folder_name',
            'google_drive_last_updated'
        ];

        foreach ($settings as $key) {
            Setting::set($key, '', 'google_drive');
        }

        return back()->with('success', 'Google Drive ayarları başarıyla sıfırlandı.');
    }
}
