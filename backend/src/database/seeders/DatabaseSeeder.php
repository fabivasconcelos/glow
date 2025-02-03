<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            AnamnesisSeeder::class,
            UserSeeder::class,
            TherapistSeeder::class
        ]);
    }
}