<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Therapist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Stripe\Stripe;
use Stripe\Checkout\Session;

class AppointmentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'therapist_id' => 'required|exists:therapists,id',
            'date' => 'required|date',
            'time' => 'required|string',
        ]);

        $therapist = Therapist::findOrFail($request->therapist_id);
        $user = Auth::user();

        if (!$therapist->stripe_account_id) {
            return response()->json(['error' => 'Therapist is not ready to receive payments.'], 422);
        }

        // Cria agendamento localmente
        $appointment = Appointment::create([
            'therapist_id' => $therapist->id,
            'user_id' => $user->id,
            'date' => $request->date,
            'time' => $request->time,
            'status' => 'pending',
        ]);

        Stripe::setApiKey(config('services.stripe.secret'));

        $session = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => [[
                'price_data' => [
                    'currency' => 'usd',
                    'unit_amount' => $therapist->price_per_session * 100,
                    'product_data' => [
                        'name' => "Therapy session with {$therapist->name}",
                    ],
                ],
                'quantity' => 1,
            ]],
            'mode' => 'payment',
            'customer_email' => $user->email,
            'success_url' => config('app.frontend_url') . '/success?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => config('app.frontend_url') . '/cancel',
            'payment_intent_data' => [
                'transfer_data' => [
                    'destination' => $therapist->stripe_account_id,
                ],
                'application_fee_amount' => intval($therapist->price_per_session * config('services.stripe.commission') * 100),
                'metadata' => [
                    'appointment_id' => $appointment->id,
                ],
            ],
        ]);

        // Retorna para o frontend redirecionar
        return response()->json(['checkout_url' => $session->url]);
    }
}