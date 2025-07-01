<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 🧑‍⚕️ Therapist Basic Info
        Schema::create('therapists', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('professional_title')->nullable();
            $table->enum('gender', ['male', 'female']);
            $table->string('contact_email')->nullable();
            $table->string('professional_website')->nullable();
            $table->integer('years_experience')->nullable();
            $table->text('education_background')->nullable();
            $table->text('professional_bio')->nullable();
            $table->unsignedBigInteger('anamnesis_category_id');
            $table->string('profile_picture')->nullable();
            $table->string('intro_video')->nullable();
            $table->string('specialized_skill_expertise')->nullable();
            $table->string('unique_therapeutic_approach')->nullable();
            $table->string('demographic_specialty')->nullable();
            $table->string('outcome_expertise')->nullable();
            $table->string('unique_background_perspective')->nullable();
            $table->string('additional_differentiator_1')->nullable();
            $table->string('additional_differentiator_2')->nullable();
            $table->string('additional_differentiator_3')->nullable();
            $table->boolean('hands_on_approach')->default(false);
            $table->boolean('esoteric_frameworks')->default(false);
            $table->text('esoteric_frameworks_details')->nullable();
            $table->boolean('remote_sessions')->default(false);
            $table->boolean('in_person_sessions')->default(false);
            $table->string('geographic_location')->nullable();
            $table->integer('session_length_minutes')->nullable();
            $table->string('recommended_frequency')->nullable();
            $table->enum('pricing_tier', [
                'Premium ($500+)',
                'Advanced ($300-$499)',
                'Standard ($200-$299)',
                'Introductory (under $200)'
            ])->nullable();
            $table->text('additional_information')->nullable();
            $table->timestamps();

            $table->foreign('anamnesis_category_id')->references('id')->on('anamnesis_categories')->onDelete('cascade');
        });

        // ➡️ Cria tabelas principais antes das pivots
        Schema::create('specializations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('specialized_demographics', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('languages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        // ➡️ Agora sim, criar pivots
        Schema::create('specialization_therapist', function (Blueprint $table) {
            $table->id();
            $table->foreignId('therapist_id')->constrained('therapists')->onDelete('cascade');
            $table->foreignId('specialization_id')->constrained('specializations')->onDelete('cascade');
            $table->string('other_text')->nullable();
            $table->timestamps();
        });

        Schema::create('specialized_demographic_therapist', function (Blueprint $table) {
            $table->id();
            $table->foreignId('therapist_id')->constrained('therapists')->onDelete('cascade');
            $table->unsignedBigInteger('specialized_demographic_id');
            $table->foreign('specialized_demographic_id', 'spec_demo_id_fk')
                ->references('id')->on('specialized_demographics')
                ->onDelete('cascade');
            $table->string('other_text')->nullable();
            $table->timestamps();
        });

        Schema::create('language_therapist', function (Blueprint $table) {
            $table->id();
            $table->foreignId('therapist_id')->constrained('therapists')->onDelete('cascade');
            $table->foreignId('language_id')->constrained('languages')->onDelete('cascade');
            $table->string('other_text')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        // 🚨 Dropar PIVOTS primeiro
        Schema::dropIfExists('specialization_therapist');
        Schema::dropIfExists('specialized_demographic_therapist');
        Schema::dropIfExists('language_therapist');

        // 🚨 Depois dropar tabelas principais
        Schema::dropIfExists('therapists');
        Schema::dropIfExists('specializations');
        Schema::dropIfExists('specialized_demographics');
        Schema::dropIfExists('languages');
    }
};
