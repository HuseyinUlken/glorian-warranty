<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\ServiceResource;
use App\Models\Service;
use App\Traits\DataTableTrait;
use App\Traits\PermissionTrait;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    use DataTableTrait, PermissionTrait;

    public function __construct()
    {
        $this->initModule('service');
    }

    /**
     * Tüm hizmetleri listele (Admin için)
     */
    public function index(Request $request)
    {
        $authResult = $this->authorize('view_all', 'service.view_all');
        if ($authResult !== true) {
            return $authResult;
        }

        $query = Service::with(['dealer.user', 'customer', 'appliedProducts'])
            ->withCount('appliedProducts');

        // DataTable filtrelerini tanımla
        $this->addFilter('status', 'Durum', 'Durum seçin', \App\Enums\ServiceStatusEnum::options(), 'select', false);
        $this->addFilter('dealer_id', 'Bayi', 'Bayi seçin', \App\Models\Dealer::with('user')->get()->map(function ($dealer) {
            return ['value' => $dealer->id, 'label' => $dealer->name];
        })->toArray(), 'select', false);
        $this->addFilter('application_date', 'Başvuru Tarihi', 'Tarih seçin', [], 'date', false);

        // DataTable hazırla
        $dataTable = $this->prepareDataTable(
            $query,
            $request,
            ['service_code', 'vehicle_make', 'vehicle_model', 'vehicle_plate', 'customer.first_name', 'customer.last_name', 'customer.phone', 'dealer.name'],  // Searchable columns
            ['service_code', 'status', 'application_date', 'created_at'],  // Sortable columns
            '',  // Prefix
            300,  // Debounce delay
            'created_at'  // Default sort column
        );

        return Inertia::render('admin/services/Index', [
            'services' => ServiceResource::collection($dataTable['data']),
            'dataTableMeta' => $dataTable['meta'],
            'statusOptions' => \App\Enums\ServiceStatusEnum::options(),
            'dealers' => \App\Models\Dealer::with('user')->get()->map(function ($dealer) {
                return [
                    'id' => $dealer->id,
                    'name' => $dealer->name,
                    'email' => $dealer->user->email,
                ];
            }),
        ]);
    }

    /**
     * Hizmet detayını göster (Admin için)
     */
    public function show(Service $service)
    {
        $authResult = $this->authorize('view_all', 'service.view_all');
        if ($authResult !== true) {
            return $authResult;
        }

        $service->load(['dealer.user', 'customer', 'notes.user']);

        return Inertia::render('admin/services/Show', [
            'service' => (new ServiceResource($service))->resolve(),
        ]);
    }
}
