<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Carbon;

class VerifyEmailNotification extends VerifyEmail implements ShouldQueue
{
    use Queueable;

    /**
     * E-posta doğrulama URL'sini oluştur
     *
     * @param  mixed  $notifiable
     * @return string
     */
    protected function verificationUrl($notifiable)
    {
        if (static::$createUrlCallback) {
            return call_user_func(static::$createUrlCallback, $notifiable);
        }

        // Uygulama URL'sini al
        $appUrl = config('app.url');
        $appHost = parse_url($appUrl, PHP_URL_HOST);

        // İmzalı URL oluştur
        $signedUrl = URL::temporarySignedRoute(
            'verification.verify',
            Carbon::now()->addMinutes(Config::get('auth.verification.expire', 60)),
            [
                'id' => $notifiable->getKey(),
                'hash' => sha1($notifiable->getEmailForVerification()),
            ],
            true  // absolute URL kullanımını zorunlu kıl
        );

        // URL'nin doğru host ile oluşturulduğundan emin ol
        // Bazen Laravel URL oluştururken yanlış host kullanabilir
        if (parse_url($signedUrl, PHP_URL_HOST) !== $appHost) {
            // URL'yi doğru host ile yeniden oluştur
            $urlParts = parse_url($signedUrl);
            $scheme = $urlParts['scheme'] ?? 'https';
            $path = $urlParts['path'] ?? '';
            $query = isset($urlParts['query']) ? '?' . $urlParts['query'] : '';

            return $scheme . '://' . $appHost . $path . $query;
        }

        return $signedUrl;
    }

    /**
     * E-posta bildirimini oluştur
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $verificationUrl = $this->verificationUrl($notifiable);

        return (new MailMessage)
            ->subject('E-posta Adresinizi Doğrulayın')
            ->view('emails.verify-email', ['url' => $verificationUrl]);
    }
}
