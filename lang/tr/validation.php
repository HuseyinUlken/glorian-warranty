<?php

return [
    /*
     * |--------------------------------------------------------------------------
     * | Doğrulama Dil Satırları
     * |--------------------------------------------------------------------------
     * |
     * | Aşağıdaki dil satırları doğrulama sınıfı tarafından kullanılan varsayılan
     * | hata mesajlarını içerir. Bazı kuralların birden çok versiyonu vardır.
     * | Bu mesajları ihtiyaçlarınıza göre düzenlemekten çekinmeyin.
     * |
     */
    'accepted' => ':attribute kabul edilmelidir.',
    'accepted_if' => ':attribute, :other :value olduğunda kabul edilmelidir.',
    'active_url' => ':attribute geçerli bir URL olmalıdır.',
    'after' => ':attribute, :date tarihinden sonraki bir tarih olmalıdır.',
    'after_or_equal' => ':attribute, :date tarihinden sonraki veya aynı tarih olmalıdır.',
    'alpha' => ':attribute sadece harflerden oluşmalıdır.',
    'alpha_dash' => ':attribute sadece harfler, rakamlar, tireler ve alt çizgiler içermelidir.',
    'alpha_num' => ':attribute sadece harfler ve rakamlar içermelidir.',
    'array' => ':attribute bir dizi olmalıdır.',
    'before' => ':attribute, :date tarihinden önceki bir tarih olmalıdır.',
    'before_or_equal' => ':attribute, :date tarihinden önceki veya aynı tarih olmalıdır.',
    'between' => [
        'numeric' => ':attribute :min ile :max arasında olmalıdır.',
        'file' => ':attribute :min ile :max kilobayt arasında olmalıdır.',
        'string' => ':attribute :min ile :max karakter arasında olmalıdır.',
        'array' => ':attribute :min ile :max arasında öğe içermelidir.',
    ],
    'boolean' => ':attribute alanı true veya false olmalıdır.',
    'confirmed' => ':attribute doğrulaması eşleşmiyor.',
    'current_password' => 'Şifre yanlış.',
    'date' => ':attribute geçerli bir tarih olmalıdır.',
    'date_equals' => ':attribute, :date ile aynı tarih olmalıdır.',
    'date_format' => ':attribute, :format formatıyla eşleşmiyor.',
    'declined' => ':attribute reddedilmelidir.',
    'declined_if' => ':attribute, :other :value olduğunda reddedilmelidir.',
    'different' => ':attribute ve :other farklı olmalıdır.',
    'digits' => ':attribute :digits basamaklı olmalıdır.',
    'digits_between' => ':attribute :min ile :max basamak arasında olmalıdır.',
    'dimensions' => ':attribute geçersiz resim boyutlarına sahip.',
    'distinct' => ':attribute alanı yinelenen bir değere sahip.',
    'email' => ':attribute geçerli bir e-posta adresi olmalıdır.',
    'ends_with' => ':attribute şunlardan biriyle bitmelidir: :values.',
    'enum' => 'Seçilen :attribute geçersiz.',
    'exists' => 'Seçilen :attribute geçersiz.',
    'file' => ':attribute bir dosya olmalıdır.',
    'filled' => ':attribute alanı bir değere sahip olmalıdır.',
    'gt' => [
        'numeric' => ':attribute, :value değerinden büyük olmalıdır.',
        'file' => ':attribute, :value kilobayttan büyük olmalıdır.',
        'string' => ':attribute, :value karakterden büyük olmalıdır.',
        'array' => ':attribute, :value öğeden fazla öğe içermelidir.',
    ],
    'gte' => [
        'numeric' => ':attribute, :value değerinden büyük veya eşit olmalıdır.',
        'file' => ':attribute, :value kilobayttan büyük veya eşit olmalıdır.',
        'string' => ':attribute, :value karakterden büyük veya eşit olmalıdır.',
        'array' => ':attribute, :value veya daha fazla öğe içermelidir.',
    ],
    'image' => ':attribute bir resim olmalıdır.',
    'in' => 'Seçilen :attribute geçersiz.',
    'in_array' => ':attribute alanı :other içinde mevcut değil.',
    'integer' => ':attribute bir tam sayı olmalıdır.',
    'ip' => ':attribute geçerli bir IP adresi olmalıdır.',
    'ipv4' => ':attribute geçerli bir IPv4 adresi olmalıdır.',
    'ipv6' => ':attribute geçerli bir IPv6 adresi olmalıdır.',
    'json' => ':attribute geçerli bir JSON dizesi olmalıdır.',
    'lt' => [
        'numeric' => ':attribute, :value değerinden küçük olmalıdır.',
        'file' => ':attribute, :value kilobayttan küçük olmalıdır.',
        'string' => ':attribute, :value karakterden küçük olmalıdır.',
        'array' => ':attribute, :value öğeden az öğe içermelidir.',
    ],
    'lte' => [
        'numeric' => ':attribute, :value değerinden küçük veya eşit olmalıdır.',
        'file' => ':attribute, :value kilobayttan küçük veya eşit olmalıdır.',
        'string' => ':attribute, :value karakterden küçük veya eşit olmalıdır.',
        'array' => ':attribute, :value öğeden fazla öğe içermemelidir.',
    ],
    'mac_address' => ':attribute geçerli bir MAC adresi olmalıdır.',
    'max' => [
        'numeric' => ':attribute, :max değerinden büyük olmamalıdır.',
        'file' => ':attribute, :max kilobayttan büyük olmamalıdır.',
        'string' => ':attribute, :max karakterden büyük olmamalıdır.',
        'array' => ':attribute, :max öğeden fazla öğe içermemelidir.',
    ],
    'mimes' => ':attribute, şu türde bir dosya olmalıdır: :values.',
    'mimetypes' => ':attribute, şu türde bir dosya olmalıdır: :values.',
    'min' => [
        'numeric' => ':attribute en az :min olmalıdır.',
        'file' => ':attribute en az :min kilobayt olmalıdır.',
        'string' => ':attribute en az :min karakter olmalıdır.',
        'array' => ':attribute en az :min öğe içermelidir.',
    ],
    'multiple_of' => ':attribute, :value değerinin katı olmalıdır.',
    'not_in' => 'Seçilen :attribute geçersiz.',
    'not_regex' => ':attribute formatı geçersiz.',
    'numeric' => ':attribute bir sayı olmalıdır.',
    'password' => 'Şifre yanlış.',
    'present' => ':attribute alanı mevcut olmalıdır.',
    'prohibited' => ':attribute alanı yasaktır.',
    'prohibited_if' => ':other :value olduğunda :attribute alanı yasaktır.',
    'prohibited_unless' => ':other :values içinde olmadığı sürece :attribute alanı yasaktır.',
    'prohibits' => ':attribute alanı, :other alanının mevcut olmasını yasaklar.',
    'regex' => ':attribute formatı geçersiz.',
    'required' => ':attribute alanı gereklidir.',
    'required_array_keys' => ':attribute alanı şu anahtarları içermelidir: :values.',
    'required_if' => ':other :value olduğunda :attribute alanı gereklidir.',
    'required_unless' => ':other :values içinde olmadığı sürece :attribute alanı gereklidir.',
    'required_with' => ':values mevcut olduğunda :attribute alanı gereklidir.',
    'required_with_all' => ':values mevcut olduğunda :attribute alanı gereklidir.',
    'required_without' => ':values mevcut olmadığında :attribute alanı gereklidir.',
    'required_without_all' => ':values hiçbiri mevcut olmadığında :attribute alanı gereklidir.',
    'same' => ':attribute ve :other eşleşmelidir.',
    'size' => [
        'numeric' => ':attribute :size olmalıdır.',
        'file' => ':attribute :size kilobayt olmalıdır.',
        'string' => ':attribute :size karakter olmalıdır.',
        'array' => ':attribute :size öğe içermelidir.',
    ],
    'starts_with' => ':attribute şunlardan biriyle başlamalıdır: :values.',
    'string' => ':attribute bir dize olmalıdır.',
    'timezone' => ':attribute geçerli bir saat dilimi olmalıdır.',
    'unique' => ':attribute zaten alınmış.',
    'uploaded' => ':attribute yüklenemedi.',
    'url' => ':attribute geçerli bir URL olmalıdır.',
    'uuid' => ':attribute geçerli bir UUID olmalıdır.',

    /*
     * |--------------------------------------------------------------------------
     * | Özel Doğrulama Dil Satırları
     * |--------------------------------------------------------------------------
     * |
     * | Burada, "attribute.rule" kuralını kullanarak öznitelikler için özel doğrulama
     * | mesajları belirtebilirsiniz. Bu, belirli bir öznitelik kuralı için belirli bir
     * | özel dil satırı belirtmenizi kolaylaştırır.
     * |
     */
    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
    ],

    /*
     * |--------------------------------------------------------------------------
     * | Özel Doğrulama Öznitelikleri
     * |--------------------------------------------------------------------------
     * |
     * | Aşağıdaki dil satırları, öznitelik yer tutucusu yerine daha okunaklı
     * | bir ad gibi bir şey koymak için kullanılır. Bu basitçe mesajlarımızı
     * | daha anlaşılır hale getirmemize yardımcı olur.
     * |
     */
    'attributes' => [],
];
