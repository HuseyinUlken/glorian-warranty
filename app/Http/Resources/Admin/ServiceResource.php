<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Request;

class ServiceResource extends JsonResource
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
            'service_code' => $this->service_code,
            'status' => [
                'value' => $this->status->value,
                'label' => $this->status->label(),
                'color' => $this->status->color(),
                'description' => $this->status->description(),
            ],
            'dealer' => [
                'id' => $this->dealer->id,
                'name' => $this->dealer->name,
                'email' => $this->dealer->user->email,
                'city' => $this->dealer->city,
                'phone' => $this->dealer->phone,
            ],
            'customer' => [
                'id' => $this->customer->id,
                'full_name' => $this->customer->full_name,
                'first_name' => $this->customer->first_name,
                'last_name' => $this->customer->last_name,
                'phone' => $this->customer->phone,
                'email' => $this->customer->email,
                'city' => $this->customer->city,
            ],
            'vehicle' => [
                'full_name' => $this->vehicle_full_name,
                'make' => $this->vehicle_make,
                'model' => $this->vehicle_model,
                'year' => $this->vehicle_year,
                'package' => $this->vehicle_package,
                'color' => $this->vehicle_color,
                'plate' => $this->vehicle_plate,
            ],
            'warranty' => [
                'application_date' => $this->application_date?->format('d.m.Y'),
                'start_date' => $this->warranty_start_date?->format('d.m.Y'),
                'end_date' => $this->warranty_end_date?->format('d.m.Y'),
                'days_remaining' => $this->warranty_days_remaining,
                'percentage_remaining' => $this->warranty_percentage_remaining,
                'is_expired' => $this->isWarrantyExpired(),
            ],
            'applied_products' => $this->appliedProducts->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'category' => [
                        'value' => $product->category->value,
                        'label' => $product->category->label(),
                    ],
                    'warranty_duration' => $product->formatted_warranty_duration,
                    'applied_areas' => $product->pivot->applied_areas,
                ];
            }),
            'notes' => $this->whenLoaded('notes', function () {
                if (!$this->notes || !is_object($this->notes) || !method_exists($this->notes, 'map')) {
                    return [];
                }
                return $this->notes->map(function ($note) {
                    return [
                        'id' => $note->id,
                        'content' => $note->content,
                        'type' => [
                            'value' => $note->type->value,
                            'label' => $note->type->label(),
                            'color' => $note->type->color(),
                        ],
                        'created_at' => $note->created_at->format('d.m.Y H:i'),
                        'user_name' => $note->user->name,
                    ];
                });
            }),
            'applied_products_count' => $this->applied_products_count ?? $this->appliedProducts->count(),
            'notes_count' => $this->whenLoaded('notes', function () {
                if (!$this->notes || !is_object($this->notes) || !method_exists($this->notes, 'count')) {
                    return 0;
                }
                return $this->notes->count();
            }),
            'created_at' => $this->created_at?->format('d.m.Y H:i'),
            'updated_at' => $this->updated_at?->format('d.m.Y H:i'),
        ];
    }
}
