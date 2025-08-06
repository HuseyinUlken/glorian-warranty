import { NotificationIndicator } from '@/components/notification-indicator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { usePage } from '@inertiajs/react';
import AppearanceToggleDropdown from './appearance-dropdown';
export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    const { auth } = usePage().props as any;
    const unreadCount = auth?.unreadNotificationsCount || 0;

    return (
        <header className="border-sidebar-border/50 flex h-16 shrink-0 items-center gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                {/**
                 * <span className="text-muted-foreground">|</span>
                 * <Breadcrumbs breadcrumbs={breadcrumbs} />
                 */}
            </div>
            <div className="ml-auto flex items-center gap-4">
                <AppearanceToggleDropdown />
                <NotificationIndicator initialCount={unreadCount} />
            </div>
        </header>
    );
}
