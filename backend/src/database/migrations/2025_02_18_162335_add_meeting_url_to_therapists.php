<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('therapists', function (Blueprint $table) {
            $table->string('meeting_link')->nullable()->after('video_url'); // Adicionando campo para vídeo
        });
    }

    public function down()
    {
        Schema::table('therapists', function (Blueprint $table) {
            $table->dropColumn('meeting_link');
        });
    }
};
