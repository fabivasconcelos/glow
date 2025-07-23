<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Availability;

class AvailabilityController extends Controller
{
    public function index($therapistId)
    {
        return Availability::where('therapist_id', $therapistId)->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'therapist_id' => 'required|exists:therapists,id',
            'weekday' => 'required|in:0,1,2,3,4,5,6',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ]);

        $availability = Availability::create($validated);

        return response()->json($availability, 201);
    }
}
