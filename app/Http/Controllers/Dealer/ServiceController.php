<?php

namespace App\Http\Controllers\Dealer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dealer\Service\StoreServiceRequest;
use App\Http\Requests\Dealer\Service\UpdateServiceRequest;
use App\Http\Resources\Dealer\ServiceResource;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Service;
use App\Traits\DataTableTrait;
use App\Traits\PermissionTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ServiceController extends Controller
{
    use DataTableTrait, PermissionTrait;

    public function __construct()
    {
        $this->initModule('service');
    }

    /**
     * Bayinin kendi hizmetlerini listele
     */
    public function index(Request $request)
    {
        $authResult = $this->authorize('view_own', 'service.view_own');
        if ($authResult !== true) {
            return $authResult;
        }

        $dealer = auth()->user()->dealer;

        if (!$dealer) {
            return redirect()
                ->route('dashboard')
                ->withErrors(['error' => 'Bayi bilgileriniz bulunamadı.']);
        }

        $query = Service::with(['customer'])
            ->where('dealer_id', $dealer->id)
            ->withCount('appliedProducts');

        // DataTable filtrelerini tanımla
        $this->addFilter('status', 'Durum', 'Durum seçin', \App\Enums\ServiceStatusEnum::options(), 'select', false);

        // DataTable hazırla
        $dataTable = $this->prepareDataTable(
            $query,
            $request,
            ['service_code', 'vehicle_make', 'vehicle_model', 'vehicle_plate', 'customer.first_name', 'customer.last_name', 'customer.phone'],  // Searchable columns
            ['service_code', 'status', 'application_date', 'created_at'],  // Sortable columns
            '',  // Prefix
            300,  // Debounce delay
            'created_at'  // Default sort column
        );

        return Inertia::render('dealer/services/Index', [
            'services' => ServiceResource::collection($dataTable['data']),
            'dataTableMeta' => $dataTable['meta'],
            'statusOptions' => \App\Enums\ServiceStatusEnum::options(),
        ]);
    }

    /**
     * Yeni hizmet oluşturma formu
     */
    public function create()
    {
        $authResult = $this->authorize('create', 'service.create');
        if ($authResult !== true) {
            return $authResult;
        }

        $dealer = auth()->user()->dealer;

        if (!$dealer) {
            return redirect()
                ->route('dashboard')
                ->withErrors(['error' => 'Bayi bilgileriniz bulunamadı.']);
        }

        return Inertia::render('dealer/services/Create', [
            'products' => Product::active()->get()->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'category' => [
                        'value' => $product->category->value,
                        'label' => $product->category->label(),
                    ],
                    'warranty_duration' => $product->formatted_warranty_duration,
                ];
            }),
        ]);
    }

    /**
     * Yeni hizmet kaydet
     */
    public function store(StoreServiceRequest $request)
    {
        $authResult = $this->authorize('create', 'service.create');
        if ($authResult !== true) {
            return $authResult;
        }

        $dealer = auth()->user()->dealer;

        if (!$dealer) {
            return back()->withErrors(['error' => 'Bayi bilgileriniz bulunamadı.']);
        }

        try {
            DB::beginTransaction();

            // Müşteriyi bul veya oluştur
            $existingCustomer = Customer::where('phone', $request->input('customer.phone'))->first();

            if ($existingCustomer) {
                // Telefon numarası var, ad-soyad kontrolü yap
                if (
                    $existingCustomer->first_name !== $request->input('customer.first_name') ||
                    $existingCustomer->last_name !== $request->input('customer.last_name')
                ) {
                    return back()->withErrors([
                        'customer.phone' => 'Bu telefon numarası başka bir müşteriye ait. Lütfen farklı bir telefon numarası kullanın veya mevcut müşteri bilgilerini kontrol edin.'
                    ]);
                }

                $customer = $existingCustomer;
            } else {
                // Yeni müşteri oluştur
                $customer = Customer::create([
                    'first_name' => $request->input('customer.first_name'),
                    'last_name' => $request->input('customer.last_name'),
                    'phone' => $request->input('customer.phone'),
                    'email' => $request->input('customer.email'),
                    'address' => $request->input('customer.address'),
                    'city' => $request->input('customer.city'),
                    'district' => $request->input('customer.district'),
                    'status' => \App\Enums\CustomerStatusEnum::ACTIVE,
                ]);
            }

            // Hizmet oluştur
            $service = Service::create([
                'service_code' => Service::generateServiceCode(),
                'dealer_id' => $dealer->id,
                'customer_id' => $customer->id,
                'vehicle_make' => $request->input('vehicle.make'),
                'vehicle_model' => $request->input('vehicle.model'),
                'vehicle_year' => $request->input('vehicle.year'),
                'vehicle_package' => $request->input('vehicle.package'),
                'vehicle_color' => $request->input('vehicle.color'),
                'vehicle_plate' => $request->input('vehicle.plate'),
                'application_date' => $request->input('application_date'),
                'notes' => $request->input('notes'),
            ]);

            // Ürünleri ekle
            foreach ($request->input('applied_products') as $productData) {
                $service->appliedProducts()->attach($productData['product_id'], [
                    'applied_areas' => json_encode($productData['applied_areas']),
                    'notes' => $productData['notes'] ?? null,
                ]);
            }

            DB::commit();

            return redirect()
                ->route('dealer.services.index')
                ->with('success', 'Hizmet başarıyla oluşturuldu. Hizmet kodu: ' . $service->service_code);
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Hizmet oluşturulurken bir hata oluştu: ' . $e->getMessage()]);
        }
    }

    /**
     * Hizmet detayını göster
     */
    public function show(Service $service)
    {
        $authResult = $this->authorize('view_own', 'service.view_own');
        if ($authResult !== true) {
            return $authResult;
        }

        $dealer = auth()->user()->dealer;

        // Bayinin sadece kendi hizmetlerini görebilmesini sağla
        if ($service->dealer_id !== $dealer->id) {
            abort(403, 'Bu hizmete erişim izniniz yok.');
        }

        $service->load(['customer', 'notes.user']);

        return Inertia::render('dealer/services/Show', [
            'service' => (new ServiceResource($service))->resolve(),
        ]);
    }

    /**
     * Hizmet düzenleme formu
     */
    public function edit(Service $service)
    {
        $authResult = $this->authorize('edit', 'service.edit');
        if ($authResult !== true) {
            return $authResult;
        }

        $dealer = auth()->user()->dealer;

        if ($service->dealer_id !== $dealer->id) {
            abort(403, 'Bu hizmete erişim izniniz yok.');
        }

        $service->load(['customer']);

        return Inertia::render('dealer/services/Edit', [
            'service' => (new ServiceResource($service))->resolve(),
            'products' => Product::active()->get()->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'category' => [
                        'value' => $product->category->value,
                        'label' => $product->category->label(),
                    ],
                    'warranty_duration' => $product->formatted_warranty_duration,
                ];
            }),
        ]);
    }

    /**
     * Hizmet güncelle
     */
    public function update(UpdateServiceRequest $request, Service $service)
    {
        $authResult = $this->authorize('edit', 'service.edit');
        if ($authResult !== true) {
            return $authResult;
        }

        $dealer = auth()->user()->dealer;

        if ($service->dealer_id !== $dealer->id) {
            abort(403, 'Bu hizmete erişim izniniz yok.');
        }

        try {
            DB::beginTransaction();

            // Hizmet bilgilerini güncelle
            $service->update($request->validated());

            // Ürünleri güncelle
            if ($request->has('applied_products')) {
                $service->appliedProducts()->detach();
                foreach ($request->input('applied_products') as $productData) {
                    $service->appliedProducts()->attach($productData['product_id'], [
                        'applied_areas' => json_encode($productData['applied_areas']),
                        'notes' => $productData['notes'] ?? null,
                    ]);
                }
            }

            DB::commit();

            return redirect()
                ->route('dealer.services.index')
                ->with('success', 'Hizmet başarıyla güncellendi.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Hizmet güncellenirken bir hata oluştu: ' . $e->getMessage()]);
        }
    }

    /**
     * Garantiyi başlat
     */
    public function startWarranty(Service $service)
    {
        $authResult = $this->authorize('start_warranty', 'service.start_warranty');
        if ($authResult !== true) {
            return $authResult;
        }

        $dealer = auth()->user()->dealer;

        if ($service->dealer_id !== $dealer->id) {
            abort(403, 'Bu hizmete erişim izniniz yok.');
        }

        if ($service->startWarranty()) {
            return back()->with('success', 'Garanti başarıyla başlatıldı.');
        }

        return back()->withErrors(['error' => 'Garanti başlatılamadı. Hizmet durumunu kontrol edin.']);
    }

    /**
     * Hizmete not ekle
     */
    public function addNote(Request $request, Service $service)
    {
        $authResult = $this->authorize('add_note', 'service.add_note');
        if ($authResult !== true) {
            return $authResult;
        }

        $dealer = auth()->user()->dealer;

        if ($service->dealer_id !== $dealer->id) {
            abort(403, 'Bu hizmete erişim izniniz yok.');
        }

        $request->validate([
            'content' => 'required|string|max:1000',
            'type' => 'required|in:INFO,WARNING,ERROR,SUCCESS',
        ]);

        $service->notes()->create([
            'user_id' => auth()->id(),
            'content' => $request->content,
            'type' => $request->type,
        ]);

        return back()->with('success', 'Not başarıyla eklendi.');
    }

    /**
     * Hizmet sil
     */
    public function destroy(Service $service)
    {
        $authResult = $this->authorize('delete', 'service.delete');
        if ($authResult !== true) {
            return $authResult;
        }

        $dealer = auth()->user()->dealer;

        if ($service->dealer_id !== $dealer->id) {
            abort(403, 'Bu hizmete erişim izniniz yok.');
        }

        try {
            $service->delete();
            return redirect()
                ->route('dealer.services.index')
                ->with('success', 'Hizmet başarıyla silindi.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Hizmet silinirken bir hata oluştu: ' . $e->getMessage()]);
        }
    }
}
