<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Dealer\StoreDealerRequest;
use App\Http\Requests\Admin\Dealer\UpdateDealerRequest;
use App\Http\Resources\Admin\DealerResource;
use App\Models\Dealer;
use App\Models\User;
use App\Traits\DataTableTrait;
use App\Traits\PermissionTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class DealerController extends Controller
{
    use DataTableTrait, PermissionTrait;

    public function __construct()
    {
        $this->initModule('dealer');
    }

    /**
     * Bayileri listele
     */
    public function index(Request $request)
    {
        $authResult = $this->authorize('view');
        if ($authResult !== true) {
            return $authResult;
        }

        $query = Dealer::with(['user', 'services'])
            ->withCount(['services', 'activeServices']);

        // DataTable filtrelerini tanımla
        $this->addFilter('status', 'Durum', 'Durum seçin', \App\Enums\DealerStatusEnum::options(), 'select', false);

        // DataTable hazırla
        $dataTable = $this->prepareDataTable(
            $query,
            $request,
            ['name', 'city', 'district', 'user.email'],  // Searchable columns
            ['name', 'city', 'status', 'created_at'],  // Sortable columns
            '',  // Prefix
            300,  // Debounce delay
            'created_at'  // Default sort column
        );

        return Inertia::render('admin/dealers/Index', [
            'dealers' => DealerResource::collection($dataTable['data']),
            'dataTableMeta' => $dataTable['meta'],
            'statusOptions' => \App\Enums\DealerStatusEnum::options(),
        ]);
    }

    /**
     * Yeni bayi oluşturma formu
     */
    public function create()
    {
        $authResult = $this->authorize('create');
        if ($authResult !== true) {
            return $authResult;
        }

        return Inertia::render('admin/dealers/Create', [
            'statusOptions' => \App\Enums\DealerStatusEnum::options(),
        ]);
    }

    /**
     * Yeni bayi kaydet
     */
    public function store(StoreDealerRequest $request)
    {
        $authResult = $this->authorize('create');
        if ($authResult !== true) {
            return $authResult;
        }

        try {
            DB::beginTransaction();

            // Kullanıcı oluştur
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            // Dealer rolünü ata
            $dealerRole = Role::where('name', 'dealer')->first();
            if ($dealerRole) {
                $user->assignRole($dealerRole);
            }

            // Logo yükleme
            $logoUrl = null;
            if ($request->hasFile('logo')) {
                $logoUrl = $request->file('logo')->store('dealers/logos', 'public');
            }

            // Bayi oluştur
            $dealer = Dealer::create([
                'user_id' => $user->id,
                'name' => $request->name,
                'phone' => $request->phone,
                'city' => $request->city,
                'district' => $request->district,
                'address' => $request->address,
                'logo_url' => $logoUrl,
                'status' => $request->status ?? 'ACTIVE',
            ]);

            DB::commit();

            return redirect()
                ->route('admin.dealers.index')
                ->with('success', 'Bayi başarıyla oluşturuldu.');
        } catch (\Exception $e) {
            DB::rollBack();

            // Yüklenen dosyayı sil
            if (isset($logoUrl) && Storage::disk('public')->exists($logoUrl)) {
                Storage::disk('public')->delete($logoUrl);
            }

            return back()->withErrors(['error' => 'Bayi oluşturulurken bir hata oluştu: ' . $e->getMessage()]);
        }
    }

    /**
     * Bayi detayını göster
     */
    public function show(Dealer $dealer)
    {
        $authResult = $this->authorize('view');
        if ($authResult !== true) {
            return $authResult;
        }

        $dealer->load(['user', 'services.customer', 'services.appliedProducts']);

        return Inertia::render('admin/dealers/Show', [
            'dealer' => (new DealerResource($dealer))->resolve(),
        ]);
    }

    /**
     * Bayi düzenleme formu
     */
    public function edit(Dealer $dealer)
    {
        $authResult = $this->authorize('edit');
        if ($authResult !== true) {
            return $authResult;
        }

        $dealer->load('user');

        return Inertia::render('admin/dealers/Edit', [
            'dealer' => (new DealerResource($dealer))->resolve(),
            'statusOptions' => \App\Enums\DealerStatusEnum::options(),
        ]);
    }

    /**
     * Bayi güncelle
     */
    public function update(UpdateDealerRequest $request, Dealer $dealer)
    {
        $authResult = $this->authorize('edit');
        if ($authResult !== true) {
            return $authResult;
        }

        try {
            DB::beginTransaction();

            // Kullanıcı bilgilerini güncelle
            $dealer->user->update([
                'name' => $request->name,
                'email' => $request->email,
            ]);

            // Logo yükleme
            $logoUrl = $dealer->logo_url;
            if ($request->hasFile('logo')) {
                // Eski logoyu sil
                if ($logoUrl && Storage::disk('public')->exists($logoUrl)) {
                    Storage::disk('public')->delete($logoUrl);
                }

                $logoUrl = $request->file('logo')->store('dealers/logos', 'public');
            }

            // Bayi bilgilerini güncelle
            $dealer->update([
                'name' => $request->name,
                'phone' => $request->phone,
                'city' => $request->city,
                'district' => $request->district,
                'address' => $request->address,
                'logo_url' => $logoUrl,
                'status' => $request->status ?? $dealer->status,
            ]);

            DB::commit();

            return redirect()
                ->route('admin.dealers.index')
                ->with('success', 'Bayi başarıyla güncellendi.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Bayi güncellenirken bir hata oluştu: ' . $e->getMessage()]);
        }
    }

    /**
     * Bayi sil
     */
    public function destroy(Dealer $dealer)
    {
        $authResult = $this->authorize('delete');
        if ($authResult !== true) {
            return $authResult;
        }

        try {
            DB::beginTransaction();

            // Logo dosyasını sil
            if ($dealer->logo_url && Storage::disk('public')->exists($dealer->logo_url)) {
                Storage::disk('public')->delete($dealer->logo_url);
            }

            // Bayi ve kullanıcıyı sil
            $dealer->delete();
            $dealer->user->delete();

            DB::commit();

            return redirect()
                ->route('admin.dealers.index')
                ->with('success', 'Bayi başarıyla silindi.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Bayi silinirken bir hata oluştu: ' . $e->getMessage()]);
        }
    }
}
