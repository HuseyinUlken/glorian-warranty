/**
 * Modül bazlı izinleri tanımlayan yardımcı dosya
 * Bu dosya, izinleri modüllere göre gruplandırır ve kolayca erişim sağlar
 */

// CRUD işlemleri için izin türleri
export type PermissionAction = 'view' | 'create' | 'edit' | 'show' | 'delete' | any;

// Modül izinlerini oluşturan yardımcı fonksiyon
const createModulePermissions = (module: string, actions: PermissionAction[] = ['view', 'create', 'edit', 'show', 'delete']) => {
    return actions.reduce(
        (permissions, action) => {
            permissions[action] = `${module}.${action}`;
            return permissions;
        },
        {} as Record<string, string>,
    );
};

// Tüm modüller için izinleri tanımla
export const Permissions = {
    // Ayarlar modülü
    settings: {
        queueMonitor: {
            view: 'settings.queue-monitor.view',
            run: 'settings.queue-monitor.run',
        },
    },

    // Kullanıcı Yönetimi modülü (sadece super_admin)
    userManagement: createModulePermissions('user_management', ['view', 'create', 'edit', 'show', 'delete', 'manage_roles']),

    // Garanti Takip Sistemi - Bayi Yönetimi
    dealer: createModulePermissions('dealer', ['view', 'create', 'edit', 'show', 'delete', 'manage_status']),

    // Garanti Takip Sistemi - Ürün Yönetimi
    product: createModulePermissions('product', ['view', 'create', 'edit', 'show', 'delete', 'manage_status']),

    // Garanti Takip Sistemi - Hizmet Yönetimi
    service: {
        view_own: 'service.view_own',
        view_all: 'service.view_all',
        create: 'service.create',
        edit: 'service.edit',
        delete: 'service.delete',
        start_warranty: 'service.start_warranty',
        add_note: 'service.add_note',
    },
};

export default Permissions;
