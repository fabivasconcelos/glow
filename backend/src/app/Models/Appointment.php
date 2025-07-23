<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Appointment extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'therapist_id',
        'start_time',
        'end_time',
        'status',
        'payment_status',
        'stripe_session_id',
        'stripe_payment_intent_id',
    ];

    public function therapist()
    {
        return $this->belongsTo(Therapist::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}