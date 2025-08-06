import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { DataTableMeta } from "@/types";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  meta: DataTableMeta;
}

export function DataTablePagination<TData>({
  table,
  meta,
}: DataTablePaginationProps<TData>) {
  // Pagination bilgilerini alalım
  const { pageSize, pageIndex } = table.getState().pagination;
  const totalRows = meta.total;
  const total_pages = meta.total_pages; 

  const allow_previous = meta.current_page > 1;
  const allow_next = meta.current_page < meta.last_page;
  const allow_end = meta.current_page < meta.last_page;
  const allow_start = meta.current_page > 1;
  
  // Geçerli sayfa aralığını hesaplayalım
  const startRow = pageIndex * pageSize + 1;
  const endRow = Math.min((pageIndex + 1) * pageSize, totalRows);

  return (  
    <div className="flex items-center flex-col space-y-2 justify-between px-2 py-4 lg:flex-row">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length > 0 ? (
          <span>
            {table.getFilteredSelectedRowModel().rows.length} / {" "}
            {table.getFilteredRowModel().rows.length} kayıt seçildi
          </span>
        ) : (
          <span>
            Toplam {totalRows} kayıttan {startRow}-{endRow} arası gösteriliyor
          </span>
        )}
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8 lg:flex-row flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Sayfa başına</p>
          <select
            className="h-8 w-16 rounded-md border border-input bg-transparent px-2 py-1 text-sm"
            value={pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {meta.per_page_options.map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Sayfa {pageIndex + 1} / {meta.total_pages || 1}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="flex h-8 w-8 p-0"
            onClick={() => table.setPageIndex(0)}
            disabled={!allow_start}
          >
            <span className="sr-only">İlk sayfa</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!allow_previous}
          >
            <span className="sr-only">Önceki sayfa</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!allow_next}
          >
            <span className="sr-only">Sonraki sayfa</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="flex h-8 w-8 p-0 "
            onClick={() => table.setPageIndex(meta.total_pages - 1)}
            disabled={!allow_end}
          >
            <span className="sr-only">Son sayfa</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
