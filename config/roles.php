<?php

return [
    /*
     * |--------------------------------------------------------------------------
     * | Uygulama Modülleri
     * |--------------------------------------------------------------------------
     * |
     * | Bu dizide, uygulamanın tüm modülleri ve bu modüllere ait izinler tanımlanır.
     * | Her modül için CRUD (Create, Read, Update, Delete) izinleri ve varsa özel izinler belirtilir.
     * |
     */
    'modules' => [
        'settings' => [
            'name' => 'Ayarlar',
            'model' => 'Setting',
            'permissions' => [
                'settings.backup.view' => 'Yedekleme Ayarlarını Görüntüle',
                'settings.backup.create' => 'Yedekleme Oluştur',
                'settings.backup.restore' => 'Yedekleme Geri Yükle',
                'settings.queue-monitor.view' => 'Kuyruk İzleme',
                'settings.queue-monitor.run' => 'Kuyruk İşleri Çalıştır',
                'settings.logs.view' => 'Sistem Loglarını Görüntüle',
            ],
        ],
        'user_management' => [
            'name' => 'Kullanıcı Yönetimi',
            'model' => 'User',
            'permissions' => [
                'user_management.view' => 'Kullanıcıları Görüntüle',
                'user_management.create' => 'Kullanıcı Oluştur',
                'user_management.edit' => 'Kullanıcı Düzenle',
                'user_management.delete' => 'Kullanıcı Sil',
                'user_management.manage_roles' => 'Rolleri Yönet',
            ],
        ],
        'exported_files' => [
            'name' => 'Dışa Aktarılan Dosyalar',
            'model' => 'ExportedFile',
            'permissions' => [
                'exported_files.view' => 'Dışa Aktarılan Dosyaları Görüntüle',
                'exported_files.create' => 'Dışa Aktarılan Dosya Oluştur',
                'exported_files.edit' => 'Dışa Aktarılan Dosya Düzenle',
                'exported_files.delete' => 'Dışa Aktarılan Dosya Sil',
            ],
        ],
        'dealer' => [
            'name' => 'Bayi Yönetimi',
            'model' => 'Dealer',
            'permissions' => [
                'dealer.view' => 'Bayileri Görüntüle',
                'dealer.create' => 'Bayi Oluştur',
                'dealer.edit' => 'Bayi Düzenle',
                'dealer.delete' => 'Bayi Sil',
                'dealer.manage_status' => 'Bayi Durumunu Yönet',
            ],
        ],
        'product' => [
            'name' => 'Ürün Yönetimi',
            'model' => 'Product',
            'permissions' => [
                'product.view' => 'Ürünleri Görüntüle',
                'product.create' => 'Ürün Oluştur',
                'product.edit' => 'Ürün Düzenle',
                'product.delete' => 'Ürün Sil',
                'product.manage_status' => 'Ürün Durumunu Yönet',
            ],
        ],
        'service' => [
            'name' => 'Hizmet Yönetimi',
            'model' => 'Service',
            'permissions' => [
                'service.view_own' => 'Kendi Hizmetlerini Görüntüle',
                'service.view_all' => 'Tüm Hizmetleri Görüntüle',
                'service.create' => 'Hizmet Oluştur',
                'service.edit' => 'Hizmet Düzenle',
                'service.delete' => 'Hizmet Sil',
                'service.start_warranty' => 'Garantiyi Başlat',
                'service.add_note' => 'Hizmete Not Ekle',
            ],
        ],
    ],

    /*
     * |--------------------------------------------------------------------------
     * | Roller ve İzinler
     * |--------------------------------------------------------------------------
     * |
     * | Bu dizide, uygulamadaki roller ve bu rollere atanacak izinler tanımlanır.
     * | Her rol için, yukarıda tanımlanan modüllere ait izinler atanabilir.
     * |
     */
    'roles' => [
        'super_admin' => [
            'name' => 'Süper Yönetici',
            'description' => 'Tüm modüllere ve yöneticilere tam erişim',
            'permissions' => [
                'settings.*',
                'user_management.*',
                'exported_files.*',
                'dealer.*',
                'product.*',
                'service.*',
            ],
        ],
        'dealer' => [
            'name' => 'Bayi',
            'description' => 'Bayi kullanıcısı - kendi hizmetlerini yönetebilir',
            'permissions' => [
                'service.view_own',
                'service.create',
                'service.edit',
                'service.start_warranty',
                'service.add_note',
            ],
        ],
    ],
];
