<?php

namespace App\Models;

use App\Enums\CustomerStatusEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Customer extends Model
{
    use HasFactory, SoftDeletes, Notifiable;

    protected $fillable = [
        'first_name',
        'last_name',
        'phone',
        'email',
        'address',
        'city',
        'district',
        'status',
        'notes',
    ];

    protected $casts = [
        'status' => CustomerStatusEnum::class,
    ];

    /**
     * Müşterinin hizmetleri
     */
    public function services(): HasMany
    {
        return $this->hasMany(Service::class);
    }

    /**
     * Müşterinin aktif hizmetleri
     */
    public function activeServices(): HasMany
    {
        return $this->services()->where('status', 'ACTIVE');
    }

    /**
     * Müşterinin tam adını al
     */
    public function getFullNameAttribute(): string
    {
        return trim($this->first_name . ' ' . $this->last_name);
    }

    /**
     * Müşterinin tam adresini al
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
     * Müşterinin aktif olup olmadığını kontrol et
     */
    public function isActive(): bool
    {
        return $this->status === CustomerStatusEnum::ACTIVE;
    }

    /**
     * Müşterinin hizmet sayısını al
     */
    public function getServicesCountAttribute(): int
    {
        return $this->services()->count();
    }

    /**
     * Müşterinin aktif hizmet sayısını al
     */
    public function getActiveServicesCountAttribute(): int
    {
        return $this->activeServices()->count();
    }
}
