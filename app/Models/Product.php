<?php

namespace App\Models;

use App\Enums\ProductCategoryEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'category',
        'name',
        'sku',
        'description',
        'warranty_description',
        'warranty_duration_months',
        'is_active',
    ];

    protected $casts = [
        'category' => ProductCategoryEnum::class,
        'is_active' => 'boolean',
    ];

    /**
     * Ürünün uygulandığı hizmetler
     */
    public function services(): BelongsToMany
    {
        return $this
            ->belongsToMany(Service::class, 'service_products')
            ->withPivot('applied_areas')
            ->withTimestamps();
    }

    /**
     * Aktif ürünleri getir
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Kategoriye göre filtrele
     */
    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    /**
     * Ürünün aktif olup olmadığını kontrol et
     */
    public function isActive(): bool
    {
        return $this->is_active;
    }

    /**
     * Garanti süresini yıl olarak getir
     */
    public function getWarrantyDurationYearsAttribute(): float
    {
        return $this->warranty_duration_months / 12;
    }

    /**
     * Garanti süresini formatlanmış olarak getir
     */
    public function getFormattedWarrantyDurationAttribute(): string
    {
        $years = floor($this->warranty_duration_months / 12);
        $months = $this->warranty_duration_months % 12;

        if ($years > 0 && $months > 0) {
            return "{$years} yıl {$months} ay";
        } elseif ($years > 0) {
            return "{$years} yıl";
        } else {
            return "{$months} ay";
        }
    }
}
