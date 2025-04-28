<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('anamnesis_sections', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('anamnesis_category_id');
            $table->string('name');
            $table->string('image')->nullable();
            $table->timestamps();

            $table->foreign('anamnesis_category_id')->references('id')->on('anamnesis_categories')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('anamnesis_sections');
    }
};
