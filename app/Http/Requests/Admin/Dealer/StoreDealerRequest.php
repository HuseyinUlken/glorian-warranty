<?php

namespace App\Http\Requests\Admin\Dealer;

use App\Enums\DealerStatusEnum;
use Illuminate\Foundation\Http\FormRequest;

class StoreDealerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->can('dealer.create');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'phone' => 'nullable|string|max:20',
            'city' => 'nullable|string|max:255',
            'district' => 'nullable|string|max:255',
            'address' => 'nullable|string',
            'status' => 'nullable|in:' . implode(',', array_column(DealerStatusEnum::options(), 'value')),
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
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
            'name.required' => 'Bayi adı zorunludur.',
            'name.max' => 'Bayi adı en fazla 255 karakter olabilir.',
            'email.required' => 'E-posta adresi zorunludur.',
            'email.email' => 'Geçerli bir e-posta adresi giriniz.',
            'email.unique' => 'Bu e-posta adresi zaten kullanılıyor.',
            'password.required' => 'Şifre zorunludur.',
            'password.min' => 'Şifre en az 8 karakter olmalıdır.',
            'password.confirmed' => 'Şifre onayı eşleşmiyor.',
            'phone.max' => 'Telefon numarası en fazla 20 karakter olabilir.',
            'city.max' => 'Şehir adı en fazla 255 karakter olabilir.',
            'district.max' => 'İlçe adı en fazla 255 karakter olabilir.',
            'status.in' => 'Geçersiz durum seçimi.',
            'logo.image' => 'Logo bir resim dosyası olmalıdır.',
            'logo.mimes' => 'Logo JPEG, PNG, JPG veya GIF formatında olmalıdır.',
            'logo.max' => 'Logo dosyası en fazla 2MB olabilir.',
        ];
    }
}
