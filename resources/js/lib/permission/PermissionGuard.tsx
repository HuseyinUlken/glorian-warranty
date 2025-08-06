import React, { ReactNode } from 'react';
import { usePermission } from './PermissionContext';

interface PermissionGuardProps {
    permission?: string;
    permissions?: string[];
    requireAll?: boolean;
    fallback?: ReactNode;
    children: ReactNode;
}

/**
 * İzin kontrolü yapan koruyucu bileşen
 *
 * @param permission - Tek bir izin kontrolü için
 * @param permissions - Birden fazla izin kontrolü için
 * @param requireAll - Tüm izinlerin gerekli olup olmadığı (true: tüm izinler gerekli, false: herhangi biri yeterli)
 * @param fallback - İzin yoksa gösterilecek içerik
 * @param children - İzin varsa gösterilecek içerik
 */
export const PermissionGuard: React.FC<PermissionGuardProps> = ({ permission, permissions = [], requireAll = false, fallback = null, children }) => {
    const { hasPermission, hasAnyPermission, hasAllPermissions } = usePermission();

    // İzin kontrolü
    let hasAccess = false;

    if (permission) {
        // Tek izin kontrolü
        hasAccess = hasPermission(permission);
    } else if (permissions.length > 0) {
        // Çoklu izin kontrolü
        hasAccess = requireAll ? hasAllPermissions(permissions) : hasAnyPermission(permissions);
    } else {
        // İzin belirtilmemişse erişime izin ver
        hasAccess = true;
    }

    // İzin varsa içeriği göster, yoksa fallback içeriğini göster
    return <>{hasAccess ? children : fallback}</>;
};

export default PermissionGuard;
