import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DeleteConfirmDialog } from '@/components/ui/confirm-dialog';
import { DataTable } from '@/components/ui/data-table';
import AppLayout from '@/layouts/app-layout';
import { formatDate } from '@/lib/utils';
import { BreadcrumbItem, DataTableMeta, PageProps } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Download, Eye, Trash2 } from 'lucide-react';

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

interface ExportedFilesProps extends PageProps {
    exportedFiles: {
        data: ExportedFile[];
        links?: any[];
        meta?: {
            current_page: number;
            from: number;
            last_page: number;
            links: any[];
            path: string;
            per_page: number;
            to: number;
            total: number;
        };
    };
    dataTableMeta: DataTableMeta;
    filters: {
        type?: string;
        model_type?: string;
    };
    types: string[];
    modelTypes: string[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Panel',
        href: route('dashboard'),
    },
    {
        title: 'Dışa Aktarılan Dosyalar',
        href: route('exported-files.index'),
    },
];

export default function Index({ exportedFiles, dataTableMeta, filters, types, modelTypes }: ExportedFilesProps) {
    const handleDelete = (id: number) => {
        if (confirm('Bu dosyayı silmek istediğinize emin misiniz?')) {
            router.delete(route('exported-files.destroy', id));
        }
    };

    const handleDownload = (id: number) => {
        window.location.href = route('exported-files.download', id);
    };

    // Tablo sütunlarını tanımlayalım
    const columns: ColumnDef<ExportedFile>[] = [
        {
            accessorKey: 'id',
            header: 'ID',
        },
        {
            accessorKey: 'filename',
            header: 'Dosya Adı',
            cell: ({ row }) => (
                <Link href={route('exported-files.show', row.original.id)}>
                    <span className="block max-w-[200px] truncate">{row.original.filename}</span>
                </Link>
            ),
        },
        {
            accessorKey: 'file_size',
            header: 'Boyut',
        },
        {
            accessorKey: 'created_at',
            header: 'Oluşturulma Tarihi',
            cell: ({ row }) => <span>{formatDate(row.original.created_at)}</span>,
        },
        {
            accessorKey: 'download_count',
            header: 'İndirme Sayısı',
            cell: ({ row }) => <Badge variant={row.original.download_count > 0 ? 'default' : 'outline'}>{row.original.download_count}</Badge>,
        },
        {
            id: 'actions',
            header: 'İşlemler',
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleDownload(row.original.id)} title="İndir">
                        <Download className="h-4 w-4" />
                    </Button>
                    <Link href={route('exported-files.show', row.original.id)}>
                        <Button variant="outline" size="sm" title="Detaylar">
                            <Eye className="h-4 w-4" />
                        </Button>
                    </Link>
                    <DeleteConfirmDialog
                        onConfirm={() => handleDelete(row.original.id)}
                        description={`"${row.original.filename}" dosyasını silmek istediğinize emin misiniz?`}
                    >
                        <Button variant="destructive" size="sm" title="Sil">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </DeleteConfirmDialog>
                </div>
            ),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dışa Aktarılan Dosyalar" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading
                    title="Dışa Aktarılan Dosyalar"
                    description="Sistemden dışa aktarılan tüm dosyaları bu sayfadan yönetebilirsiniz."
                    buttons={null}
                />

                <Card>
                    <CardHeader>
                        <CardTitle>Dosya Listesi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DataTable
                            columns={columns}
                            data={exportedFiles.data}
                            meta={dataTableMeta}
                            routeName="exported-files.index"
                            searchKey="filename"
                            searchPlaceholder="Dosya adı, açıklama veya tip ara..."
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
