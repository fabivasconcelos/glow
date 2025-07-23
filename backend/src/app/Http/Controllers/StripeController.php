<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Therapist;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class StripeController extends Controller
{
    public function handle(Request $request)
    {
        $payload = $request->getContent();
        $event = json_decode($payload, true);

        if ($event['type'] === 'payment_intent.succeeded') {
            $intent = $event['data']['object'];
            $appointmentId = $intent['metadata']['appointment_id'] ?? null;

            if ($appointmentId) {
                $appointment = Appointment::find($appointmentId);
                if ($appointment) {
                    $appointment->update(['status' => 'confirmed']);
                    Log::info("Appointment #{$appointmentId} confirmado com sucesso.");
                }
            }
        }
        // Verifique o tipo de evento
        if ($payload['type'] === 'account.updated') {
            $account = $payload['data']['object'];

            // Verifica se o onboarding foi concluído
            if ($account['details_submitted'] === true) {
                // Atualiza o terapeuta na base local
                Therapist::where('stripe_account_id', $account['id'])->update([
                    'stripe_ready' => true,
                ]);
            }
        }

        return response()->json(['status' => 'success']);
    }

    public function onboardingSuccess(): Response|string
    {
        return 'Onboarding concluído com sucesso!';
    }

    public function onboardingRefresh(): Response|string
    {
        return 'Link expirado. Clique novamente no link enviado.';
    }
}
