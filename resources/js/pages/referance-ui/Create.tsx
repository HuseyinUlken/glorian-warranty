import { Head, useForm } from '@inertiajs/react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import React from 'react';

import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ColorPicker } from '@/components/ui/color-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import Permissions from '@/lib/permission/modulePermissions';
import { PermissionGuard } from '@/lib/permission/PermissionGuard';
import { back } from '@/lib/utils';
import { BreadcrumbItem, PageProps } from '@/types';

interface CreateCashBoxProps extends PageProps {
    branch: {
        id: number;
        name: string;
    };
    branchId: number;
    cashBoxTypes: Record<string, string>;
    currencyTypes: any;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Ana Sayfa',
        href: route('dashboard'),
    },
    {
        title: 'Kasalar',
        href: route('cash-boxes.index'),
    },
    {
        title: 'Yeni Kasa',
        href: route('cash-boxes.create'),
    },
];

export default function CreateCashBox({ branch, branchId, cashBoxTypes, currencyTypes }: CreateCashBoxProps) {
    const { data, setData, post, processing, errors } = useForm<{
        branch_id: number;
        name: string;
        type: string;
        currency: string;
        color: string;
        iban: string;
        is_active: boolean;
    }>({
        branch_id: branchId,
        name: '',
        type: 'cash',
        currency: 'TRY',
        color: '#00ff11',
        iban: '',
        is_active: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('cash-boxes.store'), {
            preserveScroll: true,
            onSuccess: () => {
                // Başarılı olduğunda yapılacak işlemler
            },
            onError: (errors) => {
                // Hata durumunda yapılacak işlemler
                console.error(errors);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Yeni Kasa Ekle" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading
                    title="Yeni Kasa Ekle"
                    description={`${branch.name} şubesi için yeni bir kasa eklemek için bu formu kullanabilirsiniz.`}
                    buttons={
                        <div className="flex gap-2">
                            <PermissionGuard permissions={[Permissions.cash_boxes.view]}>
                                <Button variant="outline" onClick={() => back()}>
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Geri Dön
                                </Button>
                            </PermissionGuard>
                        </div>
                    }
                />

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Kasa Temel Bilgileri */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Kasa Bilgileri</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Kasa Adı</Label>
                                    <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="type">Kasa Tipi</Label>
                                    <Select value={data.type} onValueChange={(value) => setData('type', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Kasa tipi seçin" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(cashBoxTypes).map(([value, label]) => (
                                                <SelectItem key={value} value={value}>
                                                    {label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="currency">Para Birimi</Label>
                                    <Select value={data.currency} onValueChange={(value) => setData('currency', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Para birimi seçin" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {currencyTypes.map((item: any) => (
                                                <SelectItem key={item.value} value={item.value}>
                                                    {item.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.currency && <p className="text-sm text-red-500">{errors.currency}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="color">Renk</Label>
                                    <div className="flex items-center gap-2">
                                        <ColorPicker value={data.color as `#${string}`} onValueChange={(value) => setData('color', value.hex)}>
                                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                                                <div className="mr-2 h-4 w-4 rounded-full shadow-sm" style={{ backgroundColor: data.color }} />
                                                <span className="flex-grow">{data.color}</span>
                                                <ChevronDown className="h-4 w-4 opacity-50" />
                                            </Button>
                                        </ColorPicker>
                                    </div>
                                    {errors.color && <p className="text-sm text-red-500">{errors.color}</p>}
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="is_active"
                                            checked={data.is_active}
                                            onCheckedChange={(checked) => setData('is_active', checked)}
                                        />
                                        <Label htmlFor="is_active">Aktif</Label>
                                    </div>
                                    {errors.is_active && <p className="text-sm text-red-500">{errors.is_active}</p>}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Banka Hesabı Detayları */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Banka Hesabı Detayları</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="iban">IBAN</Label>
                                    <Input
                                        id="iban"
                                        value={data.iban}
                                        onChange={(e) => setData('iban', e.target.value)}
                                        disabled={data.type !== 'bank_account'}
                                        placeholder={
                                            data.type === 'bank_account' ? 'TR00 0000 0000 0000 0000 0000 00' : 'Sadece banka hesapları için geçerli'
                                        }
                                    />
                                    {errors.iban && <p className="text-sm text-red-500">{errors.iban}</p>}
                                </div>

                                <div className="bg-muted mt-4 rounded-md p-4">
                                    <h3 className="mb-2 font-medium">Bilgi</h3>
                                    <p className="text-muted-foreground text-sm">
                                        {data.type === 'bank_account'
                                            ? 'Banka hesapları için IBAN bilgisi zorunludur. IBAN bilgisi boşluk olmadan, sadece rakam ve harflerden oluşmalıdır.'
                                            : 'Nakit kasa seçildiğinde IBAN bilgisi gerekmez.'}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
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
