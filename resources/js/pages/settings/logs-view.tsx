import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { useEffect, useState } from 'react';

interface LogEntry {
    date: string;
    env: string;
    type: string;
    message: string;
    context: string;
    extra: string;
}

const LogsView = () => {
    const [logs, setLogs] = useState<Record<string, LogEntry[]>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<string>('');

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        try {
            setLoading(true);
            const response = await axios.get(route('logs.data'));
            const logsData = response.data.logs;
            setLogs(logsData);

            // İlk dosyayı aktif tab olarak ayarla
            const firstLogFile = Object.keys(logsData)[0];
            if (firstLogFile) {
                setActiveTab(firstLogFile);
            }

            setError(null);
        } catch (err) {
            console.error('Loglar yüklenirken hata oluştu:', err);
            setError('Loglar yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        } finally {
            setLoading(false);
        }
    };

    const getLogTypeColor = (type: string) => {
        switch (type.toLowerCase()) {
            case 'error':
                return 'bg-red-500';
            case 'warning':
                return 'bg-yellow-500';
            case 'info':
                return 'bg-blue-500';
            case 'debug':
                return 'bg-zinc-500';
            default:
                return 'bg-green-500';
        }
    };

    const formatLogDate = (dateStr: string) => {
        try {
            const date = new Date(dateStr);
            return format(date, 'dd.MM.yyyy HH:mm:ss', { locale: tr });
        } catch (e) {
            return dateStr;
        }
    };

    // JSON formatında olup olmadığını kontrol et
    const isJsonString = (str: string): boolean => {
        try {
            JSON.parse(str);
            return true;
        } catch (e) {
            return false;
        }
    };

    // JSON verisini recursive olarak render eden bileşen
    const JsonRenderer = ({ data, level = 0 }: { data: any; level?: number }) => {
        // Maksimum derinlik seviyesi
        if (level > 10) return <span className="text-red-500">Maksimum derinlik seviyesine ulaşıldı</span>;

        // Null veya undefined kontrolü
        if (data === null) return <span className="text-zinc-500">null</span>;
        if (data === undefined) return <span className="text-zinc-500">undefined</span>;

        // Veri tipine göre render
        if (typeof data === 'string') return <span className="text-green-600">"{data}"</span>;
        if (typeof data === 'number') return <span className="text-blue-600">{data}</span>;
        if (typeof data === 'boolean') return <span className="text-purple-600">{data ? 'true' : 'false'}</span>;

        // Array kontrolü
        if (Array.isArray(data)) {
            return (
                <div className="border-l-2 border-zinc-300 pl-4">
                    <span className="text-zinc-600">[</span>
                    {data.map((item, index) => (
                        <div key={index} className="pl-2">
                            <JsonRenderer data={item} level={level + 1} />
                            {index < data.length - 1 && <span className="text-zinc-600">,</span>}
                        </div>
                    ))}
                    <span className="text-zinc-600">]</span>
                </div>
            );
        }

        // Obje kontrolü
        if (typeof data === 'object') {
            const entries = Object.entries(data);
            return (
                <div className="border-l-2 border-zinc-300 pl-4">
                    <span className="text-zinc-600">{'{'}</span>
                    {entries.map(([key, value], index) => (
                        <div key={key} className="pl-2">
                            <span className="font-medium text-red-500">"{key}"</span>: <JsonRenderer data={value} level={level + 1} />
                            {index < entries.length - 1 && <span className="text-zinc-600">,</span>}
                        </div>
                    ))}
                    <span className="text-zinc-600">{'}'}</span>
                </div>
            );
        }

        // Diğer veri tipleri için
        return <span>{String(data)}</span>;
    };

    // İçeriği formatla
    const formatContent = (content: string) => {
        if (isJsonString(content)) {
            try {
                const jsonData = JSON.parse(content);
                return (
                    <div className="bg-muted max-h-[60vh] overflow-auto rounded-md p-4 font-mono text-sm">
                        <JsonRenderer data={jsonData} />
                    </div>
                );
            } catch (e) {
                return <p className="whitespace-pre-wrap">{content}</p>;
            }
        }
        return <p className="whitespace-pre-wrap">{content}</p>;
    };

    return (
        <AppLayout>
            <SettingsLayout>
                <Head title="Sistem Logları" />
                <div className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Sistem Logları</h2>
                        <p className="text-muted-foreground">Uygulama loglarını görüntüleyin ve hata ayıklama yapın.</p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Log Dosyaları</CardTitle>
                            <CardDescription>Sistem tarafından oluşturulan log dosyalarını görüntüleyin.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <div className="space-y-4">
                                    <Skeleton className="h-10 w-full" />
                                    <Skeleton className="h-40 w-full" />
                                </div>
                            ) : error ? (
                                <div className="rounded-md bg-red-100 p-4 text-red-700">{error}</div>
                            ) : Object.keys(logs).length === 0 ? (
                                <div className="rounded-md bg-yellow-100 p-4 text-yellow-700">Hiç log dosyası bulunamadı.</div>
                            ) : (
                                <Tabs value={activeTab} onValueChange={setActiveTab}>
                                    <TabsList className="mb-4 flex flex-wrap">
                                        {Object.keys(logs).map((filename) => (
                                            <TabsTrigger key={filename} value={filename} className="mb-2">
                                                {filename}
                                            </TabsTrigger>
                                        ))}
                                    </TabsList>

                                    {Object.entries(logs).map(([filename, entries]) => (
                                        <TabsContent key={filename} value={filename} className="space-y-4">
                                            <div className="text-muted-foreground mb-4 text-sm">{entries.length} log kaydı gösteriliyor</div>

                                            <div className="rounded-md border">
                                                <ScrollArea className="h-[600px]">
                                                    <Accordion type="multiple" className="w-full">
                                                        {entries.map((entry, index) => (
                                                            <AccordionItem key={index} value={`${filename}-${index}`}>
                                                                <AccordionTrigger className="px-4 hover:no-underline">
                                                                    <div className="flex items-center gap-3 text-left">
                                                                        {entry.type && (
                                                                            <Badge className={getLogTypeColor(entry.type)}>{entry.type}</Badge>
                                                                        )}
                                                                        <span className="font-mono text-xs">
                                                                            {entry.date ? formatLogDate(entry.date) : ''}
                                                                        </span>
                                                                        <span className="max-w-[500px] truncate">{entry.message}</span>
                                                                    </div>
                                                                </AccordionTrigger>
                                                                <AccordionContent className="px-4 pb-4">
                                                                    <div className="space-y-2">
                                                                        <div>
                                                                            <h4 className="mb-1 font-semibold">Mesaj:</h4>
                                                                            <div className="bg-muted rounded-md p-2">{entry.message}</div>
                                                                        </div>

                                                                        {entry.context && (
                                                                            <div>
                                                                                <h4 className="mb-1 font-semibold">Bağlam:</h4>
                                                                                <div className="bg-muted rounded-md p-2">
                                                                                    {formatContent(entry.context)}
                                                                                </div>
                                                                            </div>
                                                                        )}

                                                                        {entry.extra && (
                                                                            <div>
                                                                                <h4 className="mb-1 font-semibold">Ek Bilgi:</h4>
                                                                                <div className="bg-muted rounded-md p-2 font-mono text-sm">
                                                                                    {entry.extra}
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </AccordionContent>
                                                            </AccordionItem>
                                                        ))}
                                                    </Accordion>
                                                </ScrollArea>
                                            </div>
                                        </TabsContent>
                                    ))}
                                </Tabs>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
};

export default LogsView;
