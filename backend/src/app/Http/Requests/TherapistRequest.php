<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TherapistRequest extends FormRequest
{
    public function rules(): array
    {
        $rules = [
            'full_name' => 'required|string|max:255',
            'gender' => 'required|in:male,female',
            'professional_title' => 'nullable|string|max:255',
            'professional_website' => 'nullable|string|max:255',
            'contact_email' => 'nullable|email|max:255',
            'years_experience' => 'nullable|integer',
            'education_background' => 'nullable|string',
            'professional_bio' => 'nullable|string',
            'specialized_skill_expertise' => 'nullable|string',
            'unique_therapeutic_approach' => 'nullable|string',
            'demographic_specialty' => 'nullable|string',
            'outcome_expertise' => 'nullable|string',
            'unique_background_perspective' => 'nullable|string',
            'additional_differentiator_1' => 'nullable|string',
            'additional_differentiator_2' => 'nullable|string',
            'additional_differentiator_3' => 'nullable|string',
            'hands_on_approach' => 'nullable|boolean',
            'esoteric_frameworks' => 'nullable|boolean',
            'esoteric_frameworks_details' => 'nullable|string',
            'remote_sessions' => 'nullable|boolean',
            'in_person_sessions' => 'nullable|boolean',
            'geographic_location' => 'nullable|string',
            'session_length_minutes' => 'nullable|integer',
            'recommended_frequency' => 'nullable|string',
            'pricing_tier' => 'nullable|string',
            'additional_information' => 'nullable|string',
            'status' => 'nullable|in:active,inactive',
            'plan' => 'nullable|in:standard,plus',
            'specialization_ids' => 'nullable|array',
            'specialization_ids.*' => 'integer|exists:specializations,id',
            'specialization_other' => 'nullable|string',
            'specialized_demographic_ids' => 'nullable|array',
            'specialized_demographic_ids.*' => 'integer|exists:specialized_demographics,id',
            'specialized_demographic_other' => 'nullable|string',
            'language_ids' => 'nullable|array',
            'language_ids.*' => 'integer|exists:languages,id',
            'language_other' => 'nullable|string',
            'anamnesis_category_ids' => 'nullable|array',
            'anamnesis_category_ids.*' => 'integer|exists:anamnesis_categories,id',
            'price_per_session' => 'nullable|numeric|min:0',
        ];

        // Validação condicional apenas se houver envio de arquivos
        if ($this->hasFile('profile_picture')) {
            $rules['profile_picture'] = 'nullable|image';
        }

        if ($this->hasFile('intro_video')) {
            $rules['intro_video'] = 'nullable|video';
        }

        return $rules;
    }

    public function authorize(): bool
    {
        return true;
    }
}