import React, { useState, useEffect } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { ArrowLeft, User, Car, Package, Calendar, FileText, Plus, Trash2 } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import Heading from '@/components/heading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { PermissionGuard } from '@/lib/permission/PermissionGuard';
import { Permissions } from '@/lib/permission/modulePermissions';
import axios from 'axios';

interface Product {
    id: number;
    name: string;
    category: {
        value: string;
        label: string;
    };
    warranty_duration: string;
}

interface CreateServiceProps extends PageProps {
    products: Product[];
}

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
        title: 'Hizmet Yönetimi',
        href: route('dealer.services.index'),
    },
    {
        title: 'Yeni Hizmet',
        href: route('dealer.services.create'),
    },
];

export default function CreateService({ products }: CreateServiceProps) {
    const [selectedProducts, setSelectedProducts] = useState<Array<{
        product_id: number;
        applied_areas: string[];
        notes?: string;
    }>>([]);
    
    const [serviceCode, setServiceCode] = useState('');

    const { data, setData, post, processing, errors } = useForm({
        service_code: '',
        application_date: new Date().toISOString().split('T')[0],
        customer: {
            first_name: '',
            last_name: '',
            phone: '',
            email: '',
            address: '',
            city: '',
            district: '',
        },
        vehicle: {
            make: '',
            model: '',
            year: new Date().getFullYear(),
            package: '',
            color: '',
            plate: '',
        },
        applied_products: [] as Array<{
            product_id: number;
            applied_areas: string[];
            notes?: string;
        }>,
        notes: '',
    });

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
            service_code: serviceCode || undefined,
            applied_products: validProducts,
        };


        post(route('dealer.services.store'), {
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
    useEffect(() => {
        setData('applied_products', selectedProducts);
    }, [selectedProducts]);

    // Kategori bazlı alan seçeneklerini getir
    const getAppliedAreasOptions = (productId: number) => {
        const product = products.find(p => p.id === productId);
        if (!product) return [];
        
        switch (product.category.value) {
            case 'PPF':
                return [
                    'Kaput', 'Ön Çamurluk Sol', 'Ön Çamurluk Sağ', 'Ön Kapı Sol', 'Ön Kapı Sağ',
                    'Arka Kapı Sol', 'Arka Kapı Sağ', 'Arka Çamurluk Sol', 'Arka Çamurluk Sağ',
                    'Bagaj Kapağı', 'Tavan', 'Ön Tampon', 'Arka Tampon'
                ];
            case 'CAM_FILMI':
                return [
                    'Ön Cam', 'Arka Cam', 'Yan Cam Sol Ön', 'Yan Cam Sağ Ön', 
                    'Yan Cam Sol Arka', 'Yan Cam Sağ Arka', 'Tavan Camı'
                ];
            default:
                return [];
        }
    };

    const handlePhoneChange = (phone: string) => {
        setData('customer', { ...data.customer, phone });
        
        // Telefon numarası 10 karakter olduğunda müşteri ara
        if (phone.length === 10) {
            axios.get(route('dealer.customers.search-by-phone'), {
                params: { phone }
            })
            .then(response => {
                if (response.data.customer) {
                    const customer = response.data.customer;
                    setData('customer', {
                        ...data.customer,
                        first_name: customer.first_name || '',
                        last_name: customer.last_name || '',
                        email: customer.email || '',
                        address: customer.address || '',
                        city: customer.city || '',
                        district: customer.district || '',
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching customer by phone:', error);
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Yeni Hizmet Oluştur" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading
                    title="Yeni Hizmet Oluştur"
                    description="Yeni bir hizmet kaydı oluşturmak için bu formu kullanabilirsiniz."
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
                                            onChange={(e) => handlePhoneChange(e.target.value)}
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
                                        <Label htmlFor="service_code">Hizmet Kodu (Opsiyonel)</Label>
                                        <Input
                                            id="service_code"
                                            value={serviceCode}
                                            onChange={(e) => setServiceCode(e.target.value.toUpperCase())}
                                            placeholder="16 haneli kod (boş bırakılırsa otomatik oluşturulur)"
                                            maxLength={16}
                                            pattern="[A-Z0-9]{16}"
                                        />
                                        <p className="text-sm text-muted-foreground">
                                            {serviceCode.length}/16 karakter
                                        </p>
                                        {errors.service_code && <p className="text-sm text-red-500">{errors.service_code}</p>}
                                    </div>
                                    
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
                                                                    {getAppliedAreasOptions(product.product_id).map((area) => (
                                                                        <SelectItem key={area} value={area}>
                                                                            {area}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                            {Array.isArray(product.applied_areas) && product.applied_areas.length > 0 && (
                                                                <div className="flex flex-wrap gap-1">
                                                                    {product.applied_areas.map((area, areaIndex) => (
                                                                        <Badge
                                                                            key={areaIndex}
                                                                            variant="secondary"
                                                                            className="inline-flex items-center gap-1"
                                                                        >
                                                                            {area}
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => {
                                                                                    const updatedAreas = product.applied_areas.filter((_, i) => i !== areaIndex);
                                                                                    updateProduct(index, 'applied_areas', updatedAreas);
                                                                                }}
                                                                                className="ml-1 hover:text-destructive"
                                                                            >
                                                                                ×
                                                                            </button>
                                                                        </Badge>
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
                            Kaydet
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
} 