<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AnamnesisQuestion;
use App\Models\AnamnesisAnswer;

class AnamnesisController extends Controller
{
    public function getQuestions()
    {
        $questions = AnamnesisQuestion::with('options')->get();
        return response()->json($questions);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'question_id' => 'required|exists:anamnesis_questions,id',
            'option_ids' => 'nullable', // Deve ser array ou número único
            'text_answer' => 'nullable|string',
        ]);

        $question = AnamnesisQuestion::findOrFail($request->question_id);

        $optionIds = null;

        if ($question->type === 'multiple_choice') {
            $optionIds = !empty($request->option_ids) ? $request->option_ids : [];
        } elseif ($question->type === 'single_choice') {
            $optionIds = !empty($request->option_ids) ? [$request->option_ids] : [];
        }

        $answer = AnamnesisAnswer::updateOrCreate(
            [
                'user_id' => $request->user_id,
                'question_id' => $request->question_id
            ],
            [
                'option_ids' => json_encode($optionIds),
                'text_answer' => $request->text_answer,
            ]
        );

        return response()->json(['message' => 'Answer saved successfully', 'data' => $answer], 201);
    }
}
