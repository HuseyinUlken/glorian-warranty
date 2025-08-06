import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PageProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react';
interface NotificationIndicatorProps {
    initialCount?: number;
}

export function NotificationIndicator({ initialCount = 0 }: NotificationIndicatorProps) {
    const [unreadCount, setUnreadCount] = useState(initialCount);
    const backend = usePage<PageProps>().props.auth.unreadNotificationsCount;
    // Belirli aralıklarla okunmamış bildirim sayısını güncelle
    useEffect(() => {
        const fetchUnreadCount = async () => {
            try {
                const response = await axios.get(route('notifications.unread-count'));
                setUnreadCount(response.data.count);
            } catch (error) {
                console.error('Bildirim sayısı alınamadı:', error);
            }
        };

        // İlk yükleme sırasında ve her 60 saniyede bir güncelle
        const interval = setInterval(fetchUnreadCount, 60000);

        // Component unmount olduğunda interval'i temizle
        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        setUnreadCount(backend);
    }, [backend]);
    return (
        <Link href={route('notifications.index')} className="relative inline-flex items-center justify-center">
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-md">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Toggle theme</span>

                {unreadCount > 0 && (
                    <Badge variant="destructive" className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center p-0 text-xs">
                        {unreadCount > 99 ? '99+' : unreadCount}
                    </Badge>
                )}
            </Button>
        </Link>
    );
}
