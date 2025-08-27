<?php

namespace App\Services;

use Stripe\Stripe;
use Stripe\Account;
use Stripe\AccountLink;
use Stripe\Checkout\Session;


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

    public function createCheckoutSession(array $options): Session
    {
        return Session::create([
            'payment_method_types' => ['card'],
            'line_items' => [[
                'price_data' => [
                    'currency' => 'brl',
                    'unit_amount' => intval($options['amount'] * 100),
                    'product_data' => [
                        'name' => $options['description'],
                    ],
                ],
                'quantity' => 1,
            ]],
            'mode' => 'payment',
            'success_url' => $options['success_url'],
            'cancel_url' => $options['cancel_url'],
            'payment_intent_data' => [
                'application_fee_amount' => intval($options['fee'] * 100),
                'transfer_data' => [
                    'destination' => $options['destination_account'],
                ],
            ],
            'metadata' => $options['metadata'] ?? [],
        ]);
    }
}
