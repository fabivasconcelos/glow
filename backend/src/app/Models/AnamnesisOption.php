<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnamnesisOption extends Model
{
    use HasFactory;

    protected $fillable = ['question_id', 'option_text'];

    public function question()
    {
        return $this->belongsTo(AnamnesisQuestion::class, 'question_id');
    }
}