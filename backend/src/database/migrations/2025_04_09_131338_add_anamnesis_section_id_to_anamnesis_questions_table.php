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
        Schema::table('anamnesis_questions', function (Blueprint $table) {
            $table->unsignedBigInteger('anamnesis_section_id')->nullable()->after('id');
            $table->foreign('anamnesis_section_id')->references('id')->on('anamnesis_sections')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('anamnesis_questions', function (Blueprint $table) {
            //
        });
    }
};
