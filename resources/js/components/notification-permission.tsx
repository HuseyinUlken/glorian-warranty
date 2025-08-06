import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { FirebaseApp } from 'firebase/app';
import { AlertCircle, BellOff, BellRing, CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

// Firebase modüllerini dinamik olarak import et
const loadFirebaseModules = async () => {
    const { initializeApp, getApp } = await import('firebase/app');
    const { getMessaging, getToken, isSupported } = await import('firebase/messaging');
    const getOrCreateApp: (firebase: any) => Promise<FirebaseApp> = async (firebase: any) => {
        const app = getApp();
        if (!app) {
            // console.log('Firebase uygulaması başlatılıyor...');
            return initializeApp(firebase);
        }
        // console.log('Firebase uygulaması zaten mevcut.');
        return app;
    };
    return { getMessaging, getToken, isSupported, getOrCreateApp };
};

export function NotificationPermission() {
    const { firebase } = usePage().props as any;
    const [permissionStatus, setPermissionStatus] = useState<string>('default');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [tokenSaved, setTokenSaved] = useState<boolean>(false);
    const [supported, setSupported] = useState<boolean | null>(null);

    // iOS ve standalone mod kontrolü
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    const shouldListenForMessages = !isIOS || (isIOS && isInStandaloneMode);

    useEffect(() => {
        // iOS cihazda ve standalone modda değilse bildirim desteği kontrol etme
        if (isIOS && !isInStandaloneMode) {
            setSupported(false);
            setError('iOS cihazlarda bildirimler yaln\u0131zca ana ekrana eklenmi\u015f uygulamalarda desteklenir.');
            return;
        }

        // Tarayıcı bildirim desteğini kontrol et
        const checkSupport = async () => {
            try {
                if (!('Notification' in window)) {
                    setSupported(false);
                    return;
                }

                // Firebase messaging desteğini kontrol et
                const { isSupported } = await loadFirebaseModules();
                const hasSupport = await isSupported();
                setSupported(hasSupport);

                // İzin durumunu kontrol et
                if (Notification.permission) {
                    setPermissionStatus(Notification.permission);

                    // Eğer izin verilmişse token'ı al ve kaydet
                    if (Notification.permission === 'granted') {
                        getFirebaseToken();
                    }
                }
            } catch (err) {
                console.error('Bildirim desteği kontrol edilirken hata oluştu:', err);
                setSupported(false);
            }
        };

        if (firebase && firebase.apiKey) {
            checkSupport();
        }
    }, [firebase]);

    const requestPermission = async () => {
        setLoading(true);
        setError(null);

        try {
            // Bildirim izni iste
            const permission = await Notification.requestPermission();
            setPermissionStatus(permission);

            if (permission === 'granted') {
                await getFirebaseToken();
            } else {
                setError('Bildirim izni reddedildi. Bildirimleri alabilmek için tarayıcı ayarlarından izin vermeniz gerekiyor.');
            }
        } catch (err) {
            console.error('İzin istenirken hata oluştu:', err);
            setError('Bildirim izni istenirken bir hata oluştu. Lütfen tarayıcı ayarlarınızı kontrol edin.');
        } finally {
            setLoading(false);
        }
    };

    const getFirebaseToken = async () => {
        if (!firebase || !firebase.apiKey) {
            console.error('Firebase yapılandırması eksik');
            setError('Firebase yapılandırması eksik. Yönetici ile iletişime geçin.');
            return;
        }

        // iOS cihazda ve standalone modda değilse token alma
        if (isIOS && !isInStandaloneMode) {
            setError('iOS cihazlarda bildirimler yaln\u0131zca ana ekrana eklenmi\u015f uygulamalarda desteklenir.');
            return;
        }

        if (!supported) {
            setError('Tarayıcınız web push bildirimlerini desteklemiyor.');
            return;
        }

        try {
            setLoading(true);

            // Firebase modüllerini yükle
            const { getMessaging, getToken, getOrCreateApp } = await loadFirebaseModules();

            // Firebase'i başlat
            const firebaseApp = await getOrCreateApp({
                apiKey: firebase.apiKey,
                authDomain: firebase.authDomain,
                projectId: firebase.projectId,
                storageBucket: firebase.storageBucket,
                messagingSenderId: firebase.messagingSenderId,
                appId: firebase.appId,
            });

            // FCM token'ı al
            const messaging = getMessaging(firebaseApp);
            const token = await getToken(messaging, {
                vapidKey: firebase.vapidKey,
            });

            if (token) {
                // Token'ı sunucuya kaydet
                await saveToken(token);
                setSuccess(true);
                setTokenSaved(true);
            } else {
                setError("Bildirim token'ı alınamadı. Lütfen daha sonra tekrar deneyin.");
            }
        } catch (err: any) {
            setError(`FCM token alınırken bir hata oluştu: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const saveToken = async (token: string) => {
        try {
            // Cihaz bilgilerini topla
            const deviceInfo = {
                userAgent: navigator.userAgent,
                language: navigator.language,
                platform: navigator.platform,
                screenSize: `${window.screen.width}x${window.screen.height}`,
            };

            // Token'ı sunucuya gönder
            const response = await axios.post(route('fcm-token.store'), {
                token,
                device_type: 'web',
                device_name: navigator.userAgent.split(' ')[0],
                device_info: deviceInfo,
            });

            if (response.data.success) {
                setTokenSaved(true);
                setSuccess(true);
            } else {
                console.error('Token kaydedilirken sunucu hatası:', response.data);
                setError('Token kaydedilirken bir hata oluştu.');
                setTokenSaved(false);
            }
        } catch (err) {
            console.error('Token sunucuya kaydedilirken hata:', err);
            setError('Token sunucuya kaydedilirken bir hata oluştu.');
            setTokenSaved(false);
        }
    };

    // Tarayıcı bildirimleri desteklemiyorsa
    if (supported === false) {
        return (
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <AlertCircle className="mr-2 h-5 w-5 text-yellow-500" />
                        Bildirim Desteği Yok
                    </CardTitle>
                    <CardDescription>Tarayıcınız web push bildirimlerini desteklemiyor.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Bildirim Desteği Bulunamadı</AlertTitle>
                        <AlertDescription>
                            Kullandığınız tarayıcı veya cihaz web push bildirimlerini desteklemiyor. Bildirimleri alabilmek için Chrome, Firefox, Edge
                            gibi modern bir tarayıcı kullanmanızı öneririz.
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
        );
    }

    // Firebase yapılandırması eksikse
    if (!firebase || !firebase.apiKey) {
        return null; // Hiçbir şey gösterme
    }

    // Token kaydedilmişse veya izin verilmişse
    if (tokenSaved || permissionStatus === 'granted') {
        return (
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                        Bildirimler Aktif
                    </CardTitle>
                    <CardDescription>Web bildirimleri bu cihaz için aktifleştirildi.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Alert className="border-green-200 bg-green-50 text-green-800 dark:bg-green-800 dark:text-green-200">
                        <CheckCircle className="h-4 w-4" />
                        <AlertTitle>Bildirimler Aktif</AlertTitle>
                        <AlertDescription className="dark:text-green-200">
                            Artık önemli bildirimleri bu cihazda alabileceksiniz. Bildirimleri kapatmak isterseniz tarayıcı ayarlarından
                            değiştirebilirsiniz.
                        </AlertDescription>
                    </Alert>

                    {permissionStatus === 'granted' && !tokenSaved && (
                        <div className="mt-4">
                            <Button onClick={getFirebaseToken} disabled={loading} className="w-full">
                                {loading ? 'İşleniyor...' : 'Tokenı Yenile'}
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="flex items-center">
                    <BellRing className="mr-2 h-5 w-5 text-blue-500" />
                    Web Bildirimleri
                </CardTitle>
                <CardDescription>Önemli bildirimleri tarayıcınızda almak için izin verin.</CardDescription>
            </CardHeader>
            <CardContent>
                {error && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Hata</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {success && (
                    <Alert className="mb-4 border-green-200 bg-green-50 text-green-800">
                        <CheckCircle className="h-4 w-4" />
                        <AlertTitle>Başarılı</AlertTitle>
                        <AlertDescription>Bildirim izni başarıyla alındı ve token kaydedildi.</AlertDescription>
                    </Alert>
                )}

                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium">Bildirim Durumu</p>
                        <p className="text-muted-foreground text-sm">
                            {permissionStatus === 'granted' ? (
                                <span className="flex items-center text-green-500">
                                    <CheckCircle className="mr-1 h-4 w-4" /> İzin Verildi
                                </span>
                            ) : permissionStatus === 'denied' ? (
                                <span className="flex items-center text-red-500">
                                    <BellOff className="mr-1 h-4 w-4" /> İzin Reddedildi
                                </span>
                            ) : (
                                <span className="flex items-center text-yellow-500">
                                    <AlertCircle className="mr-1 h-4 w-4" /> İzin Bekleniyor
                                </span>
                            )}
                        </p>
                    </div>

                    {permissionStatus !== 'granted' && (
                        <Button onClick={requestPermission} disabled={loading || permissionStatus === 'denied'}>
                            {loading ? 'İşleniyor...' : 'Bildirimlere İzin Ver'}
                        </Button>
                    )}

                    {permissionStatus === 'granted' && !tokenSaved && (
                        <Button onClick={getFirebaseToken} disabled={loading}>
                            {loading ? 'İşleniyor...' : 'Token Kaydet'}
                        </Button>
                    )}
                </div>
            </CardContent>
            <CardFooter className="text-muted-foreground text-xs">
                {permissionStatus === 'denied' ? (
                    <p>
                        Bildirimlere izin vermek için tarayıcı ayarlarınızı değiştirmeniz gerekiyor. Adres çubuğundaki kilit simgesine tıklayarak site
                        ayarlarına erişebilirsiniz.
                    </p>
                ) : (
                    <p>Bildirimlere izin vererek, önemli güncellemeler, yeni mesajlar ve diğer kritik bilgileri anında alabilirsiniz.</p>
                )}
            </CardFooter>
        </Card>
    );
}
