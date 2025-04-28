<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            UserSeeder::class,
            AdminSeeder::class,
            AnamnesisCategoriesSeeder::class,
            AnamnesisSectionSeeder::class,
            AnamnesisSeeder::class,
            SpecializationsSeeder::class,
            SpecializedDemographicsSeeder::class,
            LanguagesSeeder::class,
            TherapistSeeder::class
        ]);
    }
}