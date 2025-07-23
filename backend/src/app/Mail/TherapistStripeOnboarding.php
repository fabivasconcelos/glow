<?php

namespace App\Mail;

use App\Models\Therapist;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class TherapistStripeOnboarding extends Mailable
{
    use Queueable, SerializesModels;

    public Therapist $therapist;
    public string $onboardingLink;

    public function __construct(Therapist $therapist)
    {
        $this->therapist = $therapist;
    }

    public function build(): self
    {
        return $this->subject('Complete seu cadastro para receber pagamentos na Glow')
                    ->markdown('emails.therapists.stripe-onboarding');
    }
}
