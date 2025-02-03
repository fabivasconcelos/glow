<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnamnesisAnswer extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'question_id', 'option_ids', 'text_answer'];

    protected $casts = [
        'option_ids' => 'array', // Garante que o JSON seja tratado como array no Laravel
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function question()
    {
        return $this->belongsTo(AnamnesisQuestion::class, 'question_id');
    }
}