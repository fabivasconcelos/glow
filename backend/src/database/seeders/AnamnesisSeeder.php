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
                'question' => 'What is your main reason for seeking therapy?',
                'type' => 'multiple_choice',
                'options' => [
                    'Stress and Anxiety', 'Depression', 'Relationship Issues', 'Career Guidance',
                    'Grief/Loss', 'Personal Growth', 'Parenting Challenges', 'Other'
                ],
            ],
            [
                'question' => 'Have you attended therapy or coaching before?',
                'type' => 'single_choice',
                'options' => ['Yes', 'No'],
            ],
            [
                'question' => 'What kind of therapist interaction style would you prefer?',
                'type' => 'single_choice',
                'options' => [
                    'Structured (goal-oriented and directive)',
                    'Conversational (open-ended and supportive)',
                    'No preference'
                ],
            ],
            [
                'question' => 'How comfortable are you with discussing deep emotional topics?',
                'type' => 'single_choice',
                'options' => ['Very comfortable', 'Somewhat comfortable', 'Not comfortable'],
            ],
            [
                'question' => 'How often do you plan to attend sessions?',
                'type' => 'single_choice',
                'options' => ['Weekly', 'Every two weeks', 'Once a month', 'Unsure'],
            ],
            [
                'question' => 'Do you have any preferences regarding the therapist\'s background or specialization?',
                'type' => 'multiple_choice',
                'options' => [
                    'Trauma', 'Anxiety disorders', 'Depression', 'Relationship and Family Therapy',
                    'Career Coaching', 'Holistic or Alternative Therapy', 'No specific preference'
                ],
            ],
            [
                'question' => 'Do you prefer a therapist with a specific gender?',
                'type' => 'single_choice',
                'options' => ['Male', 'Female', 'No preference'],
            ],
            [
                'question' => 'What is your age group?',
                'type' => 'single_choice',
                'options' => ['18-25', '26-35', '36-45', '46-55', '56+'],
            ],
            [
                'question' => 'How important is it that your therapist has experience with your age group?',
                'type' => 'single_choice',
                'options' => ['Very important', 'Somewhat important', 'Not important'],
            ],
            [
                'question' => 'What is your primary goal for therapy?',
                'type' => 'text',
                'options' => [],
            ],
        ];

        foreach ($questions as $data) {
            $question = AnamnesisQuestion::create([
                'question' => $data['question'],
                'type' => $data['type'],
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