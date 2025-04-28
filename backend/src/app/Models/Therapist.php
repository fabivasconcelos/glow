<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Therapist extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'full_name',
        'professional_title',
        'gender',
        'contact_email',
        'professional_website',
        'years_experience',
        'education_background',
        'professional_bio',
        'profile_picture',
        'intro_video',
        'specialized_skill_expertise',
        'unique_therapeutic_approach',
        'demographic_specialty',
        'outcome_expertise',
        'unique_background_perspective',
        'additional_differentiator_1',
        'additional_differentiator_2',
        'additional_differentiator_3',
        'hands_on_approach',
        'esoteric_frameworks',
        'esoteric_frameworks_details',
        'remote_sessions',
        'in_person_sessions',
        'geographic_location',
        'session_length_minutes',
        'recommended_frequency',
        'pricing_tier',
        'additional_information',
        'status',
        'plan'
    ];

    public function specializations()
    {
        return $this->belongsToMany(Specialization::class)->withPivot('other_text');
    }

    public function specializedDemographics()
    {
        return $this->belongsToMany(SpecializedDemographic::class)->withPivot('other_text');
    }

    public function languages()
    {
        return $this->belongsToMany(Language::class)->withPivot('other_text');
    }

    public function anamnesisCategories()
    {
        return $this->belongsToMany(AnamnesisCategory::class);
    }

    public function getProfilePictureAttribute($value)
    {
        return $value ? env('APP_URL') . $value : null;
    }

    public function getIntroVideoAttribute($value)
    {
        return $value ? env('APP_URL') . $value : null;
    }
}