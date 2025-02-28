<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Therapist extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'specialization', 'bio', 'profile_picture', 'gender', 'interaction_style', 'specialties', 'age_experience', 'session_price', 'video_url', 'meeting_link'];

    protected $casts = [
        'specialties' => 'array',
    ];

    // Criando um accessor para a URL correta da imagem do perfil
    public function getProfilePictureAttribute($value)
    {
        return $value ?  env('APP_URL') . $value : null;
    }
}