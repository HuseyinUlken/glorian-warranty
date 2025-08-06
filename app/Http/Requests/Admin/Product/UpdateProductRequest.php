<?php

namespace App\Http\Requests\Admin\Product;

use App\Enums\ProductCategoryEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->can('product.edit');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $product = $this->route('product');

        return [
            'name' => 'required|string|max:255',
            'category' => 'required|in:' . implode(',', array_column(ProductCategoryEnum::options(), 'value')),
            'sku' => [
                'nullable',
                'string',
                'max:100',
                Rule::unique('products', 'sku')->ignore($product),
            ],
            'description' => 'nullable|string',
            'warranty_description' => 'nullable|string',
            'warranty_duration_months' => 'required|integer|min:1|max:120',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Ürün adı zorunludur.',
            'name.max' => 'Ürün adı en fazla 255 karakter olabilir.',
            'category.required' => 'Ürün kategorisi zorunludur.',
            'category.in' => 'Geçersiz ürün kategorisi.',
            'sku.max' => 'SKU en fazla 100 karakter olabilir.',
            'sku.unique' => 'Bu SKU zaten kullanılıyor.',
            'warranty_duration_months.required' => 'Garanti süresi zorunludur.',
            'warranty_duration_months.integer' => 'Garanti süresi tam sayı olmalıdır.',
            'warranty_duration_months.min' => 'Garanti süresi en az 1 ay olmalıdır.',
            'warranty_duration_months.max' => 'Garanti süresi en fazla 120 ay (10 yıl) olabilir.',
        ];
    }
}
