import { Head, Link, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Eye, Pencil, Plus, Settings, Trash2 } from 'lucide-react';

import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DeleteConfirmDialog } from '@/components/ui/confirm-dialog';
import { DataTable } from '@/components/ui/data-table';
import AppLayout from '@/layouts/app-layout';
import { PermissionGuard } from '@/lib/permission/PermissionGuard';
import Permissions from '@/lib/permission/modulePermissions';
import { BreadcrumbItem, DataTableMeta, PageProps } from '@/types';

interface User {
    id: number;
    name: string;
    email: string;
    phone_number: string | null;
    avatar_url: string;
    roles: {
        id: number;
        name: string;
        display_name?: string;
        key?: string;
    }[];
    group?: {
        id: number;
        name: string;
        color: string;
    };
    created_at: string;
    updated_at: string;
}

interface UserManagementIndexProps extends PageProps {
    users: {
        data: User[];
        current_page: number;
        per_page: number;
        total: number;
        links: any;
    };
    dataTableMeta: DataTableMeta;
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
];

export default function UserManagementIndex({ users, dataTableMeta }: UserManagementIndexProps) {
    const columns: ColumnDef<User>[] = [
        {
            accessorKey: 'id',
            header: 'ID',
        },
        {
            accessorKey: 'name',
            header: 'Ad Soyad',
        },
        {
            accessorKey: 'email',
            header: 'E-posta',
        },
        {
            accessorKey: 'phone_number',
            header: 'Telefon',
            cell: ({ row }) => row.original.phone_number || '-',
        },
        {
            accessorKey: 'roles',
            header: 'Roller',
            cell: ({ row }) => (
                <div className="flex flex-wrap gap-1">
                    {row.original.roles.map((role) => (
                        <Badge key={role.id} variant="outline">
                            {role.display_name || role.name}
                        </Badge>
                    ))}
                </div>
            ),
        },
        {
            accessorKey: 'group',
            header: 'Grup',
            cell: ({ row }) => {
                const group = row.original.group;
                if (!group) return <span className="text-muted-foreground">-</span>;

                return (
                    <div className="flex items-center gap-2">
                        <div className="size-3 rounded-full" style={{ backgroundColor: group.color }}></div>
                        <Badge variant="outline">{group.name}</Badge>
                    </div>
                );
            },
        },
        {
            id: 'actions',
            header: 'İşlemler',
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <PermissionGuard permissions={[Permissions.userManagement.view]}>
                        <Link href={route('user_management.show', row.original.id)}>
                            <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                            </Button>
                        </Link>
                    </PermissionGuard>
                    <PermissionGuard permissions={[Permissions.userManagement.edit]}>
                        <Link href={route('user_management.edit', row.original.id)}>
                            <Button variant="outline" size="sm">
                                <Pencil className="h-4 w-4" />
                            </Button>
                        </Link>
                    </PermissionGuard>
                    <PermissionGuard permissions={[Permissions.userManagement.delete]}>
                        <DeleteConfirmDialog
                            onConfirm={() => handleDelete(row.original.id)}
                            description={`"${row.original.name}" kullanıcısını silmek istediğinize emin misiniz?`}
                        >
                            <Button variant="destructive" size="sm">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </DeleteConfirmDialog>
                    </PermissionGuard>
                </div>
            ),
        },
    ];

    const handleDelete = (id: number) => {
        router.delete(route('user_management.destroy', id), {
            onSuccess: () => {
                // Silme işlemi başarılı olduğunda yapılacak işlemler
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kullanıcı Yönetimi" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading
                    title="Kullanıcı Yönetimi"
                    description="Kullanıcıları yönetmek için bu tabloyu kullanabilirsiniz."
                    buttons={
                        <div className="flex gap-2">
                            <PermissionGuard permissions={[Permissions.userManagement.manage_roles]}>
                                <Link href={route('user_management.manage_roles')}>
                                    <Button variant="outline">
                                        <Settings className="h-4 w-4" />
                                        Rolleri Yönet
                                    </Button>
                                </Link>
                            </PermissionGuard>
                            <PermissionGuard permissions={[Permissions.userManagement.create]}>
                                <Link href={route('user_management.create')}>
                                    <Button>
                                        <Plus className="h-4 w-4" />
                                        Yeni Kullanıcı
                                    </Button>
                                </Link>
                            </PermissionGuard>
                        </div>
                    }
                />

                <PermissionGuard permissions={[Permissions.userManagement.view]}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Kullanıcılar Listesi</CardTitle>
                        </CardHeader>
                        <CardContent className="overflow-scroll">
                            <DataTable
                                columns={columns}
                                data={users.data}
                                meta={dataTableMeta}
                                routeName="user_management.index"
                                searchKey="name"
                                searchPlaceholder="Ad soyad veya e-posta ara..."
                            />
                        </CardContent>
                    </Card>
                </PermissionGuard>
            </div>
        </AppLayout>
    );
}
