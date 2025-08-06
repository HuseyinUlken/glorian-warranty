import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { InfoCard, InfoCardContent, InfoCardDescription, InfoCardTitle } from '@/components/ui/info-card';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { usePermission } from '@/lib/permission/PermissionContext';
import { PageProps, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folders, Home, MessageSquare, Star, UserCog, Users, HelpCircle, Trophy, Target, FileText, Video, Bot, BookOpenCheck, Shield, Package, Settings, Search } from 'lucide-react';
import { route } from 'ziggy-js';
import AppLogo from './app-logo';

const _footerNavItems: NavItem[] = [
    {
        title: 'Dışa Aktarılan Dosyalar',
        href: route('exported-files.index'),
        icon: Folders,
        permission: 'exported_files.unkown', // bilerek olmayan bir izin eklendi
    },
];
export function AppSidebar() {
    const { quote } = usePage<PageProps>().props;
    const { open } = useSidebar();
    const { hasPermission } = usePermission();

    const { auth } = usePage<PageProps>().props;
    const isDealer = auth.user.roles.some(role => role.name === 'dealer');
    

    const adminNavItems: NavItem[] = [
        {
            title: 'Ana Sayfa',
            href: route('dashboard', undefined, false),
            icon: Home,
            permission: 'customers.view',
            isActive: route().current('dashboard'),
        },
        {
            title: 'Kullanıcı Yönetimi',
            href: route('user_management.index', undefined, false),
            icon: UserCog,
            permission: 'user_management.view',
            isActive: route().current('user_management.*'),
        },
        // Garanti Takip Sistemi
        {
            title: 'Bayi Yönetimi',
            href: route('admin.dealers.index', undefined, false),
            icon: Shield,
            permission: 'dealer.view',
            isActive: route().current('admin.dealers.*'),
        },
        {
            title: 'Ürün Yönetimi',
            href: route('admin.products.index', undefined, false),
            icon: Package,
            permission: 'product.view',
            isActive: route().current('admin.products.*'),
        },
        {
            title: 'Hizmet Yönetimi',
            href: route('admin.services.index', undefined, false),
            icon: Settings,
            permission: 'service.view_all',
            isActive: route().current('admin.services.*'),
        },
    ];

    const dealerNavItems: NavItem[] = [
        {
            title: 'Ana Sayfa',
            href: route('dashboard', undefined, false),
            icon: Home,
            isActive: route().current('dashboard'),
        },
        {
            title: 'Hizmetlerim',
            href: route('dealer.services.index', undefined, false),
            icon: Settings,
            permission: 'service.view_own',
            isActive: route().current('dealer.services.*'),
        },
        {
            title: 'Hizmet Sorgu',
            href: route('dealer.service-inquiry.index', undefined, false),
            icon: Search,
            permission: 'service.view_own',
            isActive: route().current('dealer.service-inquiry.*'),
        },
    ];
    
    // Öğrenci ise studentNavItems, bayi ise dealerNavItems, değilse adminNavItems kullan
    const baseNavItems = isDealer ? dealerNavItems : adminNavItems;
    
    const navItems: NavItem[] = baseNavItems
        .map((item) => {
            if (item.permission && hasPermission(item.permission)) {
                if (item.items && item.items.length > 0) {
                    item.items = item.items.filter((subItem) => subItem.permission && hasPermission(subItem.permission));
                    return item;
                }
                return item;
            } else if (!item.permission) {
                // Permission gerektirmeyen item'lar (öğrenci için)
                return item;
            } else {
                return undefined;
            }
        })
        .filter((item) => item !== undefined) as NavItem[];
    const footerNavItems: NavItem[] = _footerNavItems
        .map((item) => {
            if (item.permission && hasPermission(item.permission)) {
                return item;
            } else {
                return undefined;
            }
        })
        .filter((item) => item !== undefined) as NavItem[];
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild tooltip={'Glorian'}>
                            <Link href={route('dashboard', undefined, false)} prefetch>
                                <img src="/logos/glorian-dark-logo.svg" alt="Glorian Logo" className="h-10 w-auto mx-auto dark:block hidden" />
                                <img src="/logos/glorian-light-logo.svg" alt="Glorian Logo" className="h-10 w-auto mx-auto dark:hidden" />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={navItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
