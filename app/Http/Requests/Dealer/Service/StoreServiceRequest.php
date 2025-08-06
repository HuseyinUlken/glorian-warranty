<?php

namespace App\Http\Requests\Dealer\Service;

use Illuminate\Foundation\Http\FormRequest;

class StoreServiceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->can('service.create');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'application_date' => 'required|date|before_or_equal:today',
            'customer' => 'required|array',
            'customer.first_name' => 'required|string|max:255',
            'customer.last_name' => 'required|string|max:255',
            'customer.phone' => 'required|string|max:20',
            'customer.email' => 'nullable|email|max:255',
            'customer.address' => 'nullable|string',
            'customer.city' => 'nullable|string|max:255',
            'customer.district' => 'nullable|string|max:255',
            'vehicle' => 'required|array',
            'vehicle.make' => 'required|string|max:255',
            'vehicle.model' => 'required|string|max:255',
            'vehicle.year' => 'required|integer|min:1900|max:' . (date('Y') + 1),
            'vehicle.package' => 'nullable|string|max:255',
            'vehicle.color' => 'nullable|string|max:255',
            'vehicle.plate' => 'nullable|string|max:20',
            'applied_products' => 'required|array|min:1',
            'applied_products.*.product_id' => 'required|exists:products,id',
            'applied_products.*.applied_areas' => 'required|array|min:1',
            'applied_products.*.applied_areas.*' => 'required|string|max:255',
            'applied_products.*.notes' => 'nullable|string|max:1000',
            'notes' => 'nullable|string|max:1000',
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
            'application_date.required' => 'Başvuru tarihi zorunludur.',
            'application_date.before_or_equal' => 'Başvuru tarihi bugünden sonra olamaz.',
            'customer.first_name.required' => 'Müşteri adı zorunludur.',
            'customer.last_name.required' => 'Müşteri soyadı zorunludur.',
            'customer.phone.required' => 'Müşteri telefon numarası zorunludur.',
            'customer.email.email' => 'Geçerli bir e-posta adresi giriniz.',
            'vehicle.make.required' => 'Araç markası zorunludur.',
            'vehicle.model.required' => 'Araç modeli zorunludur.',
            'vehicle.year.required' => 'Araç yılı zorunludur.',
            'vehicle.year.min' => 'Araç yılı geçerli olmalıdır.',
            'vehicle.year.max' => 'Araç yılı gelecek yıldan büyük olamaz.',
            'applied_products.required' => 'En az bir ürün seçilmelidir.',
            'applied_products.min' => 'En az bir ürün seçilmelidir.',
            'applied_products.*.product_id.required' => 'Ürün seçimi zorunludur.',
            'applied_products.*.product_id.exists' => 'Seçilen ürün geçerli değil.',
            'applied_products.*.applied_areas.required' => 'Uygulama alanları zorunludur.',
            'applied_products.*.applied_areas.min' => 'En az bir uygulama alanı seçilmelidir.',
        ];
    }
}
