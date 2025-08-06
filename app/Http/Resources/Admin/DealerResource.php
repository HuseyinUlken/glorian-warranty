<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Request;

class DealerResource extends JsonResource
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
            'email' => $this->user->email,
            'phone' => $this->phone,
            'city' => $this->city,
            'district' => $this->district,
            'address' => $this->address,
            'full_address' => $this->full_address,
            'logo_url' => $this->logo_url,
            'status' => [
                'value' => $this->status->value,
                'label' => $this->status->label(),
                'color' => $this->status->color(),
            ],
            'is_active' => $this->isActive(),
            'is_suspended' => $this->isSuspended(),
            'services_count' => $this->services_count ?? $this->services()->count(),
            'active_services_count' => $this->active_services_count ?? $this->activeServices()->count(),
            'created_at' => $this->created_at?->format('d.m.Y H:i'),
            'updated_at' => $this->updated_at?->format('d.m.Y H:i'),
        ];
    }
}
