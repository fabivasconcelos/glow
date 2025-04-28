<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SpecializationTherapist extends Model
{
    use HasFactory;

    protected $table = 'specialization_therapist';

    protected $fillable = ['therapist_id', 'specialization_id'];
}