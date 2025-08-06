import { Head, Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Eye } from 'lucide-react';

import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import AppLayout from '@/layouts/app-layout';
import { PermissionGuard } from '@/lib/permission/PermissionGuard';
import Permissions from '@/lib/permission/modulePermissions';
import { BreadcrumbItem, DataTableMeta, PageProps } from '@/types';

interface Service {
    id: number;
    service_code: string;
    customer: {
        full_name: string;
        phone: string;
    };
    dealer: {
        name: string;
        city: string;
    } | null;
    vehicle: {
        full_name: string;
        plate: string | null;
    };
    status: {
        value: string;
        label: string;
        color: string;
    };
    warranty: {
        start_date: string | null;
        end_date: string | null;
    };
    applied_products_count: number;
    application_date: string;
    created_at: string;
    updated_at: string;
}

interface AdminServicesIndexProps extends PageProps {
    services: {
        data: Service[];
        current_page: number;
        per_page: number;
        total: number;
        links: any;
    };
    dataTableMeta: DataTableMeta;
    statusOptions: Array<{
        value: string;
        label: string;
        color: string;
    }>;
    dealers?: Array<{
        id: number;
        name: string;
    }>;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Ana Sayfa',
        href: route('dashboard'),
    },
    {
        title: 'Hizmet Yönetimi',
        href: route('admin.services.index'),
    },
];

export default function AdminServicesIndex({ services, dataTableMeta, statusOptions, dealers }: AdminServicesIndexProps) {
    const columns: ColumnDef<Service>[] = [
        {
            accessorKey: 'id',
            header: 'ID',
        },
        {
            accessorKey: 'service_code',
            header: 'Hizmet Kodu',
            cell: ({ row }) => (
                <div className="font-mono font-medium">
                    {row.original.service_code}
                </div>
            ),
        },
        {
            accessorKey: 'customer',
            header: 'Müşteri',
            cell: ({ row }) => (
                <div>
                    <div className="font-medium">{row.original.customer.full_name}</div>
                    <div className="text-sm text-muted-foreground">{row.original.customer.phone}</div>
                </div>
            ),
        },
        {
            accessorKey: 'dealer',
            header: 'Bayi',
            cell: ({ row }) => (
                <div>
                    {row.original.dealer ? (
                        <>
                            <div className="font-medium">{row.original.dealer.name}</div>
                            <div className="text-sm text-muted-foreground">{row.original.dealer.city}</div>
                        </>
                    ) : (
                        <span className="text-muted-foreground">-</span>
                    )}
                </div>
            ),
        },
        {
            accessorKey: 'vehicle',
            header: 'Araç',
            cell: ({ row }) => (
                <div>
                    <div className="font-medium">{row.original.vehicle.full_name}</div>
                    {row.original.vehicle.plate && (
                        <div className="text-sm text-muted-foreground">{row.original.vehicle.plate}</div>
                    )}
                </div>
            ),
        },
        {
            accessorKey: 'status',
            header: 'Durum',
            cell: ({ row }) => (
                <Badge 
                    variant={row.original.status.value === 'ACTIVE' ? 'default' : 'secondary'}
                    className={`bg-${row.original.status.color}-500 text-white`}
                >
                    {row.original.status.label}
                </Badge>
            ),
        },
        {
            accessorKey: 'warranty',
            header: 'Garanti',
            cell: ({ row }) => (
                <div className="text-sm">
                    {row.original.warranty.start_date ? (
                        <div>
                            <div>Başlangıç: {row.original.warranty.start_date}</div>
                            {row.original.warranty.end_date && (
                                <div>Bitiş: {row.original.warranty.end_date}</div>
                            )}
                        </div>
                    ) : (
                        <span className="text-muted-foreground">Başlatılmadı</span>
                    )}
                </div>
            ),
        },
        {
            accessorKey: 'applied_products_count',
            header: 'Ürünler',
            cell: ({ row }) => (
                <div className="text-center">
                    <div className="font-medium">{row.original.applied_products_count}</div>
                    <div className="text-xs text-muted-foreground">ürün</div>
                </div>
            ),
        },
        {
            accessorKey: 'application_date',
            header: 'Başvuru Tarihi',
            cell: ({ row }) => (
                <div className="text-sm text-muted-foreground">
                    {row.original.application_date}
                </div>
            ),
        },
        {
            id: 'actions',
            header: 'İşlemler',
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <PermissionGuard permissions={[Permissions.service.view_all]}>
                        <Link href={route('admin.services.show', row.original.id)}>
                            <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                            </Button>
                        </Link>
                    </PermissionGuard>
                </div>
            ),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Hizmet Yönetimi" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading
                    title="Hizmet Yönetimi"
                    description="Sistemdeki tüm hizmetleri yönetmek için bu tabloyu kullanabilirsiniz."
                />

                <PermissionGuard permissions={[Permissions.service.view_all]}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Hizmetler Listesi</CardTitle>
                        </CardHeader>
                        <CardContent className="overflow-scroll">
                            <DataTable
                                columns={columns}
                                data={services.data}
                                meta={dataTableMeta}
                                routeName="admin.services.index"
                                searchKey="service_code"
                                searchPlaceholder="Hizmet kodu veya müşteri ara..."
                            />
                        </CardContent>
                    </Card>
                </PermissionGuard>
            </div>
        </AppLayout>
    );
} 