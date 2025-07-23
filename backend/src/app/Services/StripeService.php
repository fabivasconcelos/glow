<?php

namespace App\Services;

use Stripe\Stripe;
use Stripe\Account;
use Stripe\AccountLink;

class StripeService
{
    public function __construct()
    {
        Stripe::setApiKey(config('services.stripe.secret'));
    }

    public function createConnectedAccount(string $email): array
    {
        $account = Account::create([
            'type' => 'express',
            'email' => $email,
            'capabilities' => [
                'card_payments' => ['requested' => true],
                'transfers' => ['requested' => true],
            ],
        ]);

        return [
            'id' => $account->id,
            'details_submitted' => $account->details_submitted,
        ];
    }

    public function createAccountLink(string $accountId): string
    {
        $link = AccountLink::create([
            'account' => $accountId,
            'refresh_url' => route('stripe.onboarding.refresh'),
            'return_url' => route('stripe.onboarding.success'),
            'type' => 'account_onboarding',
        ]);

        return $link->url;
    }
}