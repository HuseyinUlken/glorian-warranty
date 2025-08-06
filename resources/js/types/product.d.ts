export interface Product {
    id: number;
    name: string;
    category: {
        value: 'PPF' | 'CAM_FILMI';
        label: string;
        description: string;
        color: string;
    };
    sku: string | null;
    description: string | null;
    warranty_description: string | null;
    warranty_duration_months: number;
    warranty_duration_years: number;
    formatted_warranty_duration: string;
    is_active: boolean;
    services_count: number;
    created_at: string;
    updated_at: string;
}

export interface ProductFormData {
    name: string;
    category: 'PPF' | 'CAM_FILMI';
    sku: string;
    description: string;
    warranty_description: string;
    warranty_duration_months: number;
    is_active: boolean;
}

export interface ProductsIndexProps {
    products: {
        data: Product[];
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
            category?: string;
            is_active?: string;
            sort?: string;
            direction?: string;
        };
        availableFilters: any[];
    };
    categoryOptions: Array<{
        value: string;
        label: string;
    }>;
}

export interface ProductCreateProps {
    categoryOptions: Array<{
        value: string;
        label: string;
    }>;
}

export interface ProductEditProps {
    product: Product;
    categoryOptions: Array<{
        value: string;
        label: string;
    }>;
}

export interface ProductShowProps {
    product: Product;
} 