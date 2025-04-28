<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SpecializedDemographicsSeeder extends Seeder
{
    public function run(): void
    {
        $demographics = [
            'Children (under 12)',
            'Teenagers (13-17)',
            'Young Adults (18-35)',
            'Adults (36-45)',
            'Mid-life (46-60)',
            'Seniors (61+)',
            'High-net-worth individuals',
            'Business executives/leaders',
            'Entrepreneurs',
            'Creative professionals',
            'Professional athletes',
            'Public figures',
            'Other'
        ];

        foreach ($demographics as $demographic) {
            DB::table('specialized_demographics')->insert([
                'name' => $demographic,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}