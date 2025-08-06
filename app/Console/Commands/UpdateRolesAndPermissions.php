<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UpdateRolesAndPermissions extends Command
{
    /**
     * Komutun adı ve imzası
     *
     * @var string
     */
    protected $signature = 'roles:update {--force : İzinleri sıfırlamak için}';

    /**
     * Komutun açıklaması
     *
     * @var string
     */
    protected $description = 'Rol ve izinleri config dosyasına göre günceller';

    /**
     * Komutu çalıştır
     */
    public function handle()
    {
        // İzinleri sıfırla (opsiyonel)
        if ($this->option('force')) {
            $this->info('İzinler sıfırlanıyor...');
            app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();
        }

        // Tüm izinleri oluştur
        $this->createPermissions();

        // Rolleri oluştur ve izinleri ata
        $this->createRolesWithPermissions();

        $this->info('Rol ve izinler başarıyla güncellendi!');

        return Command::SUCCESS;
    }

    /**
     * Tüm izinleri oluşturur
     */
    private function createPermissions(): void
    {
        $allPermissions = getAllPermissions();

        foreach ($allPermissions as $permission) {
            Permission::findOrCreate($permission);
        }

        $this->info(count($allPermissions) . ' izin başarıyla oluşturuldu.');
    }

    /**
     * Rolleri oluşturur ve izinleri atar
     */
    private function createRolesWithPermissions(): void
    {
        $roles = config('roles.roles');

        foreach ($roles as $roleKey => $roleData) {
            $role = Role::findOrCreate($roleKey);
            $role->syncPermissions(getRolePermissions($roleKey));

            $this->info($roleData['name'] . ' rolü ve izinleri başarıyla oluşturuldu/güncellendi.');
        }
    }
}
