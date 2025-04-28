<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AnamnesisQuestion;
use App\Models\AnamnesisOption;

class AnamnesisSeeder extends Seeder
{
    public function run()
    {
        $questions = [
            [
                'question' => 'What brings you to seek therapeutic support?',
                'type' => 'multiple_choice',
                'options' => [
                    'Physical pain or discomfort',
                    'Stress or anxiety management',
                    'Mood concerns',
                    'Relationship dynamics',
                    'Loss or grief',
                    'Energy balancing',
                    'Family and parenting',
                    'Physical exhaustion',
                    'Mental clarity challenges',
                    'Sleep concerns',
                    'Other'
                ],
                'anamnesis_section_id' => 1,
                'order' => 1
            ],
            [
                'question' => 'How soon would you like to begin your sessions?',
                'type' => 'single_choice',
                'options' => ['As soon as possible (within 48 hours)', 'Within the next week', 'Within the next two weeks', "I'm flexible with timing"],
                'anamnesis_section_id' => 1,
                'order' => 2
            ],
            [
                'question' => 'Have you worked with a therapist or coach previously?',
                'type' => 'single_choice',
                'options' => [
                    'Yes, extensively',
                    'Yes, briefly',
                    'No, this will be my first experience'
                ],
                'anamnesis_section_id' => 1,
                'order' => 3
            ],
            [
                'question' => 'Do you have any preferences regarding session format?',
                'type' => 'single_choice',
                'options' => ['In-person sessions', 'Remote sessions', 'Combination of both', 'No preference'],
                'anamnesis_section_id' => 2,
                'order' => 4
            ],
            [
                'question' => 'For in-person therapeutic approaches, are you comfortable with modalities that may include appropriate physical contact?',
                'type' => 'single_choice',
                'options' => ["Yes, I'm open to appropriate physical modalities", 'No, I prefer non-touch approaches', "I'd like to discuss this with the practitioner first"],
                'anamnesis_section_id' => 2,
                'order' => 5
            ],
            [
                'question' => 'What session frequency do you anticipate would be most beneficial?',
                'type' => 'single_choice',
                'options' => ["Weekly sessions", 'Bi-weekly sessions', "Monthly sessions", "I'm open to the practitioner's recommendation"],
                'anamnesis_section_id' => 2,
                'order' => 6
            ],
            [
                'question' => 'What investment range per session aligns with your expectations?',
                'type' => 'single_choice',
                'options' => ["Premium tier ($500+)", 'Advanced tier ($300-$499)', "Standard tier ($200-$299)", "Introductory tier (under $200)"],
                'anamnesis_section_id' => 2,
                'order' => 7
            ],
            [
                'question' => 'Which therapeutic specializations are you most interested in?',
                'type' => 'multiple_choice',
                'options' => [
                    'Trauma-informed approaches',
                    'Anxiety management',
                    'Mood regulation',
                    'Relationship dynamics',
                    'Holistic wellness integration',
                    'Western psychological frameworks',
                    'Eastern integrative practices',
                    'Energy medicine',
                    'Mind-body connection approaches',
                    'Plant medicine and herbology',
                    'Physical modalities',
                    'Structural alignment',
                    'Spiritual development'
                ],
                'anamnesis_section_id' => 3,
                'order' => 8
            ],
            [
                'question' => 'Do you have a preference regarding your practitioner\'s gender?',
                'type' => 'single_choice',
                'options' => ['Male practitioner', 'Female practitioner', 'No preference'],
                'anamnesis_section_id' => 3
                ,
                'order' => 9
            ],
            [
                'question' => 'Do you have a preference regarding your practitioner\'s age range?',
                'type' => 'single_choice',
                'options' => ['Under 45 years', '45-60 years', 'Over 60 years', 'No preference'],
                'anamnesis_section_id' => 3,
                'order' => 10
            ],
            [
                'question' => 'How important is your practitioner\'s years of experience?',
                'type' => 'single_choice',
                'options' => ['Essential (20+ years)', 'Very important (10-20 years)', 'Somewhat important (5-10 years)', 'I value fit over experience length'],
                'anamnesis_section_id' => 3,
                'order' => 11
            ],
            [
                'question' => 'How would you describe your comfort level with exploring emotional history?',
                'type' => 'single_choice',
                'options' => ['Very comfortable with deep emotional exploration', 'Moderately comfortable discussing emotional patterns', 'Prefer to begin with present-focused approaches', 'Prefer minimal focus on emotional history initially'],
                'anamnesis_section_id' => 4,
                'order' => 12
            ],
            [
                'question' => 'What is your age range?',
                'type' => 'single_choice',
                'options' => ['18-35', '36-45', '46-60', '61+'],
                'anamnesis_section_id' => 4,
                'order' => 13
            ],
            [
                'question' => 'How important is it that your practitioner has experience with your specific demographic?',
                'type' => 'single_choice',
                'options' => ['Extremely important', 'Somewhat important', 'Not particularly important'],
                'anamnesis_section_id' => 4,
                'order' => 14
            ],
            [
                'question' => 'Are you comfortable with practitioners who integrate esoteric or alternative frameworks?',
                'type' => 'single_choice',
                'options' => ['Very comfortable and interested', 'Somewhat open to these perspectives', 'Prefer conventional approaches only', 'No preference'],
                'anamnesis_section_id' => 4,
                'order' => 15
            ],
            [
                'question' => 'What is your primary objective for this therapeutic relationship?',
                'type' => 'single_choice',
                'options' => ['Resolving specific challenges', 'Enhancing overall well-being', 'Deep personal transformation'],
                'anamnesis_section_id' => 4,
                'order' => 16
            ],
            [
                'question' => 'Would you like to share anything else that might help us match you with the ideal practitioner?',
                'type' => 'text',
                'options' => [],
                'anamnesis_section_id' => 4,
                'order' => 17
            ],
            [
                'question' => 'What areas are you looking to develop?',
                'type' => 'multiple_choice',
                'options' => [
                    'Performance optimization',
                    'Leadership capabilities',
                    'Decision-making effectiveness',
                    'Creative thinking',
                    'Emotional intelligence',
                    'Work-life integration',
                    'Communication skills',
                    'Strategic vision',
                    'Legacy planning',
                    'Relationship dynamics in business',
                    'Cognitive enhancement',
                    'Energy management',
                    'Purpose and meaning',
                    'Other'
                ],
                'anamnesis_section_id' => 5,
                'order' => 18
            ],
            [
                'question' => 'How soon would you like to begin your sessions?',
                'type' => 'single_choice',
                'options' => ['As soon as possible (within 48 hours)', 'Within the next week', 'Within the next two weeks', "I'm flexible with timing"],
                'anamnesis_section_id' => 5,
                'order' => 19
            ],
            [
                'question' => 'Have you worked with a therapist or coach previously?',
                'type' => 'single_choice',
                'options' => [
                    'Yes, extensively',
                    'Yes, briefly',
                    'No, this will be my first experience'
                ],
                'anamnesis_section_id' => 5,
                'order' => 20
            ],
            [
                'question' => 'Do you have any preferences regarding session format?',
                'type' => 'single_choice',
                'options' => [
                    'In-person sessions',
                    'Remote sessions',
                    'Combination of both',
                    'No preference'
                ],
                'anamnesis_section_id' => 6,
                'order' => 21
            ],
            [
                'question' => 'Would you prefer structured development sessions or more flexible, responsive coaching?',
                'type' => 'single_choice',
                'options' => [
                    'Highly structured with clear objectives and homework',
                    'Semi-structured with flexibility to explore emerging topics',
                    'Primarily responsive to my current situations and challenges',
                    'No preference, open to coach\'s recommendation'
                ],
                'anamnesis_section_id' => 6,
                'order' => 22
            ],
            [
                'question' => 'What session frequency do you anticipate would be most beneficial?',
                'type' => 'single_choice',
                'options' => [
                    'Weekly sessions',
                    'Bi-weekly sessions',
                    'Monthly sessions',
                    'I\'m open to the practitioner\'s recommendation'
                ],
                'anamnesis_section_id' => 6,
                'order' => 23
            ],
            [
                'question' => 'What investment range per session aligns with your expectations?',
                'type' => 'single_choice',
                'options' => ["Premium tier ($500+)", 'Advanced tier ($300-$499)', "Standard tier ($200-$299)", "Introductory tier (under $200)"],
                'anamnesis_section_id' => 6,
                'order' => 24
            ],
            [
                'question' => 'Which development specializations are you most interested in?',
                'type' => 'multiple_choice',
                'options' => [
                    'Executive leadership',
                    'Wealth psychology',
                    'Strategic decision-making',
                    'High-performance optimization',
                    'Family business dynamics',
                    'Philanthropic impact',
                    'International business',
                    'Public speaking/presentation',
                    'Negotiation mastery',
                    'Innovation and disruption',
                    'Time/energy optimization',
                    'Corporate governance',
                    'Personal branding',
                    'Legacy planning',
                    'Entrepreneurship',
                    'Team building'
                ],
                'anamnesis_section_id' => 7,
                'order' => 25
            ],
            [
                'question' => 'Do you have a preference regarding your practitioner\'s gender?',
                'type' => 'single_choice',
                'options' => ['Male practitioner', 'Female practitioner', 'No preference'],
                'anamnesis_section_id' => 7,
                'order' => 26
            ],
            [
                'question' => 'Do you have a preference regarding your coach\'s professional background?',
                'type' => 'single_choice',
                'options' =>
                [
                    'Business/corporate background',
                    'Academic/research background',
                    'Athletic/performance background',
                    'Creative/artistic background',
                    'Military/strategic background',
                    'No preference'
                ],
                'anamnesis_section_id' => 7,
                'order' => 27
            ],
            [
                'question' => 'How important is your coach\'s years of experience?',
                'type' => 'single_choice',
                'options' =>
                [
                    'Essential (20+ years)',
                    'Very important (10-20 years)',
                    'Somewhat important (5-10 years)',
                    'I value fit over experience length'
                ],
                'anamnesis_section_id' => 7,
                'order' => 28
            ],
            [
                'question' => 'What is your typical learning style?',
                'type' => 'single_choice',
                'options' =>
                [
                    'Analytical and data-driven',
                    'Experiential and practice-oriented',
                    'Visual and conceptual',
                    'Discussion and dialogue-based',
                    'Combination of approaches'
                ],
                'anamnesis_section_id' => 8,
                'order' => 29
            ],
            [
                'question' => 'What investment range per session aligns with your expectations?',
                'type' => 'single_choice',
                'options' => ["Premium tier ($500+)", 'Advanced tier ($300-$499)', "Standard tier ($200-$299)", "Introductory tier (under $200)"],
                'anamnesis_section_id' => 8,
                'order' => 30
            ],
            [
                'question' => 'How do you prefer to measure development progress?',
                'type' => 'single_choice',
                'options' =>
                [
                    'Specific performance metrics',
                    '360-degree feedback',
                    'Personal satisfaction',
                    'Observable behavioral changes',
                    'Specific outcome achievements',
                    'Other measurement approach'
                ],
                'anamnesis_section_id' => 8,
                'order' => 31
            ],
            [
                'question' => 'What is your primary objective for this development relationship?',
                'type' => 'single_choice',
                'options' =>
                [
                    'Specific skill enhancement',
                    'Broader perspective development',
                    'Performance optimization',
                    'Strategic thinking',
                    'Legacy planning',
                    'Leadership effectiveness',
                    'Other'
                ],
                'anamnesis_section_id' => 8,
                'order' => 32
            ],
            [
                'question' => 'Would you like to share anything else that might help us match you with the ideal coach?',
                'type' => 'text',
                'options' => [],
                'anamnesis_section_id' => 8,
                'order' => 33
            ],
        ];

        foreach ($questions as $data) {
            $question = AnamnesisQuestion::create([
                'question' => $data['question'],
                'type' => $data['type'],
                'anamnesis_section_id' => $data['anamnesis_section_id'],
                'order' => $data['order'],
            ]);

            if (!empty($data['options'])) {
                foreach ($data['options'] as $option) {
                    AnamnesisOption::create([
                        'question_id' => $question->id,
                        'option' => $option,
                    ]);
                }
            }
        }
    }
}
