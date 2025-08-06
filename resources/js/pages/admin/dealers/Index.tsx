import { Head, Link, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react';

import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DeleteConfirmDialog } from '@/components/ui/confirm-dialog';
import { DataTable } from '@/components/ui/data-table';
import AppLayout from '@/layouts/app-layout';
import { PermissionGuard } from '@/lib/permission/PermissionGuard';
import Permissions from '@/lib/permission/modulePermissions';
import { BreadcrumbItem, DataTableMeta, PageProps } from '@/types';

interface Dealer {
    id: number;
    name: string;
    email: string;
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

interface DealersIndexProps extends PageProps {
    dealers: {
        data: Dealer[];
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
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Ana Sayfa',
        href: route('dashboard'),
    },
    {
        title: 'Bayi Yönetimi',
        href: route('admin.dealers.index'),
    },
];

export default function DealersIndex({ dealers, dataTableMeta, statusOptions }: DealersIndexProps) {
    const columns: ColumnDef<Dealer>[] = [
        {
            accessorKey: 'id',
            header: 'ID',
        },
        {
            accessorKey: 'name',
            header: 'Bayi Adı',
            cell: ({ row }) => (
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                        {row.original.logo_url ? (
                            <img 
                                src={row.original.logo_url} 
                                alt={row.original.name}
                                className="h-8 w-8 rounded-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.src = '/images/default-dealer-logo.png';
                                }}
                            />
                        ) : (
                            <span className="text-gray-400 text-xs">Logo</span>
                        )}
                    </div>
                    <div>
                        <div className="font-medium">{row.original.name}</div>
                        <div className="text-sm text-muted-foreground">{row.original.email}</div>
                    </div>
                </div>
            ),
        },
        {
            accessorKey: 'city',
            header: 'Şehir',
            cell: ({ row }) => {
                if (!row.original.city && !row.original.district) {
                    return <span className="text-muted-foreground">-</span>;
                }
                return (
                    <div className="text-sm">
                        {row.original.city}
                        {row.original.district && `, ${row.original.district}`}
                    </div>
                );
            },
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
            accessorKey: 'services_count',
            header: 'Hizmet Sayısı',
            cell: ({ row }) => (
                <div className="text-center">
                    <div className="font-medium">{row.original.services_count}</div>
                    <div className="text-xs text-muted-foreground">
                        {row.original.active_services_count} aktif
                    </div>
                </div>
            ),
        },
        {
            accessorKey: 'created_at',
            header: 'Oluşturulma Tarihi',
            cell: ({ row }) => (
                <div className="text-sm text-muted-foreground">
                    {row.original.created_at}
                </div>
            ),
        },
        {
            id: 'actions',
            header: 'İşlemler',
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <PermissionGuard permissions={[Permissions.dealer.view]}>
                        <Link href={route('admin.dealers.show', row.original.id)}>
                            <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                            </Button>
                        </Link>
                    </PermissionGuard>
                    <PermissionGuard permissions={[Permissions.dealer.edit]}>
                        <Link href={route('admin.dealers.edit', row.original.id)}>
                            <Button variant="outline" size="sm">
                                <Pencil className="h-4 w-4" />
                            </Button>
                        </Link>
                    </PermissionGuard>
                    <PermissionGuard permissions={[Permissions.dealer.delete]}>
                        <DeleteConfirmDialog
                            onConfirm={() => handleDelete(row.original.id)}
                            description={`"${row.original.name}" bayisini silmek istediğinize emin misiniz?`}
                        >
                            <Button variant="destructive" size="sm">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </DeleteConfirmDialog>
                    </PermissionGuard>
                </div>
            ),
        },
    ];

    const handleDelete = (id: number) => {
        router.delete(route('admin.dealers.destroy', id), {
            onSuccess: () => {
                // Silme işlemi başarılı olduğunda yapılacak işlemler
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Bayi Yönetimi" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading
                    title="Bayi Yönetimi"
                    description="Bayileri yönetmek için bu tabloyu kullanabilirsiniz."
                    buttons={
                        <div className="flex gap-2">
                            <PermissionGuard permissions={[Permissions.dealer.create]}>
                                <Link href={route('admin.dealers.create')}>
                                    <Button>
                                        <Plus className="h-4 w-4" />
                                        Yeni Bayi
                                    </Button>
                                </Link>
                            </PermissionGuard>
                        </div>
                    }
                />

                <PermissionGuard permissions={[Permissions.dealer.view]}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Bayiler Listesi</CardTitle>
                        </CardHeader>
                        <CardContent className="overflow-scroll">
                            <DataTable
                                columns={columns}
                                data={dealers.data}
                                meta={dataTableMeta}
                                routeName="admin.dealers.index"
                                searchKey="name"
                                searchPlaceholder="Bayi adı veya e-posta ara..."
                            />
                        </CardContent>
                    </Card>
                </PermissionGuard>
            </div>
        </AppLayout>
    );
} 