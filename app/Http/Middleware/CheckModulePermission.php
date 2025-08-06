<?php

namespace App\Http\Middleware;

use App\Helpers\PermissionHelper;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;
use Closure;

class CheckModulePermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $module): Response
    {
        // Kullanıcı giriş yapmamışsa giriş sayfasına yönlendir
        if (!$request->user()) {
            return redirect()->route('login');
        }

        // Kullanıcının modüle erişim izni var mı kontrol et
        if (!PermissionHelper::canAccessModule($request->user(), $module)) {
            // API isteği ise 403 hatası döndür
            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Bu modüle erişim izniniz bulunmamaktadır.'
                ], 403);
            }

            // Web isteği ise erişim reddedildi sayfasına yönlendir
            return Inertia::render('access-denied', [
                'module' => $module,
                'backUrl' => url()->previous() !== url()->current() ? url()->previous() : route('dashboard'),
            ])->toResponse($request)->setStatusCode(403);
        }

        return $next($request);
    }
}
