<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    /**
     * Toplu atanabilir alanlar
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'title',
        'content',
        'module',
        'event',
        'is_read',
        'is_sent',
        'read_at',
        'sent_at'
    ];

    /**
     * Cast edilecek alanlar
     *
     * @var array
     */
    protected $casts = [
        'is_read' => 'boolean',
        'is_sent' => 'boolean',
        'read_at' => 'datetime',
        'sent_at' => 'datetime',
    ];

    /**
     * Bu bildirimin sahibi olan kullanıcı
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Okunmamış bildirimleri getir
     */
    public function scopeUnread(Builder $query): Builder
    {
        return $query->where('is_read', false);
    }

    /**
     * Okunmuş bildirimleri getir
     */
    public function scopeRead(Builder $query): Builder
    {
        return $query->where('is_read', true);
    }

    /**
     * Gönderilmiş bildirimleri getir
     */
    public function scopeSent(Builder $query): Builder
    {
        return $query->where('is_sent', true);
    }

    /**
     * Gönderilmemiş bildirimleri getir
     */
    public function scopeUnsent(Builder $query): Builder
    {
        return $query->where('is_sent', false);
    }

    /**
     * Bildirimi okundu olarak işaretle
     */
    public function markAsRead(): bool
    {
        return $this->update([
            'is_read' => true,
            'read_at' => now(),
        ]);
    }

    /**
     * Bildirimi gönderildi olarak işaretle
     */
    public function markAsSent(): bool
    {
        return $this->update([
            'is_sent' => true,
            'sent_at' => now(),
        ]);
    }
}
