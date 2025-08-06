<?php

return [
    /*
     * |--------------------------------------------------------------------------
     * | OpenAI API Configuration
     * |--------------------------------------------------------------------------
     * |
     * | Bu dosya OpenAI API ayarlarını içerir. Öğrenci dashboardu için
     * | AI asistan özelliklerini yapılandırmak için kullanılır.
     * |
     */
    'api_key' => env('OPENAI_API_KEY'),
    'organization' => env('OPENAI_ORGANIZATION'),
    'base_url' => env('OPENAI_BASE_URL', 'https://api.openai.com/v1'),
    'timeout' => env('OPENAI_TIMEOUT', 30),
    'max_retries' => env('OPENAI_MAX_RETRIES', 3),

    /*
     * |--------------------------------------------------------------------------
     * | Model Configuration
     * |--------------------------------------------------------------------------
     * |
     * | Hangi OpenAI modelinin kullanılacağını belirler.
     * |
     */
    'model' => env('OPENAI_MODEL', 'gpt-4o-mini'),

    /*
     * |--------------------------------------------------------------------------
     * | Student Assistant Configuration
     * |--------------------------------------------------------------------------
     * |
     * | Öğrenci asistanı için özel ayarlar.
     * |
     */
    'student_assistant' => [
        'system_prompt' => env('OPENAI_STUDENT_SYSTEM_PROMPT', 'Sen bir eğitim asistanısın. Öğrencilere ders konularında yardım eder, sorularını yanıtlar ve öğrenme süreçlerinde destek olursun. Türkçe konuşur ve öğrenci dostu bir dil kullanırsın.'),
        'max_tokens' => env('OPENAI_STUDENT_MAX_TOKENS', 1000),
        'temperature' => env('OPENAI_STUDENT_TEMPERATURE', 0.7),
        'max_conversation_length' => env('OPENAI_STUDENT_MAX_CONVERSATION', 10),
    ],

    /*
     * |--------------------------------------------------------------------------
     * | Statistics Analysis Configuration
     * |--------------------------------------------------------------------------
     * |
     * | Öğrenci istatistiklerini analiz etmek için ayarlar.
     * |
     */
    'statistics_analysis' => [
        'system_prompt' => env('OPENAI_STATS_SYSTEM_PROMPT', 'Sen bir eğitim analisti olarak öğrenci verilerini analiz eder ve anlamlı içgörüler sunarsın. Markdown formatında raporlar hazırlarsın.'),
        'max_tokens' => env('OPENAI_STATS_MAX_TOKENS', 1500),
        'temperature' => env('OPENAI_STATS_TEMPERATURE', 0.3),
    ],

    /*
     * |--------------------------------------------------------------------------
     * | Rate Limiting
     * |--------------------------------------------------------------------------
     * |
     * | API çağrı limitlerini kontrol eder.
     * |
     */
    'rate_limit' => [
        'requests_per_minute' => env('OPENAI_RATE_LIMIT_PER_MINUTE', 60),
        'requests_per_hour' => env('OPENAI_RATE_LIMIT_PER_HOUR', 1000),
    ],

    /*
     * |--------------------------------------------------------------------------
     * | Caching Configuration
     * |--------------------------------------------------------------------------
     * |
     * | AI yanıtlarını cache'lemek için ayarlar.
     * |
     */
    'cache' => [
        'enabled' => env('OPENAI_CACHE_ENABLED', true),
        'ttl' => env('OPENAI_CACHE_TTL', 3600),  // 1 saat
    ],
];
