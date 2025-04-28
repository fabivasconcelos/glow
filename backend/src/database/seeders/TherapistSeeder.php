<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Therapist;

class TherapistSeeder extends Seeder
{
    public function run(): void
    {
        Therapist::factory()->count(10)->create();
    }
}