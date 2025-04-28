<?php

namespace App\Http\Controllers;

use App\Models\Language;
use Illuminate\Http\Request;

class LanguageController extends Controller
{
    // Listar todos os idiomas
    public function index()
    {
        return response()->json(Language::all());
    }

    // Criar novo idioma
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $language = Language::create([
            'name' => $request->name,
        ]);

        return response()->json($language, 201);
    }

    // Mostrar detalhes de um idioma
    public function show($id)
    {
        $language = Language::findOrFail($id);
        return response()->json($language);
    }

    // Atualizar um idioma
    public function update(Request $request, $id)
    {
        $language = Language::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $language->update([
            'name' => $request->name
        ]);

        return response()->json($language);
    }

    // Deletar um idioma
    public function destroy($id)
    {
        $language = Language::findOrFail($id);
        $language->delete();

        return response()->json(['message' => 'Language deleted successfully']);
    }
}