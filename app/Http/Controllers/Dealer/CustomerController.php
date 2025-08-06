<?php

namespace App\Http\Controllers\Dealer;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Telefon numarasına göre müşteri ara
     */
    public function searchByPhone(Request $request)
    {
        $phone = $request->input('phone');

        if (!$phone) {
            return response()->json(['customer' => null]);
        }

        $customer = Customer::where('phone', $phone)->first();

        if ($customer) {
            return response()->json([
                'customer' => [
                    'id' => $customer->id,
                    'first_name' => $customer->first_name,
                    'last_name' => $customer->last_name,
                    'email' => $customer->email,
                    'address' => $customer->address,
                    'city' => $customer->city,
                    'district' => $customer->district,
                    'full_name' => $customer->full_name,
                ]
            ]);
        }

        return response()->json(['customer' => null]);
    }
}
