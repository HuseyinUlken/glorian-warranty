<?php

namespace App\Notifications;

use App\Enums\ServiceStatusEnum;
use App\Models\Service;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ServiceStatusChangedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Service $service,
        public ServiceStatusEnum $oldStatus,
        public ServiceStatusEnum $newStatus
    ) {}

    public function via($notifiable): array
    {
        return ['mail'];
    }

    public function toMail($notifiable): MailMessage
    {
        $data = $this->getMailData();

        return (new MailMessage)
            ->subject($data['title'])
            ->view('emails.service-status-changed', [
                'service' => $this->service,
                'title' => $data['title'],
                'mainText' => $data['mainText'],
                'content' => $data['content'],
                'buttonText' => $data['buttonText'] ?? null,
                'buttonUrl' => $data['buttonUrl'] ?? null,
            ]);
    }

    private function getMailData(): array
    {
        $oldStatus = $this->oldStatus;
        $newStatus = $this->newStatus;

        return match ($newStatus) {
            ServiceStatusEnum::PENDING => [
                'title' => 'Hizmet Kaydınız Oluşturuldu',
                'mainText' => 'Merhaba Sayın Müşterimiz,',
                'content' => 'Araç kaydınız başarıyla oluşturulmuştur. Hizmet sürecimiz başlamıştır ve en kısa sürede sizinle iletişime geçeceğiz.',
                'buttonText' => 'Detayları Görüntüle',
                'buttonUrl' => url('/dealer/services/' . $this->service->id),
            ],
            ServiceStatusEnum::ACTIVE => [
                'title' => 'Hizmetiniz Başlatıldı',
                'mainText' => 'Tebrikler!',
                'content' => 'Hizmetiniz başarıyla başlatılmıştır. Garanti süreniz artık aktif ve aracınız maksimum koruma altında.',
                'buttonText' => 'Garanti Belgesini İndir',
                'buttonUrl' => url('/dealer/services/' . $this->service->id),
            ],
            ServiceStatusEnum::EXPIRED => [
                'title' => 'Garanti Süreniz Doldu',
                'mainText' => 'Önemli Bilgilendirme!',
                'content' => 'Garanti süreniz dolmuştur. Hizmet sürenizi uzatmak veya yenileme yapmak için bizimle iletişime geçebilirsiniz.',
                'buttonText' => 'Hizmeti Yenile',
                'buttonUrl' => url('/dealer/services/' . $this->service->id . '/edit'),
            ],
            default => [
                'title' => 'Hizmet Durumu Güncellendi',
                'mainText' => 'Merhaba Sayın Müşterimiz,',
                'content' => 'Hizmet durumunuz güncellenmiştir. Detayları aşağıda bulabilirsiniz.',
                'buttonText' => 'Detayları Görüntüle',
                'buttonUrl' => url('/dealer/services/' . $this->service->id),
            ],
        };
    }

    public function toArray($notifiable): array
    {
        return [
            'service_id' => $this->service->id,
            'old_status' => $this->oldStatus->value,
            'new_status' => $this->newStatus->value,
            'service_code' => $this->service->service_code,
        ];
    }
}
