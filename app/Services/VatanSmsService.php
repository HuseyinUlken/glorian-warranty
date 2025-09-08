<?php

namespace App\Services;

use Exception;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;


class VatanSmsService
{
    protected static $apiId;
    protected static $apiKey;
    protected static $sender;
    protected static $endpoint;
    protected static $single = false;

    public static function init(): void
    {
        if (env("VATAN_SMS_API_INSTALLED") == 1) {
            self::$apiId = env('VATAN_SMS_API_ID');
            self::$apiKey = env('VATAN_SMS_API_KEY');
            self::$sender = env('VATAN_SMS_SENDER');
            self::$endpoint = 'https://api.vatansms.net/api/v1';
        }
    }

    public static function formatPhoneNumber(string $phone): ?string
    {
        $phone = preg_replace('/[^0-9]/', '', $phone);
        $phone = substr($phone, -10);
        return (substr($phone, 0, 1) === '5') ? $phone : null;
    }

    public static function filterAndFormatPhones(array $phones): array
    {
        $formattedPhones = [];
        $invalidPhones = [];

        foreach ($phones as $phone) {
            $formattedPhone = self::formatPhoneNumber($phone);
            if ($formattedPhone) {
                $formattedPhones[] = $formattedPhone;
            } else {
                $invalidPhones[] = $phone;
            }
        }

        return [$formattedPhones, $invalidPhones];
    }

    public static function sendSms(array $phones, string $message, string $messageType = 'turkce', string $messageContentType = 'bilgi')
    {
        if (env("VATAN_SMS_API_INSTALLED") != 1) return;
        self::init();
        list($formattedPhones, $invalidPhones) = self::filterAndFormatPhones($phones);

        if (empty($formattedPhones)) {
            return [
                'success' => false,
                'message' => 'Geçerli telefon numarası bulunamadı.',
                'invalidPhones' => $invalidPhones
            ];
        }

        $params = [
            'api_id' => self::$apiId,
            'api_key' => self::$apiKey,
            'sender' => self::$sender,
            'message_type' => $messageType,
            'message' => $message,
            'message_content_type' => $messageContentType,
            'phones' => $formattedPhones
        ];

        $response = Http::withHeaders([
            'Content-Type' => 'application/json'
        ])->post(self::$endpoint . '/1toN', $params);

        $transaction = [
            'success' => $response->successful(),
            'response' => $response->json(),
            'invalidPhones' => $invalidPhones
        ];
        Log::channel("sms")->info('VatanSmsService: ' . json_encode($transaction));
        return $transaction;
    }

    public static function sendSingleSms(string $phone, string $message, string $messageType = 'normal', string $messageContentType = 'bilgi')
    {
        if (env("VATAN_SMS_API_INSTALLED") != 1) return;
        self::init();
        $formattedPhone = self::formatPhoneNumber($phone);

        if (!$formattedPhone) {
            return [
                'success' => false,
                'message' => 'Geçerli telefon numarası bulunamadı.',
                'invalidPhones' => [$phone]
            ];
        }
        self::$single = true;
        $transaction = self::sendSms([$formattedPhone], $message, $messageType, $messageContentType);
        return $transaction;
    }

    public static function getSenderNames()
    {
        if (env("VATAN_SMS_API_INSTALLED") != 1) return;
        self::init();
        $params = [
            'api_id' => self::$apiId,
            'api_key' => self::$apiKey,
        ];

        $response = Http::withHeaders([
            'Content-Type' => 'application/json'
        ])->post(self::$endpoint . '/senders', $params);

        return $response->json();
    }

    public static function getUserInfo()
    {
        if (env("VATAN_SMS_API_INSTALLED") != 1) return;
        self::init();
        $params = [
            'api_id' => self::$apiId,
            'api_key' => self::$apiKey,
        ];

        $response = Http::withHeaders([
            'Content-Type' => 'application/json'
        ])->post(self::$endpoint . '/user/information', $params);

        return $response->json();
    }

    public static function getReportDetail(int $reportId, int $page = 1, int $pageSize = 20)
    {
        if (env("VATAN_SMS_API_INSTALLED") != 1) return;
        self::init();
        $params = [
            'api_id' => self::$apiId,
            'api_key' => self::$apiKey,
            'report_id' => $reportId
        ];

        $response = Http::withHeaders([
            'Content-Type' => 'application/json'
        ])->post(self::$endpoint . "/report/detail?page={$page}&pageSize={$pageSize}", $params);

        return $response->json();
    }

    public static function getReportBetweenDates(string $startDate, string $endDate)
    {
        if (env("VATAN_SMS_API_INSTALLED") != 1) return;
        self::init();
        $params = [
            'api_id' => self::$apiId,
            'api_key' => self::$apiKey,
            'start_date' => $startDate,
            'end_date' => $endDate
        ];

        $response = Http::withHeaders([
            'Content-Type' => 'application/json'
        ])->post(self::$endpoint . '/report/between', $params);

        return $response->json();
    }

    public static function getSingleReport(int $reportId)
    {
        if (env("VATAN_SMS_API_INSTALLED") != 1) return;
        self::init();
        $params = [
            'api_id' => self::$apiId,
            'api_key' => self::$apiKey,
            'report_id' => $reportId
        ];

        $response = Http::withHeaders([
            'Content-Type' => 'application/json'
        ])->post(self::$endpoint . '/report/single', $params);

        return $response->json();
    }

    public static function cancelFutureSms(int $reportId)
    {
        if (env("VATAN_SMS_API_INSTALLED") != 1) return;
        self::init();
        $params = [
            'api_id' => self::$apiId,
            'api_key' => self::$apiKey,
            'id' => $reportId
        ];

        $response = Http::withHeaders([
            'Content-Type' => 'application/json'
        ])->post(self::$endpoint . '/cancel/future-sms', $params);

        return $response->json();
    }

    public static function shortenUrl($url): bool|string
    {
        $requestUrl = "https://is.gd/create.php?format=simple&url=" . urlencode($url);
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $requestUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        if (curl_errno($ch) || $httpCode != 200) {
            curl_close($ch);
            return false;
        }

        curl_close($ch);
        return $response;
    }
}
