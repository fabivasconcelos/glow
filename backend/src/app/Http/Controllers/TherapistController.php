<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Therapist;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;

class TherapistController extends Controller
{
    public function index()
    {
        return response()->json(Therapist::all(), 200);
    }
    /**
     * Retorna os detalhes do terapeuta pelo ID.
     */
    public function show($id)
    {
        $therapist = Therapist::findOrFail($id);

        return response()->json([
            'id' => $therapist->id,
            'name' => $therapist->name,
            'specialization' => $therapist->specialization,
            'bio' => $therapist->bio,
            'profile_picture' => $therapist->profile_picture,
            'gender' => $therapist->gender,
            'interaction_style' => $therapist->interaction_style,
            'specialties' => is_string($therapist->specialties) ? json_decode($therapist->specialties, true) : $therapist->specialties,
            'age_experience' => $therapist->age_experience,
            'session_price' => $therapist->session_price,
            'video_url' => $therapist->video_url,
            'meeting_link' => $therapist->meeting_link
        ]);
    }

    // Criar um terapeuta
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'specialization' => 'required|string|max:255',
            'bio' => 'nullable|string',
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'gender' => 'required|string',
            'interaction_style' => 'required|string',
            'specialties' => 'required|array',
            'age_experience' => 'required|string',
            'session_price' => 'required|numeric',
            'video_url' => 'nullable|url',
            'meeting_link' => 'nullable|url',
        ]);

        // Salvar a imagem dentro de public/images/therapists
        $profilePicturePath = null;
        if ($request->hasFile('profile_picture')) {
            $file = $request->file('profile_picture');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/therapists'), $filename);
            $profilePicturePath = 'images/therapists/' . $filename;
        }

        $therapist = Therapist::create([
            'name' => $request->name,
            'specialization' => $request->specialization,
            'bio' => $request->bio,
            'profile_picture' => $profilePicturePath, // Salva o caminho relativo no banco
            'gender' => $request->gender,
            'interaction_style' => $request->interaction_style,
            'specialties' => $request->specialties,
            'age_experience' => $request->age_experience,
            'session_price' => $request->session_price,
            'video_url' => $request->video_url,
            'meeting_link' => $request->meeting_link,
        ]);

        return response()->json($therapist, 201);
    }

    // Atualizar terapeuta
    public function update(Request $request, $id)
    {
        // Registrar os dados recebidos para depuração
        Log::info('🔍 Recebendo dados para atualização:', ['data' => $request->all()]);

        $therapist = Therapist::findOrFail($id);

        // Ajuste na validação: profile_picture agora só será exigida se for um arquivo
        $rules = [
            'name' => 'sometimes|string|max:255',
            'specialization' => 'sometimes|string|max:255',
            'bio' => 'nullable|string',
            'gender' => 'sometimes|string',
            'interaction_style' => 'sometimes|string',
            'specialties' => 'sometimes|array',
            'age_experience' => 'sometimes|string',
            'session_price' => 'sometimes|numeric',
            'video_url' => 'nullable|url',
            'meeting_link' => 'nullable|url',
        ];

        // Se um novo arquivo for enviado, validar como imagem
        if ($request->hasFile('profile_picture')) {
            $rules['profile_picture'] = 'image|mimes:jpeg,png,jpg,gif|max:2048';
        }

        $validatedData = $request->validate($rules);

        // Verificar se specialties veio como string e converter para array
        if (isset($validatedData['specialties']) && is_string($validatedData['specialties'])) {
            $validatedData['specialties'] = json_decode($validatedData['specialties'], true);
        }

        // Verificar se specialties ainda não é um array válido
        if (!is_array($validatedData['specialties'])) {
            $validatedData['specialties'] = [];
        }

        // Se um novo arquivo foi enviado, substituir a imagem antiga
        if ($request->hasFile('profile_picture')) {
            if ($therapist->profile_picture && File::exists(public_path($therapist->profile_picture))) {
                File::delete(public_path($therapist->profile_picture));
            }

            $file = $request->file('profile_picture');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/therapists'), $filename);
            $validatedData['profile_picture'] = 'images/therapists/' . $filename;
        }

        // Atualizar terapeuta
        $therapist->update($validatedData);

        return response()->json(['message' => 'Therapist updated successfully']);
    }

    // Deletar terapeuta
    public function destroy($id)
    {
        $therapist = Therapist::findOrFail($id);
        if ($therapist->profile_picture) {
            Storage::disk('public')->delete($therapist->profile_picture);
        }
        $therapist->delete();

        return response()->json(['message' => 'Therapist deleted successfully']);
    }
}
