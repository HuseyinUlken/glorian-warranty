import { Head, Link, router } from '@inertiajs/react';
import { Search, Shield, Home, ArrowRight, CheckCircle, Sparkles, Clock } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function WarrantyCheck() {
  const [serviceCode, setServiceCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!serviceCode || serviceCode.length !== 16) {
      setError('Garanti kodu 16 karakter olmalıdır.');
      return;
    }

    // Yeni sisteme göre direkt URL'ye yönlendir
    router.visit(`/warranty/${serviceCode}`);
  };

  const clearForm = () => {
    setServiceCode('');
    setError('');
  };

  return (
    <>
      <Head title="Garanti Sorgulama - Glorian" />
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
              <Link href={route("login")}>
                <Button size="sm">
                  Bayi Girişi
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center space-y-6 mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
                <Shield className="h-5 w-5" />
                <span className="font-medium">Garanti Sorgulama</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-900">
                Garanti Durumunuzu <br />
                <span className="text-primary">Hemen Öğrenin</span>
              </h1>
              
              <p className="text-xl text-slate-600 max-w-lg mx-auto">
                16 haneli garanti kodunuzu girerek ürününüzün detaylı garanti bilgilerine ulaşabilirsiniz.
              </p>
            </div>

            {/* Search Form */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                  <Search className="h-6 w-6 text-primary" />
                  Garanti Kodu Sorgulama
                </CardTitle>
                <p className="text-slate-600 mt-2">
                  Garanti kodunuz genellikle servis belgelerinizde yer alır
                </p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      type="text"
                      placeholder="ABCD1234EFGH5678"
                      className="text-center text-xl font-mono h-14 text-slate-900 placeholder:text-slate-400"
                      maxLength={16}
                      value={serviceCode}
                      onChange={(e) => setServiceCode(e.target.value.toUpperCase())}
                      autoFocus
                    />
                    <div className="text-center">
                      <span className="text-sm text-slate-500">
                        {serviceCode.length}/16 karakter
                      </span>
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center">
                      {error}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button
                      type="submit"
                      disabled={serviceCode.length !== 16}
                      className="flex-1 h-12 text-lg gap-2"
                    >
                      <Search className="h-5 w-5" />
                      Garanti Sorgula
                    </Button>
                    {serviceCode && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={clearForm}
                        className="h-12 px-6"
                      >
                        Temizle
                      </Button>
                    )}
                  </div>
                </form>

                {/* Info Cards */}
                <div className="grid gap-4 mt-8">
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-blue-900">Hızlı Sorgulama</div>
                      <div className="text-sm text-blue-700">
                        Garanti kodunuz ile anında sonuç alın
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                    <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-green-900">Güvenli Sistem</div>
                      <div className="text-sm text-green-700">
                        Verileriniz güvenli bir şekilde sorgulanır
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                    <Sparkles className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-purple-900">Detaylı Bilgi</div>
                      <div className="text-sm text-purple-700">
                        Garanti durumu, tarihler ve uygulanan ürünler
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Help Section */}
            <div className="text-center mt-12 space-y-4">
              <h3 className="text-lg font-semibold text-slate-900">
                Garanti kodunuzu bulamıyor musunuz?
              </h3>
              <p className="text-slate-600">
                Garanti kodunuz genellikle servis teslim belgelerinizde, 
                fatura üzerinde veya size gönderilen SMS/e-posta'da bulunur.
              </p>
              <div className="flex justify-center gap-4 mt-6">
                <Link href="/">
                  <Button variant="outline" className="gap-2">
                    <Home className="h-4 w-4" />
                    Ana Sayfa
                  </Button>
                </Link>
                <Button variant="outline" className="gap-2">
                  <ArrowRight className="h-4 w-4" />
                  Yardım
                </Button>
              </div>
            </div>
          </div>
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
    </>
  );
}