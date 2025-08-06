import { Badge } from '@/components/ui/badge';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { useCommandPalette } from '@/hooks/use-command-palette';
import { useDebounce } from '@/hooks/use-debounce';
import { Link, router } from '@inertiajs/react';
import axios from 'axios';
import { Calendar, CheckSquare, FileText, Headset, Mail, Phone, Star, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface CustomerResult {
    id: number;
    name: string;
    company_name: string | null;
    email: string | null;
    phone: string | null;
    status: {
        value: string;
        label: string;
        color: string;
    };
    rating: {
        value: string;
        label: string;
        color: string;
    } | null;
    representative: string | null;
}

export function CommandPalette() {
    const { open, setOpen, query, setQuery } = useCommandPalette();
    const debouncedQuery = useDebounce(query, 100);
    const [results, setResults] = useState<CustomerResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Komut paleti kısayolu için event listener
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            // Command+K (Mac) veya Ctrl+K (Windows)
            const _key = String(e.key).toLowerCase();
            if ((_key === 'k' && (e.metaKey || e.ctrlKey)) || (_key === 'f' && (e.metaKey || e.ctrlKey))) {
                e.preventDefault();
                setOpen(!open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, [open, setOpen]);

    // Arama sorgusu değiştiğinde müşterileri ara
    useEffect(() => {
        const fetchResults = async () => {
            if (debouncedQuery.length < 2) {
                setResults([]);
                return;
            }

            setIsLoading(true);
            try {
                const response = await axios.get(route('api.customers.search'), {
                    params: { query: debouncedQuery, limit: 20 },
                });
                setResults(response.data.results);
            } catch (error) {
                setResults([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResults();
    }, [debouncedQuery]);

    // Müşteri seçildiğinde
    const handleSelect = (customerId: number) => {
        setOpen(false);
        router.visit(route('customers.show', customerId));
    };

    // Müşteri derecelendirmesini yıldız olarak göster
    const renderRatingStars = (rating: CustomerResult['rating']) => {
        if (!rating) return null;

        return (
            <div className="ml-2 flex items-center gap-1">
                <Star className="h-3.5 w-3.5" fill={rating.color} stroke={rating.color} />
            </div>
        );
    };

    // Shift+Enter için klavye olayını işle
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && e.shiftKey && query.trim().length > 0) {
            e.preventDefault();
            setOpen(false);
            router.visit(route('customers.index', { search: query }));
        }
    };

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput
                placeholder="Müşteri ara... (Shift+Enter ile tüm sonuçları gör)"
                value={query}
                onValueChange={setQuery}
                onKeyDown={handleKeyDown}
                className="placeholder:text-muted-foreground flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
            <CommandList>
                <CommandEmpty>
                    {isLoading ? (
                        <div className="py-6 text-center text-sm">Aranıyor...</div>
                    ) : (
                        <div className="py-6 text-center text-sm">Sonuç bulunamadı.</div>
                    )}
                </CommandEmpty>
                {results.length > 0 && (
                    <CommandGroup heading="Müşteriler">
                        {results.map((customer) => (
                            <CommandItem
                                key={customer.id}
                                value={`${customer.id}-${customer.name}-${customer.phone || ''} ${customer.email || ''}`}
                                onSelect={() => handleSelect(customer.id)}
                                className="cursor-pointer py-3"
                            >
                                <div className="flex w-full flex-col space-y-1">
                                    <div className="flex w-full items-center justify-between">
                                        <div className="flex items-center">
                                            <User className="text-primary mr-2 h-4 w-4" />
                                            <span className="font-medium">{customer.name}</span>
                                            {renderRatingStars(customer.rating)}
                                        </div>
                                        <Badge
                                            className="ml-2 text-xs"
                                            style={{
                                                backgroundColor: customer.status.color,
                                                color: '#fff',
                                            }}
                                        >
                                            {customer.status.label}
                                        </Badge>
                                    </div>

                                    <div className="text-muted-foreground ml-6 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                                        {customer.phone && (
                                            <div className="flex items-center">
                                                <Phone className="mr-1 h-3 w-3 opacity-70" />
                                                <span className="truncate">{customer.phone}</span>
                                            </div>
                                        )}
                                        {customer.email && (
                                            <div className="flex items-center">
                                                <Mail className="mr-1 h-3 w-3 opacity-70" />
                                                <span className="truncate">{customer.email}</span>
                                            </div>
                                        )}
                                        {customer.representative && (
                                            <div className="flex items-center">
                                                <Headset className="mr-1 h-3 w-3 opacity-70" />
                                                <span className="truncate">{customer.representative || 'Bilinmiyor'}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-1 ml-6 flex space-x-2">
                                        <Link
                                            href={route('customer-tasks.create') + `?customer_id=${customer.id}`}
                                            className="text-primary flex items-center text-xs hover:underline"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <CheckSquare className="mr-1 h-3 w-3" />
                                            Görev Ekle
                                        </Link>
                                        <Link
                                            href={route('customer-meetings.create') + `?customer_id=${customer.id}`}
                                            className="text-primary flex items-center text-xs hover:underline"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Calendar className="mr-1 h-3 w-3" />
                                            Görüşme Ekle
                                        </Link>
                                        <Link
                                            href={route('customer-notes.create') + `?customer_id=${customer.id}`}
                                            className="text-primary flex items-center text-xs hover:underline"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <FileText className="mr-1 h-3 w-3" />
                                            Not Ekle
                                        </Link>
                                    </div>
                                </div>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                )}
            </CommandList>
        </CommandDialog>
    );
}
