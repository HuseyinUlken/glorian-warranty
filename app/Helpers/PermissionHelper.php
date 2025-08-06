<?php

namespace App\Helpers;

class PermissionHelper
{
    /**
     * Tüm izinleri döndürür
     *
     * @return array
     */
    public static function getAllPermissions(): array
    {
        $permissions = [];
        $modules = config('roles.modules');

        foreach ($modules as $moduleKey => $module) {
            foreach ($module['permissions'] as $permissionKey => $permissionName) {
                $permissions[] = $permissionKey;
            }
        }

        return $permissions;
    }

    /**
     * Belirli bir modüle ait tüm izinleri döndürür
     *
     * @param string $moduleName
     * @return array
     */
    public static function getModulePermissions(string $moduleName): array
    {
        $modules = config('roles.modules');

        if (!isset($modules[$moduleName])) {
            return [];
        }

        return array_keys($modules[$moduleName]['permissions']);
    }

    /**
     * Belirli bir role ait tüm izinleri döndürür
     *
     * @param string $roleName
     * @return array
     */
    public static function getRolePermissions(string $roleName): array
    {
        $roles = config('roles.roles');

        if (!isset($roles[$roleName])) {
            return [];
        }

        $permissions = [];
        $rolePermissions = $roles[$roleName]['permissions'];

        foreach ($rolePermissions as $permission) {
            // Eğer wildcard (*) içeriyorsa, ilgili tüm izinleri ekle
            if (strpos($permission, '*') !== false) {
                $moduleKey = str_replace('.*', '', $permission);
                $modulePermissions = self::getModulePermissions($moduleKey);
                $permissions = array_merge($permissions, $modulePermissions);
            } else {
                $permissions[] = $permission;
            }
        }

        return array_unique($permissions);
    }

    /**
     * Tüm rolleri döndürür
     *
     * @return array
     */
    public static function getAllRoles(): array
    {
        return array_keys(config('roles.roles'));
    }

    /**
     * Tüm modülleri döndürür
     *
     * @return array
     */
    public static function getAllModules(): array
    {
        $modules = config('roles.modules');
        $result = [];

        foreach ($modules as $key => $module) {
            $result[$key] = $module['name'];
        }

        return $result;
    }

    /**
     * Belirli bir modüle ait izinleri isim ve açıklamalarıyla birlikte döndürür
     *
     * @param string $moduleName
     * @return array
     */
    public static function getModulePermissionsWithNames(string $moduleName): array
    {
        $modules = config('roles.modules');

        if (!isset($modules[$moduleName])) {
            return [];
        }

        return $modules[$moduleName]['permissions'];
    }

    /**
     * İzin adından modül adını döndürür
     *
     * @param string $permission
     * @return string|null
     */
    public static function getModuleFromPermission(string $permission): ?string
    {
        $modules = config('roles.modules');

        foreach ($modules as $moduleKey => $module) {
            if (isset($module['permissions'][$permission])) {
                return $moduleKey;
            }
        }

        // Nokta notasyonu için kontrol (örn: categories.index)
        $parts = explode('.', $permission);
        if (count($parts) > 1) {
            $moduleKey = $parts[0];
            if (isset($modules[$moduleKey])) {
                return $moduleKey;
            }
        }

        return null;
    }

    /**
     * Belirli bir kullanıcının rolünü kontrol eder
     *
     * @param \App\Models\User $user
     * @param string $roleName
     * @return bool
     */
    public static function hasRole($user, string $roleName): bool
    {
        return $user->hasRole($roleName);
    }

    /**
     * Belirli bir kullanıcının izni olup olmadığını kontrol eder
     *
     * @param \App\Models\User $user
     * @param string $permission
     * @return bool
     */
    public static function hasPermission($user, string $permission): bool
    {
        return $user->hasPermissionTo($permission);
    }

    /**
     * Belirli bir kullanıcının bir modüle erişim izni olup olmadığını kontrol eder
     *
     * @param \App\Models\User $user
     * @param string $moduleName
     * @return bool
     */
    public static function canAccessModule($user, string $moduleName): bool
    {
        $modulePermissions = self::getModulePermissions($moduleName);

        foreach ($modulePermissions as $permission) {
            if ($user->hasPermissionTo($permission)) {
                return true;
            }
        }

        return false;
    }
}
