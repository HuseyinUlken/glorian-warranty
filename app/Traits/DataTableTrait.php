<?php

namespace App\Traits;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Query\Builder as QueryBuilder;
use Illuminate\Http\Request;

trait DataTableTrait
{
    public $availableFilters = [];
    public $prefix = '';
    public $perPage = 10;
    public $debounceDelay = 100;
    public $perPageOptions = [10, 25, 50, 100];
    public $request;

    /**
     * DataTable için veri hazırlama
     *
     * @param Builder|QueryBuilder $query
     * @param Request $request
     * @param array $searchableColumns
     * @param array $sortableColumns
     * @param string $prefix
     * @param int $debounceDelay
     * @return array
     */
    public function prepareDataTable(
        $query,
        Request $request,
        array $searchableColumns = [],
        array $sortableColumns = [],
        $prefix = '',
        int $debounceDelay = 100,
        $defaultSortColumn = 'created_at'
    ): array {
        $perPage = $this->perPage;
        $this->prefix = $prefix;
        $this->debounceDelay = $debounceDelay;
        $this->request = $request;
        if ($request->has($prefix . 'search') && $request->get($prefix . 'search') !== null && !empty($searchableColumns)) {
            $query->where(function ($q) use ($request, $searchableColumns, $prefix) {
                foreach ($searchableColumns as $column) {
                    if ($prefix !== '') {
                        $column = str_replace($prefix, '', $column);
                    }
                    if (strpos($column, '.') !== false) {
                        $parts = explode('.', $column);
                        $relation = $parts[0];
                        $attribute = str_replace($relation . '.', '', $column);
                        $q->orWhereHas($relation, function ($q) use ($attribute, $request, $prefix) {
                            if (strpos($attribute, '.') !== false) {
                                $parts = explode('.', $attribute);
                                $subRelation = $parts[0];
                                $subAttribute = str_replace($subRelation . '.', '', $attribute);
                                $q->whereHas($subRelation, function ($q) use ($subAttribute, $request, $prefix) {
                                    $q->where($subAttribute, 'like', '%' . $request->get($prefix . 'search') . '%');
                                });
                            } else {
                                $q->where($attribute, 'like', '%' . $request->get($prefix . 'search') . '%');
                            }
                        });
                    } else {
                        $q->orWhere($column, 'like', '%' . $request->get($prefix . 'search') . '%');
                    }
                }
            });
        }

        // Sıralama işlemi
        if ($request->has($prefix . 'sort') && in_array($request->get($prefix . 'sort'), $sortableColumns)) {
            $direction = $request->has($prefix . 'direction') && in_array(strtolower($request->get($prefix . 'direction')), ['asc', 'desc'])
                ? $request->get($prefix . 'direction')
                : 'asc';
            $query->orderBy($request->get($prefix . 'sort'), $direction);
        } else {
            $query->orderBy($defaultSortColumn, 'desc');
        }

        // Filtreleme işlemleri
        if ($request->has($prefix . 'filters') && is_array($request->get($prefix . 'filters'))) {
            foreach ($request->get($prefix . 'filters') as $column => $value) {
                if ($value !== null && $value !== '') {
                    if (is_array($value)) {
                        $query->whereIn($column, $value);
                    } else {
                        if (str_starts_with($value, 'date_')) {
                            $isoDate = substr($value, 5);
                            $carbonDate = Carbon::parse($isoDate);
                            $query->whereDate($column, $carbonDate->toDateString());
                        } else {
                            if ($value == 'true' || $value == 'false') {
                                $value = $value == 'true' ? true : false;
                            }
                            $query->where($column, $value);
                        }
                    }
                }
            }
        }
        $page = $request->has($prefix . 'page') ? (int) $request->get($prefix . 'page') : 1;
        // Sayfalama
        $data = $query
            ->paginate($request->has($prefix . 'per_page') ? (int) $request->get($prefix . 'per_page', $perPage) : $perPage, ['*'], 'page', $page)
            ->withQueryString();
        $filters = $request->only([$prefix . 'search', $prefix . 'sort', $prefix . 'direction', $prefix . 'per_page', $prefix . 'filters']);
        return [
            'data' => $data,
            'meta' => [
                'searchableColumns' => $searchableColumns,
                'sortableColumns' => $sortableColumns,
                'filters' => [...$filters, ...$request->get($prefix . 'filters', [])],
                'availableFilters' => $this->getFilters(),
                'current_page' => $data->currentPage(),
                'last_page' => $data->lastPage(),
                'total' => $data->total(),
                'per_page' => $data->perPage(),
                'from' => $data->firstItem(),
                'to' => $data->lastItem(),
                'total_pages' => $data->lastPage(),
                'per_page_options' => $this->perPageOptions,
                'prefix' => $prefix,
                'debounceDelay' => $debounceDelay,
            ],
        ];
    }

    public function addFilter($columnName, $label, $placeholder, $options, $type = 'select', $multiple = false, $default = null)
    {
        $this->availableFilters[] = [
            'type' => $type,
            'column' => $columnName,
            'label' => $label,
            'options' => $options,
            'default' => $default,
            'multiple' => $multiple,
            'placeholder' => $placeholder,
            'selectedValue' => null
        ];
    }

    public function getFilters()
    {
        return collect($this->availableFilters)->map(function ($filter) {
            $applied = null;
            if ($this->request->has($this->prefix . 'filters') && is_array($this->request->get($this->prefix . 'filters'))) {
                $filters = collect($this->request->get($this->prefix . 'filters'));
                if ($filters->has($filter['column'])) {
                    if ($filter['multiple']) {
                        $applied = collect($filters->get($filter['column']))->map(function ($item) {
                            return intval($item);
                        });
                    } else {
                        $value = $filters->get($filter['column']);
                        if ($filter['type'] === 'date') {
                            $applied = $value;
                        } else {
                            $applied = intval($value);
                        }
                    }
                }
            }
            return [
                'type' => $filter['type'],
                'column' => $filter['column'],
                'label' => $filter['label'],
                'options' => $filter['options'],
                'default' => $filter['default'],
                'multiple' => $filter['multiple'],
                'placeholder' => $filter['placeholder'],
                'selectedValue' => $applied
            ];
        });
    }
}
