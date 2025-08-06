# Glorian Dashboard - cPanel Kurulum Rehberi

Bu rehber, Glorian Dashboard projesini cPanel ortamında kurulumu için hazırlanmıştır.

## 📋 Sistem Gereksinimleri

### Sunucu Gereksinimleri
- **PHP**: 8.2 veya üzeri
- **MySQL**: 5.7 veya üzeri (MariaDB 10.3+ da desteklenir)
- **Node.js**: 18+ (npm veya pnpm için)
- **Composer**: 2.0+

### PHP Eklentileri
Aşağıdaki PHP eklentilerinin aktif olması gerekir:
- `php-mysql` veya `php-mysqli`
- `php-curl`
- `php-gd`
- `php-mbstring`
- `php-xml`
- `php-zip`
- `php-openssl`
- `php-json`
- `php-fileinfo`
- `php-tokenizer`

## 🚀 Kurulum Adımları

### 1. Dosyaları Yükleme
1. Proje dosyalarını cPanel File Manager ile `public_html` klasörüne yükleyin
2. **ÖNEMLİ**: Tüm dosyaları `public_html` klasörünün **içine** yükleyin, doğrudan `public_html` klasörüne değil

### 2. Veritabanı Oluşturma
1. cPanel'de "MySQL Databases" bölümüne gidin
2. Yeni bir veritabanı oluşturun (örn: `glorian_dashboard`)
3. Yeni bir veritabanı kullanıcısı oluşturun
4. Kullanıcıyı veritabanına ekleyin ve tüm yetkileri verin

### 3. Ortam Değişkenlerini Yapılandırma
1. `.env.example` dosyasını `.env` olarak kopyalayın
2. `.env` dosyasını düzenleyin:

```env
APP_NAME="Glorian"
APP_ENV=production
APP_KEY=base64:A1byUQ6G5KHORUV2kOExHU8AIzkJAvaGasy6xcu/21w=
APP_DEBUG=false
APP_URL=https://yourdomain.com

# Veritabanı Ayarları
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password

# Mail Ayarları (cPanel Mail ayarlarınızı kullanın)
MAIL_MAILER=smtp
MAIL_HOST=yourdomain.com
MAIL_PORT=587
MAIL_USERNAME=your_email@yourdomain.com
MAIL_PASSWORD=your_email_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=your_email@yourdomain.com
MAIL_FROM_NAME="${APP_NAME}"

# Diğer Ayarlar
SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database
FILESYSTEM_DISK=local

# Google Drive Ayarları (Opsiyonel)
GOOGLE_DRIVE_CLIENT_ID=""
GOOGLE_DRIVE_CLIENT_SECRET=""
GOOGLE_DRIVE_ACCESS_TOKEN=""
GOOGLE_DRIVE_REFRESH_TOKEN=""

# OpenAI Ayarları (Opsiyonel)
OPENAI_API_KEY=""
OPENAI_MODEL="gpt-4o-mini"
```

### 4. Composer Bağımlılıklarını Yükleme
SSH erişiminiz varsa:
```bash
cd /home/username/public_html
composer install --optimize-autoloader --no-dev
```

SSH erişiminiz yoksa:
1. cPanel'de "Terminal" veya "SSH Access" bölümünü kullanın
2. Yukarıdaki komutları çalıştırın

### 5. Node.js Bağımlılıklarını Yükleme
```bash
cd /home/username/public_html
npm install
npm run build
```

### 6. Laravel Kurulum Komutları
```bash
# Uygulama anahtarını oluştur
php artisan key:generate

# Veritabanı tablolarını oluştur
php artisan migrate

# Varsayılan verileri yükle (opsiyonel)
php artisan db:seed

# Önbellekleri temizle
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Storage linkini oluştur
php artisan storage:link
```

### 7. Dosya İzinlerini Ayarlama
Aşağıdaki klasörlere yazma izni verin:
```bash
chmod -R 755 storage/
chmod -R 755 bootstrap/cache/
chmod -R 755 public/storage/
```

### 8. .htaccess Yapılandırması
`public_html` klasöründe `.htaccess` dosyası oluşturun:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteRule ^(.*)$ public/$1 [L]
</IfModule>
```

`public` klasöründe `.htaccess` dosyası oluşturun:

```apache
<IfModule mod_rewrite.c>
    <IfModule mod_negotiation.c>
        Options -MultiViews -Indexes
    </IfModule>

    RewriteEngine On

    # Handle Authorization Header
    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

    # Redirect Trailing Slashes If Not A Folder...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} (.+)/$
    RewriteRule ^ %1 [L,R=301]

    # Send Requests To Front Controller...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>
```

## 🔧 Ek Yapılandırmalar

### Cron Job Kurulumu
cPanel'de "Cron Jobs" bölümüne gidin ve aşağıdaki komutu ekleyin:
```
* * * * * cd /home/username/public_html && php artisan schedule:run >> /dev/null 2>&1
```

### Queue Worker Kurulumu (Opsiyonel)
Eğer queue sistemi kullanıyorsanız, SSH ile:
```bash
php artisan queue:work --daemon
```

### SSL Sertifikası
cPanel'de "SSL/TLS" bölümünden SSL sertifikanızı yapılandırın.

## 🛠️ Sorun Giderme

### Yaygın Hatalar ve Çözümleri

1. **500 Internal Server Error**
   - `.env` dosyasının doğru yapılandırıldığından emin olun
   - Dosya izinlerini kontrol edin
   - `storage/logs/laravel.log` dosyasını kontrol edin

2. **Database Connection Error**
   - Veritabanı bilgilerinin doğru olduğundan emin olun
   - Veritabanı kullanıcısının yetkilerini kontrol edin

3. **Permission Denied**
   - `storage` ve `bootstrap/cache` klasörlerinin yazma izni olduğundan emin olun

4. **Asset Loading Issues**
   - `npm run build` komutunun çalıştırıldığından emin olun
   - `public/build` klasörünün mevcut olduğunu kontrol edin

### Log Dosyalarını Kontrol Etme
```bash
tail -f storage/logs/laravel.log
```

## 📞 Destek

Kurulum sırasında sorun yaşarsanız:
1. Laravel log dosyalarını kontrol edin
2. cPanel error loglarını kontrol edin
3. Gerekirse hosting sağlayıcınızla iletişime geçin

## 🔒 Güvenlik Notları

1. `.env` dosyasının web erişimine kapalı olduğundan emin olun
2. `APP_DEBUG=false` olarak ayarlayın
3. Güçlü veritabanı şifreleri kullanın
4. SSL sertifikası kullanın
5. Düzenli yedekleme yapın

## 📝 Ek Notlar

- Proje Laravel 12 ve React 19 kullanmaktadır
- Inertia.js ile SPA deneyimi sağlanmaktadır
- Tailwind CSS ile stillendirilmiştir
- Spatie Permission paketi ile rol tabanlı yetkilendirme sistemi vardır
- Google Drive entegrasyonu mevcuttur
- Backup sistemi bulunmaktadır

Kurulum tamamlandıktan sonra `https://yourdomain.com` adresinden uygulamaya erişebilirsiniz. 