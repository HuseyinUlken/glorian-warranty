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
        Schema::create('exported_files', function (Blueprint $table) {
            $table->id();
            $table->string('filename');
            $table->string('path');
            $table->string('type')->comment('Dosya tipi (örn: category_export, competency_export)');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('model_type')->nullable()->comment('İlişkili model türü (örn: App\Models\Rotation)');
            $table->unsignedBigInteger('model_id')->nullable()->comment('İlişkili model ID');
            $table->text('description')->nullable();
            $table->string('file_size')->nullable();
            $table->string('file_hash')->nullable();
            $table->timestamp('downloaded_at')->nullable();
            $table->integer('download_count')->default(0);
            $table->timestamps();
            $table->softDeletes();

            // Model tipi ve ID için index
            $table->index(['model_type', 'model_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exported_files');
    }
};
