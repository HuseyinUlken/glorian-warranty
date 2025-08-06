<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class SendTestMailCommand extends Command
{
    protected $signature = 'mail:test {email}';
    protected $description = 'Test mail gönder';

    public function handle()
    {
        $email = $this->argument('email');

        $this->info("Test mail gönderiliyor: {$email}");

        try {
            Mail::send('emails.test-mail', [], function ($message) use ($email) {
                $message
                    ->to($email)
                    ->subject('Glorian - Test Mail');
            });

            $this->info('Test mail başarıyla gönderildi!');
            return 0;
        } catch (\Exception $e) {
            $this->error('Mail gönderilirken hata oluştu: ' . $e->getMessage());
            return 1;
        }
    }
}
