<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LanguagesSeeder extends Seeder
{
    public function run(): void
    {
        $languages = [
            'English',
            'Spanish',
            'French',
            'German',
            'Italian',
            'Mandarin',
            'Cantonese',
            'Japanese',
            'Russian',
            'Arabic',
            'Portuguese',
            'Hebrew',
            'Other'
        ];

        foreach ($languages as $language) {
            DB::table('languages')->insert([
                'name' => $language,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}