import React, { useState, useCallback, memo, useMemo } from "react";
import { Check, ChevronsUpDown, ListFilter, X } from "lucide-react";
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

/**
 * Seçenek tipi için temel arayüz
 */
export interface BaseOption {
  value: string | number;
  label: string;
}

/**
 * MultiSelectCombobox bileşeni için props arayüzü
 */
export interface MultiSelectComboboxProps<T extends BaseOption> {
  /**
   * Bileşen etiketi
   */
  label?: string;
  
  /**
   * Seçilebilir seçenekler listesi
   */
  options: T[];
  
  /**
   * Seçili değerler
   */
  value?: (string | number)[];
  
  /**
   * Değer değiştiğinde çağrılacak fonksiyon
   */
  onChange: (value: (string | number)[]) => void;
  
  /**
   * Arama alanı için placeholder
   */
  placeholder?: string;
}

/**
 * Birden fazla seçim yapılabilen özelleştirilebilir combobox bileşeni
 * @template T - BaseOption tipini genişleten tip
 */
const MultiSelectComboboxComponent = <T extends BaseOption>({
    label = "Veri",
    options,
    value = [],
    onChange,
    placeholder
  }: MultiSelectComboboxProps<T>) => {
  const [open, setOpen] = useState(false);

  // Seçili öğeleri memorize et
  const selectedItems = useMemo(() => 
    options.filter(option => value.includes(option.value)),
    [options, value]
  );

  // Seçili öğelerin görüntüsünü memorize et
  const selectedDisplay = useMemo(() => {
    if (value.length === 0) return `${label} seçiniz...`;
    if (value.length > 3) return `${value.length} seçilmiş`;
    return selectedItems.map(item => item.label).join(', ');
  }, [value.length, selectedItems, label]);

  const handleChange = useCallback((currentValue: string | number) => {
    onChange(value.includes(currentValue)
      ? value.filter((val) => val !== currentValue)
      : [...value, currentValue]);
  }, [value, onChange]);

  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onChange([]);
  }, [onChange]);

  const toggleOpen = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  const renderTrigger = useMemo(() => (
    <div
      role="combobox"
      aria-expanded={open}
      aria-haspopup="listbox"
      aria-controls="multi-select-options"
      aria-label={`${label} seçiniz`}
      tabIndex={0}
      className="flex h-10 min-w-[200px] cursor-pointer items-center justify-start gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:ring-offset-2"
      onClick={toggleOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          toggleOpen();
        }
      }}>
      <ListFilter className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
      {value.length > 0 && (
        <span className="text-muted-foreground">{label}</span>
      )}
      <div className="flex-1 overflow-hidden">
        {selectedDisplay}
      </div>
      <span className="z-10 ml-auto flex items-center gap-2">
        {value.length > 0 && (
          <button
            type="button"
            aria-label="Clear selection"
            className="z-10 rounded-sm opacity-50 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-zinc-300"
            onClick={handleClear}>
            <X className="size-4 shrink-0" />
          </button>
        )}
        <ChevronsUpDown className="size-4 shrink-0 opacity-50" aria-hidden="true" />
      </span>
    </div>
  ), [open, label, value.length, selectedDisplay, toggleOpen, handleClear]);

  const renderContent = useMemo(() => (
    <Command>
      <CommandInput
        placeholder={placeholder || `${label} ara...`}
        aria-label={`${label} ara`} />
      <CommandList>
        <CommandEmpty>{label} bulunamadı.</CommandEmpty>
        <CommandGroup>
          {options.map((option) => (
            <CommandItem
              key={option.value}
              value={option.label}
              onSelect={() => handleChange(option.value)}
              aria-selected={value.includes(option.value)}>
              <Check
                className={cn("mr-2 h-4 w-4", 
                  value.includes(option.value) ? "opacity-100" : "opacity-0")}
                aria-hidden="true" />
              {option.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  ), [options, value, label, placeholder, handleChange]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {renderTrigger}
      </PopoverTrigger>
      <PopoverContent
        className="w-[--radix-popover-trigger-width] p-0"
        id="multi-select-options">
        {renderContent}
      </PopoverContent>
    </Popover>
  );
};

export const MultiSelectCombobox = memo(MultiSelectComboboxComponent) as typeof MultiSelectComboboxComponent;
