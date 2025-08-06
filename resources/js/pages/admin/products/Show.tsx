import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Calendar, Edit, Package, Pencil } from 'lucide-react';

import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { PermissionGuard } from '@/lib/permission/PermissionGuard';
import Permissions from '@/lib/permission/modulePermissions';
import { BreadcrumbItem, PageProps } from '@/types';

interface Product {
    id: number;
    name: string;
    category: {
        value: string;
        label: string;
        description: string;
        color: string;
    };
    sku: string | null;
    description: string | null;
    warranty_description: string | null;
    warranty_duration_months: number;
    formatted_warranty_duration: string;
    is_active: boolean;
    services_count: number;
    created_at: string;
    updated_at: string;
}

interface ShowProductProps extends PageProps {
    product: Product;
}

const getBreadcrumbs = (product: Product): BreadcrumbItem[] => [
    {
        title: 'Ana Sayfa',
        href: route('dashboard'),
    },
    {
        title: 'Ürün Yönetimi',
        href: route('admin.products.index'),
    },
    {
        title: product.name,
        href: route('admin.products.show', product.id || 0),
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

export default function ShowProduct({ product }: ShowProductProps) {
    return (
        <AppLayout breadcrumbs={getBreadcrumbs(product)}>
            <Head title={product.name} />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading
                    title={product.name}
                    description="Ürün detaylarını görüntüleyebilirsiniz."
                    buttons={
                        <div className="flex gap-2">
                            <PermissionGuard permissions={[Permissions.product.view]}>
                                <Link href={route('admin.products.index')}>
                                    <Button variant="outline">
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Geri Dön
                                    </Button>
                                </Link>
                            </PermissionGuard>
                            <PermissionGuard permissions={[Permissions.product.edit]}>
                                <Link href={route('admin.products.edit', product.id)}>
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
                    {/* Ürün Bilgileri */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Ürün Bilgileri</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <h3 className="text-sm font-medium text-zinc-500">Ürün Adı</h3>
                                    <p className="mt-1">{product.name}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-zinc-500">Kategori</h3>
                                    <div className="mt-2">
                                        <Badge 
                                            variant="outline"
                                            className={`border-${product.category.color}-200 text-${product.category.color}-700 bg-${product.category.color}-50`}
                                        >
                                            {product.category.label}
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <h3 className="text-sm font-medium text-zinc-500">SKU</h3>
                                    <div className="mt-1">
                                        {product.sku ? (
                                            <span className="font-mono">{product.sku}</span>
                                        ) : (
                                            <span className="text-zinc-500">Belirtilmemiş</span>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-zinc-500">Kayıt Tarihi</h3>
                                    <div className="mt-1 flex items-center">
                                        <Calendar className="mr-2 h-4 w-4 text-zinc-400" />
                                        <span>{formatDate(product.created_at)}</span>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <h3 className="text-sm font-medium text-zinc-500">Durum</h3>
                                <div className="mt-2">
                                    <Badge variant={product.is_active ? 'default' : 'secondary'}>
                                        {product.is_active ? 'Aktif' : 'Pasif'}
                                    </Badge>
                                </div>
                            </div>

                            {product.description && (
                                <div>
                                    <h3 className="text-sm font-medium text-zinc-500">Açıklama</h3>
                                    <div className="mt-1 text-sm whitespace-pre-wrap">{product.description}</div>
                                </div>
                            )}

                            {product.warranty_description && (
                                <div>
                                    <h3 className="text-sm font-medium text-zinc-500">Garanti Açıklaması</h3>
                                    <div className="mt-1 text-sm">{product.warranty_description}</div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Ürün İkonu ve İstatistikler */}
                    <div className="space-y-6">
                        {/* Ürün İkonu */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Ürün İkonu</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center">
                                <div className="h-40 w-40 overflow-hidden rounded-lg bg-zinc-100 flex items-center justify-center">
                                    <Package className="h-20 w-20 text-zinc-400" />
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
                                        {product.services_count}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Kullanım Sayısı
                                    </div>
                                </div>
                                <div className="text-center p-4 bg-green-50 rounded-lg">
                                    <div className="text-2xl font-bold text-green-600">
                                        {product.formatted_warranty_duration}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Garanti Süresi
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