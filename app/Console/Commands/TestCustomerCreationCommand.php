<?php

namespace App\Console\Commands;

use App\Enums\CustomerStatusEnum;
use App\Models\Customer;
use Illuminate\Console\Command;

class TestCustomerCreationCommand extends Command
{
    protected $signature = 'test:customer-creation';
    protected $description = 'Test customer creation logic';

    public function handle()
    {
        $this->info('Müşteri oluşturma testi başlıyor...');

        // Test 1: Yeni müşteri oluştur
        $this->info('Test 1: Yeni müşteri oluştur');
        $customer1 = Customer::firstOrCreate(
            [
                'phone' => '0555 111 11 11',
                'first_name' => 'Ahmet',
                'last_name' => 'Yılmaz',
            ],
            [
                'email' => 'ahmet@test.com',
                'address' => 'Test Adres 1',
                'city' => 'İstanbul',
                'district' => 'Kadıköy',
                'status' => CustomerStatusEnum::ACTIVE,
            ]
        );

        $this->info("Müşteri 1 ID: {$customer1->id}");
        $this->info("Müşteri 1 Adı: {$customer1->full_name}");
        $this->info("Müşteri 1 Telefon: {$customer1->phone}");

        // Test 2: Aynı bilgilerle tekrar oluştur (var olanı bulmalı)
        $this->info('Test 2: Aynı bilgilerle tekrar oluştur');
        $customer2 = Customer::firstOrCreate(
            [
                'phone' => '0555 111 11 11',
                'first_name' => 'Ahmet',
                'last_name' => 'Yılmaz',
            ],
            [
                'email' => 'ahmet@test.com',
                'address' => 'Test Adres 1',
                'city' => 'İstanbul',
                'district' => 'Kadıköy',
                'status' => CustomerStatusEnum::ACTIVE,
            ]
        );

        $this->info("Müşteri 2 ID: {$customer2->id}");
        $this->info('Aynı müşteri mi? ' . ($customer1->id === $customer2->id ? 'Evet' : 'Hayır'));

        // Test 3: Farklı ad-soyad, aynı telefon (hata vermeli)
        $this->info('Test 3: Farklı ad-soyad, aynı telefon (hata testi)');
        try {
            $customer3 = Customer::create([
                'phone' => '0555 111 11 11',
                'first_name' => 'Mehmet',
                'last_name' => 'Demir',
                'email' => 'mehmet@test.com',
                'address' => 'Test Adres 2',
                'city' => 'İstanbul',
                'district' => 'Beşiktaş',
                'status' => CustomerStatusEnum::ACTIVE,
            ]);
            $this->error('Hata: Aynı telefon numarası ile yeni müşteri oluşturuldu!');
        } catch (\Exception $e) {
            $this->info('Başarılı: Aynı telefon numarası ile yeni müşteri oluşturulamadı.');
        }

        // Test 4: Aynı ad-soyad, farklı telefon
        $this->info('Test 4: Aynı ad-soyad, farklı telefon');
        $customer4 = Customer::firstOrCreate(
            ['phone' => '0555 222 22 22'],
            [
                'first_name' => 'Ahmet',
                'last_name' => 'Yılmaz',
                'email' => 'ahmet2@test.com',
                'address' => 'Test Adres 3',
                'city' => 'İstanbul',
                'district' => 'Üsküdar',
                'status' => CustomerStatusEnum::ACTIVE,
            ]
        );

        $this->info("Müşteri 4 ID: {$customer4->id}");
        $this->info("Müşteri 4 Adı: {$customer4->full_name}");

        $this->info('Test tamamlandı!');
        return 0;
    }
}
