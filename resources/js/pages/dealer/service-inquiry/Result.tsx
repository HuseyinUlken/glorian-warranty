import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { 
    Search, FileText, User, Car, Calendar, Package, 
    Edit, Plus, MessageSquare, CheckCircle, AlertTriangle, 
    Info, XCircle, ArrowLeft, Phone, Mail, MapPin 
} from 'lucide-react';
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
import { ServiceNoteTypeEnum } from '@/types';
import axios from 'axios';

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
    vehicle_full_name: string;
    vehicle_plate?: string;
    notes: string;
    dealer: {
        name: string;
        city: string;
        district: string;
        phone: string;
    };
    customer: {
        id: number;
        first_name: string;
        last_name: string;
        full_name: string;
        phone: string;
        email?: string;
        address?: string;
        city?: string;
        district?: string;
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

interface ServiceInquiryResultProps extends PageProps {
    service?: Service;
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
        title: 'Hizmet Sorgu',
        href: route('dealer.service-inquiry.index'),
    },
    {
        title: 'Sorgu Sonucu',
        href: '#',
    },
];

export default function ServiceInquiryResult({ service }: ServiceInquiryResultProps) {
    // Eğer service yoksa, ana sayfaya yönlendir
    if (!service) {
        return (
            <AppLayout>
                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                    <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">
                            Hizmet bilgileri bulunamadı. Lütfen hizmet kodunu tekrar sorgulayın.
                        </p>
                        <Link href={route('dealer.service-inquiry.index')}>
                            <Button>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Hizmet Sorgula
                            </Button>
                        </Link>
                    </div>
                </div>
            </AppLayout>
        );
    }
    const [isAddingNote, setIsAddingNote] = useState(false);
    const [noteFormData, setNoteFormData] = useState({
        content: '',
        type: 'INFO',
    });
    const [noteErrors, setNoteErrors] = useState<Record<string, string>>({});
    const [noteProcessing, setNoteProcessing] = useState(false);

    const handleAddNote = async (e: React.FormEvent) => {
        e.preventDefault();
        setNoteProcessing(true);
        setNoteErrors({});

        try {
            await axios.post(route('dealer.service-inquiry.add-note', service.id), noteFormData);
            
            // Başarılı ise sayfayı yenile
            router.reload();
            
            // Form'u temizle
            setNoteFormData({ content: '', type: 'INFO' });
            setIsAddingNote(false);
        } catch (error: any) {
            if (error.response?.data?.errors) {
                setNoteErrors(error.response.data.errors);
            } else {
                setNoteErrors({ content: 'Not eklenirken bir hata oluştu. Lütfen tekrar deneyin.' });
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Hizmet Sorgu - ${service.service_code}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading
                    title={`Hizmet: ${service.service_code}`}
                    description="Hizmet detayları ve notlar"
                    buttons={
                        <div className="flex gap-2">
                            <Link href={route('dealer.service-inquiry.index')}>
                                <Button variant="outline">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Yeni Sorgu
                                </Button>
                            </Link>
                            <PermissionGuard permissions={[Permissions.service.edit]}>
                                <Link href={route('dealer.services.edit', service.id)}>
                                    <Button variant="outline">
                                        <Edit className="mr-2 h-4 w-4" />
                                        Düzenle
                                    </Button>
                                </Link>
                            </PermissionGuard>
                        </div>
                    }
                />

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
                                    <h3 className="text-lg font-semibold">{service.vehicle_full_name}</h3>
                                    {service.vehicle_plate && (
                                        <Badge variant="secondary">{service.vehicle_plate}</Badge>
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
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 