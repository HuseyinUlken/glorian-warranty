<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Request;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'category' => [
                'value' => $this->category->value,
                'label' => $this->category->label(),
                'description' => $this->category->description(),
                'color' => $this->category->color(),
            ],
            'sku' => $this->sku,
            'description' => $this->description,
            'warranty_description' => $this->warranty_description,
            'warranty_duration_months' => $this->warranty_duration_months,
            'warranty_duration_years' => $this->warranty_duration_years,
            'formatted_warranty_duration' => $this->formatted_warranty_duration,
            'is_active' => $this->is_active,
            'services_count' => $this->services_count ?? $this->services()->count(),
            'created_at' => $this->created_at?->format('d.m.Y H:i'),
            'updated_at' => $this->updated_at?->format('d.m.Y H:i'),
        ];
    }
}
