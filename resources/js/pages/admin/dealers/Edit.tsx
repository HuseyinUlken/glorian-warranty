import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import React, { useState } from 'react';

import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
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
}

interface EditDealerProps extends PageProps {
    dealer: Dealer;
    statusOptions: Array<{
        value: string;
        label: string;
        color: string;
    }>;
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
        href: route('admin.dealers.show', dealer.id),
    },
    {
        title: 'Düzenle',
        href: route('admin.dealers.edit', dealer.id),
    },
];

export default function EditDealer({ dealer, statusOptions }: EditDealerProps) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        name: dealer.name,
        email: dealer.email,
        phone: dealer.phone || '',
        city: dealer.city || '',
        district: dealer.district || '',
        address: dealer.address || '',
        status: dealer.status.value,
        logo: null as File | null,
    });

    const [logoPreview, setLogoPreview] = useState<string | null>(dealer.logo_url || null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.dealers.update', dealer.id), {
            forceFormData: true,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData('logo', file);

            // Dosya önizlemesi oluştur
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    setLogoPreview(e.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <AppLayout breadcrumbs={getBreadcrumbs(dealer)}>
            <Head title={`${dealer.name} - Düzenle`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading
                    title={`${dealer.name} - Düzenle`}
                    description="Bayi bilgilerini düzenlemek için bu formu kullanabilirsiniz."
                    buttons={
                        <div className="flex gap-2">
                            <PermissionGuard permissions={[Permissions.dealer.view]}>
                                <Link href={route('admin.dealers.show', dealer.id)}>
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
                        {/* Bayi Bilgileri */}
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>Bayi Bilgileri</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Bayi Adı *</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Bayi adını giriniz"
                                        required
                                    />
                                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">E-posta Adresi *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="ornek@email.com"
                                        required
                                    />
                                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Telefon</Label>
                                    <Input
                                        id="phone"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        placeholder="0555 123 45 67"
                                    />
                                    {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="status">Durum</Label>
                                    <Select
                                        value={data.status}
                                        onValueChange={(value) => setData('status', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Durum seçin" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {statusOptions.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.status && <p className="text-sm text-red-500">{errors.status}</p>}
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="city">Şehir</Label>
                                        <Input
                                            id="city"
                                            value={data.city}
                                            onChange={(e) => setData('city', e.target.value)}
                                            placeholder="Şehir adını giriniz"
                                        />
                                        {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="district">İlçe</Label>
                                        <Input
                                            id="district"
                                            value={data.district}
                                            onChange={(e) => setData('district', e.target.value)}
                                            placeholder="İlçe adını giriniz"
                                        />
                                        {errors.district && <p className="text-sm text-red-500">{errors.district}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="address">Adres</Label>
                                    <Textarea
                                        id="address"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        placeholder="Detaylı adres bilgisi"
                                        rows={3}
                                    />
                                    {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Logo */}
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Bayi Logosu</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex flex-col items-center space-y-4">
                                        <div className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-full bg-zinc-100">
                                            {logoPreview ? (
                                                <img src={logoPreview} alt="Logo önizleme" className="h-full w-full object-cover" />
                                            ) : (
                                                <span className="text-zinc-400">Logo yok</span>
                                            )}
                                        </div>

                                        <div className="w-full space-y-2">
                                            <Label htmlFor="logo">Logo Yükle</Label>
                                            <Input id="logo" type="file" accept="image/*" onChange={handleFileChange} />
                                            {errors.logo && <p className="text-sm text-red-500">{errors.logo}</p>}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Button type="submit" disabled={processing}>
                            Güncelle
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
} 