"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Loader2, Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export interface AutoCompleteOption {
  value: string;
  label: string;
  description?: string;
}

export interface AutoCompleteProps {
  /**
   * Seçenekler listesi
   */
  options: AutoCompleteOption[];
  
  /**
   * Seçili değer
   */
  value?: string;
  
  /**
   * Değer değiştiğinde çağrılacak fonksiyon
   */
  onValueChange: (value: string) => void;
  
  /**
   * Placeholder metni
   */
  placeholder?: string;
  
  /**
   * Arama alanı için placeholder
   */
  searchPlaceholder?: string;
  
  /**
   * Sonuç bulunamadığında gösterilecek mesaj
   */
  emptyMessage?: string;
  
  /**
   * Bileşenin devre dışı bırakılması
   */
  disabled?: boolean;
  
  /**
   * Yükleniyor durumu
   */
  isLoading?: boolean;
  
  /**
   * Arama metni değiştiğinde çağrılacak fonksiyon
   */
  onSearch?: (searchTerm: string) => void;
}

export function AutoComplete({
  options,
  value,
  onValueChange,
  placeholder = "Seçiniz...",
  searchPlaceholder = "Ara...",
  emptyMessage = "Sonuç bulunamadı",
  disabled = false,
  isLoading = false,
  onSearch
}: AutoCompleteProps) {
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")
  
  const handleInputChange = React.useCallback((value: string) => {
    setInputValue(value)
    onSearch?.(value)
  }, [onSearch])
  
  const selectedOption = React.useMemo(() => 
    options.find(option => option.value === value),
    [options, value]
  )

  return (
    <Popover open={open} onOpenChange={disabled ? undefined : setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          onClick={disabled ? undefined : () => setOpen(!open)}
          disabled={disabled}
        >
          <div className="flex items-center gap-2 truncate">
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4 shrink-0 opacity-50" />
            )}
            <span className="truncate">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      {open && (
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
          <Command shouldFilter={false}>
            <CommandInput 
              placeholder={searchPlaceholder} 
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
                    {options.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.label}
                        onSelect={() => {
                          onValueChange(option.value === value ? "" : option.value)
                          setOpen(false)
                          setInputValue("")
                        }}
                      >
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <span>{option.label}</span>
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                value === option.value ? "opacity-100" : "opacity-0"
                              )}
                            />
                          </div>
                          {option.description && (
                            <span className="text-xs text-muted-foreground">{option.description}</span>
                          )}
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
  )
}
