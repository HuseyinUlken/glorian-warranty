import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { formatDate } from '@/lib/utils';
import { BreadcrumbItem, PageProps } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Download, Trash2 } from 'lucide-react';

interface ExportedFile {
    id: number;
    filename: string;
    path: string;
    type: string;
    user_id: number;
    model_type: string | null;
    model_id: number | null;
    description: string | null;
    file_size: string | null;
    file_hash: string | null;
    downloaded_at: string | null;
    download_count: number;
    created_at: string;
    updated_at: string;
    user: {
        id: number;
        name: string;
    };
}

interface ShowProps extends PageProps {
    exportedFile: ExportedFile;
}
export default function Show({ exportedFile }: ShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Panel',
            href: route('dashboard'),
        },
        {
            title: 'Dışa Aktarılan Dosyalar',
            href: route('exported-files.index'),
        },
        {
            title: 'Dosya Detayları',
            href: route('exported-files.show', exportedFile.id),
        },
    ];
    const handleDelete = () => {
        if (confirm('Bu dosyayı silmek istediğinize emin misiniz?')) {
            router.delete(route('exported-files.destroy', exportedFile.id));
        }
    };

    const handleDownload = () => {
        window.location.href = route('exported-files.download', exportedFile.id);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dosya Detayları" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading
                    title="Dosya Detayları"
                    description="Bu sayfadan dışa aktarılan dosyanın detaylarını görüntüleyebilirsiniz."
                    buttons={
                        <>
                            <Button variant="outline" asChild>
                                <Link href={route('exported-files.index')}>
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Geri Dön
                                </Link>
                            </Button>
                            <Button variant="outline" onClick={handleDownload}>
                                <Download className="mr-2 h-4 w-4" />
                                İndir
                            </Button>
                            <Button variant="destructive" onClick={handleDelete}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Sil
                            </Button>
                        </>
                    }
                />

                <Card>
                    <CardHeader>
                        <CardTitle>Dosya Bilgileri</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <h3 className="text-muted-foreground mb-1 text-sm font-medium">Dosya Adı</h3>
                                <p className="text-base">{exportedFile.filename}</p>
                            </div>
                            <div>
                                <h3 className="text-muted-foreground mb-1 text-sm font-medium">Dosya Tipi</h3>
                                <p className="text-base">{exportedFile.type}</p>
                            </div>
                            <div>
                                <h3 className="text-muted-foreground mb-1 text-sm font-medium">Dosya Boyutu</h3>
                                <p className="text-base">{exportedFile.file_size || 'Belirtilmemiş'}</p>
                            </div>
                            <div>
                                <h3 className="text-muted-foreground mb-1 text-sm font-medium">İndirme Sayısı</h3>
                                <p className="text-base">{exportedFile.download_count}</p>
                            </div>
                            <div>
                                <h3 className="text-muted-foreground mb-1 text-sm font-medium">Oluşturan</h3>
                                <p className="text-base">{exportedFile.user.name}</p>
                            </div>
                            <div>
                                <h3 className="text-muted-foreground mb-1 text-sm font-medium">Oluşturulma Tarihi</h3>
                                <p className="text-base">{formatDate(exportedFile.created_at)}</p>
                            </div>
                            <div>
                                <h3 className="text-muted-foreground mb-1 text-sm font-medium">Son İndirme Tarihi</h3>
                                <p className="text-base">
                                    {exportedFile.downloaded_at ? formatDate(exportedFile.downloaded_at) : 'Henüz indirilmedi'}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-muted-foreground mb-1 text-sm font-medium">İlişkili Model</h3>
                                <p className="text-base">
                                    {exportedFile.model_type ? `${exportedFile.model_type.split('\\').pop()} (ID: ${exportedFile.model_id})` : 'Yok'}
                                </p>
                            </div>
                            <div className="md:col-span-2">
                                <h3 className="text-muted-foreground mb-1 text-sm font-medium">Açıklama</h3>
                                <p className="text-base">{exportedFile.description || 'Açıklama yok'}</p>
                            </div>
                            <div className="md:col-span-2">
                                <h3 className="text-muted-foreground mb-1 text-sm font-medium">Dosya Hash</h3>
                                <p className="font-mono text-base text-xs break-all">{exportedFile.file_hash || 'Belirtilmemiş'}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
