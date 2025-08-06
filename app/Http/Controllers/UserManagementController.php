<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Traits\DataTableTrait;
use App\Traits\PermissionTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserManagementController extends Controller
{
    use DataTableTrait, PermissionTrait;

    public function __construct()
    {
        $this->initModule('user_management');
    }

    /**
     * Kullanıcıların listesini görüntüler.
     */
    public function index(Request $request)
    {
        $authResult = $this->authorize('view');
        if ($authResult !== true) {
            return $authResult;
        }

        $query = User::with(['roles']);

        // DataTable için aranabilir ve sıralanabilir sütunları tanımlayalım
        $searchableColumns = ['name', 'email', 'phone_number', 'roles.name'];
        $sortableColumns = ['id', 'name', 'email', 'phone_number', 'created_at', 'updated_at'];

        // DataTable trait'ini kullanarak verileri hazırlayalım
        $dataTable = $this->prepareDataTable(
            $query,
            $request,
            $searchableColumns,
            $sortableColumns
        );

        // Kullanıcıların rollerini config'deki görüntülenen isimlerle güncelliyoruz
        foreach ($dataTable['data'] as &$user) {
            foreach ($user->roles as &$role) {
                $configRoles = config('roles.roles');
                $role->display_name = isset($configRoles[$role->name]) ? $configRoles[$role->name]['name'] : $role->name;
            }
        }

        return Inertia::render('user-management/Index', [
            'users' => $dataTable['data'],
            'dataTableMeta' => $dataTable['meta'],
        ]);
    }

    /**
     * Yeni kullanıcı oluşturma formunu gösterir.
     */
    public function create()
    {
        $authResult = $this->authorize('create');
        if ($authResult !== true) {
            return $authResult;
        }

        $roles = Role::all()->map(function ($role) {
            $configRoles = config('roles.roles');
            $displayName = isset($configRoles[$role->name]) ? $configRoles[$role->name]['name'] : $role->name;

            return [
                'id' => $role->id,
                'name' => $displayName,
                'key' => $role->name
            ];
        });

        return Inertia::render('user-management/Create', [
            'roles' => $roles,
        ]);
    }

    /**
     * Yeni kullanıcı kaydeder.
     */
    public function store(Request $request)
    {
        $authResult = $this->authorize('create');
        if ($authResult !== true) {
            return $authResult;
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'phone_number' => 'nullable|string|max:20',
            'avatar' => 'nullable|image',
            'roles' => 'required|array',
            'roles.*' => 'exists:roles,id',
        ]);

        // Avatar yükleme işlemi
        $avatarPath = null;
        if ($request->hasFile('avatar')) {
            $avatarPath = $request->file('avatar')->store('avatars', 'public');
        }

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'phone_number' => $validated['phone_number'] ?? null,
            'avatar_path' => $avatarPath,
        ]);

        // Rolleri atama - ID'leri rol adlarına dönüştürüyoruz
        $roleNames = Role::whereIn('id', $request->roles)->pluck('name')->toArray();
        $user->syncRoles($roleNames);

        return redirect()
            ->route('user_management.index')
            ->with('success', 'Kullanıcı başarıyla oluşturuldu.');
    }

    /**
     * Kullanıcı detaylarını gösterir.
     */
    public function show(User $user)
    {
        $authResult = $this->authorize('view');
        if ($authResult !== true) {
            return $authResult;
        }
        $user->load(['roles']);
        // Rollerin görüntülenen isimlerini config'den alıyoruz
        $user->roles = $user->roles->map(function ($role) {
            $configRoles = config('roles.roles');
            $displayName = isset($configRoles[$role->name]) ? $configRoles[$role->name]['name'] : $role->name;
            return [
                'id' => $role->id,
                'name' => $role->name,
                'display_name' => $displayName,
                'key' => $role->name
            ];
        });

        return Inertia::render('user-management/Show', [
            'user' => $user,
        ]);
    }

    /**
     * Kullanıcı düzenleme formunu gösterir.
     */
    public function edit(User $user)
    {
        $authResult = $this->authorize('edit');
        if ($authResult !== true) {
            return $authResult;
        }

        $user->load(['roles']);

        $roles = Role::all()->map(function ($role) {
            $configRoles = config('roles.roles');
            $displayName = isset($configRoles[$role->name]) ? $configRoles[$role->name]['name'] : $role->name;

            return [
                'id' => $role->id,
                'name' => $displayName,
                'key' => $role->name
            ];
        });

        return Inertia::render('user-management/Edit', [
            'user' => $user,
            'roles' => $roles,
            'userRoles' => $user->roles->pluck('id'),
        ]);
    }

    /**
     * Kullanıcı bilgilerini günceller.
     */
    public function update(Request $request, User $user)
    {
        $authResult = $this->authorize('edit');
        if ($authResult !== true) {
            return $authResult;
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($user->id),
            ],
            'phone_number' => 'nullable|string|max:20',
            'avatar' => 'nullable|image',
            'roles' => 'required|array',
            'roles.*' => 'exists:roles,id',
            'password' => 'nullable|string|min:8',
        ]);

        // Avatar güncelleme işlemi
        if ($request->hasFile('avatar')) {
            // Eski avatar'ı silme
            if ($user->avatar_path) {
                Storage::disk('public')->delete($user->avatar_path);
            }

            $avatarPath = $request->file('avatar')->store('avatars', 'public');
            $user->avatar_path = $avatarPath;
        }

        $user->name = $validated['name'];
        $user->email = $validated['email'];
        $user->phone_number = $validated['phone_number'] ?? null;

        // Şifre güncelleme (opsiyonel)
        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        $user->save();

        // Rolleri güncelleme - ID'leri rol adlarına dönüştürüyoruz
        $roleNames = Role::whereIn('id', $request->roles)->pluck('name')->toArray();
        $user->syncRoles($roleNames);

        return redirect()
            ->route('user_management.index')
            ->with('success', 'Kullanıcı başarıyla güncellendi.');
    }

    /**
     * Kullanıcıyı siler.
     */
    public function destroy(User $user)
    {
        $authResult = $this->authorize('delete');
        if ($authResult !== true) {
            return $authResult;
        }

        // Süper admin kontrolü
        if ($user->hasRole('super_admin') && !auth()->user()->hasRole('super_admin')) {
            return redirect()
                ->route('user_management.index')
                ->with('error', 'Süper admin kullanıcılarını silme yetkiniz bulunmamaktadır.');
        }

        // Avatar'ı silme
        if ($user->avatar_path) {
            Storage::disk('public')->delete($user->avatar_path);
        }

        $user->delete();

        return redirect()
            ->route('user_management.index')
            ->with('success', 'Kullanıcı başarıyla silindi.');
    }

    /**
     * Kullanıcı rollerini yönetme sayfasını gösterir.
     */
    public function manageRoles()
    {
        $authResult = $this->authorize('manage_roles');
        if ($authResult !== true) {
            return $authResult;
        }

        $modules = config('roles.modules');
        $permissionLabels = [];

        // Tüm izinlerin görüntülenen isimlerini config'den al
        foreach ($modules as $module) {
            foreach ($module['permissions'] as $permKey => $permLabel) {
                $permissionLabels[$permKey] = $permLabel;
            }
        }

        $roles = Role::with('permissions')->get()->map(function ($role) use ($permissionLabels) {
            $configRoles = config('roles.roles');
            $displayName = isset($configRoles[$role->name]) ? $configRoles[$role->name]['name'] : $role->name;
            $description = isset($configRoles[$role->name]) ? $configRoles[$role->name]['description'] : '';

            // İzinleri görüntülenen isimlerle güncelle
            $permissions = $role->permissions->map(function ($permission) use ($permissionLabels) {
                return [
                    'id' => $permission->id,
                    'name' => $permission->name,
                    'display_name' => isset($permissionLabels[$permission->name]) ? $permissionLabels[$permission->name] : $permission->name
                ];
            });

            return [
                'id' => $role->id,
                'name' => $displayName,
                'key' => $role->name,
                'description' => $description,
                'permissions' => $permissions,
                'guard_name' => $role->guard_name,
                'created_at' => $role->created_at,
                'updated_at' => $role->updated_at
            ];
        });

        return Inertia::render('user-management/Roles', [
            'roles' => $roles,
        ]);
    }
}
