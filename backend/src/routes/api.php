<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AnamnesisController;
use App\Http\Controllers\TherapistRecommendationController;

Route::get('/anamnesis', [AnamnesisController::class, 'getQuestions']);
Route::post('/anamnesis/answers', [AnamnesisController::class, 'store']);
Route::post('/recommendations', [TherapistRecommendationController::class, 'recommend']);