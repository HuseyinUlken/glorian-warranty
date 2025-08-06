<?php

namespace App\Console\Commands;

use App\Enums\ServiceStatusEnum;
use App\Models\Service;
use App\Notifications\ServiceStatusChangedNotification;
use Illuminate\Console\Command;

class TestServiceMailCommand extends Command
{
    protected $signature = 'test:service-mail {service_id} {status}';
    protected $description = 'Test service status change mail';

    public function handle()
    {
        $serviceId = $this->argument('service_id');
        $status = $this->argument('status');

        $service = Service::find($serviceId);

        if (!$service) {
            $this->error('Service bulunamadı!');
            return 1;
        }

        $oldStatus = $service->status;
        $newStatus = ServiceStatusEnum::from($status);

        $this->info("Service: {$service->service_code}");
        $this->info("Eski durum: {$oldStatus->label()}");
        $this->info("Yeni durum: {$newStatus->label()}");

        if ($service->customer && $service->customer->email) {
            $this->info("Müşteri email: {$service->customer->email}");
            $service->customer->notify(new ServiceStatusChangedNotification(
                $service,
                $oldStatus,
                $newStatus
            ));
            $this->info('Müşteriye mail gönderildi!');
        } else {
            $this->warn('Müşteri email adresi bulunamadı!');
        }

        if ($service->dealer && $service->dealer->email) {
            $this->info("Bayi email: {$service->dealer->email}");
            $service->dealer->notify(new ServiceStatusChangedNotification(
                $service,
                $oldStatus,
                $newStatus
            ));
            $this->info('Bayiye mail gönderildi!');
        } else {
            $this->warn('Bayi email adresi bulunamadı!');
        }

        return 0;
    }
}
