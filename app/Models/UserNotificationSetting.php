<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class UserNotificationSetting extends Model
{
    /**
     * Toplu atanabilir alanlar
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'module',
        'event',
        'is_active'
    ];

    /**
     * Cast edilecek alanlar
     *
     * @var array
     */
    protected $casts = [
        'is_active' => 'boolean',
    ];

    /**
     * Bu ayarın sahibi olan kullanıcı
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Belirli bir modül ve olay için ayarı getir
     *
     * @param string $module
     * @param string $event
     * @return UserNotificationSetting|null
     */
    public static function getByModuleAndEvent(int $userId, string $module, string $event): ?UserNotificationSetting
    {
        return static::where('user_id', $userId)
            ->where('module', $module)
            ->where('event', $event)
            ->first();
    }
}
