import Heading from '@/components/heading';
import { NotificationDetailDialog } from '@/components/notification-detail-dialog';
import { NotificationPermission } from '@/components/notification-permission';
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table/data-table';
import AdminLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PageProps } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { CheckCircle, CheckCircle2, Eye, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'home',
        href: route('dashboard'),
    },
    {
        title: 'Bildirimler',
        href: route('notifications.index'),
    },
];
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

interface NotificationsProps extends PageProps {
    dataTableMeta: {
        data: {
            data: Notification[];
        };
        meta: {
            current_page: number;
            from: number;
            last_page: number;
            links: any[];
            path: string;
            per_page: number;
            to: number;
            total: number;
            searchableColumns: string[];
            sortableColumns: string[];
            filters: Record<string, any>;
            total_pages: number;
            per_page_options: number[];
            search: string;
            sort: { column: string; direction: 'asc' | 'desc' };
        };
    };
    unreadCount: number;
}

export default function Index({ dataTableMeta, unreadCount, flash }: NotificationsProps) {
    const notifications = dataTableMeta.data.data;
    const [selectedNotificationId, setSelectedNotificationId] = useState<number | null>(null);
    const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
    const { auth, firebase } = usePage().props as any;
    const [hasToken, setHasToken] = useState<boolean | null>(null);

    useEffect(() => {
        // Kullanıcının token'ı olup olmadığını kontrol et
        const checkUserToken = async () => {
            try {
                const response = await axios.get(route('fcm-token.check'));
                setHasToken(response.data.hasToken);
            } catch (error) {
                console.error('Token kontrolü yapılırken hata oluştu:', error);
                setHasToken(false);
            }
        };

        if (auth.user) {
            checkUserToken();
        }
    }, []);

    const onSuccess = () => {
        router.reload();
    };

    const markAsRead = (id: number) => {
        router.post(
            route('notifications.mark-as-read', id),
            {},
            {
                preserveScroll: true,
                onSuccess,
            },
        );
    };

    const markAllAsRead = () => {
        router.post(
            route('notifications.mark-all-as-read'),
            {},
            {
                preserveScroll: true,
                onSuccess,
            },
        );
    };

    const deleteNotification = (id: number) => {
        router.delete(route('notifications.destroy', id), {
            preserveScroll: true,
            onSuccess,
        });
    };

    const deleteAllNotifications = () => {
        router.delete(route('notifications.destroy-all'), {
            preserveScroll: true,
            onSuccess,
        });
    };

    const openDetailDialog = (id: number) => {
        setSelectedNotificationId(id);
        setIsDetailDialogOpen(true);
    };

    const closeDetailDialog = () => {
        setIsDetailDialogOpen(false);
        setSelectedNotificationId(null);
        router.reload();
    };

    const columns: ColumnDef<Notification>[] = [
        {
            accessorKey: 'title',
            header: 'Başlık',
            cell: ({ row }) => {
                const notification = row.original;
                return <div className={`${!notification.is_read ? 'font-semibold' : ''}`}>{notification.title}</div>;
            },
        },
        {
            accessorKey: 'module_text',
            header: 'Modül',
        },
        {
            accessorKey: 'event_text',
            header: 'Olay',
            cell: ({ row }) => {
                const notification = row.original;
                return <Badge variant="outline">{notification.event_text}</Badge>;
            },
        },
        {
            accessorKey: 'created_at_formatted',
            header: 'Tarih',
        },
        {
            accessorKey: 'is_read',
            header: 'Durum',
            cell: ({ row }) => {
                const notification = row.original;
                return notification.is_read ? (
                    <Badge variant="outline" className="bg-green-50 dark:bg-green-800">
                        <CheckCircle2 className="mr-1 h-3.5 w-3.5 text-green-500" />
                        Okundu
                    </Badge>
                ) : (
                    <Badge variant="outline" className="bg-blue-50 dark:bg-blue-800">
                        Okunmadı
                    </Badge>
                );
            },
        },
        {
            id: 'actions',
            header: 'İşlemler',
            cell: ({ row }) => {
                const notification = row.original;
                return (
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={() => openDetailDialog(notification.id)} title="Detayları Görüntüle">
                            <Eye className="h-4 w-4 text-blue-500" />
                        </Button>
                        {!notification.is_read && (
                            <Button variant="outline" size="sm" onClick={() => markAsRead(notification.id)} title="Okundu Olarak İşaretle">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                            </Button>
                        )}
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm" className="text-red-500" title="Sil">
                                    <Trash2 className="h-4 w-4" />
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
                                    <AlertDialogAction onClick={() => deleteNotification(notification.id)} className="bg-red-500 hover:bg-red-600">
                                        Sil
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                );
            },
        },
    ];

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Bildirimler" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Web Push Bildirimleri İzin Kartı */}
                {auth.user && firebase && hasToken === false && <NotificationPermission />}

                <Heading
                    title="Bildirimler"
                    description="Bildirimleri yönetmek için bu tabloyu kullanabilirsiniz."
                    buttons={
                        <div className="flex space-x-2">
                            {unreadCount > 0 && (
                                <Button variant="outline" onClick={markAllAsRead}>
                                    <CheckCircle2 className="mr-2 h-4 w-4" />
                                    Tümünü Okundu İşaretle
                                </Button>
                            )}

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="outline" className="text-red-500">
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Tüm Bildirimleri Sil
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Tüm Bildirimleri Sil</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Tüm bildirimleri silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>İptal</AlertDialogCancel>
                                        <AlertDialogAction onClick={deleteAllNotifications} className="bg-red-500 hover:bg-red-600">
                                            Tümünü Sil
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    }
                />

                <Card>
                    <CardHeader>
                        <CardTitle>Bildirim Listesi</CardTitle>
                        <CardDescription>Tüm bildirimlerinizi buradan görüntüleyebilir ve yönetebilirsiniz.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {notifications.length === 0 ? (
                            <div className="py-10 text-center text-zinc-500">Henüz bildiriminiz bulunmuyor.</div>
                        ) : (
                            <DataTable
                                columns={columns as ColumnDef<unknown, unknown>[]}
                                data={notifications}
                                meta={dataTableMeta.meta as any}
                                routeName="notifications.index"
                                searchKey="title"
                                keepAlive
                                reloadProps={['notifications', 'dataTableMeta']}
                            />
                        )}
                    </CardContent>
                </Card>

                {/* Bildirim Detay Dialog */}
                <NotificationDetailDialog
                    notificationId={selectedNotificationId}
                    isOpen={isDetailDialogOpen}
                    onClose={closeDetailDialog}
                    onDelete={deleteNotification}
                />
            </div>
        </AdminLayout>
    );
}
