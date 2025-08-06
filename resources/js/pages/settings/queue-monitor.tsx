import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table/data-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { BreadcrumbItem, DataTableMeta, PageProps } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { CheckCircle2, Play, RefreshCw, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
interface Job {
    id: number;
    queue: string;
    job_name: string;
    attempts: number;
    reserved: string;
    available_at: string;
    created_at: string;
}

interface FailedJob {
    id: number;
    uuid: string;
    connection: string;
    queue: string;
    job_name: string;
    failed_at: string;
    exception: string;
}

interface QueueMonitorProps extends PageProps {
    jobsDataTableMeta: {
        data: {
            data: Job[];
        };
        meta: DataTableMeta;
    };
    failedJobsDataTableMeta: {
        data: {
            data: FailedJob[];
        };
        meta: DataTableMeta;
    };
    queueStats: {
        pending: number;
        failed: number;
    };
}
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kuyruk İzleme',
        href: '/settings/queue-monitor',
    },
];
export default function QueueMonitor({ jobsDataTableMeta, failedJobsDataTableMeta, queueStats }: QueueMonitorProps) {
    const { flash } = usePage().props as any;
    const [activeTab, setActiveTab] = useState('pending');

    // Bekleyen işler için tablo sütunları
    const jobsColumns = useMemo<ColumnDef<Job>[]>(
        () => [
            {
                accessorKey: 'id',
                header: 'ID',
            },
            {
                accessorKey: 'job_name',
                header: 'İş Adı',
            },
            {
                accessorKey: 'queue',
                header: 'Kuyruk',
            },
            {
                accessorKey: 'attempts',
                header: 'Deneme',
            },
            {
                accessorKey: 'reserved',
                header: 'Rezerve',
            },
            {
                accessorKey: 'available_at',
                header: 'Uygun Zaman',
            },
            {
                accessorKey: 'created_at',
                header: 'Oluşturulma',
            },
            {
                id: 'actions',
                cell: ({ row }) => {
                    const job = row.original;
                    return (
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleRunJob(job.id)}>
                                <Play className="mr-2 h-4 w-4" />
                                Çalıştır
                            </Button>
                        </div>
                    );
                },
                header: 'İşlemler',
            },
        ],
        [],
    );

    // Başarısız işler için tablo sütunları
    const failedJobsColumns = useMemo<ColumnDef<FailedJob>[]>(
        () => [
            {
                accessorKey: 'id',
                header: 'ID',
            },
            {
                accessorKey: 'job_name',
                header: 'İş Adı',
            },
            {
                accessorKey: 'queue',
                header: 'Kuyruk',
            },
            {
                accessorKey: 'failed_at',
                header: 'Başarısız Zamanı',
            },
            {
                id: 'actions',
                cell: ({ row }) => {
                    const job = row.original;
                    return (
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleRetry(job.id)}>
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Yeniden Dene
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDelete(job.id)}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Sil
                            </Button>
                        </div>
                    );
                },
                header: 'İşlemler',
            },
        ],
        [],
    );

    const handleRetry = (id: number) => {
        router.post(route('queue-monitor.retry'), { id });
    };

    const handleRetryAll = () => {
        router.post(route('queue-monitor.retry-all'));
    };

    const handleDelete = (id: number) => {
        router.post(route('queue-monitor.delete'), { id });
    };

    const handleClearAll = () => {
        router.post(route('queue-monitor.clear-all'));
    };

    const handleRunJob = (id: number) => {
        router.post(route('queue-monitor.run-job'), { id });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <SettingsLayout>
                <Head title="Kuyruk İzleme" />

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold tracking-tight">Kuyruk İzleme</h2>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => router.reload()}>
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Yenile
                            </Button>
                        </div>
                    </div>

                    {flash.success && (
                        <Alert className="border-green-200 bg-green-50">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            <AlertTitle className="text-green-600">Başarılı</AlertTitle>
                            <AlertDescription className="text-green-600">{flash.success}</AlertDescription>
                        </Alert>
                    )}

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle>Bekleyen İşler</CardTitle>
                                <CardDescription>Kuyruktaki işlem sayısı</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">{queueStats.pending}</div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle>Başarısız İşler</CardTitle>
                                <CardDescription>Başarısız işlem sayısı</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">{queueStats.failed}</div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle>Mail Durumu</CardTitle>
                                <CardDescription>Mail gönderim durumu</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center">
                                    <Badge variant={queueStats.pending > 0 ? 'outline' : 'secondary'}>
                                        {queueStats.pending > 0 ? 'İşleniyor' : 'Hazır'}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="pending">Bekleyen İşler</TabsTrigger>
                            <TabsTrigger value="failed">Başarısız İşler</TabsTrigger>
                        </TabsList>

                        <TabsContent value="pending" className="mt-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Bekleyen İşler</CardTitle>
                                    <CardDescription>Kuyruktaki işlemlerin listesi</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {jobsDataTableMeta.data.data.length === 0 ? (
                                        <div className="py-6 text-center text-zinc-500">Kuyruğa eklenmiş bekleyen iş bulunmuyor.</div>
                                    ) : (
                                        <DataTable
                                            columns={jobsColumns}
                                            data={jobsDataTableMeta.data.data}
                                            meta={jobsDataTableMeta.meta}
                                            routeName="queue-monitor.index"
                                            searchKey="id"
                                        />
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="failed" className="mt-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div>
                                        <CardTitle>Başarısız İşler</CardTitle>
                                        <CardDescription>Başarısız olan işlemlerin listesi</CardDescription>
                                    </div>
                                    <div className="flex gap-2">
                                        {failedJobsDataTableMeta.data.data.length > 0 && (
                                            <>
                                                <Button variant="outline" size="sm" onClick={handleRetryAll}>
                                                    <RefreshCw className="mr-2 h-4 w-4" />
                                                    Tümünü Yeniden Dene
                                                </Button>
                                                <Button variant="destructive" size="sm" onClick={handleClearAll}>
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Tümünü Temizle
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {failedJobsDataTableMeta.data.data.length === 0 ? (
                                        <div className="py-6 text-center text-zinc-500">Başarısız iş bulunmuyor.</div>
                                    ) : (
                                        <DataTable
                                            columns={failedJobsColumns}
                                            data={failedJobsDataTableMeta.data.data}
                                            meta={failedJobsDataTableMeta.meta}
                                            routeName="queue-monitor.index"
                                            searchKey="id"
                                        />
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Mail log gösterimini kaldırdık */}
                    </Tabs>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
