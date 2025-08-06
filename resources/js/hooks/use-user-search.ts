import { useState, useCallback, useEffect } from 'react';
import { router } from '@inertiajs/react';

interface UserSearchResult {
    id: number;
    name: string;
    email: string;
    roles: string;
    text: string;
}

interface UseUserSearchOptions {
    debounceMs?: number;
    minSearchLength?: number;
}

export function useUserSearch(options: UseUserSearchOptions = {}) {
    const { debounceMs = 300, minSearchLength = 2 } = options;
    
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<UserSearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const searchUsers = useCallback(async (term: string) => {
        if (term.length < minSearchLength) {
            setResults([]);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(route('user_licenses.search_users', { search: term, limit: 10 }));
            
            if (!response.ok) {
                throw new Error('Arama sırasında hata oluştu');
            }

            const data = await response.json();
            setResults(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Bilinmeyen hata');
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    }, [minSearchLength]);

    // Debounced search
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchTerm) {
                searchUsers(searchTerm);
            } else {
                setResults([]);
            }
        }, debounceMs);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, searchUsers, debounceMs]);

    const handleSearch = useCallback((term: string) => {
        setSearchTerm(term);
    }, []);

    const clearSearch = useCallback(() => {
        setSearchTerm('');
        setResults([]);
        setError(null);
    }, []);

    return {
        searchTerm,
        results,
        isLoading,
        error,
        handleSearch,
        clearSearch,
    };
} 