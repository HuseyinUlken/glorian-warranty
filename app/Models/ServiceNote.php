<?php

namespace App\Models;

use App\Enums\ServiceNoteTypeEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class ServiceNote extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_id',
        'user_id',
        'content',
        'type',
    ];

    protected $casts = [
        'type' => ServiceNoteTypeEnum::class,
    ];

    /**
     * Notun ait olduğu hizmet
     */
    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    /**
     * Notu ekleyen kullanıcı
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
