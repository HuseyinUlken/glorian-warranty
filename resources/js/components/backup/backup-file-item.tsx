import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { formatDate } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { Download, Lock, RotateCw } from 'lucide-react';

interface BackupFile {
    id: string;
    name: string;
    size: number;
    created_at: string;
    is_encrypted: boolean;
    path?: string;
}

interface BackupFileItemProps {
    file: BackupFile;
}

export default function BackupFileItem({ file }: BackupFileItemProps) {
    // Dosya boyutunu formatla
    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <TableRow>
            <TableCell className="font-medium">{file.name}</TableCell>
            <TableCell>{formatSize(file.size)}</TableCell>
            <TableCell>{formatDate(file.created_at)}</TableCell>
            <TableCell>
                {file.is_encrypted ? (
                    <div className="flex items-center">
                        <Lock className="mr-1 h-4 w-4 text-amber-500" />
                        <span>Evet</span>
                    </div>
                ) : (
                    <span>Hayır</span>
                )}
            </TableCell>
            <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                    <a href={route('backup-settings.download', { fileName: file.name })} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                        </Button>
                    </a>
                    <Link href={route('backup-settings.show-restore', { fileName: file.name })}>
                        <Button variant="outline" size="sm">
                            <RotateCw className="mr-1 h-4 w-4" />
                            Geri Yükle
                        </Button>
                    </Link>
                </div>
            </TableCell>
        </TableRow>
    );
}
