<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Mail\EntityUpdatedMail;
use App\Mail\PasswordChangedMail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Request;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone_number',
        'avatar_path',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    /**
     * The attributes that should be appended to arrays.
     *
     * @var array<int, string>
     */
    protected $appends = [
        'avatar_url',
    ];

    /**
     * Get the profile data based on user's role
     *
     * @return array
     */
    public function getProfileData(): array
    {
        $data = [
            'name' => $this->name,
            'email' => $this->email,
            'roles' => $this->getRoleNames(),
        ];
        return $data;
    }

    /**
     * Get the user's avatar URL.
     *
     * @return string
     */
    public function getAvatarUrlAttribute()
    {
        if ($this->avatar_path) {
            return asset('storage/' . $this->avatar_path);
        }

        // Varsayılan avatar URL'si
        return asset('images/default-avatar.png');
    }

    /**
     * Kullanıcının bildirim ayarları
     */
    public function notificationSettings(): HasMany
    {
        return $this->hasMany(UserNotificationSetting::class);
    }

    /**
     * Kullanıcının bildirimleri
     */
    public function notifications(): HasMany
    {
        return $this->hasMany(Notification::class);
    }

    /**
     * Kullanıcının bayi bilgisi (eğer bayi ise)
     */
    public function dealer()
    {
        return $this->hasOne(Dealer::class);
    }

    /**
     * Kullanıcının bayi olup olmadığını kontrol et
     */
    public function isDealer(): bool
    {
        return $this->hasRole('dealer');
    }

    /**
     * Belirli bir modül ve olay için bildirim ayarının aktif olup olmadığını kontrol eder
     *
     * @param string $module
     * @param string $event
     * @return bool
     */
    public function hasNotificationEnabled(string $module, string $event): bool
    {
        $setting = UserNotificationSetting::getByModuleAndEvent($this->id, $module, $event);

        // Ayar yoksa varsayılan olarak aktif kabul et
        if (!$setting) {
            return true;
        }

        return $setting->is_active;
    }

    /**
     * Kullanıcının bildirim ayarını günceller
     *
     * @param string $module
     * @param string $event
     * @param bool $isActive
     * @return UserNotificationSetting
     */
    public function setNotificationSetting(string $module, string $event, bool $isActive): UserNotificationSetting
    {
        $setting = UserNotificationSetting::getByModuleAndEvent($this->id, $module, $event);

        if (!$setting) {
            // Ayar yoksa yeni oluştur
            $setting = UserNotificationSetting::create([
                'user_id' => $this->id,
                'module' => $module,
                'event' => $event,
                'is_active' => $isActive,
            ]);
        } else {
            // Ayar varsa güncelle
            $setting->update(['is_active' => $isActive]);
        }

        return $setting;
    }

    /**
     * Kullanıcıya bildirim gönderir
     *
     * @param string $title
     * @param string $content
     * @param string $module
     * @param string $event
     * @param string|null $mailClass
     * @param array $mailData
     * @return Notification
     */
    public function sendNotification(
        string $title,
        string $content,
        string $module,
        string $event,
        ?string $mailClass = null,
        array $mailData = []
    ): Notification {
        // Bildirim oluştur
        $notification = Notification::create([
            'user_id' => $this->id,
            'title' => $title,
            'content' => $content,
            'module' => $module,
            'event' => $event,
        ]);

        // Eğer mail sınıfı belirtilmişse mail gönder
        if ($mailClass) {
            // Mail sınıfı constructor parametrelerini kontrol et ve doğru formatta gönder
            if (isset($mailData['title'])) {
                $mailTitle = $mailData['title'];
                $description = $mailData['description'] ?? '';
                $details = $mailData['details'] ?? null;
                $url = $mailData['url'] ?? null;
                $changes = $mailData['changes'] ?? null;

                if ($mailClass === EntityUpdatedMail::class && isset($changes)) {
                    $mailInstance = new $mailClass($mailTitle, $description, $changes, $url);
                } else {
                    $mailInstance = new $mailClass($mailTitle, $description, $details, $url);
                }

                Mail::to($this)->queue($mailInstance);
                $notification->markAsSent();
            }
        }

        // FCM desteği kaldırıldı, bu kısım artık yok.

        return $notification;
    }

    /**
     * Kullanıcının bildirimlerini getirir
     *
     * @param bool|null $isRead
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getNotifications($isRead = null)
    {
        $query = $this->notifications();

        if ($isRead !== null) {
            $query->where('is_read', $isRead);
        }

        return $query->orderBy('created_at', 'desc')->get();
    }

    /**
     * Kullanıcının okunmamış bildirimlerini getirir
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getUnreadNotifications()
    {
        return $this->getNotifications(false);
    }

    /**
     * Kullanıcının tüm bildirimlerini okundu olarak işaretler
     *
     * @return int
     */
    public function markAllNotificationsAsRead(): int
    {
        return $this
            ->notifications()
            ->where('is_read', false)
            ->update([
                'is_read' => true,
                'read_at' => now(),
            ]);
    }

    /**
     * Şifre değişikliği bildirimi gönderir
     *
     * @return void
     */
    public function sendPasswordChangedNotification(): void
    {
        // Bildirim başlığı ve içeriği
        $title = 'Şifre Değişikliği Bildirimi';
        $content = 'Hesabınızın şifresi değiştirildi. Eğer bu değişikliği siz yapmadıysanız, lütfen hemen sistem yöneticinizle iletişime geçin.';

        // Bildirim gönder
        $this->sendNotification(
            $title,
            $content,
            'user',
            'password-changed',
            PasswordChangedMail::class,
            [
                'title' => $title,
                'description' => $content,
                'details' => [
                    'changedAt' => now()->format('d.m.Y H:i:s'),
                    'ipAddress' => Request::ip(),
                ],
                'url' => route('password.edit')
            ],
        );
    }

    /**
     * Model boot ettiğinde çalışacak metod
     */
    protected static function boot()
    {
        parent::boot();

        static::created(function ($user) {
            // Yeni kullanıcı oluşturulduğunda karşılama bildirimi gönder
            if ($user->hasNotificationEnabled('user', 'created')) {
                $user->sendNotification(
                    'Hoş Geldiniz',
                    env('APP_NAME') . ' sistemine hoş geldiniz. Hesabınız başarıyla oluşturuldu.',
                    'user',
                    'created',
                    // Mail sınıfı burada belirtilebilir
                );
            }
        });

        // Şifre değişikliği izleme
        static::updated(function ($user) {
            // Şifre değiştiğinde bildirim gönder
            if ($user->isDirty('password')) {
                $user->sendPasswordChangedNotification();
            }
        });
    }
}
