<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AnamnesisQuestion;
use App\Models\AnamnesisOption;
use App\Models\AnamnesisAnswer;
use Illuminate\Support\Facades\Log;

class AnamnesisController extends Controller
{
    // ✅ Listar todas as perguntas com opções
    public function index()
    {
        $questions = AnamnesisQuestion::with('options')->get();
        return response()->json($questions);
    }

    // ✅ Salvar ou atualizar uma resposta do usuário
    public function answer(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'question_id' => 'required|exists:anamnesis_questions,id',
            'option_ids' => 'nullable|array',
            'text_answer' => 'nullable|string',
        ]);

        $question = AnamnesisQuestion::findOrFail($request->question_id);

        // Ajustar o formato das respostas conforme o tipo da pergunta
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
                'option_ids' => $optionIds ? json_encode($optionIds) : null,
                'text_answer' => $request->text_answer,
            ]
        );

        return response()->json([
            'message' => 'Answer saved successfully',
            'data' => $answer
        ], 201);
    }

    // ✅ Criar uma nova pergunta
    public function store(Request $request)
    {
        Log::info('Dados recebidos no request:', $request->all());

        $request->validate([
            'question' => 'required|string|max:255',
            'type' => 'required|in:single_choice,multiple_choice,text',
            'options' => 'nullable|array',
            'options.*' => 'required|string|max:255'
        ]);

        // Criar a pergunta
        $question = AnamnesisQuestion::create([
            'question' => $request->question,
            'type' => $request->type,
        ]);

        // Criar opções se for uma pergunta de múltipla escolha ou única escolha
        if (in_array($request->type, ['single_choice', 'multiple_choice']) && !empty($request->options)) {
            foreach ($request->options as $optionText) {
                AnamnesisOption::create([
                    'question_id' => $question->id,
                    'option' => $optionText,
                ]);
            }
        }

        return response()->json($question->load('options'), 201);
    }

    // ✅ Obter os detalhes de uma pergunta
    public function show($id)
    {
        $question = AnamnesisQuestion::with('options')->findOrFail($id);
        return response()->json($question);
    }

    // ✅ Atualizar uma pergunta e suas opções associadas
    public function update(Request $request, $id)
    {
        $question = AnamnesisQuestion::findOrFail($id);

        $request->validate([
            'question' => 'required|string|max:255',
            'type' => 'required|in:single_choice,multiple_choice,text',
            'options' => 'nullable|array',
            'options.*' => 'required|string|max:255'
        ]);

        // Atualizar os dados da pergunta
        $question->update([
            'question' => $request->question,
            'type' => $request->type,
        ]);

        // Atualizar opções apenas se for single_choice ou multiple_choice
        if (in_array($request->type, ['single_choice', 'multiple_choice'])) {
            // Remover as opções antigas e adicionar as novas
            AnamnesisOption::where('question_id', $question->id)->delete();

            if (!empty($request->options)) {
                foreach ($request->options as $optionText) {
                    AnamnesisOption::create([
                        'question_id' => $question->id,
                        'option' => $optionText,
                    ]);
                }
            }
        }

        return response()->json($question->load('options'));
    }

    // ✅ Excluir uma pergunta e suas opções associadas
    public function destroy($id)
    {
        $question = AnamnesisQuestion::findOrFail($id);
        $question->options()->delete(); // Apaga as opções associadas
        $question->delete();

        return response()->json(['message' => 'Question deleted successfully']);
    }
}