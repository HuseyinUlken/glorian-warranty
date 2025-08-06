<?php

namespace Database\Seeders;

use App\Helpers\PermissionHelper;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // İzinleri sıfırla
        // app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Tüm izinleri oluştur
        $this->createPermissions();

        // Rolleri oluştur ve izinleri ata
        $this->createRolesWithPermissions();
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

        $this->command->info(count($allPermissions) . ' izin başarıyla oluşturuldu.');
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

            $this->command->info($roleData['name'] . ' rolü ve izinleri başarıyla oluşturuldu.');
        }
    }
}
