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
        Schema::table('therapists', function (Blueprint $table) {
            $table->string('stripe_account_id')->nullable();
            $table->string('stripe_onboarding_link')->nullable();
            $table->boolean('stripe_ready')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('therapists', function (Blueprint $table) {
            $table->dropColumn('stripe_account_id');
            $table->dropColumn('stripe_onboarding_link');
            $table->dropColumn('stripe_ready');
        });
    }
};
