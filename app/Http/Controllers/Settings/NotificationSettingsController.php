<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\UserNotificationSetting;
use App\Traits\PermissionTrait;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Inertia\Inertia;
use Inertia\Response;

class NotificationSettingsController extends Controller
{
    use PermissionTrait;

    public function __construct()
    {
        $this->initModule('settings.notifications');
    }

    /**
     * Bildirim ayarları sayfasını göster
     */
    public function edit(Request $request): Response
    {
        $authResult = $this->authorize('view');
        if ($authResult !== true) {
            return $authResult;
        }

        // Kullanıcının bildirim ayarlarını al
        $notificationSettings = UserNotificationSetting::where('user_id', $request->user()->id)->get();

        // Modülleri al ve sadece notifications dizisine sahip olanları filtrele
        $modules = collect(Config::get('roles.modules'))->filter(function ($module) {
            return isset($module['notifications']);
        })->toArray();

        return Inertia::render('settings/notification-settings', [
            'notificationSettings' => $notificationSettings,
            'modules' => $modules,
        ]);
    }

    /**
     * Bildirim ayarlarını güncelle
     */
    public function update(Request $request): RedirectResponse
    {
        $authResult = $this->authorize('update');
        if ($authResult !== true) {
            return $authResult;
        }

        $validated = $request->validate([
            'module' => ['required', 'string'],
            'event' => ['required', 'string'],
            'is_active' => ['required', 'boolean'],
        ]);

        // Kullanıcının bildirim ayarını güncelle
        $user = $request->user();
        $user->setNotificationSetting(
            $validated['module'],
            $validated['event'],
            $validated['is_active']
        );

        return back()->with('success', 'Bildirim ayarları güncellendi.');
    }
}
