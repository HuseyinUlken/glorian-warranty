<?php

namespace App\Console\Commands;

use App\Jobs\SendLiveLessonReminders;
use Illuminate\Console\Command;

class SendLiveLessonRemindersCommand extends Command
{
    protected $signature = 'live-lessons:send-reminders';

    protected $description = 'Canlı ders hatırlatmalarını gönder';

    public function handle(): int
    {
        $this->info('Canlı ders hatırlatmaları gönderiliyor...');

        try {
            SendLiveLessonReminders::dispatch();

            $this->info("Hatırlatma job'ı başarıyla dispatch edildi.");
            return self::SUCCESS;
        } catch (\Exception $e) {
            $this->error('Hatırlatma gönderilirken hata: ' . $e->getMessage());
            return self::FAILURE;
        }
    }
}
