import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { ArrowRightLeft, Eye, Pencil, Plus, Trash2, WalletCards } from 'lucide-react';
import { useState } from 'react';

import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DeleteConfirmDialog } from '@/components/ui/confirm-dialog';
import { DataTable } from '@/components/ui/data-table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { PermissionGuard } from '@/lib/permission/PermissionGuard';
import Permissions from '@/lib/permission/modulePermissions';
import { BreadcrumbItem, DataTableMeta, PageProps } from '@/types';

interface CashBox {
    id: number;
    branch_id: number;
    name: string;
    type: string;
    currency: string;
    color: string;
    iban: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    branch: {
        id: number;
        name: string;
    };
    formatted_currency: string;
}

interface CashBoxesIndexProps extends PageProps {
    cashBoxes: {
        data: CashBox[];
        current_page: number;
        per_page: number;
        total: number;
        links: any;
    };
    dataTableMeta: DataTableMeta;
    branch: {
        id: number;
        name: string;
    };
    branchId: number;
    availableBranches: {
        id: number;
        name: string;
    }[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Ana Sayfa',
        href: route('dashboard'),
    },
    {
        title: 'Kasalar',
        href: route('cash-boxes.index'),
    },
];

export default function CashBoxesIndex({ cashBoxes, dataTableMeta, branch, branchId, availableBranches }: CashBoxesIndexProps) {
    const {
        auth: {
            user: { activeBranch },
        },
    } = usePage<PageProps>().props;
    const [isTransferDialogOpen, setIsTransferDialogOpen] = useState(false);
    const [transferCashBoxId, setTransferCashBoxId] = useState<number | null>(null);

    const handleDelete = (id: number) => {
        router.delete(route('cash-boxes.destroy', id), {
            onSuccess: () => {
                // Başarılı silme işlemi sonrası yapılacaklar
            },
        });
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        branch_id: '',
    });

    const openTransferDialog = (id: number) => {
        setTransferCashBoxId(id);
        setIsTransferDialogOpen(true);
        reset();
    };

    const handleTransfer = () => {
        if (!transferCashBoxId) return;

        post(route('cash-boxes.transfer', transferCashBoxId), {
            onSuccess: () => {
                setIsTransferDialogOpen(false);
                reset();
                setTransferCashBoxId(null);
            },
        });
    };

    const columns: ColumnDef<CashBox>[] = [
        {
            accessorKey: 'name',
            header: 'Kasa Adı',
            cell: ({ row }) => {
                return (
                    <div className="flex items-center gap-2">
                        <div className="size-3 rounded-full" style={{ backgroundColor: row.original.color }}></div>
                        <span>{row.original.name}</span>
                    </div>
                );
            },
        },
        {
            accessorKey: 'type',
            header: 'Kasa Tipi',
            cell: ({ row }) => {
                return <Badge variant="outline">{row.original.type === 'cash' ? 'Nakit Kasa' : 'Banka Hesabı'}</Badge>;
            },
        },
        {
            accessorKey: 'currency',
            header: 'Para Birimi',
            cell: ({ row }) => {
                return (
                    <Badge variant="outline">
                        {row.original.currency} {row.original.formatted_currency}
                    </Badge>
                );
            },
        },
        {
            accessorKey: 'iban',
            header: 'IBAN',
            cell: ({ row }) => {
                return row.original.iban ? <span>{row.original.iban}</span> : <span className="text-muted-foreground">-</span>;
            },
        },
        {
            accessorKey: 'is_active',
            header: 'Durum',
            cell: ({ row }) => {
                return row.original.is_active ? (
                    <Badge className="bg-green-500">Aktif</Badge>
                ) : (
                    <Badge variant="outline" className="text-muted-foreground">
                        Pasif
                    </Badge>
                );
            },
        },
        {
            accessorKey: 'created_at',
            header: 'Oluşturulma Tarihi',
            cell: ({ row }) => {
                return <span>{format(new Date(row.original.created_at), 'dd MMM yyyy', { locale: tr })}</span>;
            },
        },
        {
            id: 'actions',
            header: 'İşlemler',
            cell: ({ row }) => {
                return (
                    <div className="flex items-center gap-2">
                        <PermissionGuard permissions={[Permissions.cash_boxes.view]}>
                            <Link href={route('cash-boxes.show', row.original.id)}>
                                <Button size="sm" variant="outline">
                                    <Eye className="h-4 w-4" />
                                </Button>
                            </Link>
                        </PermissionGuard>
                        <PermissionGuard permissions={[Permissions.cash_boxes.view]}>
                            <Link href={route('cash-boxes.eod-sessions', row.original.id)}>
                                <Button size="sm" variant="outline" tooltip="Gün Sonu Raporları">
                                    <WalletCards className="h-4 w-4" />
                                </Button>
                            </Link>
                        </PermissionGuard>
                        <PermissionGuard permissions={[Permissions.cash_boxes.edit]}>
                            <Link href={route('cash-boxes.edit', row.original.id)}>
                                <Button size="sm" variant="outline">
                                    <Pencil className="h-4 w-4" />
                                </Button>
                            </Link>
                        </PermissionGuard>

                        <PermissionGuard permissions={[Permissions.cash_boxes.edit]}>
                            <Button size="sm" variant="outline" onClick={() => openTransferDialog(row.original.id)}>
                                <ArrowRightLeft className="h-4 w-4" />
                            </Button>
                        </PermissionGuard>

                        <PermissionGuard permissions={[Permissions.cash_boxes.delete]}>
                            <DeleteConfirmDialog
                                title="Kasayı Sil"
                                description="Bu kasayı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz."
                                onConfirm={() => handleDelete(row.original.id)}
                            >
                                <Button size="sm" variant="outline">
                                    <Trash2 className="text-destructive h-4 w-4" />
                                </Button>
                            </DeleteConfirmDialog>
                        </PermissionGuard>
                    </div>
                );
            },
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kasalar" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading
                    title={`${activeBranch?.name || branch?.name || 'Aktif Şube'} Şubesi Kasaları`}
                    description="Şubeye ait tüm kasaları görüntüleyebilirsiniz."
                    buttons={
                        <div className="flex items-center gap-2">
                            <PermissionGuard permissions={[Permissions.cash_boxes.create]}>
                                <Link href={route('cash-boxes.create')}>
                                    <Button>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Yeni Kasa
                                    </Button>
                                </Link>
                            </PermissionGuard>
                        </div>
                    }
                />

                <PermissionGuard permissions={[Permissions.cash_boxes.view]}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Kasalar Listesi</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <DataTable
                                columns={columns}
                                data={cashBoxes.data}
                                meta={dataTableMeta}
                                routeName="cash-boxes.index"
                                searchKey="name"
                                searchPlaceholder="Kasa adı ara..."
                                reloadProps={['cashBoxes', 'dataTableMeta']}
                            />
                        </CardContent>
                    </Card>
                </PermissionGuard>
            </div>

            {/* Global Transfer Dialog */}
            <Dialog open={isTransferDialogOpen} onOpenChange={setIsTransferDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Kasa Transfer Et</DialogTitle>
                        <DialogDescription>Kasayı başka bir şubeye transfer etmek için aşağıdan şube seçin.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <p className="text-sm font-medium">Mevcut Şube</p>
                            <p className="text-muted-foreground text-sm">{activeBranch?.name || 'Bilinmeyen Şube'}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm font-medium">Yeni Şube</p>
                            <Select value={data.branch_id} onValueChange={(value) => setData('branch_id', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Şube seçin" />
                                </SelectTrigger>
                                <SelectContent>
                                    {availableBranches
                                        .filter((b) => b.id !== (activeBranch?.id || 0))
                                        .map((branch) => (
                                            <SelectItem key={branch.id} value={branch.id.toString()}>
                                                {branch.name}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                            {errors.branch_id && <p className="text-sm text-red-500">{errors.branch_id}</p>}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" onClick={handleTransfer} disabled={processing || !data.branch_id}>
                            Transfer Et
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
