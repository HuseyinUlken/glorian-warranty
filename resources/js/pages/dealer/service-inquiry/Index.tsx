import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { Search, FileText, User, Car, Calendar, Package } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import Heading from '@/components/heading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { PermissionGuard } from '@/lib/permission/PermissionGuard';
import { Permissions } from '@/lib/permission/modulePermissions';

interface BreadcrumbItem {
    title: string;
    href: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Ana Sayfa',
        href: route('dashboard'),
    },
    {
        title: 'Hizmet Sorgu',
        href: route('dealer.service-inquiry.index'),
    },
];

export default function ServiceInquiryIndex() {
    const { data, setData, post, processing, errors } = useForm({
        service_code: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('dealer.service-inquiry.search'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Hizmet Sorgu" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading
                    title="Hizmet Sorgu"
                    description="Hizmet koduna göre hizmet bilgilerini sorgulayabilir ve not ekleyebilirsiniz."
                    buttons={
                        <div className="flex gap-2">
                            <PermissionGuard permissions={[Permissions.service.view_own]}>
                                <Link href={route('dealer.services.index')}>
                                    <Button variant="outline">
                                        <FileText className="mr-2 h-4 w-4" />
                                        Hizmet Listesi
                                    </Button>
                                </Link>
                            </PermissionGuard>
                        </div>
                    }
                />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Sorgu Formu */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Search className="h-5 w-5" />
                                Hizmet Sorgula
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="service_code">Hizmet Kodu *</Label>
                                    <Input
                                        id="service_code"
                                        value={data.service_code}
                                        onChange={(e) => setData('service_code', e.target.value.toUpperCase())}
                                        placeholder="ABCDEFGHIJKLMNOP"
                                        className="text-center text-lg font-mono"
                                        maxLength={16}
                                        required
                                    />
                                    {errors.service_code && (
                                        <p className="text-sm text-red-500">{errors.service_code}</p>
                                    )}
                                </div>

                                <Button type="submit" disabled={processing} className="w-full">
                                    <Search className="mr-2 h-4 w-4" />
                                    {processing ? 'Sorgulanıyor...' : 'Sorgula'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Bilgi Kartı */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                Bilgi
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Search className="h-4 w-4 text-blue-600" />
                                    <span className="text-sm">16 haneli hizmet kodunu girin</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-green-600" />
                                    <span className="text-sm">Müşteri bilgilerini görüntüleyin</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Car className="h-4 w-4 text-orange-600" />
                                    <span className="text-sm">Araç detaylarını kontrol edin</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Package className="h-4 w-4 text-purple-600" />
                                    <span className="text-sm">Uygulanan ürünleri inceleyin</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-red-600" />
                                    <span className="text-sm">Garanti durumunu takip edin</span>
                                </div>
                            </div>

                            <Alert>
                                <AlertDescription>
                                    Sadece size ait hizmetleri sorgulayabilirsiniz. Hizmet kodu 16 karakter uzunluğunda olmalıdır.
                                </AlertDescription>
                            </Alert>
                        </CardContent>
                    </Card>
                </div>

                {/* Hata Mesajları */}
                {errors.error && (
                    <Alert variant="destructive">
                        <AlertDescription>{errors.error}</AlertDescription>
                    </Alert>
                )}
            </div>
        </AppLayout>
    );
} 