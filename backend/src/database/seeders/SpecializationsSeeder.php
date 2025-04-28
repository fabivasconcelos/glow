<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SpecializationsSeeder extends Seeder
{
    public function run(): void
    {
        $specializations = [
            'Physical pain management',
            'Stress or anxiety',
            'Depression or mood concerns',
            'Trauma recovery',
            'Relationship dynamics',
            'Loss or grief',
            'Energy balancing',
            'Family and parenting',
            'Physical exhaustion/burnout',
            'Cognitive enhancement',
            'Sleep concerns',
            'Executive leadership',
            'Wealth psychology',
            'Strategic decision-making',
            'High-performance optimization',
            'Family business dynamics',
            'Public speaking/presentation',
            'Negotiation expertise',
            'Time/energy management',
            'Personal branding',
            'Legacy planning',
            'Entrepreneurship development',
            'Team building',
            'Other'
        ];

        foreach ($specializations as $specialization) {
            DB::table('specializations')->insert([
                'name' => $specialization,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}