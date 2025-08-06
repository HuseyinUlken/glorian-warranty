import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

// İzin bağlamı için tip tanımı
interface PermissionContextType {
    permissions: string[];
    hasPermission: (permission: string) => boolean;
    hasAnyPermission: (permissions: string[]) => boolean;
    hasAllPermissions: (permissions: string[]) => boolean;
    user: any;
    roles: string[];
    hasRole: (role: string) => boolean;
}

// Varsayılan değerlerle bağlam oluşturma
const PermissionContext = createContext<PermissionContextType>({
    permissions: [],
    hasPermission: () => false,
    hasAnyPermission: () => false,
    hasAllPermissions: () => false,
    user: null,
    roles: [],
    hasRole: () => false,
});

// Provider bileşeni
export const PermissionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const props = usePage<PageProps>().props;
    const [auth, setAuth] = useState(props.auth);
    useEffect(() => {
        if (props.auth?.user) setAuth(props.auth);
    }, [props.auth]);
    const user = auth.user;
    const permissions = auth.permissions || [];
    const roles = user?.roles?.map((role: { name: string }) => role.name) || [];
    // Kullanıcının belirli bir izne sahip olup olmadığını kontrol eder
    const hasPermission = (permission: string): boolean => {
        return permissions.includes(permission);
    };

    // Kullanıcının verilen izinlerden herhangi birine sahip olup olmadığını kontrol eder
    const hasAnyPermission = (permissionList: string[]): boolean => {
        return permissionList.some((permission) => permissions.includes(permission));
    };

    // Kullanıcının verilen tüm izinlere sahip olup olmadığını kontrol eder
    const hasAllPermissions = (permissionList: string[]): boolean => {
        return permissionList.every((permission) => permissions.includes(permission));
    };
    const hasRole = (role: string): boolean => {
        return roles.includes(role);
    };
    // Bağlam değerlerini sağla
    const value = {
        permissions,
        hasPermission,
        hasAnyPermission,
        hasAllPermissions,
        user,
        roles,
        hasRole,
    };

    return <PermissionContext.Provider value={value}>{children}</PermissionContext.Provider>;
};

// İzin bağlamını kullanmak için özel hook
export const usePermission = (): PermissionContextType => {
    const context = useContext(PermissionContext);

    if (context === undefined) {
        throw new Error('usePermission must be used within a PermissionProvider');
    }

    return context;
};
