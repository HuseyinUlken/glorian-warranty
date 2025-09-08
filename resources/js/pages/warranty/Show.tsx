import { Head, Link } from '@inertiajs/react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Shield, 
  User, 
  Car, 
  Package, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Info, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  Clock,
  Building,
  ArrowLeft,
  Search,
  Home
} from "lucide-react"
import AppLayout from '@/layouts/app-layout'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'

interface Service {
  id: number;
  service_code: string;
  status: {
    value: string;
    label: string;
    color: string;
  };
  application_date: string;
  warranty: {
    start_date?: string;
    end_date?: string;
    days_remaining?: number;
    percentage_remaining?: number;
  };
  customer: {
    full_name: string;
    phone: string;
    email?: string;
    full_address?: string;
  };
  dealer?: {
    name: string;
    phone?: string;
    city?: string;
    district?: string;
  };
  vehicle: {
    full_name: string;
    plate?: string;
    color?: string;
    package?: string;
  };
  applied_products: Array<{
    id: number;
    name: string;
    category: {
      value: string;
      label: string;
      color?: string;
    };
    applied_areas?: string[];
    notes?: string;
  }>;
}

interface Props {
  service: Service;
  isAuthenticated: boolean;
}

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

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'ACTIVE':
      return 'bg-green-500 hover:bg-green-600';
    case 'PENDING':
      return 'bg-yellow-500 hover:bg-yellow-600';
    case 'EXPIRED':
      return 'bg-red-500 hover:bg-red-600';
    default:
      return 'bg-blue-500 hover:bg-blue-600';
  }
};

function GuestLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <img src="/logos/glorian-light-logo.svg" alt="Glorian" className="h-8 w-auto" />
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <Home className="h-4 w-4" />
                Ana Sayfa
              </Button>
            </Link>
            <Link href="/warranty">
              <Button variant="ghost" size="sm" className="gap-2">
                <Search className="h-4 w-4" />
                Garanti Sorgula
              </Button>
            </Link>
            <Link href={route("login")}>
              <Button size="sm">
                Bayi Girişi
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-slate-600">
            <p>© 2024 Glorian. Tüm hakları saklıdır.</p>
            <p className="mt-2">Garanti sorgulama sistemi</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function WarrantyShowContent({ service }: { service: Service }) {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd MMMM yyyy', { locale: tr });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium">Garanti Bilgileri Bulundu</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">
          Garanti Detayları
        </h1>
        <p className="text-lg text-slate-600">
          Hizmet kodu: <span className="font-mono font-bold">{service.service_code}</span>
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Service Status */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Garanti Durumu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  {getStatusIcon(service.status.value)}
                  <span className="font-medium">{service.status.label}</span>
                </div>
                <Badge className={`${getStatusBadgeClass(service.status.value)} text-white`}>
                  {service.status.label}
                </Badge>
              </div>

              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <div className="text-sm font-medium text-slate-600 mb-1">Başvuru Tarihi</div>
                <div className="flex items-center justify-center gap-1">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <span className="font-medium">{formatDate(service.application_date)}</span>
                </div>
              </div>

              {service.warranty.start_date && (
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="text-sm font-medium text-slate-600 mb-1">Garanti Başlangıç</div>
                  <div className="flex items-center justify-center gap-1">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <span className="font-medium">{formatDate(service.warranty.start_date)}</span>
                  </div>
                </div>
              )}

              {service.warranty.end_date && (
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="text-sm font-medium text-slate-600 mb-1">Garanti Bitiş</div>
                  <div className="flex items-center justify-center gap-1">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <span className="font-medium">{formatDate(service.warranty.end_date)}</span>
                  </div>
                </div>
              )}

              {service.warranty.days_remaining !== undefined && (
                <div className="text-center p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <div className="text-sm font-medium text-blue-600 mb-1">Kalan Süre</div>
                  <div className="flex items-center justify-center gap-1">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span className="font-bold text-blue-700">{service.warranty.days_remaining} gün</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Customer Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Müşteri Bilgileri
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="font-bold text-lg text-slate-900">{service.customer.full_name}</div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                <Phone className="h-4 w-4 text-slate-400" />
                <span className="font-medium">{service.customer.phone}</span>
              </div>
              
              {service.customer.email && (
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <span>{service.customer.email}</span>
                </div>
              )}
              
              {service.customer.full_address && (
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg border">
                  <MapPin className="h-4 w-4 text-slate-400 mt-0.5" />
                  <span className="text-sm leading-relaxed">{service.customer.full_address}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Vehicle Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5 text-primary" />
              Araç Bilgileri
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-lg text-slate-900">{service.vehicle.full_name}</span>
                {service.vehicle.plate && (
                  <Badge variant="secondary" className="font-mono">
                    {service.vehicle.plate}
                  </Badge>
                )}
              </div>
              
              <div className="grid grid-cols-1 gap-2 text-sm">
                {service.vehicle.color && (
                  <div className="text-slate-600">
                    <span className="font-medium">Renk:</span> {service.vehicle.color}
                  </div>
                )}
                {service.vehicle.package && (
                  <div className="text-slate-600">
                    <span className="font-medium">Paket:</span> {service.vehicle.package}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Applied Products */}
      {service.applied_products && service.applied_products.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Uygulanan Ürünler
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {service.applied_products.map((product, index) => (
                <div key={index} className="p-4 bg-slate-50 rounded-lg border">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-slate-900">{product.name}</h4>
                    <Badge variant="outline">{product.category.label}</Badge>
                  </div>
                  
                  {product.applied_areas && product.applied_areas.length > 0 && (
                    <div className="mb-2">
                      <div className="text-sm font-medium text-slate-600 mb-1">Uygulanan Alanlar:</div>
                      <div className="text-sm text-slate-700">
                        {product.applied_areas.join(', ')}
                      </div>
                    </div>
                  )}
                  
                  {product.notes && (
                    <div>
                      <div className="text-sm font-medium text-slate-600 mb-1">Notlar:</div>
                      <div className="text-sm text-slate-700 italic">
                        {product.notes}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dealer Info */}
      {service.dealer && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-primary" />
              Yetkili Bayi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="font-bold text-lg text-slate-900 mb-3">{service.dealer.name}</div>
              
              <div className="grid gap-3">
                {service.dealer.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-slate-400" />
                    <span>{service.dealer.phone}</span>
                  </div>
                )}
                
                {(service.dealer.city || service.dealer.district) && (
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <span>
                      {service.dealer.city}
                      {service.dealer.district && `, ${service.dealer.district}`}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex justify-center gap-4 pt-6">
        <Link href="/warranty">
          <Button variant="outline" className="gap-2">
            <Search className="h-4 w-4" />
            Yeni Sorgulama
          </Button>
        </Link>
        <Link href="/">
          <Button variant="outline" className="gap-2">
            <Home className="h-4 w-4" />
            Ana Sayfa
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function WarrantyShow({ service, isAuthenticated }: Props) {
  if (isAuthenticated) {
    // Auth kullanıcı için panel layout
    return (
      <AppLayout breadcrumbs={[
        { title: 'Garanti Sorgulama', href: '/warranty' },
        { title: service.service_code, href: '#' }
      ]}>
        <Head title={`Garanti Detayı - ${service.service_code}`} />
        <WarrantyShowContent service={service} />
      </AppLayout>
    );
  } else {
    // Guest kullanıcı için özel layout
    return (
      <GuestLayout>
        <Head title={`Garanti Detayı - ${service.service_code}`} />
        <WarrantyShowContent service={service} />
      </GuestLayout>
    );
  }
}
