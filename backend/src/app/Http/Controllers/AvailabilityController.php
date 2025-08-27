<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Models\Availability;
use App\Models\Therapist;
use App\Models\Appointment;
use App\Services\StripeService;

class AvailabilityController extends Controller
{
    public function index(Request $request, $therapistId)
    {
        $date = $request->query('date');
        $timezone = $request->query('timezone', 'UTC');

        if (!$date) {
            return response()->json(['error' => 'Missing date'], 400);
        }

        // 1. Converter data para dia da semana
        $weekday = Carbon::parse($date)->dayOfWeek; // 0 = domingo, 1 = segunda...

        // 2. Buscar faixas de horário cadastradas para aquele dia
        $availabilities = Availability::where('therapist_id', $therapistId)
            ->where('weekday', $weekday)
            ->get();

        $availableTimes = [];

        foreach ($availabilities as $availability) {
            // 3. Criar slots de 30min entre start_time e end_time
            $start = Carbon::parse($date . ' ' . $availability->start_time, 'UTC');
            $end = Carbon::parse($date . ' ' . $availability->end_time, 'UTC');

            while ($start < $end) {
                $availableTimes[] = $start->copy()->setTimezone($timezone)->format('H:i');
                $start->addMinutes(30);
            }
        }

        return response()->json($availableTimes);
    }

    public function store(Request $request, StripeService $stripeService)
    {
        $request->validate([
            'therapist_id' => 'required|exists:therapists,id',
            'scheduled_date' => 'required|date',
            'scheduled_time' => 'required|date_format:H:i',
        ]);

        $user = $request->user();
        $therapist = Therapist::findOrFail($request->therapist_id);

        if (!$therapist->stripe_account_id) {
            return response()->json(['error' => 'Therapist is not configured to receive payments'], 400);
        }

        $scheduledAt = Carbon::parse("{$request->scheduled_date} {$request->scheduled_time}");
        $appointment = Appointment::create([
            'user_id' => $user->id,
            'therapist_id' => $therapist->id,
            'scheduled_at' => $scheduledAt,
            'status' => 'pending',
        ]);

        $session = $stripeService->createCheckoutSession([
            'amount' => $therapist->session_price,
            'fee' => $therapist->session_price * 0.20,
            'description' => 'Therapy session with ' . $therapist->full_name,
            'destination_account' => $therapist->stripe_account_id,
            'success_url' => config('app.url') . '/success?session_id=' . $appointment->id,
            'cancel_url' => config('app.url') . '/cancel',
            'metadata' => [
                'appointment_id' => $appointment->id,
                'user_id' => $user->id,
            ],
        ]);

        $appointment->update([
            'payment_intent_id' => $session->payment_intent,
        ]);

        return response()->json([
            'payment_url' => $session->url,
        ]);
    }
}
