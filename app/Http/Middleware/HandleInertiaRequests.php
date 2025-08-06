<?php

namespace App\Http\Middleware;

use App\Models\Setting;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = ['En büyük düşman başarısızlık , En büyük dost azim ve istikrardır 🔥', 'Oğuz Yılmaz'];

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'email_verified_at' => $request->user()->email_verified_at,
                    'created_at' => $request->user()->created_at,
                    'avatar_path' => $request->user()->avatar_path,
                    'avatar_url' => $request->user()->avatar_url,
                    'roles' => $request->user()->roles
                ] : null,
                'permissions' => $request->user() ? $request->user()->getAllPermissions()->pluck('name') : null,
            ],
            'ziggy' => fn(): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
                'warning' => $request->session()->get('warning'),
                'info' => $request->session()->get('info'),
            ],
            'firebase' => [
                'apiKey' => Setting::get('fcm_api_key', ''),
                'authDomain' => Setting::get('fcm_project_id', '') . '.firebaseapp.com',
                'projectId' => Setting::get('fcm_project_id', ''),
                'storageBucket' => Setting::get('fcm_project_id', '') . '.appspot.com',
                'messagingSenderId' => Setting::get('fcm_sender_id', ''),
                'appId' => Setting::get('fcm_app_id', ''),
                'vapidKey' => Setting::get('fcm_vapid_key', ''),
            ],
        ];
    }
}
