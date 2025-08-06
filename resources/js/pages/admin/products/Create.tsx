import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import React from 'react';

import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { PermissionGuard } from '@/lib/permission/PermissionGuard';
import Permissions from '@/lib/permission/modulePermissions';
import { BreadcrumbItem, PageProps } from '@/types';

interface CreateProductProps extends PageProps {
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
    {
        title: 'Yeni Ürün',
        href: route('admin.products.create'),
    },
];

export default function CreateProduct({ categoryOptions }: CreateProductProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        category: 'PPF',
        sku: '',
        description: '',
        warranty_description: '',
        warranty_duration_months: 12,
        is_active: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.products.store'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Yeni Ürün Ekle" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading
                    title="Yeni Ürün Ekle"
                    description="Yeni bir ürün eklemek için bu formu kullanabilirsiniz."
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
                        </div>
                    }
                />
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {/* Ürün Bilgileri */}
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>Ürün Bilgileri</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Ürün Adı *</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Ürün adını giriniz"
                                        required
                                    />
                                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="category">Kategori *</Label>
                                    <Select
                                        value={data.category}
                                        onValueChange={(value) => setData('category', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Kategori seçin" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categoryOptions.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="sku">SKU</Label>
                                    <Input
                                        id="sku"
                                        value={data.sku}
                                        onChange={(e) => setData('sku', e.target.value)}
                                        placeholder="Ürün kodu"
                                    />
                                    {errors.sku && <p className="text-sm text-red-500">{errors.sku}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="warranty_duration_months">Garanti Süresi (Ay) *</Label>
                                    <Input
                                        id="warranty_duration_months"
                                        type="number"
                                        min="1"
                                        max="120"
                                        value={data.warranty_duration_months}
                                        onChange={(e) => setData('warranty_duration_months', parseInt(e.target.value))}
                                        placeholder="12"
                                        required
                                    />
                                    {errors.warranty_duration_months && <p className="text-sm text-red-500">{errors.warranty_duration_months}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Ürün Açıklaması</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Ürün hakkında detaylı açıklama"
                                        rows={4}
                                    />
                                    {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="warranty_description">Garanti Açıklaması</Label>
                                    <Textarea
                                        id="warranty_description"
                                        value={data.warranty_description}
                                        onChange={(e) => setData('warranty_description', e.target.value)}
                                        placeholder="Garanti koşulları ve detayları"
                                        rows={4}
                                    />
                                    {errors.warranty_description && <p className="text-sm text-red-500">{errors.warranty_description}</p>}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Durum */}
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Ürün Durumu</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between rounded-lg border p-3">
                                        <div>
                                            <Label className="text-base">Aktif</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Ürünün sistemde aktif olup olmadığını belirler
                                            </p>
                                        </div>
                                        <Switch
                                            checked={data.is_active}
                                            onCheckedChange={(checked) => setData('is_active', checked)}
                                        />
                                    </div>
                                    {errors.is_active && <p className="text-sm text-red-500">{errors.is_active}</p>}
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Button type="submit" disabled={processing}>
                            Kaydet
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
} 