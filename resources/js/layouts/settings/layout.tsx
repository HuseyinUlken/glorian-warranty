import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

const getNavItems = (user: any): NavItem[] => {
    // Tüm kullanıcılar için temel menü öğeleri
    const baseItems: NavItem[] = [
        {
            title: 'Profil',
            href: '/settings/profile',
            icon: null,
        },
        {
            title: 'Parola',
            href: '/settings/password',
            icon: null,
        },
        {
            title: 'Görünüm',
            href: '/settings/appearance',
            icon: null,
        },
    ];

    const searchRole = user.roles.find(
        (role: any) => role.name === 'admin' || role.name === 'super_admin' || role.name === 'customer_representative',
    );
    // Admin rolüne sahip kullanıcılar için ek menü öğeleri
    if (searchRole?.name === 'admin' || searchRole?.name === 'super_admin') {
        baseItems.push({
            title: 'Kuyruk İzleme',
            href: '/settings/queue-monitor',
            icon: null,
        });
        baseItems.push({
            title: 'Yedekleme Ayarları',
            href: '/settings/backup',
            icon: null,
        });
        baseItems.push({
            title: 'Sistem Logları',
            href: '/settings/logs',
            icon: null,
        });
    }
    return baseItems;
};

export default function SettingsLayout({ children }: PropsWithChildren) {
    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }

    const { auth } = usePage().props as any;
    const currentPath = window.location.pathname;
    const sidebarNavItems = getNavItems(auth.user);

    return (
        <div className="px-4 py-6">
            <Heading title="Ayarlar" description="Profil ve hesap ayarlarınızı yönetin" />

            <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                <aside className="w-full max-w-xl lg:w-48">
                    <nav className="flex flex-col space-y-1 space-x-0">
                        {sidebarNavItems.map((item) => (
                            <Button
                                key={item.href}
                                size="sm"
                                variant="ghost"
                                asChild
                                className={cn('w-full justify-start', {
                                    'bg-muted': currentPath === item.href,
                                })}
                            >
                                <Link href={item.href} prefetch>
                                    {item.title}
                                </Link>
                            </Button>
                        ))}
                    </nav>
                </aside>

                <Separator className="my-6 md:hidden" />

                <div className="flex-1 md:max-w-7xl">
                    <section className="max-w-7xl space-y-12">{children}</section>
                </div>
            </div>
        </div>
    );
}
