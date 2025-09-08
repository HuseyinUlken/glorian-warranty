import React, { useState } from 'react';
import { Head, useForm, Link, router } from '@inertiajs/react';
import axios from 'axios';
import { toast } from 'sonner';
import { Search, FileText, User, Car, Calendar, Package, CheckCircle, AlertTriangle, Info, XCircle, Phone, Mail, MapPin, MessageSquare, Plus, Edit } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import Heading from '@/components/heading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PermissionGuard } from '@/lib/permission/PermissionGuard';
import { Permissions } from '@/lib/permission/modulePermissions';

interface BreadcrumbItem {
    title: string;
    href: string;
}

interface Service {
    id: number;
    service_code: string;
    status: {
        value: string;
        label: string;
        color: string;
    };
    application_date: string;
    warranty_start_date?: string;
    warranty_end_date?: string;
    warranty_days_remaining?: number;
    warranty_percentage_remaining?: number;
    vehicle: {
        full_name: string;
        plate?: string;
    };
    dealer: {
        name: string;
        city: string;
        district: string;
        phone: string;
        email?: string;
    };
    customer: {
        id: number;
        full_name: string;
        phone: string;
        email?: string;
        address?: string;
    };
    applied_products: Array<{
        id: number;
        name: string;
        category: {
            value: string;
            label: string;
        };
        warranty_duration: string;
        applied_areas?: string[];
        notes?: string;
    }>;
    notes?: Array<{
        id: number;
        content: string;
        type: string;
        created_at: string;
        user?: {
            name: string;
        };
    }>;
}

interface ServiceInquiryIndexProps extends PageProps {
    service?: Service;
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

export default function ServiceInquiryIndex({ service }: ServiceInquiryIndexProps) {
    const { data, setData, post, processing, errors, clearErrors } = useForm({
        service_code: '',
    });
    
    const [isAddingNote, setIsAddingNote] = useState(false);
    
    // Note form state (manual state management for axios)
    const [noteFormData, setNoteFormData] = useState({
        content: '',
        type: 'INFO',
    });
    const [noteErrors, setNoteErrors] = useState<Record<string, string>>({});
    const [noteProcessing, setNoteProcessing] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors();
        
        // Submit form with proper options
        post(route('dealer.service-inquiry.search'), {
            preserveScroll: true,
            onError: (errors) => {
                console.log('Form submission errors:', errors);
            },
            onSuccess: () => {
                // Form will automatically show results on same page
            }
        });
    };

    const handleAddNote = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!service) return;
        
        setNoteProcessing(true);
        setNoteErrors({});

        try {
            // CSRF token'ı al
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            
            await axios.post(route('dealer.service-inquiry.add-note', service.id), noteFormData, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                }
            });
            
            // Başarılı ise form'u temizle
            setNoteFormData({ content: '', type: 'INFO' });
            setIsAddingNote(false);
            
            // Success toast göster
            toast.success('Not başarıyla eklendi!');
            
            // Sayfayı yenile ki notlar güncellensin
            router.reload({ only: ['service'] });
            
        } catch (error: any) {
            if (error.response?.data?.errors) {
                setNoteErrors(error.response.data.errors);
            } else {
                setNoteErrors({ 
                    content: error.response?.data?.message || 'Not eklenirken bir hata oluştu. Lütfen tekrar deneyin.' 
                });
            }
        } finally {
            setNoteProcessing(false);
        }
    };

    const handleNoteInputChange = (field: string, value: string) => {
        setNoteFormData(prev => ({ ...prev, [field]: value }));
        // Hata mesajını temizle
        if (noteErrors[field]) {
            setNoteErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'ACTIVE':
                return <CheckCircle className="h-4 w-4 text-green-600" />;
            case 'PENDING':
                return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
            case 'EXPIRED':
                return <XCircle className="h-4 w-4 text-red-600" />;
            default:
                return <Info className="h-4 w-4 text-blue-600" />;
        }
    };

    const getNoteTypeIcon = (type: string) => {
        switch (type) {
            case 'SUCCESS':
                return <CheckCircle className="h-4 w-4 text-green-600" />;
            case 'WARNING':
                return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
            case 'ERROR':
                return <XCircle className="h-4 w-4 text-red-600" />;
            default:
                return <Info className="h-4 w-4 text-blue-600" />;
        }
    };

    const handleNewSearch = () => {
        // Clear form and service data
        setData('service_code', '');
        clearErrors();
        // Reload page to clear service data
        window.location.href = route('dealer.service-inquiry.index');
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

                {/* Service Sonuçları */}
                {service && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold">Sorgu Sonucu</h2>
                            <Button onClick={handleNewSearch} variant="outline">
                                <Search className="mr-2 h-4 w-4" />
                                Yeni Sorgu
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                            {/* Ana Bilgiler */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Hizmet Durumu */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <FileText className="h-5 w-5" />
                                            Hizmet Durumu
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                {getStatusIcon(service.status.value)}
                                                <span className="font-medium">{service.status.label}</span>
                                            </div>
                                            <Badge variant={service.status.color as any}>
                                                {service.status.label}
                                            </Badge>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span className="text-muted-foreground">Başvuru Tarihi:</span>
                                                <p className="font-medium">{service.application_date}</p>
                                            </div>
                                            {service.warranty_start_date && (
                                                <div>
                                                    <span className="text-muted-foreground">Garanti Başlangıcı:</span>
                                                    <p className="font-medium">{service.warranty_start_date}</p>
                                                </div>
                                            )}
                                            {service.warranty_end_date && (
                                                <div>
                                                    <span className="text-muted-foreground">Garanti Bitişi:</span>
                                                    <p className="font-medium">{service.warranty_end_date}</p>
                                                </div>
                                            )}
                                            {service.warranty_days_remaining !== undefined && (
                                                <div>
                                                    <span className="text-muted-foreground">Kalan Garanti:</span>
                                                    <p className="font-medium">{service.warranty_days_remaining} gün</p>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Müşteri Bilgileri */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <User className="h-5 w-5" />
                                            Müşteri Bilgileri
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-semibold">{service.customer.full_name}</h3>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="flex items-center gap-2">
                                                <Phone className="h-4 w-4 text-muted-foreground" />
                                                <span>{service.customer.phone}</span>
                                            </div>
                                            {service.customer.email && (
                                                <div className="flex items-center gap-2">
                                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                                    <span>{service.customer.email}</span>
                                                </div>
                                            )}
                                            {service.customer.address && (
                                                <div className="flex items-center gap-2 md:col-span-2">
                                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                                    <span>{service.customer.address}</span>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Araç Bilgileri */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Car className="h-5 w-5" />
                                            Araç Bilgileri
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-semibold">{service.vehicle.full_name}</h3>
                                            {service.vehicle.plate && (
                                                <Badge variant="secondary">{service.vehicle.plate}</Badge>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Uygulanan Ürünler */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Package className="h-5 w-5" />
                                            Uygulanan Ürünler
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {service.applied_products.map((product) => (
                                                <div key={product.id} className="border rounded-lg p-4">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h4 className="font-medium">{product.name}</h4>
                                                        <Badge variant="outline">{product.category.label}</Badge>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground mb-2">
                                                        Garanti: {product.warranty_duration}
                                                    </p>
                                                    <div className="space-y-2">
                                                        <div>
                                                            <span className="text-sm font-medium">Uygulama Alanları:</span>
                                                            <div className="flex flex-wrap gap-1 mt-1">
                                                                {product.applied_areas && Array.isArray(product.applied_areas) ? (
                                                                    product.applied_areas.map((area, index) => (
                                                                        <Badge key={index} variant="secondary" className="text-xs">
                                                                            {area}
                                                                        </Badge>
                                                                    ))
                                                                ) : (
                                                                    <span className="text-sm text-muted-foreground">Belirtilmemiş</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {product.notes && (
                                                            <div>
                                                                <span className="text-sm font-medium">Notlar:</span>
                                                                <p className="text-sm text-muted-foreground mt-1">
                                                                    {product.notes}
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Notlar */}
                            <div className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <MessageSquare className="h-5 w-5" />
                                            Notlar
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <PermissionGuard permissions={[Permissions.service.add_note]}>
                                            <Button 
                                                onClick={() => setIsAddingNote(!isAddingNote)}
                                                className="w-full"
                                            >
                                                <Plus className="mr-2 h-4 w-4" />
                                                Not Ekle
                                            </Button>
                                        </PermissionGuard>

                                        {isAddingNote && (
                                            <form onSubmit={handleAddNote} className="space-y-4 p-4 border rounded-lg">
                                                <div className="space-y-2">
                                                    <Label htmlFor="type">Not Türü</Label>
                                                    <Select 
                                                        value={noteFormData.type} 
                                                        onValueChange={(value) => handleNoteInputChange('type', value)}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="INFO">Bilgi</SelectItem>
                                                            <SelectItem value="SUCCESS">Başarı</SelectItem>
                                                            <SelectItem value="WARNING">Uyarı</SelectItem>
                                                            <SelectItem value="ERROR">Hata</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    {noteErrors.type && (
                                                        <p className="text-sm text-red-500">{noteErrors.type}</p>
                                                    )}
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="content">Not İçeriği</Label>
                                                    <Textarea
                                                        id="content"
                                                        value={noteFormData.content}
                                                        onChange={(e) => handleNoteInputChange('content', e.target.value)}
                                                        placeholder="Not içeriğini yazın..."
                                                        rows={3}
                                                        required
                                                    />
                                                    {noteErrors.content && (
                                                        <p className="text-sm text-red-500">{noteErrors.content}</p>
                                                    )}
                                                </div>

                                                <div className="flex gap-2">
                                                    <Button type="submit" disabled={noteProcessing} size="sm">
                                                        {noteProcessing ? 'Ekleniyor...' : 'Ekle'}
                                                    </Button>
                                                    <Button 
                                                        type="button" 
                                                        variant="outline" 
                                                        size="sm"
                                                        onClick={() => setIsAddingNote(false)}
                                                    >
                                                        İptal
                                                    </Button>
                                                </div>
                                            </form>
                                        )}

                                        <div className="space-y-3">
                                            {service.notes && Array.isArray(service.notes) ? (
                                                service.notes.length > 0 ? (
                                                    service.notes.map((note) => (
                                                        <div key={note.id} className="border rounded-lg p-3">
                                                            <div className="flex items-start gap-2">
                                                                {getNoteTypeIcon(note.type)}
                                                                <div className="flex-1">
                                                                    <p className="text-sm">{note.content}</p>
                                                                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                                                                        <span>{note.user?.name || 'Bilinmeyen'}</span>
                                                                        <span>•</span>
                                                                        <span>{note.created_at}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="text-sm text-muted-foreground text-center py-4">
                                                        Henüz not eklenmemiş.
                                                    </p>
                                                )
                                            ) : (
                                                <p className="text-sm text-muted-foreground text-center py-4">
                                                    Notlar yüklenemedi.
                                                </p>
                                            )}
                                        </div>

                                        <PermissionGuard permissions={[Permissions.service.edit]}>
                                            <Link href={route('dealer.services.edit', service.id)} className="w-full">
                                                <Button variant="outline" className="w-full">
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Hizmeti Düzenle
                                                </Button>
                                            </Link>
                                        </PermissionGuard>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
} 