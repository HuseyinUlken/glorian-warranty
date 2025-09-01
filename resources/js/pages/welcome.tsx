import { Head, Link } from '@inertiajs/react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Sparkles, Clock } from "lucide-react"

export default function GlorianLandingPage() {
  return (
    <>
      <Head title="Glorian - Görünmez Kalkan, Sonsuz Parlaklık" />
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src="/logos/glorian-light-logo.svg" alt="Glorian" className="h-8 w-auto" />
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#hizmetler" className="text-foreground hover:text-primary transition-colors">
                Hizmetler
              </a>
              <a href="#ozellikler" className="text-foreground hover:text-primary transition-colors">
                Özellikler
              </a>
              <a href="#garanti" className="text-foreground hover:text-primary transition-colors">
                Garanti
              </a>
              <Button variant="outline" size="sm">
                İletişim
              </Button>
              <Link href={route("login")}>
                <Button variant="default" size="sm">
                  Bayi Girişi
                </Button>
              </Link>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-6xl font-bold text-foreground text-balance">
                    Görünmez Kalkan, <span className="text-primary">Sonsuz Parlaklık</span>
                  </h1>
                  <p className="text-xl text-muted-foreground text-pretty max-w-lg">
                    Glorian'ın üstün PPF ve Cam Filmi teknolojisi ile aracınız ilk günkü gibi korunsun.
                  </p>
                </div>

                {/* Warranty Lookup */}
                <div className="bg-card p-6 rounded-lg border border-border space-y-4">
                  <h3 className="text-lg font-semibold text-card-foreground">Garanti Sorgulama</h3>
                  <div className="flex gap-3">
                    <Input placeholder="16 haneli garanti kodunuzu girin" className="flex-1" maxLength={16} />
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Sorgula</Button>
                  </div>
                  <p className="text-sm text-muted-foreground">Garanti kodunuz ile ürününüzün durumunu anında öğrenin</p>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full absolute inset-0 blur-3xl"></div>
                <img
                  src="/car.png"
                  alt="Glorian korumalı araç"
                  className="relative z-10 w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="hizmetler" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Glorian Koruması Nedir?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                Aracınızı korumak için en gelişmiş teknolojileri kullanıyoruz
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="border-border">
                <CardContent className="p-8 space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground">PPF Boya Koruma Filmi</h3>
                  <p className="text-muted-foreground">
                    Çiziklere, taş izlerine ve dış etkenlere karşı üstün koruma sağlar. Aracınızın boyasını ilk günkü gibi
                    korur.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-8 space-y-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground">Cam Filmi</h3>
                  <p className="text-muted-foreground">
                    UV ışınlarına karşı tam koruma sağlar. Konforlu ve güvenli sürüş deneyimi için ideal çözüm.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="ozellikler" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Neden Glorian?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                Teknoloji ve kalitede öncü çözümlerimizle farkı yaşayın
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Kristal Berraklığı</h3>
                <p className="text-muted-foreground">Filmin varlığı belli olmaz, aracınızın doğal güzelliği korunur</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Kendi Kendini Yenileme</h3>
                <p className="text-muted-foreground">Sıcaklıkla mikro çizikler kaybolur, film sürekli yenilenir</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Uzun Ömürlü Garanti</h3>
                <p className="text-muted-foreground">Merkezi sistemden sorgulanabilir, güvenilir garanti sistemi</p>
              </div>
            </div>
          </div>
        </section>

        {/* Warranty Process Section */}
        <section id="garanti" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Garanti Süreci Nasıl İşler?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                Basit 3 adımda garanti sisteminizi kullanın
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                  1
                </div>
                <h3 className="text-lg font-semibold text-foreground">Yetkili Bayide Uygulama</h3>
                <p className="text-muted-foreground">
                  Ürün yetkili bayilerimizde profesyonel ekiplerimiz tarafından uygulanır
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                  2
                </div>
                <h3 className="text-lg font-semibold text-foreground">Garanti Kodu Kaydı</h3>
                <p className="text-muted-foreground">
                  Benzersiz 16 haneli garanti kodunuz sisteme otomatik olarak kaydedilir
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                  3
                </div>
                <h3 className="text-lg font-semibold text-foreground">Online Sorgulama</h3>
                <p className="text-muted-foreground">Web sitemizden tek tıkla garanti durumunuzu sorgulayabilirsiniz</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto space-y-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">
                Aracınızın Garantisini Şimdi Kontrol Edin
              </h2>
              <p className="text-xl text-muted-foreground text-pretty">
                16 haneli garanti kodunuzla ürününüzün durumunu anında öğrenin
              </p>

              <div className="bg-card p-8 rounded-lg border border-border max-w-md mx-auto">
                <div className="space-y-4">
                  <Input placeholder="Garanti kodunuzu girin" className="text-center" maxLength={16} />
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Garanti Sorgula
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <img src="/logos/glorian-light-logo.svg" alt="Glorian" className="h-8 w-auto" />
                <p className="text-muted-foreground text-sm">Aracınızın korunması için en gelişmiş teknolojiler</p>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Hizmetler</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">
                      PPF Boya Koruma
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">
                      Cam Filmi
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">
                      Garanti Sistemi
                    </a>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Destek</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">
                      Garanti Sorgula
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">
                      Yetkili Bayiler
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">
                      İletişim
                    </a>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Yasal</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">
                      Gizlilik Politikası
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">
                      Kullanım Şartları
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary transition-colors">
                      Çerez Politikası
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-border mt-8 pt-8 text-center">
              <p className="text-muted-foreground text-sm">© 2024 Glorian. Tüm hakları saklıdır.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
