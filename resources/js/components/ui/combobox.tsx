import React, { useState, useCallback, memo, useMemo, useEffect } from "react";
import { Check, ChevronsUpDown, Loader2, Search, X } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

/**
 * Seçenek tipi için temel arayüz
 */
export interface ComboboxOption {
  value: string | number;
  label: string;
  description?: string;
}

/**
 * Combobox bileşeni için props arayüzü
 */
export interface ComboboxProps {
  /**
   * Seçilebilir seçenekler listesi
   */
  items: ComboboxOption[];
  
  /**
   * Seçili değer(ler)
   */
  value?: string | string[] | number | number[];
  
  /**
   * Değer değiştiğinde çağrılacak fonksiyon
   */
  onChange: (value: string | string[] | number | number[]) => void;
  
  /**
   * Arama alanı için placeholder
   */
  placeholder?: string;

  /**
   * Giriş değeri değiştiğinde çağrılacak fonksiyon (API araması için)
   */
  onInputChange?: (value: string) => void;

  /**
   * Çoklu seçim modu
   */
  multiple?: boolean;

  /**
   * Bileşenin devre dışı bırakılması
   */
  disabled?: boolean;

  /**
   * Yükleniyor durumu
   */
  isLoading?: boolean;

  /**
   * Sonuç bulunamadığında gösterilecek mesaj
   */
  emptyMessage?: string;
}

/**
 * Özelleştirilebilir combobox bileşeni
 * Hem tekli hem de çoklu seçimi destekler
 */
const ComboboxComponent = ({
  items = [],
  value = "",
  onChange,
  placeholder = "Seçiniz...",
  onInputChange,
  multiple = false,
  disabled = false,
  isLoading = false,
  emptyMessage = "Sonuç bulunamadı"
}: ComboboxProps) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Çoklu seçim için değeri array olarak ele al
  const selectedValues = useMemo(() => {
    if (multiple) {
      return Array.isArray(value) ? value : value ? [value] : [];
    }
    return value ? [value] : [];
  }, [value, multiple]);

  // Seçili öğeleri bul
  const selectedItems = useMemo(() => 
    items.filter(item => selectedValues.includes(item.value)),
    [items, selectedValues]
  );

  // Seçili öğelerin görüntüsünü oluştur
  const selectedDisplay = useMemo(() => {
    if (selectedValues.length === 0) return "";
    
    if (!multiple) {
      const selected = selectedItems[0];
      return selected ? selected.label : "";
    }
    
    if (selectedValues.length > 2) {
      return `${selectedValues.length} öğe seçildi`;
    }
    
    return selectedItems.map(item => item.label).join(', ');
  }, [selectedValues, selectedItems, multiple]);

  // Input değeri değiştiğinde
  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);
    onInputChange?.(value);
  }, [onInputChange]);

  // Öğe seçildiğinde
  const handleSelect = useCallback((currentValue: string | number) => {
    if (multiple) {
      const newValue = (selectedValues as (string | number)[]).includes(currentValue)
        ? (selectedValues as (string | number)[]).filter(val => val !== currentValue)
        : [...(selectedValues as (string | number)[]), currentValue];
      
      onChange(newValue as string[] | number[]);
    } else {
      onChange(currentValue);
      setOpen(false);
    }
  }, [selectedValues, onChange, multiple]);

  // Seçimi temizle
  const handleClear = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    onChange(multiple ? [] : "");
    setInputValue("");
  }, [onChange, multiple]);

  // Çoklu seçimde badge'i kaldır
  const handleRemoveItem = useCallback((e: React.MouseEvent, itemValue: string | number) => {
    e.stopPropagation();
    const newValue  = (selectedValues as (string | number)[]).filter(val => val !== itemValue);
    onChange(newValue as string[] | number[]);
  }, [selectedValues, onChange]);

  // Popover kapandığında input değerini temizle
  useEffect(() => {
    if (!open) {
      setInputValue("");
    }
  }, [open]);

  return (
    <Popover open={open} onOpenChange={disabled ? undefined : setOpen}>
      <PopoverTrigger asChild>
        <div
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          className={cn(
            "flex min-h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
            disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          )}
          onClick={disabled ? undefined : () => setOpen(!open)}
        >
          <div className="flex flex-1 flex-wrap gap-1 overflow-hidden">
            {selectedDisplay ? (
              multiple ? (
                <div className="flex flex-wrap gap-1">
                  {selectedItems.map(item => (
                    <Badge key={item.value} variant="secondary" className="flex items-center gap-1 px-2">
                      {item.label}
                      <button
                        type="button"
                        className="rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        onClick={(e) => handleRemoveItem(e, item.value)}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Kaldır</span>
                      </button>
                    </Badge>
                  ))}
                </div>
              ) : (
                <span>{selectedDisplay}</span>
              )
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            ) : selectedValues.length > 0 ? (
              <button
                type="button"
                className="rounded-full p-0.5 hover:bg-accent hover:text-accent-foreground"
                onClick={handleClear}
              >
                <X className="h-4 w-4 text-muted-foreground" />
                <span className="sr-only">Temizle</span>
              </button>
            ) : (
              <Search className="h-4 w-4 text-muted-foreground" />
            )}
            <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </PopoverTrigger>
      {open && (
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="center">
          <Command shouldFilter={false}>
            <CommandInput 
              placeholder={`${placeholder.replace('...', '')} ara...`} 
              value={inputValue}
              onValueChange={handleInputChange}
              className="h-9"
            />
            <CommandList>
              {isLoading ? (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <>
                  <CommandEmpty>{emptyMessage}</CommandEmpty>
                  <CommandGroup>
                    {items.map((item) => (
                      <CommandItem
                        key={item.value}
                        value={item.label}
                        onSelect={() => handleSelect(item.value)}
                      >
                        <div className="flex items-center">
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedValues.includes(item.value) ? "opacity-100" : "opacity-0"
                            )}
                          />
                          <div className="flex flex-col">
                            <span>{item.label}</span>
                            {item.description && (
                              <span className="text-xs text-muted-foreground">{item.description}</span>
                            )}
                          </div>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      )}
    </Popover>
  );
};

export const Combobox = memo(ComboboxComponent);
