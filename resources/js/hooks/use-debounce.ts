import { useEffect, useState } from 'react';

/**
 * Değeri belirli bir süre sonra güncelleyen debounce hook'u
 *
 * @param value Debounce edilecek değer
 * @param delay Gecikme süresi (ms)
 * @returns Debounce edilmiş değer
 */
export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}
