<?php

use App\Helpers\PermissionHelper;
use Carbon\Carbon;

if (!function_exists('formatTimeSince')) {
    /**
     * Belirtilen tarihten şu ana kadar geçen süreyi formatlar
     *
     * @param \Carbon\Carbon|string|null $createdAt
     * @return string
     */
    function formatTimeSince($createdAt): string
    {
        if (empty($createdAt)) {
            return '';
        }

        $timeDiff = time() - strtotime($createdAt);
        $days = floor($timeDiff / (60 * 60 * 24));
        $hours = floor(($timeDiff % (60 * 60 * 24)) / (60 * 60));
        $minutes = floor(($timeDiff % (60 * 60)) / 60);

        $result = '';

        if ($days > 1) {
            $result .= $days . ' gündür ';
        } elseif ($days === 1) {
            $result .= '1 gündür ';
        }

        if ($hours > 0) {
            $result .= $hours . ' saattir ';
        }

        if ($minutes > 0) {
            $result .= $minutes . ' dakikadır';
        }

        return $result ?: 'az önce';
    }
}

if (!function_exists('formatTimeRemaining')) {
    /**
     * Belirtilen tarihe kadar kalan süreyi formatlar
     *
     * @param \Carbon\Carbon|string|null $dueDate
     * @return string
     */
    function formatTimeRemaining($dueDate): string
    {
        if (empty($dueDate)) {
            return '';
        }

        $timeDiff = strtotime($dueDate) - time();
        $days = floor($timeDiff / (60 * 60 * 24));
        $hours = floor(($timeDiff % (60 * 60 * 24)) / (60 * 60));
        $minutes = floor(($timeDiff % (60 * 60)) / 60);

        $result = '';

        if ($days > 0) {
            $result .= $days . ' gün ';
        }

        if ($hours > 0) {
            $result .= $hours . ' saat ';
        }

        if ($minutes > 0) {
            $result .= $minutes . ' dakika';
        }

        return $result ?: 'az kaldı';
    }
}

if (!function_exists('getAllPermissions')) {
    /**
     * Tüm izinleri döndürür
     *
     * @return array
     */
    function getAllPermissions(): array
    {
        return PermissionHelper::getAllPermissions();
    }
}

if (!function_exists('getModulePermissions')) {
    /**
     * Belirli bir modüle ait tüm izinleri döndürür
     *
     * @param string $moduleName
     * @return array
     */
    function getModulePermissions(string $moduleName): array
    {
        return PermissionHelper::getModulePermissions($moduleName);
    }
}

if (!function_exists('getRolePermissions')) {
    /**
     * Belirli bir role ait tüm izinleri döndürür
     *
     * @param string $roleName
     * @return array
     */
    function getRolePermissions(string $roleName): array
    {
        return PermissionHelper::getRolePermissions($roleName);
    }
}

if (!function_exists('getAllRoles')) {
    /**
     * Tüm rolleri döndürür
     *
     * @return array
     */
    function getAllRoles(): array
    {
        return PermissionHelper::getAllRoles();
    }
}

if (!function_exists('getAllModules')) {
    /**
     * Tüm modülleri döndürür
     *
     * @return array
     */
    function getAllModules(): array
    {
        return PermissionHelper::getAllModules();
    }
}

if (!function_exists('getModulePermissionsWithNames')) {
    /**
     * Belirli bir modüle ait izinleri isim ve açıklamalarıyla birlikte döndürür
     *
     * @param string $moduleName
     * @return array
     */
    function getModulePermissionsWithNames(string $moduleName): array
    {
        return PermissionHelper::getModulePermissionsWithNames($moduleName);
    }
}

if (!function_exists('getModuleFromPermission')) {
    /**
     * İzin adından modül adını döndürür
     *
     * @param string $permission
     * @return string|null
     */
    function getModuleFromPermission(string $permission): ?string
    {
        return PermissionHelper::getModuleFromPermission($permission);
    }
}

if (!function_exists('hasRole')) {
    /**
     * Belirli bir kullanıcının rolünü kontrol eder
     *
     * @param \App\Models\User $user
     * @param string $roleName
     * @return bool
     */
    function hasRole($user, string $roleName): bool
    {
        return PermissionHelper::hasRole($user, $roleName);
    }
}

if (!function_exists('hasPermission')) {
    /**
     * Belirli bir kullanıcının izni olup olmadığını kontrol eder
     *
     * @param \App\Models\User $user
     * @param string $permission
     * @return bool
     */
    function hasPermission($user, string $permission): bool
    {
        return PermissionHelper::hasPermission($user, $permission);
    }
}

if (!function_exists('canAccessModule')) {
    /**
     * Belirli bir kullanıcının bir modüle erişim izni olup olmadığını kontrol eder
     *
     * @param \App\Models\User $user
     * @param string $moduleName
     * @return bool
     */
    function canAccessModule($user, string $moduleName): bool
    {
        return PermissionHelper::canAccessModule($user, $moduleName);
    }
}

if (!function_exists('userCan')) {
    /**
     * Mevcut kullanıcının belirli bir izne sahip olup olmadığını kontrol eder
     *
     * @param string $permission
     * @return bool
     */
    function userCan(string $permission): bool
    {
        if (!auth()->check()) {
            return false;
        }

        return auth()->user()->can($permission);
    }
}

if (!function_exists('userHasRole')) {
    /**
     * Mevcut kullanıcının belirli bir role sahip olup olmadığını kontrol eder
     *
     * @param string $roleName
     * @return bool
     */
    function userHasRole(string $roleName): bool
    {
        if (!auth()->check()) {
            return false;
        }

        return auth()->user()->hasRole($roleName);
    }
}

if (!function_exists('userCanAccessModule')) {
    /**
     * Mevcut kullanıcının bir modüle erişim izni olup olmadığını kontrol eder
     *
     * @param string $moduleName
     * @return bool
     */
    function userCanAccessModule(string $moduleName): bool
    {
        if (!auth()->check()) {
            return false;
        }

        return canAccessModule(auth()->user(), $moduleName);
    }
}

if (!function_exists('envOrDb')) {
    /**
     * Çevre değişkenini .env dosyasından veya veritabanından al
     *
     * Öncelikle veritabanından ayarı arar, bulamazsa .env dosyasından okur
     *
     * @param string $key Çevre değişkeni anahtarı (DB'de küçük harfli, ENV'de büyük harfli)
     * @param mixed $default Bulunamazsa kullanılacak varsayılan değer
     * @return mixed
     */
    function envOrDb(string $key, $default = null)
    {
        // Anahtarı küçük harfe çevir (veritabanı için)
        $dbKey = strtolower($key);

        try {
            // Uygulama başlatıldı mı kontrol et
            if (app()->bound('db') && app()->hasBeenBootstrapped() && class_exists('\App\Models\Setting')) {
                // Önce veritabanından kontrol et
                $dbValue = \App\Models\Setting::get($dbKey);

                if ($dbValue !== null) {
                    return $dbValue;
                }
            }
        } catch (\Exception $e) {
            // Hata durumunda sessizce devam et ve .env'den oku
            // Uygulama başlatılırken veritabanı bağlantısı henüz hazır olmayabilir
        }

        // Veritabanında bulunamazsa veya hata oluşursa .env'den al
        return env($key, $default);
    }
}
