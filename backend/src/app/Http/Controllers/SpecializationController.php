<?php

namespace App\Http\Controllers;

use App\Models\Specialization;
use Illuminate\Http\Request;

class SpecializationController extends Controller
{
    // Listar todas as especializações
    public function index()
    {
        return response()->json(Specialization::all());
    }

    // Criar nova especialização
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $specialization = Specialization::create([
            'name' => $request->name,
        ]);

        return response()->json($specialization, 201);
    }

    // Mostrar detalhes de uma especialização
    public function show($id)
    {
        $specialization = Specialization::findOrFail($id);
        return response()->json($specialization);
    }

    // Atualizar uma especialização
    public function update(Request $request, $id)
    {
        $specialization = Specialization::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $specialization->update([
            'name' => $request->name
        ]);

        return response()->json($specialization);
    }

    // Deletar uma especialização
    public function destroy($id)
    {
        $specialization = Specialization::findOrFail($id);
        $specialization->delete();

        return response()->json(['message' => 'Specialization deleted successfully']);
    }
}