<?php

namespace App\Mail;

use App\Models\Therapist;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class TherapistUnderReview extends Mailable
{
    use Queueable, SerializesModels;

    public Therapist $therapist;

    public function __construct(Therapist $therapist)
    {
        $this->therapist = $therapist;
    }

    public function build(): self
    {
        return $this->subject('Your Account is Under Review')
                    ->markdown('emails.therapists.under-review');
    }
}
