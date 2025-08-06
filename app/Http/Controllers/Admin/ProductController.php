<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Product\StoreProductRequest;
use App\Http\Requests\Admin\Product\UpdateProductRequest;
use App\Http\Resources\Admin\ProductResource;
use App\Models\Product;
use App\Traits\DataTableTrait;
use App\Traits\PermissionTrait;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    use DataTableTrait, PermissionTrait;

    public function __construct()
    {
        $this->initModule('product');
    }

    /**
     * Ürünleri listele
     */
    public function index(Request $request)
    {
        $authResult = $this->authorize('view');
        if ($authResult !== true) {
            return $authResult;
        }

        $query = Product::with('services')
            ->withCount('services');

        // DataTable filtrelerini tanımla
        $this->addFilter('category', 'Kategori', 'Kategori seçin', \App\Enums\ProductCategoryEnum::options(), 'select', false);
        $this->addFilter('is_active', 'Durum', 'Durum seçin', [
            ['value' => '1', 'label' => 'Aktif'],
            ['value' => '0', 'label' => 'Pasif']
        ], 'select', false);

        // DataTable hazırla
        $dataTable = $this->prepareDataTable(
            $query,
            $request,
            ['name', 'sku', 'description'],  // Searchable columns
            ['name', 'category', 'is_active', 'created_at'],  // Sortable columns
            '',  // Prefix
            300,  // Debounce delay
            'created_at'  // Default sort column
        );

        return Inertia::render('admin/products/Index', [
            'products' => ProductResource::collection($dataTable['data']),
            'dataTableMeta' => $dataTable['meta'],
            'categoryOptions' => \App\Enums\ProductCategoryEnum::options(),
        ]);
    }

    /**
     * Yeni ürün oluşturma formu
     */
    public function create()
    {
        $authResult = $this->authorize('create');
        if ($authResult !== true) {
            return $authResult;
        }

        return Inertia::render('admin/products/Create', [
            'categoryOptions' => \App\Enums\ProductCategoryEnum::options(),
        ]);
    }

    /**
     * Yeni ürün kaydet
     */
    public function store(StoreProductRequest $request)
    {
        $authResult = $this->authorize('create');
        if ($authResult !== true) {
            return $authResult;
        }

        try {
            $product = Product::create($request->validated());

            return redirect()
                ->route('admin.products.index')
                ->with('success', 'Ürün başarıyla oluşturuldu.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Ürün oluşturulurken bir hata oluştu: ' . $e->getMessage()]);
        }
    }

    /**
     * Ürün detayını göster
     */
    public function show(Product $product)
    {
        $authResult = $this->authorize('view');
        if ($authResult !== true) {
            return $authResult;
        }

        $product->load(['services.dealer', 'services.customer']);

        return Inertia::render('admin/products/Show', [
            'product' => (new ProductResource($product))->resolve(),
        ]);
    }

    /**
     * Ürün düzenleme formu
     */
    public function edit(Product $product)
    {
        $authResult = $this->authorize('edit');
        if ($authResult !== true) {
            return $authResult;
        }

        return Inertia::render('admin/products/Edit', [
            'product' => (new ProductResource($product))->resolve(),
            'categoryOptions' => \App\Enums\ProductCategoryEnum::options(),
        ]);
    }

    /**
     * Ürün güncelle
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $authResult = $this->authorize('edit');
        if ($authResult !== true) {
            return $authResult;
        }

        try {
            $product->update($request->validated());

            return redirect()
                ->route('admin.products.index')
                ->with('success', 'Ürün başarıyla güncellendi.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Ürün güncellenirken bir hata oluştu: ' . $e->getMessage()]);
        }
    }

    /**
     * Ürün sil
     */
    public function destroy(Product $product)
    {
        $authResult = $this->authorize('delete');
        if ($authResult !== true) {
            return $authResult;
        }

        try {
            // Ürünün hizmetlerde kullanılıp kullanılmadığını kontrol et
            if ($product->services()->count() > 0) {
                return back()->withErrors(['error' => 'Bu ürün hizmetlerde kullanıldığı için silinemez.']);
            }

            $product->delete();

            return redirect()
                ->route('admin.products.index')
                ->with('success', 'Ürün başarıyla silindi.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Ürün silinirken bir hata oluştu: ' . $e->getMessage()]);
        }
    }
}
