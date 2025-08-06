import { Button } from '@/components/ui/button';
import { AlertTriangle, Loader2 } from 'lucide-react';

interface BackupRestoreConfirmationProps {
    fileName: string;
    onConfirm: () => void;
    onCancel: () => void;
    processing: boolean;
}

export default function BackupRestoreConfirmation({ fileName, onConfirm, onCancel, processing }: BackupRestoreConfirmationProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="mx-4 w-full max-w-md rounded-lg bg-white p-6">
                <div className="mb-4 flex items-center">
                    <div className="mr-3 rounded-full bg-red-100 p-2">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                    <h3 className="text-lg font-medium">Geri Yükleme Onayı</h3>
                </div>

                <div className="mb-6">
                    <p className="mb-4 text-zinc-700">
                        <strong>{fileName}</strong> dosyasından sistemi geri yüklemek üzeresiniz.
                    </p>
                    <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                        <p className="mb-1 font-medium">DİKKAT:</p>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>Bu işlem mevcut veritabanı ve dosyaların üzerine yazacaktır.</li>
                            <li>İşlem sırasında sistem geçici olarak kullanılamaz olabilir.</li>
                            <li>İşlem tamamlandıktan sonra oturumunuz sonlanabilir.</li>
                        </ul>
                    </div>
                </div>

                <div className="flex justify-end space-x-3">
                    <Button variant="outline" onClick={onCancel} disabled={processing}>
                        İptal
                    </Button>
                    <Button onClick={onConfirm} disabled={processing} className="bg-red-600 hover:bg-red-700">
                        {processing ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                İşleniyor...
                            </>
                        ) : (
                            'Onaylıyorum, Geri Yükle'
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
