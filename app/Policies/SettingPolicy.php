<?php

namespace App\Policies;

use App\Models\Setting;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class SettingPolicy
{
    use HandlesAuthorization;

    /**
     * E-posta ayarlarını görüntüleme izni
     *
     * @param User $user
     * @return bool
     */
    public function viewMailSettings(User $user): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * E-posta ayarlarını güncelleme izni
     *
     * @param User $user
     * @return bool
     */
    public function updateMailSettings(User $user): bool
    {
        return $user->hasRole('admin');
    }
}
