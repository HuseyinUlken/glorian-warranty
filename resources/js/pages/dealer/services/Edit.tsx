import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Car, Package, User } from 'lucide-react';
import React, { useState, useEffect } from 'react';

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

interface Product {
    id: number;
    name: string;
    category: {
        value: string;
        label: string;
    };
    warranty_duration: string;
}

interface Service {
    id: number;
    service_code: string;
    application_date: string;
    customer: {
        first_name: string;
        last_name: string;
        phone: string;
        email: string | null;
        address: string | null;
        city: string | null;
        district: string | null;
    };
    vehicle: {
        make: string;
        model: string;
        year: number;
        package: string | null;
        color: string | null;
        plate: string | null;
    };
    applied_products: Array<{
        id: number;
        applied_areas: string[];
        notes: string | null;
    }>;
    notes: string | null;
}

interface EditServiceProps extends PageProps {
    service: Service;
    products: Product[];
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
    {
        title: 'Düzenle',
        href: route('dealer.services.edit', service.id),
    },
];

export default function EditService({ service, products }: EditServiceProps) {
    const [selectedProducts, setSelectedProducts] = useState<Array<{
        product_id: number;
        applied_areas: string[];
        notes?: string;
    }>>([]);

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        application_date: service.application_date,
        customer: {
            first_name: service.customer.first_name,
            last_name: service.customer.last_name,
            phone: service.customer.phone,
            email: service.customer.email || '',
            address: service.customer.address || '',
            city: service.customer.city || '',
            district: service.customer.district || '',
        },
        vehicle: {
            make: service.vehicle.make,
            model: service.vehicle.model,
            year: service.vehicle.year,
            package: service.vehicle.package || '',
            color: service.vehicle.color || '',
            plate: service.vehicle.plate || '',
        },
        applied_products: [] as Array<{
            product_id: number;
            applied_areas: string[];
            notes?: string;
        }>,
        notes: service.notes || '',
    });

    // Mevcut ürünleri yükle
    useEffect(() => {
        if (service.applied_products) {
            const initialProducts = service.applied_products.map(product => ({
                product_id: product.id,
                applied_areas: Array.isArray(product.applied_areas) 
                    ? product.applied_areas 
                    : (typeof product.applied_areas === 'string' 
                        ? JSON.parse(product.applied_areas || '[]') 
                        : []),
                notes: product.notes || '',
            }));
            setSelectedProducts(initialProducts);
        }
    }, [service.applied_products]);

    useEffect(() => {
        setData('applied_products', selectedProducts);
    }, [selectedProducts]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Seçili ürünleri kontrol et
        if (selectedProducts.length === 0) {
            alert('En az bir ürün seçmelisiniz.');
            return;
        }

        // Ürün ID'lerini kontrol et
        const validProducts = selectedProducts.filter(product => product.product_id > 0);
        if (validProducts.length === 0) {
            alert('En az bir ürün seçmelisiniz.');
            return;
        }

        // Form data'yı hazırla
        const formData = {
            ...data,
            applied_products: validProducts,
        };

        post(route('dealer.services.update', service.id), {
            preserveScroll: true,
            onSuccess: () => {
                // Başarılı olduğunda state'i temizle
                setSelectedProducts([]);
            },
        });
    };

    const addProduct = () => {
        setSelectedProducts([...selectedProducts, {
            product_id: 0,
            applied_areas: [],
            notes: '',
        }]);
    };

    const removeProduct = (index: number) => {
        setSelectedProducts(selectedProducts.filter((_, i) => i !== index));
    };

    const updateProduct = (index: number, field: string, value: any) => {
        const updated = [...selectedProducts];
        updated[index] = { ...updated[index], [field]: value };
        setSelectedProducts(updated);
    };

    const appliedAreasOptions = [
        'Kaput', 'Ön Çamurluk Sol', 'Ön Çamurluk Sağ', 'Ön Kapı Sol', 'Ön Kapı Sağ',
        'Arka Kapı Sol', 'Arka Kapı Sağ', 'Arka Çamurluk Sol', 'Arka Çamurluk Sağ',
        'Bagaj Kapağı', 'Tavan', 'Ön Tampon', 'Arka Tampon', 'Ayna Sol', 'Ayna Sağ'
    ];

    return (
        <AppLayout breadcrumbs={getBreadcrumbs(service)}>
            <Head title={`${service.service_code} - Düzenle`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading
                    title={`${service.service_code} - Düzenle`}
                    description="Hizmet bilgilerini düzenlemek için bu formu kullanabilirsiniz."
                    buttons={
                        <div className="flex gap-2">
                            <PermissionGuard permissions={[Permissions.service.view_own]}>
                                <Link href={route('dealer.services.show', service.id)}>
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
                        {/* Müşteri ve Araç Bilgileri */}
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    Müşteri ve Araç Bilgileri
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Müşteri Bilgileri */}
                                <div className="space-y-4">
                                    <h4 className="font-medium">Müşteri Bilgileri</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="customer.first_name">Ad *</Label>
                                            <Input
                                                id="customer.first_name"
                                                value={data.customer.first_name}
                                                onChange={(e) => setData('customer', { ...data.customer, first_name: e.target.value })}
                                                placeholder="Müşteri adı"
                                                required
                                            />
                                            {errors['customer.first_name'] && <p className="text-sm text-red-500">{errors['customer.first_name']}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="customer.last_name">Soyad *</Label>
                                            <Input
                                                id="customer.last_name"
                                                value={data.customer.last_name}
                                                onChange={(e) => setData('customer', { ...data.customer, last_name: e.target.value })}
                                                placeholder="Müşteri soyadı"
                                                required
                                            />
                                            {errors['customer.last_name'] && <p className="text-sm text-red-500">{errors['customer.last_name']}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="customer.phone">Telefon *</Label>
                                        <Input
                                            id="customer.phone"
                                            value={data.customer.phone}
                                            onChange={(e) => setData('customer', { ...data.customer, phone: e.target.value })}
                                            placeholder="0555 123 45 67"
                                            required
                                        />
                                        {errors['customer.phone'] && <p className="text-sm text-red-500">{errors['customer.phone']}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="customer.email">E-posta</Label>
                                        <Input
                                            id="customer.email"
                                            type="email"
                                            value={data.customer.email}
                                            onChange={(e) => setData('customer', { ...data.customer, email: e.target.value })}
                                            placeholder="musteri@email.com"
                                        />
                                        {errors['customer.email'] && <p className="text-sm text-red-500">{errors['customer.email']}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="customer.address">Adres</Label>
                                        <Textarea
                                            id="customer.address"
                                            value={data.customer.address}
                                            onChange={(e) => setData('customer', { ...data.customer, address: e.target.value })}
                                            placeholder="Müşteri adresi"
                                            rows={3}
                                        />
                                        {errors['customer.address'] && <p className="text-sm text-red-500">{errors['customer.address']}</p>}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="customer.city">Şehir</Label>
                                            <Input
                                                id="customer.city"
                                                value={data.customer.city}
                                                onChange={(e) => setData('customer', { ...data.customer, city: e.target.value })}
                                                placeholder="İstanbul"
                                            />
                                            {errors['customer.city'] && <p className="text-sm text-red-500">{errors['customer.city']}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="customer.district">İlçe</Label>
                                            <Input
                                                id="customer.district"
                                                value={data.customer.district}
                                                onChange={(e) => setData('customer', { ...data.customer, district: e.target.value })}
                                                placeholder="Kadıköy"
                                            />
                                            {errors['customer.district'] && <p className="text-sm text-red-500">{errors['customer.district']}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Araç Bilgileri */}
                                <div className="space-y-4">
                                    <h4 className="font-medium">Araç Bilgileri</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="vehicle.make">Marka *</Label>
                                            <Input
                                                id="vehicle.make"
                                                value={data.vehicle.make}
                                                onChange={(e) => setData('vehicle', { ...data.vehicle, make: e.target.value })}
                                                placeholder="BMW"
                                                required
                                            />
                                            {errors['vehicle.make'] && <p className="text-sm text-red-500">{errors['vehicle.make']}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="vehicle.model">Model *</Label>
                                            <Input
                                                id="vehicle.model"
                                                value={data.vehicle.model}
                                                onChange={(e) => setData('vehicle', { ...data.vehicle, model: e.target.value })}
                                                placeholder="X5"
                                                required
                                            />
                                            {errors['vehicle.model'] && <p className="text-sm text-red-500">{errors['vehicle.model']}</p>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="vehicle.year">Yıl *</Label>
                                            <Input
                                                id="vehicle.year"
                                                type="number"
                                                value={data.vehicle.year}
                                                onChange={(e) => setData('vehicle', { ...data.vehicle, year: parseInt(e.target.value) })}
                                                min="1900"
                                                max={new Date().getFullYear() + 1}
                                                required
                                            />
                                            {errors['vehicle.year'] && <p className="text-sm text-red-500">{errors['vehicle.year']}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="vehicle.color">Renk</Label>
                                            <Input
                                                id="vehicle.color"
                                                value={data.vehicle.color}
                                                onChange={(e) => setData('vehicle', { ...data.vehicle, color: e.target.value })}
                                                placeholder="Siyah"
                                            />
                                            {errors['vehicle.color'] && <p className="text-sm text-red-500">{errors['vehicle.color']}</p>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="vehicle.package">Paket</Label>
                                            <Input
                                                id="vehicle.package"
                                                value={data.vehicle.package}
                                                onChange={(e) => setData('vehicle', { ...data.vehicle, package: e.target.value })}
                                                placeholder="M Sport"
                                            />
                                            {errors['vehicle.package'] && <p className="text-sm text-red-500">{errors['vehicle.package']}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="vehicle.plate">Plaka</Label>
                                            <Input
                                                id="vehicle.plate"
                                                value={data.vehicle.plate}
                                                onChange={(e) => setData('vehicle', { ...data.vehicle, plate: e.target.value })}
                                                placeholder="34 ABC 123"
                                            />
                                            {errors['vehicle.plate'] && <p className="text-sm text-red-500">{errors['vehicle.plate']}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Hizmet Bilgileri */}
                                <div className="space-y-4">
                                    <h4 className="font-medium">Hizmet Bilgileri</h4>
                                    <div className="space-y-2">
                                        <Label htmlFor="application_date">Başvuru Tarihi *</Label>
                                        <Input
                                            id="application_date"
                                            type="date"
                                            value={data.application_date}
                                            onChange={(e) => setData('application_date', e.target.value)}
                                            required
                                        />
                                        {errors.application_date && <p className="text-sm text-red-500">{errors.application_date}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Uygulanan Ürünler *</Label>
                                        <div className="space-y-4">
                                            {selectedProducts.map((product, index) => (
                                                <div key={index} className="border rounded-lg p-4 space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <h4 className="font-medium">Ürün {index + 1}</h4>
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => removeProduct(index)}
                                                        >
                                                            Kaldır
                                                        </Button>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <Label>Ürün Seçin *</Label>
                                                            <Select
                                                                value={product.product_id > 0 ? product.product_id.toString() : ""}
                                                                onValueChange={(value) => updateProduct(index, 'product_id', parseInt(value))}
                                                            >
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Ürün seçin" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {products.map((prod) => (
                                                                        <SelectItem key={prod.id} value={prod.id.toString()}>
                                                                            {prod.name} ({prod.category.label})
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label>Uygulanan Alanlar *</Label>
                                                            <Select
                                                                value=""
                                                                onValueChange={(value) => {
                                                                    const currentAreas = product.applied_areas;
                                                                    if (!currentAreas.includes(value)) {
                                                                        updateProduct(index, 'applied_areas', [...currentAreas, value]);
                                                                    }
                                                                }}
                                                            >
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Alan seçin" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {appliedAreasOptions.map((area) => (
                                                                        <SelectItem key={area} value={area}>
                                                                            {area}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                            {Array.isArray(product.applied_areas) && product.applied_areas.length > 0 && (
                                                                <div className="flex flex-wrap gap-1">
                                                                    {product.applied_areas.map((area, areaIndex) => (
                                                                        <span
                                                                            key={areaIndex}
                                                                            className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                                                                        >
                                                                            {area}
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => {
                                                                                    const updatedAreas = product.applied_areas.filter((_, i) => i !== areaIndex);
                                                                                    updateProduct(index, 'applied_areas', updatedAreas);
                                                                                }}
                                                                                className="ml-1 text-blue-600 hover:text-blue-800"
                                                                            >
                                                                                ×
                                                                            </button>
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label>Notlar</Label>
                                                        <Textarea
                                                            value={product.notes || ''}
                                                            onChange={(e) => updateProduct(index, 'notes', e.target.value)}
                                                            placeholder="Bu ürün için özel notlar..."
                                                            rows={2}
                                                        />
                                                    </div>
                                                </div>
                                            ))}

                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={addProduct}
                                                className="w-full"
                                            >
                                                <Package className="mr-2 h-4 w-4" />
                                                Ürün Ekle
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="notes">Genel Notlar</Label>
                                        <Textarea
                                            id="notes"
                                            value={data.notes}
                                            onChange={(e) => setData('notes', e.target.value)}
                                            placeholder="Hizmet ile ilgili genel notlar..."
                                            rows={3}
                                        />
                                        {errors.notes && <p className="text-sm text-red-500">{errors.notes}</p>}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Yardım */}
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Yardım</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="text-sm text-muted-foreground">
                                        <p>• Müşteri bilgilerini eksiksiz doldurun</p>
                                        <p>• Araç bilgilerini doğru girin</p>
                                        <p>• En az bir ürün seçin</p>
                                        <p>• Uygulanan alanları belirtin</p>
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