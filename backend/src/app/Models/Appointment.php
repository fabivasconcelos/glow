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
        'scheduled_at',
        'status',
        'payment_intent_id',
        'payment_url',
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