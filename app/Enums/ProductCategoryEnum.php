<?php

namespace App\Enums;

enum ProductCategoryEnum: string
{
    case PPF = 'PPF';
    case CAM_FILMI = 'CAM_FILMI';

    public function label(): string
    {
        return match ($this) {
            self::PPF => 'PPF (Boya Koruma Filmi)',
            self::CAM_FILMI => 'Cam Filmi',
        };
    }

    public function description(): string
    {
        return match ($this) {
            self::PPF => 'Araç boyasını korumak için kullanılan şeffaf film',
            self::CAM_FILMI => 'Araç camlarını korumak için kullanılan film',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::PPF => 'blue',
            self::CAM_FILMI => 'green',
        };
    }

    public static function options(): array
    {
        return collect(self::cases())->map(function ($case) {
            return [
                'value' => $case->value,
                'label' => $case->label(),
                'description' => $case->description(),
            ];
        })->toArray();
    }
}
