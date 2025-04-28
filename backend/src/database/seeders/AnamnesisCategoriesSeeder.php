<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AnamnesisCategory;

class AnamnesisCategoriesSeeder extends Seeder
{
    public function run()
    {
        AnamnesisCategory::insert([
            ['name' => 'Therapeutic Support', 'subtitle' => 'addressing specific challenges'],
            ['name' => 'Personal Development', 'subtitle' => 'enhancing performance and well-being'],
        ]);
    }
}