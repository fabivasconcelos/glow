<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnamnesisSection extends Model
{
    use HasFactory;

    protected $fillable = [
        'anamnesis_category_id',
        'name',
        'image',
    ];

    public function category()
    {
        return $this->belongsTo(AnamnesisCategory::class, 'anamnesis_category_id');
    }

    public function questions()
    {
        return $this->hasMany(AnamnesisQuestion::class);
    }

    // Criando um accessor para a URL correta da imagem do perfil
    public function getImageAttribute($value)
    {
        return $value ?  env('APP_URL') . $value : null;
    }
}