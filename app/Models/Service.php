<?php

namespace App\Models;

use App\Enums\ServiceStatusEnum;
use App\Notifications\ServiceStatusChangedNotification;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Service extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'service_code',
        'dealer_id',
        'customer_id',
        'vehicle_make',
        'vehicle_model',
        'vehicle_year',
        'vehicle_package',
        'vehicle_color',
        'vehicle_plate',
        'status',
        'application_date',
        'warranty_start_date',
        'warranty_end_date',
        'notes',
    ];

    protected $casts = [
        'status' => ServiceStatusEnum::class,
        'application_date' => 'date',
        'warranty_start_date' => 'date',
        'warranty_end_date' => 'date',
        'vehicle_year' => 'integer',
    ];

    /**
     * Hizmetin ait olduğu bayi
     */
    public function dealer(): BelongsTo
    {
        return $this->belongsTo(Dealer::class);
    }

    /**
     * Hizmetin ait olduğu müşteri
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    /**
     * Hizmette kullanılan ürünler
     */
    public function appliedProducts(): BelongsToMany
    {
        return $this
            ->belongsToMany(Product::class, 'service_products')
            ->withPivot('applied_areas', 'notes')
            ->withTimestamps();
    }

    /**
     * Hizmete ait notlar
     */
    public function notes(): HasMany
    {
        return $this->hasMany(ServiceNote::class)->orderBy('created_at', 'desc');
    }

    /**
     * Araç tam adını al
     */
    public function getVehicleFullNameAttribute(): string
    {
        $parts = array_filter([
            $this->vehicle_make,
            $this->vehicle_model,
            $this->vehicle_year,
            $this->vehicle_package,
        ]);

        return implode(' ', $parts);
    }

    /**
     * Garanti süresinin dolup dolmadığını kontrol et
     */
    public function isWarrantyExpired(): bool
    {
        if (!$this->warranty_end_date) {
            return false;
        }

        return $this->warranty_end_date->isPast();
    }

    /**
     * Garanti süresinin kalan gün sayısını al
     */
    public function getWarrantyDaysRemainingAttribute(): ?int
    {
        if (!$this->warranty_end_date) {
            return null;
        }

        return max(0, Carbon::now()->diffInDays($this->warranty_end_date, false));
    }

    /**
     * Garanti süresinin yüzde kaçının kaldığını al
     */
    public function getWarrantyPercentageRemainingAttribute(): ?float
    {
        if (!$this->warranty_start_date || !$this->warranty_end_date) {
            return null;
        }

        $totalDays = $this->warranty_start_date->diffInDays($this->warranty_end_date);
        $remainingDays = $this->warranty_days_remaining;

        if ($totalDays <= 0) {
            return 0;
        }

        return max(0, min(100, ($remainingDays / $totalDays) * 100));
    }

    /**
     * Garantiyi başlat
     */
    public function startWarranty(): bool
    {
        if ($this->status !== ServiceStatusEnum::PENDING) {
            return false;
        }

        $this->update([
            'status' => ServiceStatusEnum::ACTIVE,
            'warranty_start_date' => now(),
            'warranty_end_date' => $this->calculateWarrantyEndDate(),
        ]);

        return true;
    }

    /**
     * Garanti bitiş tarihini hesapla
     */
    private function calculateWarrantyEndDate(): Carbon
    {
        $maxMonths = $this->appliedProducts->max('warranty_duration_months') ?? 12;
        return now()->addMonths($maxMonths);
    }

    /**
     * Garanti durumunu güncelle (cron job için)
     */
    public function updateWarrantyStatus(): void
    {
        if ($this->status === ServiceStatusEnum::ACTIVE && $this->isWarrantyExpired()) {
            $this->update(['status' => ServiceStatusEnum::EXPIRED]);
        }
    }

    /**
     * Hizmet kodunu otomatik oluştur
     */
    public static function generateServiceCode(): string
    {
        do {
            $code = strtoupper(substr(md5(uniqid()), 0, 16));
        } while (self::where('service_code', $code)->exists());

        return $code;
    }

    /**
     * Scope: Bekleyen hizmetler
     */
    public function scopePending($query)
    {
        return $query->where('status', ServiceStatusEnum::PENDING);
    }

    /**
     * Scope: Aktif hizmetler
     */
    public function scopeActive($query)
    {
        return $query->where('status', ServiceStatusEnum::ACTIVE);
    }

    /**
     * Scope: Süresi dolmuş hizmetler
     */
    public function scopeExpired($query)
    {
        return $query->where('status', ServiceStatusEnum::EXPIRED);
    }

    /**
     * Model boot metodu - durum değişikliklerinde mail gönder
     */
    protected static function boot()
    {
        parent::boot();

        static::updating(function ($service) {
            // Durum değişikliği kontrolü
            if ($service->isDirty('status')) {
                $oldStatus = $service->getOriginal('status');
                $newStatus = $service->status;

                // Müşteriye mail gönder
                if ($service->customer && $service->customer->email) {
                    $service->customer->notify(new ServiceStatusChangedNotification(
                        $service,
                        $oldStatus,
                        $newStatus
                    ));
                }

                // Bayiye mail gönder (eğer bayi email'i varsa)
                if ($service->dealer && $service->dealer->email) {
                    $service->dealer->notify(new ServiceStatusChangedNotification(
                        $service,
                        $oldStatus,
                        $newStatus
                    ));
                }
            }
        });
    }
}
