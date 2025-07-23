@component('mail::message')
# Olá {{ $therapist->full_name }},

Parabéns! Seu perfil na Glow está quase pronto para receber agendamentos pagos.

Para isso, é necessário que você complete a configuração da sua conta de pagamentos no Stripe, nossa plataforma parceira de pagamentos.

@component('mail::button', ['url' => $therapist->stripe_onboarding_link])
Concluir cadastro no Stripe
@endcomponent

Caso tenha qualquer dúvida, entre em contato com nosso suporte.

Obrigado,<br>
Equipe Glow
@endcomponent