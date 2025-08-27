<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Therapist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use Carbon\Carbon;

class AppointmentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'therapist_id' => 'required|exists:therapists,id',
            'scheduled_date' => 'required|date',
            'scheduled_time' => 'required|string',
            'timezone' => 'nullable|string',
        ]);

        $therapist = Therapist::findOrFail($request->therapist_id);
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        if (!$therapist->stripe_account_id) {
            return response()->json(['error' => 'Therapist is not ready to receive payments.'], 422);
        }

        $scheduledAt = Carbon::parse("{$request->scheduled_date} {$request->scheduled_time}", $request->timezone ?? 'UTC')->setTimezone('UTC');

        $appointment = Appointment::create([
            'therapist_id' => $therapist->id,
            'user_id' => $user->id,
            'scheduled_at' => $scheduledAt,
            'status' => 'pending',
        ]);

        Stripe::setApiKey(config('services.stripe.secret'));

        $amount = intval(round($therapist->price_per_session * 100));
        $fee = intval(round($therapist->price_per_session * config('services.stripe.commission') * 100));

        $session = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => [[
                'price_data' => [
                    'currency' => 'usd',
                    'unit_amount' => $amount,
                    'product_data' => [
                        'name' => "Therapy session with {$therapist->full_name}",
                    ],
                ],
                'quantity' => 1,
            ]],
            'mode' => 'payment',
            'customer_email' => $user->email,
            //'success_url' => config('app.web') . "schedule/{$therapist->id}?success=true",
            //'cancel_url' => config('app.web') . "schedule/{$therapist->id}?cancel=true",
            'success_url' => config('app.web') . "dashboard/customer",
            'cancel_url' => config('app.web') . "dashboard/customer",
            'payment_intent_data' => [
                'transfer_data' => [
                    'destination' => $therapist->stripe_account_id,
                ],
                'application_fee_amount' => $fee,
                'metadata' => [
                    'appointment_id' => $appointment->id,
                ],
            ],
        ]);

        $appointment->update([
            'payment_intent_id' => $session->payment_intent,
            'payment_url' => $session->url
        ]);

        return response()->json([
            'checkout_url' => $session->url
        ]);
    }
}
