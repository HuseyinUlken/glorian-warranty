import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { PermissionGuard } from '@/lib/permission/PermissionGuard';
import Permissions from '@/lib/permission/modulePermissions';
import { BreadcrumbItem, PageProps } from '@/types';

interface Permission {
    id: number;
    name: string;
    display_name?: string;
}

interface Role {
    id: number;
    name: string;
    key?: string;
    display_name?: string;
    description?: string;
    guard_name: string;
    permissions: Permission[];
    created_at: string;
    updated_at: string;
}

interface RolesProps extends PageProps {
    roles: Role[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Ana Sayfa',
        href: route('dashboard'),
    },
    {
        title: 'Kullanıcı Yönetimi',
        href: route('user_management.index'),
    },
    {
        title: 'Roller',
        href: route('user_management.manage_roles'),
    },
];

export default function Roles({ roles }: RolesProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roller Yönetimi" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading
                    title="Roller Yönetimi"
                    description="Sistemdeki rolleri ve izinleri yönetmek için bu sayfayı kullanabilirsiniz."
                    buttons={
                        <div className="flex gap-2">
                            <PermissionGuard permissions={[Permissions.userManagement.view]}>
                                <Link href={route('user_management.index')}>
                                    <Button variant="outline">
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Kullanıcı Yönetimine Dön
                                    </Button>
                                </Link>
                            </PermissionGuard>
                        </div>
                    }
                />

                <PermissionGuard permissions={[Permissions.userManagement.manage_roles]}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Sistem Rolleri</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Rol Adı</TableHead>
                                        <TableHead>İzin Sayısı</TableHead>
                                        <TableHead>Oluşturulma Tarihi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {roles.map((role) => (
                                        <TableRow key={role.id}>
                                            <TableCell>{role.id}</TableCell>
                                            <TableCell>{role.name}</TableCell>
                                            <TableCell>{role.permissions.length}</TableCell>
                                            <TableCell>{new Date(role.created_at).toLocaleDateString('tr-TR')}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </PermissionGuard>

                <div className="mt-6">
                    <h2 className="mb-4 text-xl font-semibold">Rol İzinleri</h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {roles.map((role) => (
                            <Card key={role.id}>
                                <CardHeader>
                                    <CardTitle>{role.name}</CardTitle>
                                    {role.description && <p className="mt-1 text-sm text-zinc-500">{role.description}</p>}
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-medium text-zinc-500">İzinler</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {role.permissions.map((permission) => (
                                                <Badge key={permission.id} variant="outline">
                                                    {permission.display_name || permission.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
