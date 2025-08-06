import React, { useState, useEffect, useMemo } from "react";
import { router } from "@inertiajs/react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
  PaginationState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "@/components/ui/data-table/data-table-pagination";
import { DataTableToolbar } from "@/components/ui/data-table/data-table-toolbar";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import { DataTableMeta } from "@/types";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  meta: DataTableMeta;
  routeName: string;
  searchKey?: string;
  searchPlaceholder?: string;
  showToolbar?: boolean;
  preserveState?: boolean;
  preserveScroll?: boolean;
  onlyClientSide?: boolean;
  routeParams?: Record<string, any>;
  keepAlive?: boolean;
  reloadProps?: boolean | string[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  meta,
  routeName,
  routeParams = {},
  searchKey = "name",
  searchPlaceholder = "Ara...",
  showToolbar = true,
  preserveState = true,
  preserveScroll = true,
  onlyClientSide = false,
  keepAlive = false,
  reloadProps = false,
}: DataTableProps<TData, TValue>) {
  const prefix = meta.prefix;
  const getSortFilter = useMemo(() => {
    return meta.filters[prefix + "sort"];
  }, [meta]);
  const getDirectionFilter = useMemo(() => {
    return meta.filters[prefix + "direction"];
  }, [meta]);
  const getSearchFilter = useMemo(() => {
    return meta.filters[prefix + "search"];
  }, [meta]);
  const getUriFilters = useMemo(() => {
    const url = new URL(window.location.href);
    const filters = Object.fromEntries(url.searchParams.entries());
    return filters;
  }, [meta]);
  // Server-side sorting state
  const [sorting, setSorting] = useState<SortingState>(() => {
    if (getSortFilter && getDirectionFilter) {
      return [
        {
          id: getSortFilter,
          desc: getDirectionFilter === 'desc',
        },
      ];
    }
    return [];
  });

  // Server-side pagination state
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: meta.current_page - 1,
    pageSize: meta.per_page,
  });

  // Client-side states
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(() => {
    if (getSearchFilter && searchKey) {
      return [
        {
          id: searchKey,
          value: getSearchFilter,
        },
      ];
    }
    return [];
  });
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  // React Table instance
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: onlyClientSide ? getPaginationRowModel() : undefined,
    onSortingChange: (updater) => {
      const newSorting = typeof updater === 'function' ? updater(sorting) : updater;
      setSorting(newSorting);

      if (!onlyClientSide && newSorting.length > 0) {
        const sort = newSorting[0].id;
        const direction = newSorting[0].desc ? 'desc' : 'asc';
        const keyName = prefix + "sort";
        const directionName = prefix + "direction";
        router.get(route(routeName, routeParams), {
          ...getUriFilters,
          [keyName]: sort,
          [directionName]: direction,
        }, {
          preserveState,
          preserveScroll,
          replace: true,
        });
      }
    },
    getSortedRowModel: onlyClientSide ? getSortedRowModel() : undefined,
    onColumnFiltersChange: (updater) => {
      const newFilters = typeof updater === 'function' ? updater(columnFilters) : updater;
      setColumnFilters(newFilters);

      if (!onlyClientSide && searchKey) {
        const searchFilter = newFilters.find(filter => filter.id === searchKey);
        const search = searchFilter ? String(searchFilter.value) : '';
        const keyName = prefix + "search";
        router.get(route(routeName, routeParams), {
          ...getUriFilters,
          [keyName]: search,
        }, {
          preserveState,
          preserveScroll,
          replace: true,
        });
      }
    },
    getFilteredRowModel: onlyClientSide ? getFilteredRowModel() : undefined,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: (updater) => {
      const newPagination = typeof updater === 'function' ? updater(pagination) : updater;
      setPagination(newPagination);
      const keyName = prefix + "page";
      const perPageKey = prefix + "per_page";
      if (!onlyClientSide) {
        router.get(route(routeName, routeParams), {
          ...getUriFilters,
          [keyName]: newPagination.pageIndex + 1,
          [perPageKey]: newPagination.pageSize,
        }, {
          preserveState,
          preserveScroll,
          replace: true,
        });
      }
    },
    manualSorting: !onlyClientSide,
    manualFiltering: !onlyClientSide,
    manualPagination: !onlyClientSide,
    pageCount: onlyClientSide ? undefined : -1, // -1 indicates we don't know how many pages there are
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    enableRowSelection: true
  });
  useEffect(() => {
   if(keepAlive && reloadProps !== false){
    const _interval = setInterval(() => {
      router.reload({
        only: reloadProps as string[]
      });
    }, 30000);
    return () => clearInterval(_interval);
   }
  }, []); 
  const addFilter = (name:any, value:any) => {
    const uriParams = new URL(window.location.href);
    const filterName = `${meta.prefix}filters[${name}]`;
  
    if (Array.isArray(value)) {
      Object.keys(Object.fromEntries(uriParams.searchParams.entries()))
        .filter(key => key.startsWith(filterName))
        .forEach(key => uriParams.searchParams.delete(key));
      value.forEach((item, index) =>
        uriParams.searchParams.set(`${filterName}[${index}]`, item)
      );
    } else {
      uriParams.searchParams.set(filterName, value);
    }
  
    const filters = Object.fromEntries(uriParams.searchParams.entries());
    router.get(route(routeName, routeParams), filters, {
      preserveState,
      preserveScroll,
      replace: true,
    });
  };
  const removeFilter = (name:any) => {
    const uriParams = new URL(window.location.href);
    const filterNamePrefix = `${meta.prefix}filters[${name}]`;
  
    const filtersToRemove = Object.keys(Object.fromEntries(uriParams.searchParams.entries()))
      .filter(key => key.startsWith(filterNamePrefix));
  
    filtersToRemove.forEach(key => uriParams.searchParams.delete(key));
  
    const updatedFilters = Object.fromEntries(uriParams.searchParams.entries());
    router.get(route(routeName, routeParams), updatedFilters, {
      preserveState,
      preserveScroll,
      replace: true,
    });
  };
  return (
    <div className="space-y-4">
      {showToolbar && (
        <DataTableToolbar
          table={table}
          searchKey={searchKey}
          searchPlaceholder={searchPlaceholder}
          storageKey={routeName + "_" + searchKey + "_"}
          meta={meta}
          addFilter={addFilter}
          removeFilter={removeFilter}
        />
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isSortable = meta.sortableColumns.includes(header.id);
                  return (
                    <TableHead
                      key={header.id}
                      className={isSortable ? "cursor-pointer select-none" : ""}
                      onClick={isSortable ? header.column.getToggleSortingHandler() : undefined}
                    >
                      <div className="flex items-center">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        {isSortable && (
                          <span className="ml-1">
                            {header.column.getIsSorted() === "asc" ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : header.column.getIsSorted() === "desc" ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : <ChevronsUpDown className="h-4 w-4" />}

                          </span>
                        )}
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Kayıt bulunamadı.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} meta={meta} />
    </div>
  );
}
