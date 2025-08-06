<?php

namespace App\Enums;

enum ServiceStatusEnum: string
{
    case PENDING = 'PENDING';
    case ACTIVE = 'ACTIVE';
    case EXPIRED = 'EXPIRED';
    case CANCELLED = 'CANCELLED';

    public function label(): string
    {
        return match ($this) {
            self::PENDING => 'Beklemede',
            self::ACTIVE => 'Aktif Garanti',
            self::EXPIRED => 'Süresi Dolmuş',
            self::CANCELLED => 'İptal Edilmiş',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::PENDING => 'yellow',
            self::ACTIVE => 'green',
            self::EXPIRED => 'red',
            self::CANCELLED => 'gray',
        };
    }

    public function description(): string
    {
        return match ($this) {
            self::PENDING => 'Garanti henüz başlatılmamış',
            self::ACTIVE => 'Garanti aktif ve geçerli',
            self::EXPIRED => 'Garanti süresi dolmuş',
            self::CANCELLED => 'Garanti iptal edilmiş',
        };
    }

    public static function options(): array
    {
        return collect(self::cases())->map(function ($case) {
            return [
                'value' => $case->value,
                'label' => $case->label(),
                'color' => $case->color(),
                'description' => $case->description(),
            ];
        })->toArray();
    }
}
