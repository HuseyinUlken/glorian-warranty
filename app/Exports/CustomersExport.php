<?php

namespace App\Exports;

use App\Enums\CustomerRating;
use App\Models\Customer;
use App\Models\CustomerActivity;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class CustomersExport implements WithMultipleSheets
{
    use Exportable;

    protected ?int $representativeId;

    public function __construct(?int $representativeId)
    {
        $this->representativeId = $representativeId;
    }

    /**
     * @return array
     */
    public function sheets(): array
    {
        $sheets = [];

        // "Tümü" sayfası her zaman ilk sırada olacak
        $sheets[] = new CustomersPerRatingSheetExport($this->representativeId, null);

        // Her bir rating durumu için ayrı bir sayfa oluştur
        foreach (CustomerRating::cases() as $rating) {
            $sheets[] = new CustomersPerRatingSheetExport($this->representativeId, $rating->value);
        }

        return $sheets;
    }

    public function query()
    {
        // Get customers for the specific representative, ordered by their last activity date.
        return Customer::query()
            ->with('representative')
            ->where('customer_representative_id', $this->representativeId)
            ->select('customers.*', 'latest_activity.last_activity_at')
            ->leftJoinSub(
                CustomerActivity::select('customer_id', DB::raw('MAX(created_at) as last_activity_at'))
                    ->groupBy('customer_id'),
                'latest_activity',
                'latest_activity.customer_id',
                '=',
                'customers.id'
            )
            ->orderByDesc('latest_activity.last_activity_at')
            ->orderByDesc('customers.created_at');  // Secondary sort
    }

    public function headings(): array
    {
        return [
            'ID',
            'Adı Soyadı',
            'E-posta',
            'Telefon',
            'Değerlendirme',
            'Durum',
            'Müşteri Tipi',
            'Kayıt Tipi',
            'Son Aktivite Tarihi',
        ];
    }

    public function map($customer): array
    {
        return [
            $customer->id,
            $customer->name,
            $customer->email,
            $customer->phone,
            $customer->rating ? $customer->rating->label() : '',
            $customer->status ? $customer->status->label() : '',
            $customer->customer_type ? $customer->customer_type->label() : '',
            $customer->register_type ? $customer->register_type->label() : '',
            $customer->last_activity_at ? \Carbon\Carbon::parse($customer->last_activity_at)->format('d.m.Y H:i:s') : 'Aktivite Yok',
        ];
    }
}
