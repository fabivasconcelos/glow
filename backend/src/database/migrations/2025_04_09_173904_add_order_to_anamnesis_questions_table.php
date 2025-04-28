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
            $table->integer('order')->default(0)->after('anamnesis_section_id');
        });
    }

    public function down()
    {
        Schema::table('anamnesis_questions', function (Blueprint $table) {
            $table->dropColumn('order');
        });
    }
};
