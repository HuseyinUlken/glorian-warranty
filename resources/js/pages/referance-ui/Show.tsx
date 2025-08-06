import { Head, Link, router, usePage, WhenVisible } from '@inertiajs/react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { ArrowLeft, Edit, Eye, Pencil, Trash2, WalletCards } from 'lucide-react';

import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DeleteConfirmDialog } from '@/components/ui/confirm-dialog';
import { DataTable } from '@/components/ui/data-table';
import { LoadingFallback } from '@/components/ui/loading-fallback';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { PermissionGuard } from '@/lib/permission/PermissionGuard';
import Permissions from '@/lib/permission/modulePermissions';
import { BreadcrumbItem, DataTableMeta, PageProps } from '@/types';
import { CashBoxReportProps } from '@/types/cashbox_report';
import { ColumnDef } from '@tanstack/react-table';
import { Package, TrendingUp } from 'lucide-react';
import { CustomerFinancialTransaction } from '../financial-transactions/types';
// import CashBoxDashboard from './components/Report';

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

interface ShowCashBoxProps extends CashBoxReportProps, PageProps {
    cashBox: CashBox;
    items: {
        data: CustomerFinancialTransaction[];
    };
    dataTableMeta: DataTableMeta;
    branchId: number;
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
    {
        title: 'Kasa Detayı',
        href: '#',
    },
];

export default function ShowCashBox({ cashBox, items, dataTableMeta }: ShowCashBoxProps) {
    const { report, transactions, paymentDetails } = usePage<ShowCashBoxProps>().props;
    const handleDelete = () => {
        router.delete(route('cash-boxes.destroy', cashBox.id));
    };
    const getStatusBadge = (status: string, statusLabel: string) => {
        switch (status) {
            case 'pending':
                return (
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                        {statusLabel}
                    </Badge>
                );
            case 'completed':
                return <Badge className="bg-green-500">{statusLabel}</Badge>;
            case 'cancelled':
                return <Badge variant="destructive">{statusLabel}</Badge>;
            case 'partially_paid':
                return <Badge className="bg-blue-500">{statusLabel}</Badge>;
            case 'bounced':
                return <Badge variant="destructive">{statusLabel}</Badge>;
            case 'protested':
                return <Badge variant="destructive">{statusLabel}</Badge>;
            default:
                return <Badge variant="outline">{statusLabel}</Badge>;
        }
    };

    const getPaymentMethodBadge = (method: string, methodLabel: string) => {
        switch (method) {
            case 'credit':
                return <Badge className="bg-teal-100 text-teal-800">{methodLabel}</Badge>;
            case 'cash':
                return <Badge className="bg-green-100 text-green-800">{methodLabel}</Badge>;
            case 'bank_transfer':
                return <Badge className="bg-blue-100 text-blue-800">{methodLabel}</Badge>;
            case 'credit_card':
                return <Badge className="bg-purple-100 text-purple-800">{methodLabel}</Badge>;
            case 'check':
                return <Badge className="bg-amber-100 text-amber-800">{methodLabel}</Badge>;
            case 'promissory_note':
                return <Badge className="bg-indigo-100 text-indigo-800">{methodLabel}</Badge>;
            default:
                return <Badge variant="outline">{methodLabel}</Badge>;
        }
    };

    const getTransactionTypeBadge = (type: string, typeLabel: string) => {
        switch (type) {
            case 'income':
                return <Badge className="bg-emerald-500">{typeLabel}</Badge>;
            case 'expense':
                return <Badge className="bg-rose-500">{typeLabel}</Badge>;
            default:
                return <Badge variant="outline">{typeLabel}</Badge>;
        }
    };
    const handleApprove = (id: number) => {
        router.post(route('financial-transactions.approve', id), {});
    };
    const columns: ColumnDef<CustomerFinancialTransaction>[] = [
        {
            accessorKey: 'formatted_transaction_date',
            header: 'İşlem Tarihi',
            cell: ({ row }) => {
                return <span>{row.original.formatted_transaction_date}</span>;
            },
        },
        {
            accessorKey: 'customer.name',
            header: 'Müşteri/Tedarikçi',
            cell: ({ row }) => {
                return row.original.customer ? <span>{row.original.customer.name}</span> : <span>-</span>;
            },
        },
        {
            accessorKey: 'transaction_type_label',
            header: 'İşlem Tipi',
            cell: ({ row }) => {
                return getTransactionTypeBadge(row.original.transaction_type, row.original.transaction_type_label);
            },
        },
        {
            accessorKey: 'payment_method_type_label',
            header: 'Ödeme Yöntemi',
            cell: ({ row }) => {
                return getPaymentMethodBadge(row.original.payment_method_type, row.original.payment_method_type_label);
            },
        },
        {
            accessorKey: 'formatted_amount',
            header: 'Tutar',
            cell: ({ row }) => {
                return <span>{row.original.formatted_amount}</span>;
            },
        },
        {
            accessorKey: 'formatted_due_date',
            header: 'Vade Tarihi',
            cell: ({ row }) => {
                return row.original.formatted_due_date ? <span>{row.original.formatted_due_date}</span> : <span>-</span>;
            },
        },
        {
            accessorKey: 'status_label',
            header: 'Durum',
            cell: ({ row }) => {
                return getStatusBadge(row.original.status, row.original.status_label);
            },
        },
        {
            id: 'actions',
            header: 'İşlemler',
            cell: ({ row }) => {
                return (
                    <div className="flex items-center gap-2">
                        <PermissionGuard permissions={[Permissions.financial_transactions.view]}>
                            <Link href={route('financial-transactions.show', row.original.id)}>
                                <Button size="sm" variant="outline">
                                    <Eye className="h-4 w-4" />
                                </Button>
                            </Link>
                        </PermissionGuard>

                        <PermissionGuard permissions={[Permissions.financial_transactions.edit]}>
                            <Link href={route('financial-transactions.edit', row.original.id)}>
                                <Button size="sm" variant="outline">
                                    <Pencil className="h-4 w-4" />
                                </Button>
                            </Link>
                        </PermissionGuard>
                    </div>
                );
            },
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Kasa: ${cashBox.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading
                    title={`Kasa: ${cashBox.name}`}
                    description="Kasa detaylarını görüntüleyebilirsiniz."
                    buttons={
                        <div className="flex gap-2">
                            <PermissionGuard permissions={[Permissions.cash_boxes.view]}>
                                <Link href={route('cash-boxes.eod-sessions', cashBox.id)}>
                                    <Button variant="outline" tooltip="Gün Sonu Raporları">
                                        <WalletCards className="mr-2 h-4 w-4" />
                                        Gün Sonu Raporları
                                    </Button>
                                </Link>
                            </PermissionGuard>
                            <PermissionGuard permissions={[Permissions.cash_boxes.view]}>
                                <Link href={route('cash-boxes.index')}>
                                    <Button variant="outline">
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Geri Dön
                                    </Button>
                                </Link>
                            </PermissionGuard>
                            <PermissionGuard permissions={[Permissions.cash_boxes.edit]}>
                                <Link href={route('cash-boxes.edit', cashBox.id)}>
                                    <Button variant="outline">
                                        <Edit className="mr-2 h-4 w-4" />
                                        Düzenle
                                    </Button>
                                </Link>
                            </PermissionGuard>
                            <PermissionGuard permissions={[Permissions.cash_boxes.delete]}>
                                <DeleteConfirmDialog
                                    title="Kasayı Sil"
                                    description="Bu kasayı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz."
                                    onConfirm={handleDelete}
                                >
                                    <Button variant="destructive">
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Sil
                                    </Button>
                                </DeleteConfirmDialog>
                            </PermissionGuard>
                        </div>
                    }
                />

                <Tabs defaultValue="transactions">
                    <div className="mb-2 flex justify-center">
                        <TabsList className="bg-muted flex gap-2 rounded-lg p-1">
                            <TabsTrigger value="transactions" className="px-4 py-2 text-sm">
                                <Package className="h-4 w-4" />
                                İşlemler
                            </TabsTrigger>
                            <TabsTrigger value="analytics" className="px-4 py-2 text-sm">
                                <TrendingUp className="h-4 w-4" />
                                Analiz
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value="analytics" className="mx-auto w-full space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Kasa Analiz Paneli</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <WhenVisible data={['report', 'transactions', 'paymentDetails']} fallback={<LoadingFallback />}>
                                    <CashBoxDashboard report={report} paymentDetails={paymentDetails} transactions={transactions} />
                                </WhenVisible>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="transactions" className="mx-auto w-full space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Kasa İşlemleri</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <DataTable
                                    columns={columns}
                                    data={items.data}
                                    meta={dataTableMeta}
                                    routeName="cash-boxes.show"
                                    routeParams={{ cash_box: cashBox.id }}
                                    searchKey="transaction_type_label"
                                    searchPlaceholder="Müşteri adı, açıklama veya belge no ara..."
                                    reloadProps={['items', 'dataTableMeta']}
                                />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Kasa Bilgileri */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Kasa Bilgileri</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="size-6 rounded-full" style={{ backgroundColor: cashBox.color }}></div>
                                <h3 className="text-xl font-semibold">{cashBox.name}</h3>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-zinc-500">Şube</h3>
                                <p className="mt-1">{cashBox.branch.name}</p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-zinc-500">Kasa Tipi</h3>
                                <p className="mt-1">
                                    <Badge variant="outline">{cashBox.type === 'cash' ? 'Nakit Kasa' : 'Banka Hesabı'}</Badge>
                                </p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-zinc-500">Para Birimi</h3>
                                <p className="mt-1">
                                    <Badge variant="outline">
                                        {cashBox.currency} {cashBox.formatted_currency}
                                    </Badge>
                                </p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-zinc-500">Durum</h3>
                                <p className="mt-1">
                                    {cashBox.is_active ? (
                                        <Badge className="bg-green-500">Aktif</Badge>
                                    ) : (
                                        <Badge variant="outline" className="text-muted-foreground">
                                            Pasif
                                        </Badge>
                                    )}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-zinc-500">Oluşturulma Tarihi</h3>
                                <p className="mt-1">{format(new Date(cashBox.created_at), 'dd MMMM yyyy HH:mm', { locale: tr })}</p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-zinc-500">Son Güncelleme</h3>
                                <p className="mt-1">{format(new Date(cashBox.updated_at), 'dd MMMM yyyy HH:mm', { locale: tr })}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Banka Hesabı Detayları */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Banka Hesabı Detayları</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {cashBox.type === 'bank_account' ? (
                                <>
                                    <div>
                                        <h3 className="text-sm font-medium text-zinc-500">IBAN</h3>
                                        <p className="mt-1 font-mono">{cashBox.iban || '-'}</p>
                                    </div>

                                    <div className="bg-muted mt-4 rounded-md p-4">
                                        <h3 className="mb-2 font-medium">Bilgi</h3>
                                        <p className="text-muted-foreground text-sm">
                                            Bu kasa bir banka hesabıdır. Banka hesapları için finansal işlemler ve raporlamalar farklı şekilde
                                            yönetilir.
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <div className="flex h-full items-center justify-center">
                                    <div className="text-center">
                                        <p className="text-muted-foreground">Bu kasa bir nakit kasadır. Banka hesabı detayları bulunmamaktadır.</p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
