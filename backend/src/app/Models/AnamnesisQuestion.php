<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnamnesisQuestion extends Model
{
    use HasFactory;

    protected $fillable = ['question', 'type'];

    public function options()
    {
        return $this->hasMany(AnamnesisOption::class, 'question_id');
    }

    public function answers()
    {
        return $this->hasMany(AnamnesisAnswer::class, 'question_id');
    }
}