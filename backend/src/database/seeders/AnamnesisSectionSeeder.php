<?php


namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AnamnesisSection;

class AnamnesisSectionSeeder extends Seeder
{
    public function run()
    {
        $sections = [
            [
                'name' => 'Part 1: Initial Assessment (2 minutes)',
                'image' => 'images/anamnesis/sections/01.jpeg',
                'anamnesis_category_id' => 1,
            ],
            [
                'name' => 'Part 2: Session Preferences (1 minute)',
                'image' => 'images/anamnesis/sections/02.jpeg',
                'anamnesis_category_id' => 1,
            ],
            [
                'name' => 'Part 3: Practitioner Preferences (1 minute)',
                'image' => 'images/anamnesis/sections/03.jpeg',
                'anamnesis_category_id' => 1,
            ],
            [
                'name' => 'Part 4: Personal Context (2 minutes)',
                'image' => 'images/anamnesis/sections/04.jpeg',
                'anamnesis_category_id' => 1,
            ],
            [
                'name' => 'Part 1: Initial Assessment (2 minutes)',
                'image' => 'images/anamnesis/sections/05.jpeg',
                'anamnesis_category_id' => 2,
            ],
            [
                'name' => 'Part 2: Session Preferences (1 minute)',
                'image' => 'images/anamnesis/sections/06.jpeg',
                'anamnesis_category_id' => 2,
            ],
            [
                'name' => 'Part 3: Practitioner Preferences (1 minute)',
                'image' => 'images/anamnesis/sections/07.jpeg',
                'anamnesis_category_id' => 2,
            ],
            [
                'name' => 'Part 4: Personal Context (2 minutes)',
                'image' => 'images/anamnesis/sections/08.jpeg',
                'anamnesis_category_id' => 2,
            ],
        ];

        foreach ($sections as $section) {
            AnamnesisSection::create($section);
        }
    }
}