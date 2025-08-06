import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Calendar, Car, Edit, Package, Pencil, Shield, User } from 'lucide-react';

import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { PermissionGuard } from '@/lib/permission/PermissionGuard';
import Permissions from '@/lib/permission/modulePermissions';
import { BreadcrumbItem, PageProps } from '@/types';

interface Service {
    id: number;
    service_code: string;
    application_date: string;
    status: {
        value: string;
        label: string;
        color: string;
    };
    customer: {
        full_name: string;
        phone: string;
        email: string | null;
        city: string | null;
        district: string | null;
    };
    vehicle: {
        full_name: string;
        plate: string | null;
        color: string | null;
        package: string | null;
    };
    warranty: {
        application_date: string;
        start_date: string | null;
        end_date: string | null;
        days_remaining: number | null;
        percentage_remaining: number | null;
    };
    applied_products: Array<{
        name: string;
        category: {
            label: string;
            color: string;
        };
        warranty_duration: string;
        applied_areas: string[];
        notes: string | null;
    }>;
    notes: Array<{
        type: {
            label: string;
            color: string;
        };
        content: string;
        created_at: string;
        user_name: string;
    }> | null;
    created_at: string;
    updated_at: string;
}

interface ShowServiceProps extends PageProps {
    service: Service;
}

const getBreadcrumbs = (service: Service): BreadcrumbItem[] => [
    {
        title: 'Ana Sayfa',
        href: route('dashboard'),
    },
    {
        title: 'Hizmet Yönetimi',
        href: route('dealer.services.index'),
    },
    {
        title: service.service_code,
        href: route('dealer.services.show', service.id),
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

export default function ShowService({ service }: ShowServiceProps) {
    const handleStartWarranty = () => {
        router.post(route('dealer.services.start-warranty', service.id), {}, {
            onSuccess: () => {
                router.reload();
            },
        });
    };

    return (
        <AppLayout breadcrumbs={getBreadcrumbs(service)}>
            <Head title={service.service_code} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading
                    title={service.service_code}
                    description="Hizmet detaylarını görüntüleyebilirsiniz."
                    buttons={
                        <div className="flex gap-2">
                            <PermissionGuard permissions={[Permissions.service.view_own]}>
                                <Link href={route('dealer.services.index')}>
                                    <Button variant="outline">
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Geri Dön
                                    </Button>
                                </Link>
                            </PermissionGuard>
                            <PermissionGuard permissions={[Permissions.service.edit]}>
                                <Link href={route('dealer.services.edit', service.id)}>
                                    <Button variant="outline">
                                        <Pencil className="mr-2 h-4 w-4" />
                                        Düzenle
                                    </Button>
                                </Link>
                            </PermissionGuard>
                            {service.status.value === 'PENDING' && (
                                <PermissionGuard permissions={[Permissions.service.start_warranty]}>
                                    <Button 
                                        variant="default"
                                        onClick={handleStartWarranty}
                                        className="bg-green-600 hover:bg-green-700"
                                    >
                                        <Shield className="mr-2 h-4 w-4" />
                                        Garantiyi Başlat
                                    </Button>
                                </PermissionGuard>
                            )}
                        </div>
                    }
                />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {/* Hizmet Bilgileri */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Hizmet Bilgileri</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <h3 className="text-sm font-medium text-zinc-500">Hizmet Kodu</h3>
                                    <p className="mt-1 font-mono">{service.service_code}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-zinc-500">Durum</h3>
                                    <div className="mt-2">
                                        <Badge 
                                            variant={service.status.value === 'ACTIVE' ? 'default' : 'secondary'}
                                            className={`bg-${service.status.color}-500`}
                                        >
                                            {service.status.label}
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <h3 className="text-sm font-medium text-zinc-500">Başvuru Tarihi</h3>
                                    <div className="mt-1 flex items-center">
                                        <Calendar className="mr-2 h-4 w-4 text-zinc-400" />
                                        <span>{service.application_date}</span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-zinc-500">Kayıt Tarihi</h3>
                                    <div className="mt-1 flex items-center">
                                        <Calendar className="mr-2 h-4 w-4 text-zinc-400" />
                                        <span>{formatDate(service.created_at)}</span>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <h3 className="text-sm font-medium text-zinc-500">Müşteri</h3>
                                <div className="mt-1 flex items-center">
                                    <User className="mr-2 h-4 w-4 text-zinc-400" />
                                    <span>{service.customer.full_name}</span>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-zinc-500">Araç</h3>
                                <div className="mt-1 flex items-center">
                                    <Car className="mr-2 h-4 w-4 text-zinc-400" />
                                    <span>{service.vehicle.full_name}</span>
                                </div>
                            </div>

                            {service.notes && service.notes.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-medium text-zinc-500">Notlar</h3>
                                    <div className="mt-1 text-sm whitespace-pre-wrap">{service.notes}</div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Hizmet İkonu ve İstatistikler */}
                    <div className="space-y-6">
                        {/* Hizmet İkonu */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Hizmet İkonu</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center">
                                <div className="h-40 w-40 overflow-hidden rounded-lg bg-zinc-100 flex items-center justify-center">
                                    <Shield className="h-20 w-20 text-zinc-400" />
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
                                        {service.applied_products.length}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Uygulanan Ürün
                                    </div>
                                </div>
                                {service.warranty.days_remaining !== null && (
                                    <div className="text-center p-4 bg-green-50 rounded-lg">
                                        <div className="text-2xl font-bold text-green-600">
                                            {service.warranty.days_remaining}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Kalan Gün
                                        </div>
                                    </div>
                                )}
                                {service.notes && (
                                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                                        <div className="text-2xl font-bold text-purple-600">
                                            {service.notes.length}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Not
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 