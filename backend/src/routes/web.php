<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/email-preview', function () {
    return view('emails.therapists.stripe-onboarding');
});
