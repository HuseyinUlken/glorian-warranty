<?php

namespace App\Http\Resources\Public;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Request;

class ServiceInquiryResource extends JsonResource
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
                'name' => $this->dealer->name,
                'city' => $this->dealer->city,
                'phone' => $this->dealer->phone,
                'email' => $this->dealer->user->email,
            ],
            'customer' => [
                'full_name' => $this->customer->full_name,
                'phone' => $this->customer->phone,
                'email' => $this->customer->email,
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
                    'name' => $product->name,
                    'category' => [
                        'value' => $product->category->value,
                        'label' => $product->category->label(),
                    ],
                    'warranty_duration' => $product->formatted_warranty_duration,
                    'applied_areas' => is_string($product->pivot->applied_areas)
                        ? json_decode($product->pivot->applied_areas, true)
                        : $product->pivot->applied_areas,
                ];
            }),
            'notes' => $this->whenLoaded('notes', function () {
                return $this->notes->take(5)->map(function ($note) {
                    return [
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
            'created_at' => $this->created_at?->format('d.m.Y H:i'),
        ];
    }
}
