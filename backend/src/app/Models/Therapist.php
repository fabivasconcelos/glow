<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Therapist extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'specialization', 'bio', 'profile_picture', 'gender', 'interaction_style', 'specialties', 'age_experience', 'session_price'];

    protected $casts = [
        'specialties' => 'array',
    ];
}