<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AnamnesisSection;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;

class AnamnesisSectionController extends Controller
{
    // ✅ Listar todas as seções com a categoria associada
    public function index()
    {
        $sections = AnamnesisSection::with('category')->get();
        return response()->json($sections);
    }

    // ✅ Criar uma nova seção
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:5120',
            'anamnesis_category_id' => 'required|exists:anamnesis_categories,id',
        ]);

        // Salvar a imagem dentro de public/images/anamnesis/sections
        $imagePath = null;
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/anamnesis/sections'), $filename);
            $imagePath = 'images/anamnesis/sections/' . $filename;
        }

        $section = AnamnesisSection::create([
            'name' => $request->name,
            'image' => $imagePath,
            'anamnesis_category_id' => $request->anamnesis_category_id,
        ]);
        return response()->json($section, 201);
    }

    // ✅ Mostrar detalhes de uma seção específica
    public function show($id)
    {
        $section = AnamnesisSection::with('category')->findOrFail($id);
        return response()->json($section);
    }

    // ✅ Atualizar uma seção
    public function update(Request $request, $id)
    {
        $section = AnamnesisSection::with('category')->findOrFail($id);

        $rules = [
            'name' => 'required|string|max:255',
            'anamnesis_category_id' => 'required|exists:anamnesis_categories,id',
        ];

        // Se um novo arquivo for enviado, validar como imagem
        if ($request->hasFile('image')) {
            $rules['image'] = 'image|mimes:jpeg,png,jpg|max:5120';
        }

        Log::info('Image size: ' . $request->file('image')->getSize());

        $validatedData = $request->validate($rules);

        // Salvar a imagem dentro de public/images/anamnesis/sections
        if ($request->hasFile('image')) {
            if ($section->image && File::exists(public_path($section->image))) {
                File::delete(public_path($section->image));
            }

            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/anamnesis/sections'), $filename);
            $validatedData["image"] = 'images/anamnesis/sections/' . $filename;
        }

        $section->update($validatedData);

        return response()->json($section);
    }

    // ✅ Deletar uma seção
    public function destroy($id)
    {
        $section = AnamnesisSection::findOrFail($id);
        $section->delete();

        return response()->json(['message' => 'Section deleted successfully']);
    }
}
