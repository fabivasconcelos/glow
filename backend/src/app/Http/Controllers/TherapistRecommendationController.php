<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Therapist;
use App\Models\AnamnesisAnswer;
use App\Models\AnamnesisOption;
use Illuminate\Support\Facades\Log;

class TherapistRecommendationController extends Controller
{
    public function recommend(Request $request)
    {
        $userId = $request->input('user_id');

        // Pegamos todas as respostas do usuário
        $answers = AnamnesisAnswer::where('user_id', $userId)->get();

        // Criamos um array para armazenar as preferências do usuário
        $userPreferences = [];

        foreach ($answers as $answer) {
            $optionIds = json_decode($answer->option_ids, true);

            if ($answer->question_id == 3) { // Estilo de interação preferido
                $userPreferences['interaction_style'] = AnamnesisOption::whereIn('id', (array) $optionIds)->pluck('option')->first();
            }

            if ($answer->question_id == 6) { // Especialidades desejadas
                $userPreferences['specialties'] = AnamnesisOption::whereIn('id', (array) $optionIds)->pluck('option')->toArray();
            }

            if ($answer->question_id == 7) { // Pergunta sobre gênero
                $userPreferences['gender'] = AnamnesisOption::whereIn('id', (array) $optionIds)->pluck('option')->first();
            }

            if ($answer->question_id == 8) { // Faixa etária do usuário
                $userPreferences['age_experience'] = AnamnesisOption::whereIn('id', (array) $optionIds)->pluck('option')->first();
            }
        }

        // Pegamos os terapeutas e calculamos a pontuação de match
        $therapists = Therapist::all()->map(function ($therapist) use ($userPreferences) {
            $matchScore = 0;

            Log::info("User pref", ['T' => $userPreferences]);

            // Comparação de gênero
            if (!empty($userPreferences['gender']) && $userPreferences['gender'] !== "No preference") {
                $matchScore += ($userPreferences['gender'] == $therapist->gender) ? 2 : 0;
            }

            // Comparação de estilo de interação
            if (!empty($userPreferences['interaction_style']) && $userPreferences['interaction_style'] !== "No preference") {
                $matchScore += ($userPreferences['interaction_style'] == $therapist->interaction_style) ? 2 : 0;
            }

            if (!empty($userPreferences['specialties'])) {
                $matchScore += count(array_intersect($userPreferences['specialties'], $therapist->specialties));
            }

            // Comparação de faixa etária
            if (!empty($userPreferences['age_experience'])) {
                $matchScore += ($userPreferences['age_experience'] == $therapist->age_experience) ? 1 : 0;
            }

            return [
                'id' => $therapist->id,
                'name' => $therapist->name,
                'specialization' => $therapist->specialization,
                'bio' => $therapist->bio,
                'profile_picture' => $therapist->profile_picture,
                'gender' => $therapist->gender,
                'interaction_style' => $therapist->interaction_style,
                'specialties' => $therapist->specialties,
                'age_experience' => $therapist->age_experience,
                'session_price' => $therapist->session_price,
                'match_score' => $matchScore,
            ];
        });

        Log::info("Result", ['T' => $therapists]);

        // Ordenamos os terapeutas pelo maior match e pegamos os 4 melhores
        $sortedTherapists = $therapists->sortByDesc('match_score')->take(4)->values();

        return response()->json($sortedTherapists);
    }
}
