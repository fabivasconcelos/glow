<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AnamnesisController;
use App\Http\Controllers\TherapistRecommendationController;
use App\Http\Controllers\TherapistController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AnamnesisCategoryController;
use App\Http\Controllers\AnamnesisSectionController;
use App\Http\Controllers\SpecializationController;
use App\Http\Controllers\SpecializedDemographicController;
use App\Http\Controllers\LanguageController;

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/admin/login', [AdminController::class, 'login']);

// Rotas protegidas por autenticação
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [UserController::class, 'profile']);
    Route::post('/profile', [UserController::class, 'update']);
});

Route::get('/anamnesis/categories', [AnamnesisCategoryController::class, 'index']);
Route::post('/anamnesis/categories', [AnamnesisCategoryController::class, 'store']);
Route::get('/anamnesis/categories/{id}', [AnamnesisCategoryController::class, 'show']);
Route::post('/anamnesis/categories/{id}', [AnamnesisCategoryController::class, 'update']);
Route::delete('/anamnesis/categories/{id}', [AnamnesisCategoryController::class, 'destroy']);

Route::get('/anamnesis/sections', [AnamnesisSectionController::class, 'index']);
Route::post('/anamnesis/sections', [AnamnesisSectionController::class, 'store']);
Route::get('/anamnesis/sections/{id}', [AnamnesisSectionController::class, 'show']);
Route::post('/anamnesis/sections/{id}', [AnamnesisSectionController::class, 'update']);
Route::delete('/anamnesis/sections/{id}', [AnamnesisSectionController::class, 'destroy']);

Route::post('/anamnesis/questions/reorder', [AnamnesisController::class, 'reorder']);
Route::get('/anamnesis/questions', [AnamnesisController::class, 'index']);
Route::post('/anamnesis/questions', [AnamnesisController::class, 'store']);
Route::get('/anamnesis/questions/{id}', [AnamnesisController::class, 'show']);
Route::post('/anamnesis/questions/{id}', [AnamnesisController::class, 'update']);
Route::delete('/anamnesis/questions/{id}', [AnamnesisController::class, 'destroy']);

Route::post('/anamnesis/answers', [AnamnesisController::class, 'answer']);

Route::get('/therapists', [TherapistController::class, 'index']);
Route::post('/therapists', [TherapistController::class, 'store']);
Route::get('/therapists/{id}', [TherapistController::class, 'show']);
Route::post('therapists/{id}', [TherapistController::class, 'update']); // Atualizar um terapeuta
Route::delete('therapists/{id}', [TherapistController::class, 'destroy']); // Deletar um terapeuta

Route::post('/recommendations', [TherapistRecommendationController::class, 'recommend']);

// Rotas para Specializations
Route::apiResource('specializations', SpecializationController::class);

// Rotas para Specialized Demographics
Route::apiResource('specialized-demographics', SpecializedDemographicController::class);

// Rotas para Languages
Route::get('/languages', [LanguageController::class, "index"]);
