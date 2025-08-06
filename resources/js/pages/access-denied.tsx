import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, ShieldAlert } from 'lucide-react';

interface AccessDeniedProps extends PageProps {
    module?: string;
    action?: string;
    backUrl?: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'home',
        href: route('dashboard'),
    },
    {
        title: 'Erişim Reddedildi',
        href: '#',
    },
];

export default function AccessDenied({ module, action, backUrl }: AccessDeniedProps) {
    const getModuleTitle = (moduleName?: string) => {
        if (!moduleName) return 'Bu sayfaya';

        const moduleNames: Record<string, string> = {
            students: 'Öğrenciler',
            instructors: 'Öğretim Elemanları',
            'specialization-fields': 'İhtisas Alanları',
            'exam-categories': 'Sınav Kategorileri',
            exams: 'Sınavlar',
            articles: 'Makaleler',
            'scientific-meetings': 'Bilimsel Toplantılar',
            'clinical-presentations': 'Klinik Sunumlar',
            theses: 'Tezler',
            universities: 'Üniversiteler',
            rotations: 'Rotasyonlar',
            categories: 'Kategoriler',
            competencies: 'Yetkinlikler',
            'curriculum-evaluations': 'Müfredat Değerlendirme',
            'student-evaluations': 'Öğrenci Değerlendirme',
        };

        return moduleNames[moduleName] || moduleName;
    };

    const getActionTitle = (actionName?: string) => {
        if (!actionName) return 'erişim';

        const actionNames: Record<string, string> = {
            index: 'listeleme',
            show: 'görüntüleme',
            create: 'oluşturma',
            store: 'kaydetme',
            edit: 'düzenleme',
            update: 'güncelleme',
            destroy: 'silme',
        };

        return actionNames[actionName] || actionName;
    };

    const moduleTitle = getModuleTitle(module);
    const actionTitle = getActionTitle(action);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Erişim Reddedildi" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card className="mx-auto max-w-md">
                    <CardHeader className="flex flex-col items-center space-y-2 pb-2 text-center">
                        <ShieldAlert className="mb-2 h-16 w-16 text-red-500" />
                        <CardTitle className="text-xl">Erişim Reddedildi</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="mb-6">
                            {moduleTitle} {actionTitle} için gerekli izinlere sahip değilsiniz.
                        </p>
                        <div className="flex justify-center">
                            <Link href={backUrl || route('dashboard')}>
                                <Button>
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Geri Dön
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
