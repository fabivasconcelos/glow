<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AnamnesisController;
use App\Http\Controllers\TherapistRecommendationController;
use App\Http\Controllers\TherapistController;
use App\Http\Controllers\AdminController;

Route::post('/anamnesis/answers', [AnamnesisController::class, 'answer']);
Route::get('/anamnesis/questions', [AnamnesisController::class, 'index']);
Route::post('/anamnesis/questions', [AnamnesisController::class, 'store']);
Route::get('/anamnesis/questions/{id}', [AnamnesisController::class, 'show']);
Route::post('/anamnesis/questions/{id}', [AnamnesisController::class, 'update']);
Route::delete('/anamnesis/questions/{id}', [AnamnesisController::class, 'destroy']);
Route::post('/recommendations', [TherapistRecommendationController::class, 'recommend']);
Route::get('/therapists', [TherapistController::class, 'index']);
Route::post('/therapists', [TherapistController::class, 'store']);
Route::get('/therapists/{id}', [TherapistController::class, 'show']);
Route::post('therapists/{id}', [TherapistController::class, 'update']); // Atualizar um terapeuta
Route::delete('therapists/{id}', [TherapistController::class, 'destroy']); // Deletar um terapeuta
Route::post('/admin/login', [AdminController::class, 'login']);
