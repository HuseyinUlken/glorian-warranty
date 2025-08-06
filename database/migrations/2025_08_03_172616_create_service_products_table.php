<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('service_products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_id')->constrained()->cascadeOnDelete();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->json('applied_areas');  // Uygulanan alanlar (örn: ["Kaput", "Ön Çamurluk"])
            $table->text('notes')->nullable();  // Ürüne özel notlar
            $table->timestamps();

            // Aynı hizmete aynı ürün birden fazla kez eklenemez
            $table->unique(['service_id', 'product_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_products');
    }
};
