export interface Service {
    id: number;
    service_code: string;
    status: {
        value: 'PENDING' | 'ACTIVE' | 'EXPIRED';
        label: string;
        color: string;
        description: string;
    };
    dealer?: {
        id: number;
        name: string;
        email: string;
        phone: string | null;
        city: string | null;
        district: string | null;
    };
    customer: {
        id: number;
        first_name: string;
        last_name: string;
        full_name: string;
        phone: string;
        email: string | null;
        address: string | null;
        city: string | null;
        district: string | null;
        full_address: string;
    };
    vehicle: {
        make: string;
        model: string;
        year: number;
        package: string | null;
        color: string | null;
        plate: string | null;
        full_name: string;
    };
    warranty: {
        start_date: string | null;
        end_date: string | null;
        days_remaining: number | null;
        percentage_remaining: number | null;
        is_expired: boolean;
    };
    applied_products: Array<{
        id: number;
        name: string;
        category: {
            value: string;
            label: string;
            color: string;
        };
        applied_areas: string[];
        notes: string | null;
    }>;
    notes?: Array<{
        id: number;
        content: string;
        type: {
            value: 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS';
            label: string;
            color: string;
            icon: string;
        };
        user: {
            name: string;
        };
        created_at: string;
    }>;
    application_date: string;
    applied_products_count: number;
    notes_count: number;
    created_at: string;
    updated_at: string;
}

export interface ServiceFormData {
    application_date: string;
    customer: {
        first_name: string;
        last_name: string;
        phone: string;
        email: string;
        address: string;
        city: string;
        district: string;
    };
    vehicle: {
        make: string;
        model: string;
        year: number;
        package: string;
        color: string;
        plate: string;
    };
    applied_products: Array<{
        product_id: number;
        applied_areas: string[];
        notes: string;
    }>;
    notes: string;
}

export interface ServicesIndexProps {
    services: {
        data: Service[];
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
            dealer_id?: string;
            date_from?: string;
            date_to?: string;
            sort?: string;
            direction?: string;
        };
        availableFilters: any[];
    };
    statusOptions: Array<{
        value: string;
        label: string;
    }>;
    dealers?: Array<{
        id: number;
        name: string;
    }>;
}

export interface ServiceCreateProps {
    products: Array<{
        id: number;
        name: string;
        category: {
            value: string;
            label: string;
        };
        warranty_duration_months: number;
    }>;
}

export interface ServiceEditProps {
    service: Service;
    products: Array<{
        id: number;
        name: string;
        category: {
            value: string;
            label: string;
        };
        warranty_duration_months: number;
    }>;
}

export interface ServiceShowProps {
    service: Service;
}

export interface ServiceNoteFormData {
    content: string;
    type: 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS';
} 