import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import React, { useState } from 'react';

import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { PermissionGuard } from '@/lib/permission/PermissionGuard';
import Permissions from '@/lib/permission/modulePermissions';
import { BreadcrumbItem, PageProps } from '@/types';

interface Role {
    id: number;
    name: string;
}

interface CreateUserProps extends PageProps {
    roles: Role[];
    groups: Array<{
        id: number;
        name: string;
        color: string;
    }>;
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
        title: 'Yeni Kullanıcı',
        href: route('user_management.create'),
    },
];

export default function CreateUser({ roles }: CreateUserProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone_number: '',
        password: '',
        password_confirmation: '',
        roles: [] as number[],
        avatar: null as File | null,
    });

    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('user_management.store'), {
            forceFormData: true,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData('avatar', file);

            // Dosya önizlemesi oluştur
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    setAvatarPreview(e.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRoleChange = (roleId: number, checked: boolean) => {
        if (checked) {
            setData('roles', [...data.roles, roleId]);
        } else {
            setData(
                'roles',
                data.roles.filter((id) => id !== roleId),
            );
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Yeni Kullanıcı Ekle" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading
                    title="Yeni Kullanıcı Ekle"
                    description="Yeni bir kullanıcı eklemek için bu formu kullanabilirsiniz."
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
                        </div>
                    }
                />
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {/* Kullanıcı Bilgileri */}
                        <Card className="md:col-span-2">
                            <CardHeader>
                                <CardTitle>Kullanıcı Bilgileri</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Ad Soyad</Label>
                                    <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">E-posta</Label>
                                    <Input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone_number">Telefon</Label>
                                    <Input id="phone_number" value={data.phone_number} onChange={(e) => setData('phone_number', e.target.value)} />
                                    {errors.phone_number && <p className="text-sm text-red-500">{errors.phone_number}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">Şifre</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password_confirmation">Şifre Tekrar</Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                    />
                                    {errors.password_confirmation && <p className="text-sm text-red-500">{errors.password_confirmation}</p>}
                                </div>

                            </CardContent>
                        </Card>

                        {/* Profil Resmi ve Roller */}
                        <div className="space-y-6">
                            {/* Profil Resmi */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Profil Resmi</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex flex-col items-center space-y-4">
                                        <div className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-full bg-zinc-100">
                                            {avatarPreview ? (
                                                <img src={avatarPreview} alt="Avatar önizleme" className="h-full w-full object-cover" />
                                            ) : (
                                                <span className="text-zinc-400">Resim yok</span>
                                            )}
                                        </div>

                                        <div className="w-full space-y-2">
                                            <Label htmlFor="avatar">Profil Resmi Yükle</Label>
                                            <Input id="avatar" type="file" accept="image/*" onChange={handleFileChange} />
                                            {errors.avatar && <p className="text-sm text-red-500">{errors.avatar}</p>}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Roller */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Kullanıcı Rolleri</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {roles.map((role) => (
                                            <div key={role.id} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`role-${role.id}`}
                                                    checked={data.roles.includes(role.id)}
                                                    onCheckedChange={(checked) => handleRoleChange(role.id, checked === true)}
                                                />
                                                <Label htmlFor={`role-${role.id}`}>{role.name}</Label>
                                            </div>
                                        ))}
                                        {errors.roles && <p className="text-sm text-red-500">{errors.roles}</p>}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Button type="submit" disabled={processing}>
                            Kaydet
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
