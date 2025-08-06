<?php

namespace App\Exports;

use App\Enums\CustomerRating;
use App\Models\Customer;
use App\Models\CustomerActivity;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithTitle;

class CustomersPerRatingSheetExport implements FromQuery, WithHeadings, WithMapping, ShouldAutoSize, WithTitle
{
    protected ?int $representativeId;
    protected ?string $rating;

    public function __construct(?int $representativeId, ?string $rating)
    {
        $this->representativeId = $representativeId;
        $this->rating = $rating;
    }

    public function query()
    {
        $query = Customer::query()
            ->with('representative')
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
            ->orderByDesc('customers.created_at');

        if ($this->representativeId) {
            $query->where('customer_representative_id', $this->representativeId);
        }

        if ($this->rating) {
            $query->where('rating', $this->rating);
        }

        return $query;
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
            'Temsilci',
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
            $customer->representative ? $customer->representative->name : 'Atanmamış',
            $customer->last_activity_at ? \Carbon\Carbon::parse($customer->last_activity_at)->format('d.m.Y H:i:s') : 'Aktivite Yok',
        ];
    }

    public function title(): string
    {
        if ($this->rating === null) {
            return 'Tümü';
        }

        return CustomerRating::from($this->rating)->label();
    }
}
