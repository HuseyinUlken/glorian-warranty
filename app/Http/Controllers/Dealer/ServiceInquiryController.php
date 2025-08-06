<?php

namespace App\Http\Controllers\Dealer;

use App\Http\Controllers\Controller;
use App\Http\Resources\Dealer\ServiceResource;
use App\Models\Service;
use App\Traits\DataTableTrait;
use App\Traits\PermissionTrait;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceInquiryController extends Controller
{
    use DataTableTrait, PermissionTrait;

    public function __construct()
    {
        $this->initModule('service');
    }

    /**
     * Hizmet sorgu sayfasını göster
     */
    public function index()
    {
        $authResult = $this->authorize('view_own');
        if ($authResult !== true) {
            return $authResult;
        }

        return Inertia::render('dealer/service-inquiry/Index');
    }

    /**
     * Hizmet koduna göre sorgula
     */
    public function search(Request $request)
    {
        $authResult = $this->authorize('view_own');
        if ($authResult !== true) {
            return $authResult;
        }

        $request->validate([
            'service_code' => 'required|string|size:16|regex:/^[A-Z0-9]{16}$/',
        ], [
            'service_code.required' => 'Hizmet kodu zorunludur.',
            'service_code.size' => 'Hizmet kodu 16 karakter olmalıdır.',
            'service_code.regex' => 'Hizmet kodu sadece büyük harf ve rakam içerebilir.',
        ]);

        $dealer = auth()->user()->dealer;

        if (!$dealer) {
            return back()->withErrors(['error' => 'Bayi bilgileriniz bulunamadı.']);
        }

        $service = Service::with([
            'dealer.user',
            'customer',
            'appliedProducts',
            'notes.user'
        ])
            ->where('service_code', strtoupper($request->service_code))
            ->first();

        if (!$service) {
            return redirect()->route('dealer.service-inquiry.index')->withErrors([
                'service_code' => 'Bu hizmet kodu ile kayıt bulunamadı.'
            ]);
        }

        // Bayinin sadece kendi hizmetlerini görebilmesini sağla
        if ($service->dealer_id !== $dealer->id) {
            return redirect()->route('dealer.service-inquiry.index')->withErrors([
                'service_code' => 'Bu hizmet size ait değil.'
            ]);
        }

        return Inertia::render('dealer/service-inquiry/Result', [
            'service' => (new ServiceResource($service))->resolve(),
        ]);
    }

    /**
     * API endpoint - Hizmet sorgulama (JSON response)
     */
    public function apiSearch(Request $request)
    {
        $authResult = $this->authorize('view_own');
        if ($authResult !== true) {
            return response()->json([
                'success' => false,
                'message' => 'Yetkiniz bulunmamaktadır.'
            ], 403);
        }

        $request->validate([
            'service_code' => 'required|string|size:16|regex:/^[A-Z0-9]{16}$/',
        ]);

        $dealer = auth()->user()->dealer;

        if (!$dealer) {
            return response()->json([
                'success' => false,
                'message' => 'Bayi bilgileriniz bulunamadı.'
            ], 400);
        }

        $service = Service::with([
            'dealer.user',
            'customer',
            'appliedProducts',
            'notes.user'
        ])
            ->where('service_code', strtoupper($request->service_code))
            ->first();

        if (!$service) {
            return response()->json([
                'success' => false,
                'message' => 'Bu hizmet kodu ile kayıt bulunamadı.'
            ], 404);
        }

        // Bayinin sadece kendi hizmetlerini görebilmesini sağla
        if ($service->dealer_id !== $dealer->id) {
            return response()->json([
                'success' => false,
                'message' => 'Bu hizmet size ait değil.'
            ], 403);
        }

        return response()->json([
            'success' => true,
            'data' => (new ServiceResource($service))->resolve(),
        ]);
    }

    /**
     * Hizmete not ekle
     */
    public function addNote(Request $request, Service $service)
    {
        $authResult = $this->authorize('add_note');
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

        return redirect()->back()->with('success', 'Not başarıyla eklendi.');
    }
}
