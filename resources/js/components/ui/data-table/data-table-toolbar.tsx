import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Columns3, Download, DownloadCloud, File, FileJson, FileText, FileX, ListFilterPlus, Printer, Search, Share2, X } from "lucide-react";
import { useState, useEffect, useId, useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger, DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { DataTableMeta, BackendFilter } from "@/types";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Combobox } from '@/components/ui/combobox';
import { DatePicker } from "../date-picker";
import { format } from "date-fns";
import { Badge } from "../badge";
interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchKey: string;
  searchPlaceholder?: string;
  storageKey: string;
  meta: DataTableMeta;
  addFilter: (name: any, value: any) => void;
  removeFilter: (name: any) => void;
}

export function DataTableToolbar<TData>({
  table,
  searchKey,
  searchPlaceholder = "Ara...",
  storageKey,
  meta,
  addFilter,
  removeFilter
}: DataTableToolbarProps<TData>) {
  const isFiltered = meta.availableFilters.filter((filter) => filter.selectedValue !== null).length > 0;
  const isSearched = table.getState().columnFilters.length > 0;
  const [searchValue, setSearchValue] = useState<string>((table.getColumn(searchKey)?.getFilterValue() as string) ?? "");
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>(() => {
    const savedState = localStorage.getItem(storageKey);
    return savedState ? JSON.parse(savedState) : {};
  });

  const toggleColumn = (columnId: string, value: boolean) => {
    setColumnVisibility((prev) => {
      const newState = {
        ...prev,
        [columnId]: value
      };
      localStorage.setItem(storageKey, JSON.stringify(newState));

      return newState;
    });

    table.setColumnVisibility({
      [columnId]: value
    });
  };
  useEffect(() => {
    // İlk yüklemede kaydedilmiş kolon görünürlük ayarlarını uygula
    if (Object.keys(columnVisibility).length > 0) {
      table.setColumnVisibility(columnVisibility);
    }

    const timer = setTimeout(() => {
      if (searchValue !== "") {
        table.getColumn(searchKey)?.setFilterValue(searchValue);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchValue, table, searchKey, columnVisibility]);
  const handleExport = (type: string) => {
    const exportData = table.getCoreRowModel().rows.map(row => row.original);
    const blob = new Blob([JSON.stringify(exportData)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  return (
    <Collapsible defaultOpen={isFiltered}>
      <div className="flex items-center justify-between space-x-2 py-2">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative min-w-[200px] w-full md:w-[350px]">
            <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-5 w-5" />
            <Input
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              className="h-10 w-full pr-4 pl-9"
            />
            {isSearched && (
              <div className="absolute h-5 w-5 top-2.5 right-2.5 cursor-pointer rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center" onClick={() => {
                table.resetColumnFilters();
                setSearchValue("");
              }}>
                <X className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-2">
                <Columns3 className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  const _columnName = column.columnDef.header as string || column.id;
                  if (column.id === "id" || column.id === "actions") {
                    return null;
                  }
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => {
                        if (column.id !== "actions") {
                          column.toggleVisibility(!!value);
                          toggleColumn(column.id, !!value);
                        }
                      }}
                    >
                      {_columnName}
                    </DropdownMenuCheckboxItem>
                  );
                })}

            </DropdownMenuContent>
          </DropdownMenu>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className={`ml-2 ${meta.availableFilters.length === 0 && "hidden"}`}>
              <ListFilterPlus className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>

        </div>
      </div>
      <CollapsibleContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
          <h3 className="text-sm font-medium col-span-full">Filtreler</h3>
          {meta.availableFilters.map((filter) => (
            <FilterComponent key={filter.column} filter={filter} addFilter={addFilter} removeFilter={removeFilter} />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

const FilterComponent = ({ filter, addFilter, removeFilter }: { filter: BackendFilter, addFilter: (name: any, value: any) => void, removeFilter: (name: any) => void }) => {
  const [selectedValue, setSelectedValue] = useState<any>(filter.type === "date" ? filter.selectedValue !== null ? new Date(String(filter.selectedValue.replace("date_", ""))) : null : filter.selectedValue);
  const isFiltered = filter.selectedValue !== null;
 const getSelectedValueForSelect = useMemo(() => {
  if(filter.type === "select"){
    if(filter.multiple){
      if(selectedValue?.length > 0){
        return selectedValue.map((item: any) => {
          return Number(item.value);
        });
      }else{
        return [];
      }
    }else{
      return Number(selectedValue);
    }
  }
 },[selectedValue]);
  switch (filter.type) {
    case "select":
      return (
        <div>
          <label htmlFor="" className="text-sm font-medium text-muted-foreground">{filter.label}
            {isFiltered && (
              <Badge variant="destructive" className="ml-2 cursor-pointer" onClick={() => {
                removeFilter(filter.column);
                setSelectedValue(null);
              }}>Temizle</Badge>
            )}
          </label>
          <Combobox
            items={filter.options}
            value={selectedValue}
            onChange={(val: any) => {
              setSelectedValue(val);
              if (filter.multiple) {
                if (val?.length > 0) {
                  addFilter(filter.column, val);
                } else {
                  removeFilter(filter.column);
                }
              } else {
                if (val) {
                  addFilter(filter.column, val);
                } else {
                  removeFilter(filter.column);
                }
              }
            }}
            multiple={filter.multiple}
            placeholder={filter.placeholder || filter.label}
          />
        </div>
      );
    case "date":
      return (
        <div>
          <label htmlFor="" className="text-sm font-medium text-muted-foreground">{filter.label}{isFiltered && (
            <Badge variant="destructive" className="ml-2 cursor-pointer" onClick={() => {
              removeFilter(filter.column);
              setSelectedValue(null);
            }}>Temizle</Badge>
          )}</label>
          <DatePicker date={selectedValue} onSelect={(date) => {
            if (date instanceof Date) {
              setSelectedValue(date);
              addFilter(filter.column, "date_" + format(date, "yyyy-MM-dd"));
            } else {
              setSelectedValue(null);
              removeFilter(filter.column);
            }
          }} />
        </div>
      );

    default:
      return null;
  }
}