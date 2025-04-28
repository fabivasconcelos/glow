<?php

namespace App\Http\Controllers;

use App\Models\SpecializedDemographic;
use Illuminate\Http\Request;

class SpecializedDemographicController extends Controller
{
    // Listar todas as categorias demográficas especializadas
    public function index()
    {
        return response()->json(SpecializedDemographic::all());
    }

    // Criar nova categoria demográfica
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $demographic = SpecializedDemographic::create([
            'name' => $request->name,
        ]);

        return response()->json($demographic, 201);
    }

    // Mostrar detalhes de uma categoria demográfica
    public function show($id)
    {
        $demographic = SpecializedDemographic::findOrFail($id);
        return response()->json($demographic);
    }

    // Atualizar uma categoria demográfica
    public function update(Request $request, $id)
    {
        $demographic = SpecializedDemographic::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $demographic->update([
            'name' => $request->name
        ]);

        return response()->json($demographic);
    }

    // Deletar uma categoria demográfica
    public function destroy($id)
    {
        $demographic = SpecializedDemographic::findOrFail($id);
        $demographic->delete();

        return response()->json(['message' => 'Specialized demographic deleted successfully']);
    }
}