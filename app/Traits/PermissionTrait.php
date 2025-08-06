<?php

namespace App\Traits;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

trait PermissionTrait
{
    /**
     * Modül adı
     *
     * @var string
     */
    protected $module;

    /**
     * Modül adını ayarla
     *
     * @param string $module
     * @return void
     */
    protected function initModule(string $module): void
    {
        $this->module = $module;
    }

    /**
     * Belirli bir işlem için izin kontrolü yap
     *
     * @param string $action
     * @param string|null $customPermission
     * @return bool
     */
    protected function can(string $action, ?string $customPermission = null): bool
    {
        if (!$this->module && !$customPermission) {
            throw new \Exception('Modül adı belirtilmemiş veya özel izin tanımlanmamış.');
        }

        $permission = $customPermission ?: "{$this->module}.{$action}";

        return Auth::user()->can($permission);
    }

    /**
     * İzin kontrolü yap ve başarısız olursa erişim reddedildi sayfasına yönlendir
     *
     * @param string $action
     * @param string|null $customPermission
     * @param string|null $backUrl
     * @return mixed
     */
    protected function authorize(string $action, ?string $customPermission = null, ?string $backUrl = null)
    {
        $permission = $customPermission ?: "{$this->module}.{$action}";

        if (!$this->can($action, $customPermission)) {
            return Inertia::render('access-denied', [
                'module' => $this->module,
                'action' => $action,
                'backUrl' => $backUrl,
            ])->toResponse(request())->setStatusCode(403);
        }

        return true;
    }

    /**
     * Middleware için izin kontrolü - Laravel middleware yapısına uygun
     *
     * @param string $action
     * @param string|null $customPermission
     * @return \Closure
     */
    protected function authorizeMiddleware(string $action, ?string $customPermission = null)
    {
        return function ($request, $next) use ($action, $customPermission) {
            $permission = $customPermission ?: "{$this->module}.{$action}";

            if (!Auth::user()->can($permission)) {
                abort(403, 'Bu işlem için yetkiniz bulunmamaktadır.');
            }

            return $next($request);
        };
    }

    /**
     * İzin kontrolü yap ve başarısız olursa 403 hatası döndür (API için)
     *
     * @param string $action
     * @param string|null $customPermission
     * @return mixed
     */
    protected function authorizeApi(string $action, ?string $customPermission = null)
    {
        $permission = $customPermission ?: "{$this->module}.{$action}";

        if (!$this->can($action, $customPermission)) {
            abort(403, 'Bu işlem için yetkiniz bulunmamaktadır.');
        }

        return true;
    }
}
