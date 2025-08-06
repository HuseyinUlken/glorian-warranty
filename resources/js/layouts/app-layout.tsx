
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { PermissionProvider } from '@/lib/permission/PermissionContext';
import { type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage } from 'firebase/messaging';
import { useEffect, useState, type ReactNode } from 'react';
import { toast } from 'sonner';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    const page = usePage<any>();
    const flash = page.props.flash;
    const firebaseConfig = page.props.firebase;
    const [messaging, setMessaging] = useState<any>(null);

    // iOS ve standalone mod kontrolü
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    const shouldListenForMessages = !isIOS || (isIOS && isInStandaloneMode);

    // Firebase başlatma
    useEffect(() => {
        if (!firebaseConfig?.apiKey || !firebaseConfig?.projectId) {
            // console.log('Firebase yapılandırması eksik');
            return;
        }

        // iOS ve standalone mod kontrolü
        if (!shouldListenForMessages) {
            // console.log('iOS cihazda ve standalone modda değil, FCM dinleme devre dışı');
            return;
        }

        try {
            // Firebase uygulamasını başlat
            const app = initializeApp(firebaseConfig);
            const messagingInstance = getMessaging(app);
            setMessaging(messagingInstance);
        } catch (error) {
            console.error('Firebase başlatma hatası:', error);
        }
    }, [firebaseConfig, shouldListenForMessages]);

    // Bildirim dinleyicisi
    useEffect(() => {
        if (!messaging || !shouldListenForMessages) return;

        // Ön planda bildirim dinle
        const unsubscribe = onMessage(messaging, (payload) => {
            // console.log('Bildirim alındı:', payload);

            // Bildirim göster
            const notificationTitle = payload.notification?.title || 'Yeni Bildirim';
            const notificationBody = payload.notification?.body || '';

            // Bildirim verilerini al
            const notificationData = payload.data || {};

            // Sonner toast ile bildirim göster
            toast(notificationTitle, {
                description: notificationBody,
                action: {
                    label: 'Görüntüle',
                    onClick: () => {
                        // Bildirim URL'si varsa yönlendir
                        if (notificationData.url) {
                            window.location.href = notificationData.url;
                        } else {
                            window.location.href = '/notifications';
                        }
                    },
                },
                duration: 8000,
                position: 'top-right',
            });
        });

        // Temizleme fonksiyonu
        return () => {
            unsubscribe();
        };
    }, [messaging]);

    // Flash mesajlarını göster
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
        if (flash?.warning) {
            toast.warning(flash.warning);
        }
        if (flash?.info) {
            toast.info(flash.info);
        }
    }, [flash]);
    return (
        <PermissionProvider>
            <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
                {children}
            </AppLayoutTemplate>
        </PermissionProvider>
    );
};
