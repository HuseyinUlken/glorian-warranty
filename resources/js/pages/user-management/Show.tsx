import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, Mail, Pencil, Phone } from 'lucide-react';

import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { PermissionGuard } from '@/lib/permission/PermissionGuard';
import Permissions from '@/lib/permission/modulePermissions';
import { BreadcrumbItem, PageProps } from '@/types';

interface Role {
    id: number;
    name: string;
    display_name?: string;
    key?: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    phone_number: string | null;
    avatar_url: string;
    roles: Role[];
    group?: {
        id: number;
        name: string;
        color: string;
    };
    created_at: string;
    updated_at: string;
}

interface ShowUserProps extends PageProps {
    user: User;
}

const getBreadcrumbs = (user: User): BreadcrumbItem[] => [
    {
        title: 'Ana Sayfa',
        href: route('dashboard'),
    },
    {
        title: 'Kullanıcı Yönetimi',
        href: route('user_management.index'),
    },
    {
        title: user.name,
        href: route('user_management.show', user.id || 0),
    },
];

const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Belirtilmemiş';
    return new Date(dateString).toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
};

export default function ShowUser({ user }: ShowUserProps) {
    return (
        <AppLayout breadcrumbs={getBreadcrumbs(user)}>
            <Head title={user.name} />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading
                    title={user.name}
                    description="Kullanıcı detaylarını görüntüleyebilirsiniz."
                    buttons={
                        <div className="flex gap-2">
                            <PermissionGuard permissions={[Permissions.userManagement.view]}>
                                <Link href={route('user_management.index')}>
                                    <Button variant="outline">
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Geri Dön
                                    </Button>
                                </Link>
                            </PermissionGuard>
                            <PermissionGuard permissions={[Permissions.userManagement.edit]}>
                                <Link href={route('user_management.edit', user.id)}>
                                    <Button variant="outline">
                                        <Pencil className="mr-2 h-4 w-4" />
                                        Düzenle
                                    </Button>
                                </Link>
                            </PermissionGuard>
                        </div>
                    }
                />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {/* Kullanıcı Bilgileri */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Kullanıcı Bilgileri</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <h3 className="text-sm font-medium text-zinc-500">Ad Soyad</h3>
                                    <p className="mt-1">{user.name}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-zinc-500">E-posta</h3>
                                    <div className="mt-1 flex items-center">
                                        <Mail className="mr-2 h-4 w-4 text-zinc-400" />
                                        <a href={`mailto:${user.email}`} className="text-blue-600 hover:underline">
                                            {user.email}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <h3 className="text-sm font-medium text-zinc-500">Telefon</h3>
                                    <div className="mt-1 flex items-center">
                                        <Phone className="mr-2 h-4 w-4 text-zinc-400" />
                                        {user.phone_number ? (
                                            <a href={`tel:${user.phone_number}`} className="text-blue-600 hover:underline">
                                                {user.phone_number}
                                            </a>
                                        ) : (
                                            <span className="text-zinc-500">Belirtilmemiş</span>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-zinc-500">Kayıt Tarihi</h3>
                                    <div className="mt-1 flex items-center">
                                        <Calendar className="mr-2 h-4 w-4 text-zinc-400" />
                                        <span>{formatDate(user.created_at)}</span>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <h3 className="text-sm font-medium text-zinc-500">Roller</h3>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {user.roles.map((role) => (
                                        <Badge key={role.id} variant="outline">
                                            {role.display_name || role.name}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            {user.group && (
                                <div>
                                    <h3 className="text-sm font-medium text-zinc-500">Grup</h3>
                                    <div className="mt-2 flex items-center gap-2">
                                        <div className="size-4 rounded-full" style={{ backgroundColor: user.group.color }}></div>
                                        <Badge variant="outline">{user.group.name}</Badge>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Profil Resmi */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Profil Resmi</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center">
                            <div className="h-40 w-40 overflow-hidden rounded-full bg-zinc-100">
                                {user.avatar_url ? (
                                    <img src={user.avatar_url} alt={`${user.name} profil resmi`} className="h-full w-full object-cover" />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-zinc-400">Resim yok</div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
