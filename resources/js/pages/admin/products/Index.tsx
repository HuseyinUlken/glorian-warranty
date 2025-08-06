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

interface Product {
    id: number;
    name: string;
    sku: string | null;
    description: string | null;
    category: {
        value: string;
        label: string;
        description: string;
        color: string;
    };
    warranty_duration_months: number;
    formatted_warranty_duration: string;
    is_active: boolean;
    services_count: number;
    created_at: string;
    updated_at: string;
}

interface ProductsIndexProps extends PageProps {
    products: {
        data: Product[];
        current_page: number;
        per_page: number;
        total: number;
        links: any;
    };
    dataTableMeta: DataTableMeta;
    categoryOptions: Array<{
        value: string;
        label: string;
        description: string;
        color: string;
    }>;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Ana Sayfa',
        href: route('dashboard'),
    },
    {
        title: 'Ürün Yönetimi',
        href: route('admin.products.index'),
    },
];

export default function ProductsIndex({ products, dataTableMeta, categoryOptions }: ProductsIndexProps) {
    const columns: ColumnDef<Product>[] = [
        {
            accessorKey: 'id',
            header: 'ID',
        },
        {
            accessorKey: 'name',
            header: 'Ürün Adı',
            cell: ({ row }) => (
                <div>
                    <div className="font-medium">{row.original.name}</div>
                    {row.original.sku && (
                        <div className="text-sm text-muted-foreground">SKU: {row.original.sku}</div>
                    )}
                </div>
            ),
        },
        {
            accessorKey: 'category',
            header: 'Kategori',
            cell: ({ row }) => (
                <Badge 
                    variant="outline"
                    className={`border-${row.original.category.color}-200 text-${row.original.category.color}-700 bg-${row.original.category.color}-50`}
                >
                    {row.original.category.label}
                </Badge>
            ),
        },
        {
            accessorKey: 'warranty_duration',
            header: 'Garanti Süresi',
            cell: ({ row }) => (
                <div className="text-sm">
                    {row.original.formatted_warranty_duration}
                </div>
            ),
        },
        {
            accessorKey: 'is_active',
            header: 'Durum',
            cell: ({ row }) => (
                <Badge variant={row.original.is_active ? 'default' : 'secondary'}>
                    {row.original.is_active ? 'Aktif' : 'Pasif'}
                </Badge>
            ),
        },
        {
            accessorKey: 'services_count',
            header: 'Kullanım Sayısı',
            cell: ({ row }) => (
                <div className="text-center">
                    <div className="font-medium">{row.original.services_count}</div>
                    <div className="text-xs text-muted-foreground">hizmet</div>
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
                    <PermissionGuard permissions={[Permissions.product.view]}>
                        <Link href={route('admin.products.show', row.original.id)}>
                            <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                            </Button>
                        </Link>
                    </PermissionGuard>
                    <PermissionGuard permissions={[Permissions.product.edit]}>
                        <Link href={route('admin.products.edit', row.original.id)}>
                            <Button variant="outline" size="sm">
                                <Pencil className="h-4 w-4" />
                            </Button>
                        </Link>
                    </PermissionGuard>
                    <PermissionGuard permissions={[Permissions.product.delete]}>
                        <DeleteConfirmDialog
                            onConfirm={() => handleDelete(row.original.id)}
                            description={`"${row.original.name}" ürününü silmek istediğinize emin misiniz?`}
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
        router.delete(route('admin.products.destroy', id), {
            onSuccess: () => {
                // Silme işlemi başarılı olduğunda yapılacak işlemler
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ürün Yönetimi" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading
                    title="Ürün Yönetimi"
                    description="Ürünleri yönetmek için bu tabloyu kullanabilirsiniz."
                    buttons={
                        <div className="flex gap-2">
                            <PermissionGuard permissions={[Permissions.product.create]}>
                                <Link href={route('admin.products.create')}>
                                    <Button>
                                        <Plus className="h-4 w-4" />
                                        Yeni Ürün
                                    </Button>
                                </Link>
                            </PermissionGuard>
                        </div>
                    }
                />

                <PermissionGuard permissions={[Permissions.product.view]}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Ürünler Listesi</CardTitle>
                        </CardHeader>
                        <CardContent className="overflow-scroll">
                            <DataTable
                                columns={columns}
                                data={products.data}
                                meta={dataTableMeta}
                                routeName="admin.products.index"
                                searchKey="name"
                                searchPlaceholder="Ürün adı veya SKU ara..."
                            />
                        </CardContent>
                    </Card>
                </PermissionGuard>
            </div>
        </AppLayout>
    );
} 