<?php

namespace App\Enums;

enum ServiceNoteTypeEnum: string
{
    case INFO = 'INFO';
    case WARNING = 'WARNING';
    case ERROR = 'ERROR';
    case SUCCESS = 'SUCCESS';

    public function label(): string
    {
        return match ($this) {
            self::INFO => 'Bilgi',
            self::WARNING => 'Uyarı',
            self::ERROR => 'Hata',
            self::SUCCESS => 'Başarılı',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::INFO => 'blue',
            self::WARNING => 'yellow',
            self::ERROR => 'red',
            self::SUCCESS => 'green',
        };
    }

    public function icon(): string
    {
        return match ($this) {
            self::INFO => 'info',
            self::WARNING => 'alert-triangle',
            self::ERROR => 'x-circle',
            self::SUCCESS => 'check-circle',
        };
    }

    public static function options(): array
    {
        return collect(self::cases())->map(function ($case) {
            return [
                'value' => $case->value,
                'label' => $case->label(),
                'color' => $case->color(),
                'icon' => $case->icon(),
            ];
        })->toArray();
    }
}
