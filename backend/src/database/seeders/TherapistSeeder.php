<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Therapist;
use App\Models\Specialization;
use App\Models\SpecializedDemographic;
use App\Models\Language;
use App\Models\AnamnesisCategory;

class TherapistSeeder extends Seeder
{
    public function run(): void
    {
        $therapists = [
            [
                'full_name' => 'Anna Schmitt',
                'gender' => 'female',
                'contact_email' => 'anna.schmitt@example.com',
                'professional_title' => 'Psychological Counselor',
                'professional_website' => 'https://therapist-anna.com',
                'years_experience' => 12,
                'education_background' => 'Master of Psychology from LMU Munich.',
                'professional_bio' => 'Experienced in trauma healing and mindfulness practices.',
                'profile_picture' => 'images/therapists/photo-1.jpg',
                'intro_video' => 'videos/therapists/profile_video_demo.mp4',
                'specialized_skill_expertise' => 'Trauma-informed care, somatic therapy',
                'unique_therapeutic_approach' => 'Mindfulness and embodiment',
                'demographic_specialty' => 'Young adults and expats',
                'outcome_expertise' => 'Emotional resilience and integration',
                'unique_background_perspective' => 'German and Eastern European healing traditions',
                'additional_differentiator_1' => 'Certified Yoga Instructor',
                'additional_differentiator_2' => 'Works in both English and German',
                'additional_differentiator_3' => 'Provides safe space for LGBTQIA+ clients',
                'hands_on_approach' => true,
                'esoteric_frameworks' => true,
                'esoteric_frameworks_details' => 'Reiki and energy healing',
                'remote_sessions' => true,
                'in_person_sessions' => false,
                'geographic_location' => 'Berlin',
                'session_length_minutes' => 60,
                'recommended_frequency' => 'weekly',
                'pricing_tier' => 'Standard ($200-$299)',
                'price_per_session' => 220,
                'stripe_account_id' => 'acct_1RliptPd7Esce8t4',
                'additional_information' => 'Currently accepting new clients.',
                'status' => 'active',
                'plan' => 'standard',
            ],
            [
                'full_name' => 'Jonas Müller',
                'gender' => 'male',
                'contact_email' => 'jonas.mueller@example.com',
                'professional_title' => 'Integrative Coach',
                'professional_website' => 'https://coach-jonas.de',
                'years_experience' => 8,
                'education_background' => 'Diploma in Coaching and Development from University of Cologne.',
                'professional_bio' => 'Supporting high performers with burnout prevention.',
                'profile_picture' => 'images/therapists/photo-2.png',
                'intro_video' => 'videos/therapists/profile_video_demo.mp4',
                'specialized_skill_expertise' => 'Performance coaching, emotional regulation',
                'unique_therapeutic_approach' => 'Holistic and solution-focused',
                'demographic_specialty' => 'Entrepreneurs and executives',
                'outcome_expertise' => 'Sustainable productivity and fulfillment',
                'unique_background_perspective' => 'Background in business consulting',
                'additional_differentiator_1' => 'Offers group workshops',
                'additional_differentiator_2' => 'Fluent in English and German',
                'additional_differentiator_3' => 'Focus on practical tools',
                'hands_on_approach' => false,
                'esoteric_frameworks' => false,
                'esoteric_frameworks_details' => null,
                'remote_sessions' => true,
                'in_person_sessions' => true,
                'geographic_location' => 'Hamburg',
                'session_length_minutes' => 90,
                'recommended_frequency' => 'bi-weekly',
                'pricing_tier' => 'Advanced ($300-$499)',
                'price_per_session' => 350,
                'stripe_account_id' => 'acct_1RliptPd7Esce8t4',
                'additional_information' => 'Coaching available in-person in Hamburg.',
                'status' => 'active',
                'plan' => 'plus',
            ],
            [
                'full_name' => 'Leonie Fischer',
                'gender' => 'female',
                'contact_email' => 'leonie.fischer@example.com',
                'professional_title' => 'Holistic Therapist',
                'professional_website' => 'https://leonieheals.de',
                'years_experience' => 15,
                'education_background' => 'Trained in integrative body-psychotherapy in Freiburg.',
                'professional_bio' => 'Combining talk therapy with breathwork and body movement.',
                'profile_picture' => 'images/therapists/photo-1.jpg',
                'intro_video' => 'videos/therapists/profile_video_demo.mp4',
                'specialized_skill_expertise' => 'Grief, identity work',
                'unique_therapeutic_approach' => 'Depth psychology with creative expression',
                'demographic_specialty' => 'Women navigating life transitions',
                'outcome_expertise' => 'Grounded clarity and emotional release',
                'unique_background_perspective' => 'Artist and therapist hybrid approach',
                'additional_differentiator_1' => 'Offers art therapy techniques',
                'additional_differentiator_2' => 'Trained in Jungian methods',
                'additional_differentiator_3' => 'Sessions held in a private studio',
                'hands_on_approach' => true,
                'esoteric_frameworks' => false,
                'esoteric_frameworks_details' => null,
                'remote_sessions' => true,
                'in_person_sessions' => true,
                'geographic_location' => 'Stuttgart',
                'session_length_minutes' => 60,
                'recommended_frequency' => 'weekly',
                'pricing_tier' => 'Premium ($500+)',
                'price_per_session' => 510,
                'stripe_account_id' => 'acct_1RliptPd7Esce8t4',
                'additional_information' => 'Only accepts clients after initial interview.',
                'status' => 'active',
                'plan' => 'standard',
            ],
            [
                'full_name' => 'Karl Weber',
                'gender' => 'male',
                'contact_email' => 'karl.weber@example.com',
                'professional_title' => 'Somatic Practitioner',
                'professional_website' => 'https://karlweberbodywork.de',
                'years_experience' => 6,
                'education_background' => 'Trained at the European School of Body Psychotherapy in Leipzig.',
                'professional_bio' => 'Working with the nervous system and breath to restore balance.',
                'profile_picture' => 'images/therapists/photo-2.png',
                'intro_video' => 'videos/therapists/profile_video_demo.mp4',
                'specialized_skill_expertise' => 'Body awareness and trauma integration',
                'unique_therapeutic_approach' => 'Bottom-up nervous system regulation',
                'demographic_specialty' => 'People recovering from chronic stress',
                'outcome_expertise' => 'Resilience and restored calm',
                'unique_background_perspective' => 'Also practices martial arts and breathwork',
                'additional_differentiator_1' => 'Certified TRE facilitator',
                'additional_differentiator_2' => 'Focus on embodied safety',
                'additional_differentiator_3' => 'Supports clients long-term',
                'hands_on_approach' => true,
                'esoteric_frameworks' => false,
                'esoteric_frameworks_details' => null,
                'remote_sessions' => false,
                'in_person_sessions' => true,
                'geographic_location' => 'Leipzig',
                'session_length_minutes' => 60,
                'recommended_frequency' => 'monthly',
                'pricing_tier' => 'Introductory (under $200)',
                'price_per_session' => 180,
                'stripe_account_id' => null,
                'additional_information' => 'Currently on sabbatical until September.',
                'status' => 'inactive',
                'plan' => 'standard',
            ],
        ];

        foreach ($therapists as $data) {
            $therapist = Therapist::create($data);

            $therapist->specializations()->attach(
                Specialization::inRandomOrder()->take(3)->pluck('id')
            );

            $therapist->specializedDemographics()->attach(
                SpecializedDemographic::inRandomOrder()->take(2)->pluck('id')
            );

            $therapist->languages()->attach(
                Language::inRandomOrder()->take(2)->pluck('id')
            );

            $therapist->anamnesisCategories()->attach(
                AnamnesisCategory::inRandomOrder()->take(2)->pluck('id')
            );
        }
    }
}