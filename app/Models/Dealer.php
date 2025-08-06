<?php

namespace App\Models;

use App\Enums\DealerStatusEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Dealer extends Model
{
    use HasFactory, SoftDeletes, Notifiable;

    protected $fillable = [
        'user_id',
        'name',
        'city',
        'district',
        'address',
        'phone',
        'logo_url',
        'status',
    ];

    protected $casts = [
        'status' => DealerStatusEnum::class,
    ];

    /**
     * Bayinin kullanıcı hesabı
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Bayinin hizmetleri
     */
    public function services(): HasMany
    {
        return $this->hasMany(Service::class);
    }

    /**
     * Bayinin aktif hizmetleri
     */
    public function activeServices(): HasMany
    {
        return $this->services()->where('status', 'ACTIVE');
    }

    /**
     * Bayinin logo URL'sini al
     */
    public function getLogoUrlAttribute($value): string
    {
        if ($value) {
            return asset('storage/' . $value);
        }

        return asset('images/default-dealer-logo.png');
    }

    /**
     * Bayinin tam adresini al
     */
    public function getFullAddressAttribute(): string
    {
        $parts = array_filter([
            $this->address,
            $this->district,
            $this->city,
        ]);

        return implode(', ', $parts);
    }

    /**
     * Bayinin durumunu kontrol et
     */
    public function isActive(): bool
    {
        return $this->status === DealerStatusEnum::ACTIVE;
    }

    /**
     * Bayinin askıya alınmış olup olmadığını kontrol et
     */
    public function isSuspended(): bool
    {
        return $this->status === DealerStatusEnum::SUSPENDED;
    }
}
