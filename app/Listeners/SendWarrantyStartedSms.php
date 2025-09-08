<?php

namespace App\Listeners;

use App\Events\WarrantyStarted;
use App\Services\VatanSmsService;
use Illuminate\Support\Facades\Log;

class SendWarrantyStartedSms
{

    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(WarrantyStarted $event): void
    {
        $service = $event->service;
        $customer = $service->customer;
        $dealer = $service->dealer;

        // Müşteriye garanti başlatıldı SMS'i gönder
        if ($customer && $customer->phone) {
            $this->sendCustomerSms($service, $customer);
        }

        // Bayiye bilgilendirme SMS'i gönder (isteğe bağlı)
        if ($dealer && $dealer->phone) {
            $this->sendDealerSms($service, $dealer, $customer);
        }
    }

    /**
     * Müşteriye garanti başlatıldı SMS'i gönder
     */
    private function sendCustomerSms($service, $customer): void
    {
        try {
            // Garanti detay sayfasının URL'ini oluştur
            $warrantyUrl = url("/warranty/{$service->service_code}");
            
            // URL'yi kısalt
            $shortUrl = VatanSmsService::shortenUrl($warrantyUrl);
            if (!$shortUrl) {
                $shortUrl = $warrantyUrl; // Kısaltma başarısızsa orijinal URL'yi kullan
            }

            // SMS mesajını oluştur
            $message = $this->buildCustomerMessage($service, $customer, $shortUrl);

            // SMS gönder
            $result = VatanSmsService::sendSingleSms(
                $customer->phone,
                $message,
                'turkce',
                'bilgi'
            );

            // Log kaydet
            Log::info("Müşteri garanti başlatıldı SMS'i gönderildi", [
                'customer_phone' => $customer->phone,
                'service_code' => $service->service_code,
                'vehicle' => $service->vehicle_full_name,
                'warranty_end_date' => $service->warranty_end_date?->format('d.m.Y'),
                'short_url' => $shortUrl,
                'sms_result' => $result,
            ]);

        } catch (\Exception $e) {
            Log::error("Müşteri SMS gönderiminde hata", [
                'customer_phone' => $customer->phone,
                'service_code' => $service->service_code,
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Bayiye bilgilendirme SMS'i gönder
     */
    private function sendDealerSms($service, $dealer, $customer): void
    {
        try {
            // SMS mesajını oluştur
            $message = $this->buildDealerMessage($service, $dealer, $customer);

            // SMS gönder
            $result = VatanSmsService::sendSingleSms(
                $dealer->phone,
                $message,
                'turkce',
                'bilgi'
            );

            // Log kaydet
            Log::info("Bayi bilgilendirme SMS'i gönderildi", [
                'dealer_phone' => $dealer->phone,
                'service_code' => $service->service_code,
                'customer_name' => $customer->full_name ?? 'Bilinmeyen',
                'sms_result' => $result,
            ]);

        } catch (\Exception $e) {
            Log::error("Bayi SMS gönderiminde hata", [
                'dealer_phone' => $dealer->phone,
                'service_code' => $service->service_code,
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Müşteri SMS mesajını oluştur
     */
    private function buildCustomerMessage($service, $customer, string $shortUrl): string
    {
        $customerName = $customer->full_name ?? 'Değerli Müşterimiz';
        $vehicleName = $service->vehicle_full_name;
        $serviceCode = $service->service_code;
        $warrantyEndDate = $service->warranty_end_date?->format('d.m.Y') ?? 'Belirlenmedi';

        return "Merhaba {$customerName},\n\n" .
               "{$vehicleName} aracınız için Glorian garanti koruması başlatılmıştır.\n\n" .
               "Garanti Kodu: {$serviceCode}\n" .
               "Garanti Bitiş: {$warrantyEndDate}\n\n" .
               "Garanti detaylarınızı görüntülemek için: {$shortUrl}\n\n" .
               "Glorian ile aracınız güvende!\n" .
               "Glorian Garanti Sistemi";
    }

    /**
     * Bayi SMS mesajını oluştur
     */
    private function buildDealerMessage($service, $dealer, $customer): string
    {
        $customerName = $customer->full_name ?? 'Bilinmeyen';
        $vehicleName = $service->vehicle_full_name;
        $serviceCode = $service->service_code;
        $dealerName = $dealer->name;

        return "Merhaba {$dealerName},\n\n" .
               "Garanti başlatma işlemi tamamlandı:\n\n" .
               "Müşteri: {$customerName}\n" .
               "Araç: {$vehicleName}\n" .
               "Kod: {$serviceCode}\n\n" .
               "Müşteriye bilgilendirme SMS'i gönderilmiştir.\n\n" .
               "Glorian Bayi Paneli";
    }

}

