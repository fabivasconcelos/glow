<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnamnesisQuestion extends Model
{
    use HasFactory;

    protected $fillable = ['question', 'type', 'anamnesis_section_id', 'order'];

    public function options()
    {
        return $this->hasMany(AnamnesisOption::class, 'question_id');
    }

    public function answers()
    {
        return $this->hasMany(AnamnesisAnswer::class, 'question_id');
    }

    public function section()
    {
        return $this->belongsTo(AnamnesisSection::class, 'anamnesis_section_id');
    }
}
