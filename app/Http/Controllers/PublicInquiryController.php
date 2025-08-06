<?php

namespace App\Http\Controllers;

use App\Http\Resources\Public\ServiceInquiryResource;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicInquiryController extends Controller
{
    /**
     * Garanti sorgulama sayfasını göster
     */
    public function index()
    {
        return Inertia::render('warranty/Check');
    }

    /**
     * 16 haneli kod ile garanti sorgula
     */
    public function check(Request $request)
    {
        $request->validate([
            'service_code' => 'required|string|size:16|regex:/^[A-Z0-9]{16}$/',
        ], [
            'service_code.required' => 'Hizmet kodu zorunludur.',
            'service_code.size' => 'Hizmet kodu 16 karakter olmalıdır.',
            'service_code.regex' => 'Hizmet kodu sadece büyük harf ve rakam içerebilir.',
        ]);

        $service = Service::with([
            'dealer.user',
            'customer',
            'appliedProducts',
            'notes.user'
        ])
            ->where('service_code', strtoupper($request->service_code))
            ->first();

        if (!$service) {
            return back()->withErrors([
                'service_code' => 'Bu hizmet kodu ile kayıt bulunamadı.'
            ]);
        }

        return Inertia::render('warranty/Result', [
            'service' => new ServiceInquiryResource($service),
        ]);
    }

    /**
     * API endpoint - Garanti sorgulama (JSON response)
     */
    public function apiCheck(Request $request)
    {
        $request->validate([
            'service_code' => 'required|string|size:16|regex:/^[A-Z0-9]{16}$/',
        ]);

        $service = Service::with([
            'dealer.user',
            'customer',
            'appliedProducts',
        ])
            ->where('service_code', strtoupper($request->service_code))
            ->first();

        if (!$service) {
            return response()->json([
                'success' => false,
                'message' => 'Bu hizmet kodu ile kayıt bulunamadı.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => new ServiceInquiryResource($service),
        ]);
    }
}
