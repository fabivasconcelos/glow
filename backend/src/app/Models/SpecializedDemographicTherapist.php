<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SpecializedDemographicTherapist extends Model
{
    use HasFactory;

    protected $table = 'specialized_demographic_therapist';

    protected $fillable = ['therapist_id', 'specialized_demographic_id'];
}