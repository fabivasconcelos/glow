<?php

namespace Database\Factories;

use App\Models\Therapist;
use App\Models\Specialization;
use App\Models\SpecializedDemographic;
use App\Models\Language;
use App\Models\AnamnesisCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

class TherapistFactory extends Factory
{
    protected $model = Therapist::class;

    public function definition(): array
    {
        return [
            'full_name' => $this->faker->name(),
            'professional_title' => $this->faker->jobTitle(),
            'gender' => $this->faker->randomElement(['male', 'female']),
            'contact_email' => $this->faker->unique()->safeEmail(),
            'professional_website' => $this->faker->url(),
            'years_experience' => $this->faker->numberBetween(1, 30),
            'education_background' => $this->faker->paragraph(3),
            'professional_bio' => $this->faker->paragraph(5),
            'profile_picture' => $this->faker->randomElement(['images/therapists/photo-1.jpg', 'images/therapists/photo-2.png']),
            'intro_video' => 'videos/therapists/profile_video_demo.mp4',
            'specialized_skill_expertise' => $this->faker->sentence(),
            'unique_therapeutic_approach' => $this->faker->sentence(),
            'demographic_specialty' => $this->faker->sentence(),
            'outcome_expertise' => $this->faker->sentence(),
            'unique_background_perspective' => $this->faker->sentence(),
            'additional_differentiator_1' => $this->faker->sentence(),
            'additional_differentiator_2' => $this->faker->sentence(),
            'additional_differentiator_3' => $this->faker->sentence(),
            'hands_on_approach' => $this->faker->boolean(),
            'esoteric_frameworks' => $this->faker->boolean(),
            'esoteric_frameworks_details' => $this->faker->boolean() ? $this->faker->sentence() : null,
            'remote_sessions' => $this->faker->boolean(),
            'in_person_sessions' => $this->faker->boolean(),
            'geographic_location' => $this->faker->city(),
            'session_length_minutes' => $this->faker->randomElement([30, 45, 60, 90]),
            'recommended_frequency' => $this->faker->randomElement(['weekly', 'bi-weekly', 'monthly']),
            'pricing_tier' => $this->faker->randomElement([
                'Premium ($500+)',
                'Advanced ($300-$499)',
                'Standard ($200-$299)',
                'Introductory (under $200)',
            ]),
            'price_per_session' => $this->faker->randomElement([0, 1000]),
            'additional_information' => $this->faker->paragraph(2),
            'status' => $this->faker->randomElement(['active', 'inactive']),
            'plan' => $this->faker->randomElement(['standard', 'plus']),
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Therapist $therapist) {
            // Relacionar aleatoriamente specializations
            $therapist->specializations()->attach(
                Specialization::inRandomOrder()->take(rand(2, 5))->pluck('id')->toArray()
            );

            // Relacionar aleatoriamente specialized demographics
            $therapist->specializedDemographics()->attach(
                SpecializedDemographic::inRandomOrder()->take(rand(1, 3))->pluck('id')->toArray()
            );

            // Relacionar aleatoriamente languages
            $therapist->languages()->attach(
                Language::inRandomOrder()->take(rand(1, 2))->pluck('id')->toArray()
            );

            // Relacionar aleatoriamente anamnesis categories
            $therapist->anamnesisCategories()->attach(
                AnamnesisCategory::inRandomOrder()->take(rand(1, 2))->pluck('id')->toArray()
            );
        });
    }
}