<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LanguageTherapist extends Model
{
    use HasFactory;

    protected $table = 'language_therapist';

    protected $fillable = ['therapist_id', 'language_id'];
}