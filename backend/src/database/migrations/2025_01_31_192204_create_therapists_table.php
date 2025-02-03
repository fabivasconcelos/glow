<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('therapists', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('specialization')->nullable(); // Especialização profissional
            $table->text('bio')->nullable(); // Breve descrição do terapeuta
            $table->string('profile_picture')->nullable(); // Caminho da foto de perfil
            $table->string('gender')->nullable(); // Gênero do terapeuta
            $table->string('interaction_style')->nullable(); // Estilo de interação (estruturado, conversacional, etc.)
            $table->json('specialties')->nullable(); // Áreas de atuação como trauma, ansiedade, etc.
            $table->string('age_experience')->nullable(); // Faixa etária atendida
            $table->decimal('session_price', 8, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('therapists');
    }
};
