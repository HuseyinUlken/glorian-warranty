import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { formatDate } from '@/lib/utils';
import { PageProps } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { AlertCircle, Loader2, Save } from 'lucide-react';
import { useState } from 'react';
import BackupFileItem from '../../components/backup/backup-file-item';

interface BackupFile {
    id: string;
    name: string;
    size: number;
    created_at: string;
    is_encrypted: boolean;
}

interface BackupSettingsProps extends PageProps {
    backupFiles: BackupFile[];
    lastBackup: string | null;
    flash?: {
        success?: string;
        error?: string;
    };
}

export default function BackupSettings({ backupFiles, lastBackup, flash }: BackupSettingsProps) {
    const [creating, setCreating] = useState(false);
    const { post, processing } = useForm();

    const handleCreateBackup = () => {
        if (confirm('Yeni bir yedek oluşturmak istediğinizden emin misiniz?')) {
            setCreating(true);
            post(route('backup-settings.create'), {
                onSuccess: () => {
                    setCreating(false);
                },
                onError: () => {
                    setCreating(false);
                },
            });
        }
    };

    return (
        <AppLayout>
            <Head title="Yedekleme Ayarları" />

            <SettingsLayout>
                <div className="space-y-6">
                    {flash?.success && (
                        <Alert className="border-green-200 bg-green-50">
                            <AlertCircle className="h-4 w-4 text-green-600" />
                            <AlertTitle className="text-green-800">Başarılı</AlertTitle>
                            <AlertDescription className="text-green-700">{flash.success}</AlertDescription>
                        </Alert>
                    )}

                    {flash?.error && (
                        <Alert className="border-red-200 bg-red-50">
                            <AlertCircle className="h-4 w-4 text-red-600" />
                            <AlertTitle className="text-red-800">Hata</AlertTitle>
                            <AlertDescription className="text-red-700">{flash.error}</AlertDescription>
                        </Alert>
                    )}

                    <Card>
                        <CardHeader>
                            <CardTitle>Yedekleme Yönetimi</CardTitle>
                            <CardDescription>
                                Sistem yedeklerini oluşturabilir ve geri yükleyebilirsiniz. Yedekler Google Drive'a kaydedilir.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-medium">Yedekleme İşlemleri</h3>
                                        <p className="text-sm text-zinc-500">
                                            {lastBackup ? <>Son yedekleme: {formatDate(lastBackup)}</> : <>Henüz yedekleme yapılmamış</>}
                                        </p>
                                    </div>
                                    <Button onClick={handleCreateBackup} disabled={creating || processing}>
                                        {creating ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Yedekleniyor...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="mr-2 h-4 w-4" />
                                                Yeni Yedek Oluştur
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>

                            <div className="mt-6">
                                <h3 className="mb-4 text-lg font-medium">Mevcut Yedekler</h3>
                                {backupFiles.length === 0 ? (
                                    <div className="py-8 text-center text-zinc-500">Henüz yedek bulunmuyor</div>
                                ) : (
                                    <div className="overflow-hidden rounded-md border">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Dosya Adı</TableHead>
                                                    <TableHead>Boyut</TableHead>
                                                    <TableHead>Oluşturulma Tarihi</TableHead>
                                                    <TableHead>Şifreli</TableHead>
                                                    <TableHead className="text-right">İşlemler</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {backupFiles.map((file) => (
                                                    <BackupFileItem key={file.id} file={file} />
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
