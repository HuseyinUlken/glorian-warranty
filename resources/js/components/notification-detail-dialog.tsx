import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import axios from 'axios';
import { Loader2, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Notification {
    id: number;
    title: string;
    content: string;
    module: string;
    module_text: string;
    event: string;
    event_text: string;
    is_read: boolean;
    read_at: string | null;
    read_at_formatted: string | null;
    created_at: string;
    created_at_formatted: string;
}

interface NotificationDetailDialogProps {
    notificationId: number | null;
    isOpen: boolean;
    onClose: () => void;
    onDelete: (id: number) => void;
}

export function NotificationDetailDialog({ notificationId, isOpen, onClose, onDelete }: NotificationDetailDialogProps) {
    const [notification, setNotification] = useState<Notification | null>(null);
    const [loading, setLoading] = useState(false);

    // Bildirim detayını getir
    const fetchNotificationDetail = async () => {
        if (!notificationId) return;

        setLoading(true);
        try {
            const response = await axios.get(route('notifications.show', notificationId));
            setNotification(response.data.notification);
        } catch (error) {
            console.error('Bildirim detayı alınamadı:', error);
        } finally {
            setLoading(false);
        }
    };

    // Dialog açıldığında bildirim detayını getir
    useEffect(() => {
        if (isOpen && notificationId) {
            fetchNotificationDetail();
        } else {
            setNotification(null);
        }
    }, [isOpen, notificationId]);

    // Dialog kapandığında state'i temizle
    const handleClose = () => {
        setNotification(null);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Bildirim Detayı</DialogTitle>
                    <DialogDescription>Bildirim içeriği ve detayları</DialogDescription>
                </DialogHeader>

                {loading ? (
                    <div className="flex items-center justify-center py-10">
                        <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
                    </div>
                ) : notification ? (
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold">{notification.title}</h3>
                            <div className="mt-1 flex items-center gap-2">
                                <Badge variant="outline">{notification.module_text}</Badge>
                                <Badge variant="outline">{notification.event_text}</Badge>
                            </div>
                        </div>

                        <div className="border-t pt-3">
                            <p className="whitespace-pre-line text-zinc-700">{notification.content}</p>
                        </div>

                        <div className="border-t pt-3 text-sm text-zinc-500">
                            <p>Oluşturulma: {notification.created_at_formatted}</p>
                            {notification.is_read && <p>Okunma: {notification.read_at_formatted}</p>}
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="outline" className="text-red-500">
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Sil
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Bildirimi Sil</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Bu bildirimi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>İptal</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() => {
                                                onDelete(notification.id);
                                                handleClose();
                                            }}
                                            className="bg-red-500 hover:bg-red-600"
                                        >
                                            Sil
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

                            <Button onClick={handleClose}>Kapat</Button>
                        </div>
                    </div>
                ) : (
                    <div className="py-10 text-center text-zinc-500">Bildirim bulunamadı veya yüklenemedi.</div>
                )}
            </DialogContent>
        </Dialog>
    );
}
