<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PasswordChangedMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * E-posta başlığı
     *
     * @var string
     */
    public $title;

    /**
     * E-posta açıklaması
     *
     * @var string
     */
    public $description;

    /**
     * Değişiklik zamanı
     *
     * @var string
     */
    public $changedAt;

    /**
     * Kullanıcı IP adresi
     *
     * @var string|null
     */
    public $ipAddress;

    /**
     * Create a new message instance.
     */
    public function __construct(string $title, string $description, array $details = null, ?string $url = null)
    {
        $this->title = $title;
        $this->description = $description;
        $this->changedAt = $details['changedAt'] ?? now()->format('d.m.Y H:i:s');
        $this->ipAddress = $details['ipAddress'] ?? null;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Şifre Değişikliği Bildirimi',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.password-changed',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
