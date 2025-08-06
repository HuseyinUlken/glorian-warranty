import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { formatDate } from '@/lib/utils';
import { PageProps } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { AlertCircle, ArrowLeft, Loader2, RotateCw, Shield } from 'lucide-react';
import React, { useState } from 'react';
import BackupRestoreConfirmation from '../../components/backup/backup-restore-confirmation';

interface BackupFile {
    id: string;
    name: string;
    size: number;
    created_at: string;
    is_encrypted: boolean;
    path?: string;
}

interface BackupRestoreProps extends PageProps {
    backupFile: BackupFile;
    flash?: {
        success?: string;
        error?: string;
    };
}

export default function BackupRestore({ backupFile, flash }: BackupRestoreProps) {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        file_name: backupFile.name,
        password: '',
        backup_password: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowConfirmation(true);
    };

    const handleConfirmRestore = () => {
        post(route('backup-settings.restore'));
    };

    // Dosya boyutunu formatla
    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <AppLayout>
            <Head title="Yedek Geri Yükleme" />

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

                    <div className="mb-4 flex items-center">
                        <Link href={route('backup-settings.index')}>
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="mr-1 h-4 w-4" />
                                Geri Dön
                            </Button>
                        </Link>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Yedek Geri Yükleme</CardTitle>
                            <CardDescription>
                                Seçilen yedek dosyasını sisteme geri yükleyin. Bu işlem mevcut verilerin üzerine yazacaktır.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-6 rounded-md border border-amber-200 bg-amber-50 p-4">
                                <div className="flex items-start">
                                    <AlertCircle className="mt-0.5 mr-2 h-5 w-5 text-amber-600" />
                                    <div>
                                        <h3 className="font-medium text-amber-800">Dikkat</h3>
                                        <p className="text-sm text-amber-700">
                                            Geri yükleme işlemi mevcut veritabanı ve dosyalarınızın üzerine yazacaktır. İşlem öncesinde mevcut
                                            verilerinizi manuel olarak yedeklemeniz önerilir.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="mb-2 text-lg font-medium">Yedek Dosya Bilgileri</h3>
                                <div className="grid grid-cols-2 gap-4 rounded-md border bg-zinc-50 p-4">
                                    <div>
                                        <p className="text-sm font-medium text-zinc-500">Dosya Adı</p>
                                        <p>{backupFile.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-zinc-500">Boyut</p>
                                        <p>{formatSize(backupFile.size)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-zinc-500">Oluşturulma Tarihi</p>
                                        <p>{formatDate(backupFile.created_at)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-zinc-500">Şifreli</p>
                                        <p>{backupFile.is_encrypted ? 'Evet' : 'Hayır'}</p>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="flex items-center">
                                        <Shield className="mr-1 h-4 w-4 text-blue-500" />
                                        Kullanıcı Şifreniz
                                    </Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Güvenlik için şifrenizi girin"
                                        required
                                    />
                                    {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                                    <p className="text-xs text-zinc-500">
                                        Güvenlik nedeniyle, geri yükleme işlemi için şifrenizi girmeniz gerekmektedir.
                                    </p>
                                </div>

                                {backupFile.is_encrypted && (
                                    <div className="space-y-2">
                                        <Label htmlFor="backup_password">Yedek Dosyası Şifresi</Label>
                                        <Input
                                            id="backup_password"
                                            type="password"
                                            value={data.backup_password}
                                            onChange={(e) => setData('backup_password', e.target.value)}
                                            placeholder="Yedek dosyasının şifresini girin"
                                            required
                                        />
                                        {errors.backup_password && <p className="text-sm text-red-500">{errors.backup_password}</p>}
                                        <p className="text-xs text-zinc-500">
                                            Bu yedek dosyası şifrelidir. Geri yükleme için dosya şifresini girmeniz gerekmektedir.
                                        </p>
                                    </div>
                                )}

                                <div className="flex justify-end pt-4">
                                    <Button type="submit" disabled={processing} className="bg-amber-600 hover:bg-amber-700">
                                        {processing ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                İşleniyor...
                                            </>
                                        ) : (
                                            <>
                                                <RotateCw className="mr-2 h-4 w-4" />
                                                Geri Yüklemeyi Başlat
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {showConfirmation && (
                    <BackupRestoreConfirmation
                        fileName={backupFile.name}
                        onConfirm={handleConfirmRestore}
                        onCancel={() => setShowConfirmation(false)}
                        processing={processing}
                    />
                )}
            </SettingsLayout>
        </AppLayout>
    );
}
