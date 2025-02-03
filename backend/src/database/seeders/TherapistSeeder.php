<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Therapist;

class TherapistSeeder extends Seeder
{
    public function run()
    {
        Therapist::insert([
            [
                'name' => 'James Stuart',
                'specialization' => 'Licensed Psychologist',
                'bio' => 'My approach combines Cognitive Behavioral Therapy with mindfulness techniques.',
                'profile_picture' => 'images/therapists/james_stuart.png',
                'gender' => 'Male',
                'interaction_style' => 'Structured',
                'specialties' => json_encode(['Anxiety', 'Depression', 'Mindfulness']),
                'age_experience' => '18-25',
                'session_price' => 200.0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Michelle Ortiz',
                'specialization' => 'Holistic Therapy Coach',
                'bio' => 'My approach combines Cognitive Behavioral Therapy with mindfulness techniques.',
                'profile_picture' => 'images/therapists/michelle_ortiz.png',
                'gender' => 'Female',
                'interaction_style' => 'Conversational',
                'specialties' => json_encode(['Holistic Therapy', 'Mindfulness', 'Stress Management']),
                'age_experience' => '26-35',
                'session_price' => 200.0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Herarld Berchewikenstein',
                'specialization' => 'Licensed Psychologist',
                'bio' => 'My approach combines Cognitive Behavioral Therapy with mindfulness techniques.',
                'profile_picture' => 'images/therapists/herarld_berchewikenstein.png',
                'gender' => 'Male',
                'interaction_style' => 'No preference',
                'specialties' => json_encode(['Cognitive Behavioral Therapy', 'Depression', 'Anxiety']),
                'age_experience' => '36-45',
                'session_price' => 200.0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Francine Maxwell',
                'specialization' => 'Licensed Psychologist',
                'bio' => 'My approach combines Cognitive Behavioral Therapy with mindfulness techniques.',
                'profile_picture' => 'images/therapists/francine_maxwell.png',
                'gender' => 'Female',
                'interaction_style' => 'Structured',
                'specialties' => json_encode(['CBT', 'Trauma', 'Mindfulness']),
                'age_experience' => '46-55',
                'session_price' => 150.0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
