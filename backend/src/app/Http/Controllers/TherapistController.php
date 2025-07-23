<?php

namespace App\Http\Controllers;

use App\Http\Requests\TherapistRequest;
use App\Models\Therapist;
use Illuminate\Support\Facades\File;
use App\Services\StripeService;
use Illuminate\Support\Facades\Mail;
use App\Mail\TherapistStripeOnboarding;

class TherapistController extends Controller
{
    public function index()
    {
        return response()->json(Therapist::with(['anamnesisCategories', 'specializations', 'specializedDemographics', 'languages'])->get(), 200);
    }

    public function show($id)
    {
        $therapist = Therapist::with(['anamnesisCategories', 'specializations', 'specializedDemographics', 'languages'])->findOrFail($id);

        return response()->json($therapist);
    }

    public function store(TherapistRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('profile_picture')) {
            $file = $request->file('profile_picture');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/therapists'), $filename);
            $data['profile_picture'] = 'images/therapists/' . $filename;
        }

        if ($request->hasFile('intro_video')) {
            $file = $request->file('intro_video');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('videos/therapists'), $filename);
            $data['intro_video'] = 'videos/therapists/' . $filename;
        }

        $therapist = Therapist::create($data);
        
        // 🔥 Specializations
        $specializationData = [];
        if (isset($data['specialization_ids'])) {
            foreach ($data['specialization_ids'] as $id) {
                $specializationData[$id] = ['other_text' => null];
            }
        }
        if (!empty($data['specialization_other']) && !empty($specializationData)) {
            // Atualiza o ID que é o "Other" com o texto customizado
            $otherId = array_key_last($specializationData); // ou você pode localizar pelo valor na API se quiser
            $specializationData[$otherId]['other_text'] = $data['specialization_other'];
        }
        $therapist->specializations()->sync($specializationData);

        // 🔥 Specialized Demographics
        $specializationData = [];
        if (isset($data['specialization_ids'])) {
            foreach ($data['specialization_ids'] as $id) {
                $specializationData[$id] = ['other_text' => null];
            }
        }
        if (!empty($data['specialization_other']) && !empty($specializationData)) {
            // Atualiza o ID que é o "Other" com o texto customizado
            $otherId = array_key_last($specializationData); // ou você pode localizar pelo valor na API se quiser
            $specializationData[$otherId]['other_text'] = $data['specialization_other'];
        }
        $therapist->specializations()->sync($specializationData);

        // 🔥 Specialized Demographics
        $demographicData = [];
        if (isset($data['specialized_demographic_ids'])) {
            foreach ($data['specialized_demographic_ids'] as $id) {
                $demographicData[$id] = ['other_text' => null];
            }
        }
        if (!empty($data['specialized_demographic_other']) && !empty($demographicData)) {
            $otherId = array_key_last($demographicData);
            $demographicData[$otherId]['other_text'] = $data['specialized_demographic_other'];
        }
        $therapist->specializedDemographics()->sync($demographicData);

        // 🔥 Languages
        $languageData = [];
        if (isset($data['language_ids'])) {
            foreach ($data['language_ids'] as $id) {
                $languageData[$id] = ['other_text' => null];
            }
        }
        if (!empty($data['language_other']) && !empty($languageData)) {
            $otherId = array_key_last($languageData);
            $languageData[$otherId]['other_text'] = $data['language_other'];
        }
        $therapist->languages()->sync($languageData);

        // 🔥 Anamnesis Categories (normal, sem other)
        if (isset($data['anamnesis_category_ids'])) {
            $therapist->anamnesisCategories()->sync($data['anamnesis_category_ids']);
        }

        return response()->json($therapist->load(['anamnesisCategories', 'specializations', 'specializedDemographics', 'languages']), 201);
    }

    public function update(TherapistRequest $request, $id)
    {
        $therapist = Therapist::findOrFail($id);
        $data = $request->validated();

        if ($request->hasFile('profile_picture')) {
            if ($therapist->profile_picture && File::exists(public_path($therapist->profile_picture))) {
                File::delete(public_path($therapist->profile_picture));
            }
            $file = $request->file('profile_picture');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/therapists'), $filename);
            $data['profile_picture'] = 'images/therapists/' . $filename;
        }

        if ($request->hasFile('intro_video')) {
            if ($therapist->intro_video && File::exists(public_path($therapist->intro_video))) {
                File::delete(public_path($therapist->intro_video));
            }
            $file = $request->file('intro_video');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('videos/therapists'), $filename);
            $data['intro_video'] = 'videos/therapists/' . $filename;
        }

        $therapist->update($data);

        // 🔥 Specializations
        $specializationData = [];
        if (isset($data['specialization_ids'])) {
            foreach ($data['specialization_ids'] as $id) {
                $specializationData[$id] = ['other_text' => null];
            }
        }
        if (!empty($data['specialization_other']) && !empty($specializationData)) {
            // Atualiza o ID que é o "Other" com o texto customizado
            $otherId = array_key_last($specializationData); // ou você pode localizar pelo valor na API se quiser
            $specializationData[$otherId]['other_text'] = $data['specialization_other'];
        }
        $therapist->specializations()->sync($specializationData);

        // 🔥 Specialized Demographics
        $specializationData = [];
        if (isset($data['specialization_ids'])) {
            foreach ($data['specialization_ids'] as $id) {
                $specializationData[$id] = ['other_text' => null];
            }
        }
        if (!empty($data['specialization_other']) && !empty($specializationData)) {
            // Atualiza o ID que é o "Other" com o texto customizado
            $otherId = array_key_last($specializationData); // ou você pode localizar pelo valor na API se quiser
            $specializationData[$otherId]['other_text'] = $data['specialization_other'];
        }
        $therapist->specializations()->sync($specializationData);

        // 🔥 Specialized Demographics
        $demographicData = [];
        if (isset($data['specialized_demographic_ids'])) {
            foreach ($data['specialized_demographic_ids'] as $id) {
                $demographicData[$id] = ['other_text' => null];
            }
        }
        if (!empty($data['specialized_demographic_other']) && !empty($demographicData)) {
            $otherId = array_key_last($demographicData);
            $demographicData[$otherId]['other_text'] = $data['specialized_demographic_other'];
        }
        $therapist->specializedDemographics()->sync($demographicData);

        // 🔥 Languages
        $languageData = [];
        if (isset($data['language_ids'])) {
            foreach ($data['language_ids'] as $id) {
                $languageData[$id] = ['other_text' => null];
            }
        }
        if (!empty($data['language_other']) && !empty($languageData)) {
            $otherId = array_key_last($languageData);
            $languageData[$otherId]['other_text'] = $data['language_other'];
        }
        $therapist->languages()->sync($languageData);

        if (isset($data['anamnesis_category_ids'])) {
            $therapist->anamnesisCategories()->sync($data['anamnesis_category_ids']);
        }

        // Verifica se ativou e ainda não tem conta Cal.com
        if (
            $therapist->status === 'active' &&
            empty($therapist->stripe_account_id)
        ) {
            $stripeService = new StripeService();

            $stripeAccount = $stripeService->createConnectedAccount($therapist->contact_email);
            // Link de onboarding
            $onboardingLink = $stripeService->createAccountLink($stripeAccount['id']);

            // 3. Atualiza dados do terapeuta
            $therapist->stripe_account_id = $stripeAccount['id'];
            $therapist->stripe_onboarding_link = $onboardingLink;
            $therapist->stripe_ready = false;
            $therapist->save();

            // 4. Envia e-mail para o terapeuta
            Mail::to($therapist->contact_email)->send(new TherapistStripeOnboarding($therapist));
        }

        return response()->json(['message' => 'Therapist updated successfully']);
    }

    public function destroy($id)
    {
        $therapist = Therapist::findOrFail($id);

        if ($therapist->profile_picture && File::exists(public_path($therapist->profile_picture))) {
            File::delete(public_path($therapist->profile_picture));
        }

        if ($therapist->intro_video && File::exists(public_path($therapist->intro_video))) {
            File::delete(public_path($therapist->intro_video));
        }

        $therapist->delete();

        return response()->json(['message' => 'Therapist deleted successfully']);
    }
}
