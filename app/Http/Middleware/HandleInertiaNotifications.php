<?php

namespace App\Http\Middleware;

use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Closure;

class HandleInertiaNotifications
{
    /**
     * Her istekte okunmamış bildirim sayısını Inertia ile paylaş
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check()) {
            // Okunmamış bildirim sayısını hesapla
            $unreadCount = Notification::where('user_id', Auth::id())
                ->where('is_read', false)
                ->count();

            // Inertia ile paylaş
            Inertia::share('auth.unreadNotificationsCount', $unreadCount);
        }

        return $next($request);
    }
}
