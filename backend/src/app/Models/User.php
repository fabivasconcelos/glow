<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, HasApiTokens, Notifiable;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'phone',
        'profile_picture'
    ];

    protected $hidden = [
        'password'
    ];

    // Opcional: se houver campos com cast específicos futuramente
    protected $casts = [];

    /**
     * Accessor para URL completa da imagem do perfil
     */
    public function getProfilePictureAttribute($value)
    {
        return $value ? config('app.url') . $value : null;
    }

    // Acessor útil para exibir o nome completo diretamente
    public function getFullNameAttribute()
    {
        return "{$this->first_name} {$this->last_name}";
    }
}
