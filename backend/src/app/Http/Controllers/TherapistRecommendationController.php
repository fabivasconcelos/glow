<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Therapist;
use App\Models\AnamnesisAnswer;
use App\Models\AnamnesisOption;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class TherapistRecommendationController extends Controller
{
    public function recommend(Request $request)
    {
        $userId = $request->input('user_id');

        // Etapa 1: Pegar as respostas textuais da anamnese
        $answers = AnamnesisAnswer::where('user_id', $userId)->get();
        $userKeywords = [];

        foreach ($answers as $answer) {
            $optionIds = json_decode($answer->option_ids, true);
            if (!is_array($optionIds)) {
                $optionIds = [$optionIds];
            }

            $optionsText = AnamnesisOption::whereIn('id', $optionIds)->pluck('option')->toArray();
            foreach ($optionsText as $text) {
                $userKeywords[] = trim(Str::lower($text));
            }
        }

        $userKeywords = array_unique($userKeywords);

        Log::info('[RECOMENDACAO] Palavras-chave extraídas do usuário:', $userKeywords);

        // Etapa 2: Buscar terapeutas ativos
        $therapists = Therapist::with(['specializations', 'specializedDemographics', 'languages'])
            ->where('status', 'active')
            ->get()
            ->map(function ($therapist) use ($userKeywords) {
                $matchScore = 0;

                // Campos relacionais
                $specializations = $therapist->specializations->pluck('name')->implode(' ');
                $demographics = $therapist->specializedDemographics->pluck('name')->implode(' ');
                $languages = $therapist->languages->pluck('name')->implode(' ');

                // Todos os campos relevantes em uma string única (em lowercase)
                $therapistText = Str::lower(implode(' ', [
                    $therapist->full_name,
                    $therapist->professional_title,
                    $therapist->gender,
                    $therapist->education_background,
                    $therapist->professional_bio,
                    $therapist->specialized_skill_expertise,
                    $therapist->unique_therapeutic_approach,
                    $therapist->demographic_specialty,
                    $therapist->outcome_expertise,
                    $therapist->unique_background_perspective,
                    $therapist->additional_differentiator_1,
                    $therapist->additional_differentiator_2,
                    $therapist->additional_differentiator_3,
                    $therapist->hands_on_approach,
                    $therapist->esoteric_frameworks,
                    $therapist->esoteric_frameworks_details,
                    $therapist->geographic_location,
                    $therapist->additional_information,
                    $specializations,
                    $demographics,
                    $languages,
                ]));

                foreach ($userKeywords as $keyword) {
                    if (Str::contains($therapistText, $keyword)) {
                        $matchScore += 1;
                    }
                }

                Log::info('[RECOMENDACAO] Score para terapeuta ' . $therapist->id . ': ' . $matchScore);

                return [
                    'id' => $therapist->id,
                    'name' => $therapist->full_name,
                    'professional_title' => $therapist->professional_title,
                    'bio' => $therapist->professional_bio,
                    'gender' => $therapist->gender,
                    'match_score' => $matchScore,
                    'session_price' => $therapist->session_price,
                    'profile_picture' => $therapist->profile_picture,
                    'specializations' => $therapist->specializations,
                    'plan' => $therapist->plan,
                ];
            });

        // Etapa 3: Selecionar os top matches
        $plus = $therapists->where('plan', 'plus')->sortByDesc('match_score')->take(1);
        $standard = $therapists->where('plan', 'standard')->sortByDesc('match_score')->take(3 - $plus->count());
        $final = $plus->merge($standard)->values();

        Log::info('[RECOMENDACAO] Terapeutas recomendados:', $final->toArray());

        return response()->json($final);
    }
}
