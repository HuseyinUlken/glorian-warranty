import { LucideIcon } from 'lucide-react';

// Ziggy Config interface
interface Config {
    url: string;
    port: number | null;
    defaults: Record<string, unknown>;
    routes: Record<string, unknown>;
}

export interface Auth {
    user: User;
    permissions: string[];
    unreadNotificationsCount?: number;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    permission?: string;
    items?: NavItem[];
}

export interface PageProps {
    auth: Auth;
    ziggy: Config & { location: string };
    errors: Record<string, string>;
    flash?: {
        message?: string;
        success?: string;
        error?: string;
        warning?: string;
        info?: string;
    };
    quote: { message: string; author: string };
    [key: string]: unknown;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    roles: { name: string }[];
    group_id?: number;
    [key: string]: unknown; // This allows for additional properties...
}
export interface BackendFilter {
    type: string;
    column: string;
    label: string;
    options: { value: string; label: string }[];
    default: string | number | boolean | null;
    multiple: boolean;
    placeholder: string;
    selectedValue: string | number | boolean | null;
}
export interface DataTableMeta {
    searchableColumns: string[];
    sortableColumns: string[];
    filters: Record<string, unknown>;
    availableFilters: BackendFilter[];
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
    from: number;
    to: number;
    total_pages: number;
    per_page_options: number[];
    prefix: string;
    debounceDelay: number;
}
