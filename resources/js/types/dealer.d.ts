export interface Dealer {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    city: string | null;
    district: string | null;
    address: string | null;
    full_address: string;
    logo_url: string;
    status: {
        value: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
        label: string;
        color: string;
    };
    is_active: boolean;
    is_suspended: boolean;
    services_count: number;
    active_services_count: number;
    created_at: string;
    updated_at: string;
}

export interface DealerFormData {
    name: string;
    email: string;
    password?: string;
    password_confirmation?: string;
    phone: string;
    city: string;
    district: string;
    address: string;
    status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
    logo?: File;
}

export interface DealersIndexProps {
    dealers: {
        data: Dealer[];
        current_page: number;
        per_page: number;
        total: number;
        links: any;
    };
    dataTableMeta: {
        current_page: number;
        total_pages: number;
        total: number;
        per_page: number;
        filters: {
            search?: string;
            status?: string;
            sort?: string;
            direction?: string;
        };
        availableFilters: any[];
    };
    statusOptions: Array<{
        value: string;
        label: string;
    }>;
}

export interface DealerCreateProps {
    statusOptions: Array<{
        value: string;
        label: string;
    }>;
}

export interface DealerEditProps {
    dealer: Dealer;
    statusOptions: Array<{
        value: string;
        label: string;
    }>;
}

export interface DealerShowProps {
    dealer: Dealer;
} 