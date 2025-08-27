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
        $names = ['Anna Müller', 'Johannes Schmidt', 'Sophie Schneider', 'Lukas Fischer', 'Mia Weber'];
        $cities = ['Berlin', 'Hamburg', 'München', 'Köln', 'Frankfurt'];
        $pricingTiers = [
            'Premium (€500+)',
            'Advanced (€300–€499)',
            'Standard (€200–€299)',
            'Introductory (under €200)',
        ];

        return [
            'full_name' => $names[array_rand($names)],
            'professional_title' => 'Holistic Psychotherapist',
            'gender' => ['male', 'female'][rand(0, 1)],
            'contact_email' => 'therapist' . rand(100, 999) . '@glow.de',
            'professional_website' => 'https://therapist-example.de',
            'years_experience' => rand(3, 25),
            'education_background' => 'Degree in Psychology from University of Heidelberg',
            'professional_bio' => 'I support individuals in their path to clarity, emotional balance, and personal growth.',
            'profile_picture' => 'images/therapists/photo-' . rand(1, 2) . '.jpg',
            'intro_video' => 'videos/therapists/profile_video_demo.mp4',
            'specialized_skill_expertise' => 'Trauma healing, mindfulness, integrative therapy',
            'unique_therapeutic_approach' => 'Blending classical therapy with somatic and energetic practices',
            'demographic_specialty' => 'Adults, LGBTQ+, expats in Germany',
            'outcome_expertise' => 'Emotional resilience, self-confidence, inner peace',
            'unique_background_perspective' => 'Experience working with HSPs and cross-cultural clients',
            'additional_differentiator_1' => 'Deep empathy and presence',
            'additional_differentiator_2' => 'Structured yet intuitive process',
            'additional_differentiator_3' => 'Holistic and grounded approach',
            'hands_on_approach' => (bool)rand(0, 1),
            'esoteric_frameworks' => (bool)rand(0, 1),
            'esoteric_frameworks_details' => rand(0, 1) ? 'Human Design and intuitive energy work' : null,
            'remote_sessions' => true,
            'in_person_sessions' => (bool)rand(0, 1),
            'geographic_location' => $cities[array_rand($cities)],
            'session_length_minutes' => [50, 60, 75][array_rand([50, 60, 75])],
            'recommended_frequency' => ['weekly', 'bi-weekly', 'monthly'][rand(0, 2)],
            'pricing_tier' => $pricingTiers[array_rand($pricingTiers)],
            'price_per_session' => [150, 200, 250, 300][rand(0, 3)],
            'stripe_account_id' => 'acct_1RliptPd7Esce8t4',
            'additional_information' => 'Sessions available in English and German.',
            'status' => 'active',
            'plan' => ['standard', 'plus'][rand(0, 1)],
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Therapist $therapist) {
            $therapist->specializations()->attach(
                Specialization::inRandomOrder()->take(rand(2, 4))->pluck('id')->toArray()
            );

            $therapist->specializedDemographics()->attach(
                SpecializedDemographic::inRandomOrder()->take(rand(1, 2))->pluck('id')->toArray()
            );

            $therapist->languages()->attach(
                Language::whereIn('name', ['Deutsch', 'English'])->pluck('id')->toArray()
            );

            $therapist->anamnesisCategories()->attach(
                AnamnesisCategory::inRandomOrder()->take(rand(1, 2))->pluck('id')->toArray()
            );
        });
    }
}
