import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, Mail, Pencil, Phone, MapPin } from 'lucide-react';

import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { PermissionGuard } from '@/lib/permission/PermissionGuard';
import Permissions from '@/lib/permission/modulePermissions';
import { BreadcrumbItem, PageProps } from '@/types';

interface Dealer {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    city: string | null;
    district: string | null;
    address: string | null;
    logo_url: string | null;
    status: {
        value: string;
        label: string;
        color: string;
    };
    services_count: number;
    active_services_count: number;
    created_at: string;
    updated_at: string;
}

interface ShowDealerProps extends PageProps {
    dealer: Dealer;
}

const getBreadcrumbs = (dealer: Dealer): BreadcrumbItem[] => [
    {
        title: 'Ana Sayfa',
        href: route('dashboard'),
    },
    {
        title: 'Bayi Yönetimi',
        href: route('admin.dealers.index'),
    },
    {
        title: dealer.name,
        href: route('admin.dealers.show', dealer.id || 0),
    },
];

const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Belirtilmemiş';
    return new Date(dateString).toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
};

export default function ShowDealer({ dealer }: ShowDealerProps) {
    return (
        <AppLayout breadcrumbs={getBreadcrumbs(dealer)}>
            <Head title={dealer.name} />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading
                    title={dealer.name}
                    description="Bayi detaylarını görüntüleyebilirsiniz."
                    buttons={
                        <div className="flex gap-2">
                            <PermissionGuard permissions={[Permissions.dealer.view]}>
                                <Link href={route('admin.dealers.index')}>
                                    <Button variant="outline">
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Geri Dön
                                    </Button>
                                </Link>
                            </PermissionGuard>
                            <PermissionGuard permissions={[Permissions.dealer.edit]}>
                                <Link href={route('admin.dealers.edit', dealer.id)}>
                                    <Button variant="outline">
                                        <Pencil className="mr-2 h-4 w-4" />
                                        Düzenle
                                    </Button>
                                </Link>
                            </PermissionGuard>
                        </div>
                    }
                />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {/* Bayi Bilgileri */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Bayi Bilgileri</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <h3 className="text-sm font-medium text-zinc-500">Bayi Adı</h3>
                                    <p className="mt-1">{dealer.name}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-zinc-500">E-posta</h3>
                                    <div className="mt-1 flex items-center">
                                        <Mail className="mr-2 h-4 w-4 text-zinc-400" />
                                        <a href={`mailto:${dealer.email}`} className="text-blue-600 hover:underline">
                                            {dealer.email}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <h3 className="text-sm font-medium text-zinc-500">Telefon</h3>
                                    <div className="mt-1 flex items-center">
                                        <Phone className="mr-2 h-4 w-4 text-zinc-400" />
                                        {dealer.phone ? (
                                            <a href={`tel:${dealer.phone}`} className="text-blue-600 hover:underline">
                                                {dealer.phone}
                                            </a>
                                        ) : (
                                            <span className="text-zinc-500">Belirtilmemiş</span>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-zinc-500">Kayıt Tarihi</h3>
                                    <div className="mt-1 flex items-center">
                                        <Calendar className="mr-2 h-4 w-4 text-zinc-400" />
                                        <span>{formatDate(dealer.created_at)}</span>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <h3 className="text-sm font-medium text-zinc-500">Durum</h3>
                                <div className="mt-2">
                                    <Badge 
                                        variant={dealer.status.value === 'ACTIVE' ? 'default' : 'secondary'}
                                        className={`bg-${dealer.status.color}-500 text-white`}
                                    >
                                        {dealer.status.label}
                                    </Badge>
                                </div>
                            </div>

                            {(dealer.city || dealer.district || dealer.address) && (
                                <div>
                                    <h3 className="text-sm font-medium text-zinc-500">Adres Bilgileri</h3>
                                    <div className="mt-1 flex items-start">
                                        <MapPin className="mr-2 h-4 w-4 text-zinc-400 mt-0.5" />
                                        <div className="text-sm">
                                            {dealer.city && <div>{dealer.city}</div>}
                                            {dealer.district && <div>{dealer.district}</div>}
                                            {dealer.address && <div>{dealer.address}</div>}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Bayi Logosu ve İstatistikler */}
                    <div className="space-y-6">
                        {/* Logo */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Bayi Logosu</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center">
                                <div className="h-40 w-40 overflow-hidden rounded-full bg-zinc-100">
                                    {dealer.logo_url ? (
                                        <img src={dealer.logo_url} alt={`${dealer.name} logosu`} className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-zinc-400">Logo yok</div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* İstatistikler */}
                        <Card>
                            <CardHeader>
                                <CardTitle>İstatistikler</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-center p-4 bg-blue-50 rounded-lg">
                                    <div className="text-2xl font-bold text-blue-600">
                                        {dealer.services_count}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Toplam Hizmet
                                    </div>
                                </div>
                                <div className="text-center p-4 bg-green-50 rounded-lg">
                                    <div className="text-2xl font-bold text-green-600">
                                        {dealer.active_services_count}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Aktif Hizmet
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 