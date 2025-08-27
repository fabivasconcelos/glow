<?php

namespace App\Mail;

use App\Models\Therapist;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class TherapistNewRegister extends Mailable
{
    use Queueable, SerializesModels;

    public Therapist $therapist;

    public function __construct(Therapist $therapist)
    {
        $this->therapist = $therapist;
    }

    public function build(): self
    {
        return $this->subject('New Therapist Awaiting Approval')
                    ->markdown('emails.therapists.new-register');
    }
}
