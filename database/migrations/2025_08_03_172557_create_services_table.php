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
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('service_code', 16)->unique();  // 16 haneli benzersiz kod
            $table->foreignId('dealer_id')->constrained()->cascadeOnDelete();
            $table->foreignId('customer_id')->constrained()->cascadeOnDelete();

            // Araç bilgileri
            $table->string('vehicle_make');  // Marka
            $table->string('vehicle_model');  // Model
            $table->integer('vehicle_year');  // Yıl
            $table->string('vehicle_package')->nullable();  // Paket
            $table->string('vehicle_color')->nullable();  // Renk
            $table->string('vehicle_plate')->nullable();  // Plaka

            // Hizmet bilgileri
            $table->enum('status', ['PENDING', 'ACTIVE', 'EXPIRED'])->default('PENDING');
            $table->date('application_date');  // Başvuru tarihi
            $table->date('warranty_start_date')->nullable();  // Garanti başlangıç tarihi
            $table->date('warranty_end_date')->nullable();  // Garanti bitiş tarihi

            // Ek bilgiler
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
