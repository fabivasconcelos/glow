<?php

namespace App\Http\Controllers;

use App\Models\AnamnesisCategory;
use Illuminate\Http\Request;

class AnamnesisCategoryController extends Controller
{
    // Listar todas as categorias
    public function index()
    {
        return response()->json(AnamnesisCategory::all());
    }

    // Criar nova categoria
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255'
        ]);

        $category = AnamnesisCategory::create([
            'name' => $request->name,
            'subtitle' => $request->subtitle,
        ]);

        return response()->json($category, 201);
    }

    // Mostrar detalhes de uma categoria
    public function show($id)
    {
        $category = AnamnesisCategory::findOrFail($id);
        return response()->json($category);
    }

    // Atualizar uma categoria
    public function update(Request $request, $id)
    {
        $category = AnamnesisCategory::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255'
        ]);

        $category->update([
            'name' => $request->name,
            'subtitle' => $request->subtitle
        ]);

        return response()->json($category);
    }

    // Deletar uma categoria
    public function destroy($id)
    {
        $category = AnamnesisCategory::findOrFail($id);
        $category->delete();

        return response()->json(['message' => 'Category deleted successfully']);
    }
}