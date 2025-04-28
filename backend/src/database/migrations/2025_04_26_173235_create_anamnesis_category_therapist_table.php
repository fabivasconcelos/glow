<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('anamnesis_category_therapist', function (Blueprint $table) {
            $table->id();
            $table->foreignId('therapist_id')->constrained('therapists')->onDelete('cascade');
            $table->foreignId('anamnesis_category_id')->constrained('anamnesis_categories')->onDelete('cascade');
            $table->timestamps();
        });

        // Remover a coluna antiga (se já existir em therapists)
        if (Schema::hasColumn('therapists', 'anamnesis_category_id')) {
            Schema::table('therapists', function (Blueprint $table) {
                $table->dropForeign(['anamnesis_category_id']);
                $table->dropColumn('anamnesis_category_id');
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('anamnesis_category_therapist');
    }
};
