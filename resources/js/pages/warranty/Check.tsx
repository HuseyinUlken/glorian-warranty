import { Head } from '@inertiajs/react';
import { Search, Car, User, Building, Package, Shield, Calendar, AlertCircle } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Service } from '@/types/service';

interface WarrantyCheckProps {
    service?: Service;
    error?: string;
}

export default function WarrantyCheck({ service, error }: WarrantyCheckProps) {
    return (
        <>
            <Head title="Garanti Sorgulama" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Garanti Sorgulama
                        </h1>
                        <p className="text-lg text-gray-600">
                            Hizmet kodunuzu girerek garanti durumunuzu sorgulayabilirsiniz
                        </p>
                    </div>

                    {/* Search Form */}
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Search className="h-5 w-5" />
                                Garanti Sorgula
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form method="POST" action={route('warranty.check')} className="flex gap-4">
                                <div className="flex-1">
                                    <Label htmlFor="serviceCode" className="sr-only">
                                        Hizmet Kodu
                                    </Label>
                                    <Input
                                        id="serviceCode"
                                        name="service_code"
                                        type="text"
                                        placeholder="Hizmet kodunuzu giriniz (örn: ABCDEFGHIJKLMNOP)"
                                        className="text-center text-lg font-mono"
                                        maxLength={16}
                                        required
                                    />
                                </div>
                                <Button type="submit" size="lg">
                                    <Search className="mr-2 h-4 w-4" />
                                    Sorgula
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Error Message */}
                    {error && (
                        <Alert className="mb-8">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {/* Service Details */}
                    {service && (
                        <div className="space-y-6">
                            {/* Service Summary */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Shield className="h-5 w-5" />
                                        Garanti Durumu
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                                            <div className="text-sm font-medium text-blue-600">Hizmet Kodu</div>
                                            <div className="text-2xl font-bold font-mono">{service.service_code}</div>
                                        </div>
                                        <div className="text-center p-4 bg-green-50 rounded-lg">
                                            <div className="text-sm font-medium text-green-600">Durum</div>
                                            <Badge 
                                                variant={service.status.value === 'ACTIVE' ? 'default' : 'secondary'}
                                                className={`bg-${service.status.color}-500 text-white text-lg px-4 py-2`}
                                            >
                                                {service.status.label}
                                            </Badge>
                                        </div>
                                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                                            <div className="text-sm font-medium text-purple-600">Başvuru Tarihi</div>
                                            <div className="text-lg font-bold">{service.application_date}</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Warranty Information */}
                            {service.warranty.start_date && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Calendar className="h-5 w-5" />
                                            Garanti Bilgileri
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                                                <div className="text-sm font-medium text-blue-600">Başlangıç Tarihi</div>
                                                <div className="text-lg font-bold">{service.warranty.start_date}</div>
                                            </div>
                                            <div className="text-center p-4 bg-green-50 rounded-lg">
                                                <div className="text-sm font-medium text-green-600">Bitiş Tarihi</div>
                                                <div className="text-lg font-bold">{service.warranty.end_date}</div>
                                            </div>
                                            {service.warranty.days_remaining !== null && (
                                                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                                                    <div className="text-sm font-medium text-yellow-600">Kalan Gün</div>
                                                    <div className="text-lg font-bold">{service.warranty.days_remaining}</div>
                                                </div>
                                            )}
                                            {service.warranty.percentage_remaining !== null && (
                                                <div className="text-center p-4 bg-purple-50 rounded-lg">
                                                    <div className="text-sm font-medium text-purple-600">Kalan %</div>
                                                    <div className="text-lg font-bold">%{service.warranty.percentage_remaining.toFixed(1)}</div>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Customer Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="h-5 w-5" />
                                        Müşteri Bilgileri
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <div className="text-sm font-medium text-gray-500">Ad Soyad</div>
                                            <div className="text-lg font-semibold">{service.customer.full_name}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-gray-500">Telefon</div>
                                            <div className="text-lg">{service.customer.phone}</div>
                                        </div>
                                        {service.customer.email && (
                                            <div>
                                                <div className="text-sm font-medium text-gray-500">E-posta</div>
                                                <div className="text-lg">{service.customer.email}</div>
                                            </div>
                                        )}
                                        {service.customer.full_address && (
                                            <div>
                                                <div className="text-sm font-medium text-gray-500">Adres</div>
                                                <div className="text-lg">{service.customer.full_address}</div>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Dealer Information */}
                            {service.dealer && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Building className="h-5 w-5" />
                                            Bayi Bilgileri
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <div className="text-sm font-medium text-gray-500">Bayi Adı</div>
                                                <div className="text-lg font-semibold">{service.dealer.name}</div>
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-500">E-posta</div>
                                                <div className="text-lg">{service.dealer.email}</div>
                                            </div>
                                            {service.dealer.phone && (
                                                <div>
                                                    <div className="text-sm font-medium text-gray-500">Telefon</div>
                                                    <div className="text-lg">{service.dealer.phone}</div>
                                                </div>
                                            )}
                                            {(service.dealer.city || service.dealer.district) && (
                                                <div>
                                                    <div className="text-sm font-medium text-gray-500">Konum</div>
                                                    <div className="text-lg">
                                                        {service.dealer.city}
                                                        {service.dealer.district && `, ${service.dealer.district}`}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Vehicle Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Car className="h-5 w-5" />
                                        Araç Bilgileri
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        <div>
                                            <div className="text-sm font-medium text-gray-500">Araç</div>
                                            <div className="text-lg font-semibold">{service.vehicle.full_name}</div>
                                        </div>
                                        {service.vehicle.plate && (
                                            <div>
                                                <div className="text-sm font-medium text-gray-500">Plaka</div>
                                                <div className="text-lg">{service.vehicle.plate}</div>
                                            </div>
                                        )}
                                        {service.vehicle.color && (
                                            <div>
                                                <div className="text-sm font-medium text-gray-500">Renk</div>
                                                <div className="text-lg">{service.vehicle.color}</div>
                                            </div>
                                        )}
                                        {service.vehicle.package && (
                                            <div>
                                                <div className="text-sm font-medium text-gray-500">Paket</div>
                                                <div className="text-lg">{service.vehicle.package}</div>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Applied Products */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Package className="h-5 w-5" />
                                        Uygulanan Ürünler
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {service.applied_products.map((product, index) => (
                                            <div key={index} className="border rounded-lg p-4">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <h4 className="font-medium">{product.name}</h4>
                                                            <Badge 
                                                                variant="outline"
                                                                className={`border-${product.category.color}-200 text-${product.category.color}-700 bg-${product.category.color}-50`}
                                                            >
                                                                {product.category.label}
                                                            </Badge>
                                                        </div>
                                                        <div className="text-sm text-gray-600 mb-2">
                                                            Uygulanan Alanlar: {product.applied_areas.join(', ')}
                                                        </div>
                                                        {product.notes && (
                                                            <div className="text-sm">
                                                                <div className="font-medium">Notlar:</div>
                                                                <div className="text-gray-600">{product.notes}</div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
} 