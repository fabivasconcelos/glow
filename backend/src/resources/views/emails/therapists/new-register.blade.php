@php
$logoUrl = "https://app.glow.com.de/app/glow-logo.png";
$bannerUrl = "https://app.glow.com.de/app/get-started.jpeg";
$iconFacebookUrl = "https://app.glow.com.de/app/facebook.png";
$iconInstagramUrl = "https://app.glow.com.de/app/instagram.png";
$iconXUrl = "https://app.glow.com.de/app/x.png";
$iconLinkedinUrl = "https://app.glow.com.de/app/linkedin.png";
$iconYoutubeUrl = "https://app.glow.com.de/app/youtube.png";
$today = \Carbon\Carbon::now()->format('M d, Y');
$dashBoardLink = config('app.admin') . "therapists/edit/$therapist->id"
@endphp

<!DOCTYPE html>
<html lang="en" style="margin: 0; padding: 0; background-color: #FFE5B4;">

<head>
    <meta charset="UTF-8" />
    <title>New Therapist Awaiting Approval</title>
    <style>
        .gloock {
            font-family: 'Gloock', serif !important;
        }

        .inter-regular {
            font-family: 'Inter', sans-serif !important;
            font-weight: 400;
        }

        .inter-medium {
            font-family: 'Inter', sans-serif !important;
            font-weight: 500;
        }

        .inter-bold {
            font-family: 'Inter', sans-serif !important;
            font-weight: 700;
        }
        .email-container {
            position: absolute;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 18px;
            padding: 40px;
            margin-top: 20px;
            min-width: 600px; /* ajuste se necessário */
            text-align: center;
            box-sizing: border-box;
            background: #FAF7F5;
        }

        /* Título */
        .email-title {
            position: relative;
            font-size: 32px;
            color: #453B2C;
            margin-bottom: 20px;
            text-align: center;
            z-index: 1;
        }

        /* Texto */
        .email-text {
            position: relative;
            font-size: 20px;
            line-height: 40px;
            margin-bottom: 30px;
            text-align: center;
            color: #453B2C;
            padding: 0 10px;
            z-index: 1;
        }

        /* Botão container */
        .email-button-container {
            position: relative;
            text-align: center;
            z-index: 1;
        }

        /* Botão */
        .email-button {
            display: inline-block;
            background-color: #EB970CCC;
            color: white;
            padding: 12px 100px;
            border-radius: 18px;
            font-size: 16px;
            text-decoration: none;
            transition: background 0.3s ease;
        }

        .email-button:hover {
            background-color: #d97d00;
        }
    </style>
</head>

<body style="margin: 0; padding: 0; background-color: #FFE5B4;" class="inter-regular">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #FFE5B4;">
        <tr>
            <td align="center">
                <!-- Container principal -->
                <table width="100%" cellpadding="0" cellspacing="0" border="0"
                    style="max-width: 680px; width: 100%; margin: 0 auto; position: relative;">

                    <!-- Banner com conteúdo posicionado -->
                    <tr>
                        <td style="position: relative; padding: 0; margin: 0;">
                            <div style="background-image: url('{{ $bannerUrl }}'); background-size: cover; background-position: center -70px; height: 380px; position: relative;">
                                <div style="padding: 30px 40px;">
                                    <!-- Linha superior: logo e data -->
                                    <table width="100%">
                                        <tr>
                                            <td align="left">
                                                <img src="{{ $logoUrl }}" alt="Glow" style="max-height: 40px;">
                                            </td>
                                            <td align="right"
                                                style="color: #FFF; sans-serif; font-size: 16px;">
                                                {{ $today }}
                                            </td>
                                        </tr>
                                    </table>

                                    <!-- Card posicionado -->
                                    <div class="email-container">

                                        <h1 class="email-title gloock">
                                            New Therapist Awaiting Approval
                                        </h1>

                                        <p class="email-text">
                                            A new therapist has just completed registration on Glow and is waiting for admin approval.<br />
                                            Log in to the dashboard to review and approve the account.<br />
                                        </p>

                                        <div class="email-button-container">
                                            <a href="{{ $dashBoardLink }}" class="email-button inter-medium">
                                                Go to Dashboard
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div style="height: 420px;"></div> <!-- reserva de altura do banner -->
                            </div>
                        </td>
                    </tr>

                    <!-- Spacer abaixo do card -->
                    <tr>
                        <td style="height: 100px; padding-top: 120px;">
                            <!-- Social Section -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td align="center">
                                        <table width="425" height="75" cellpadding="0" cellspacing="0" border="0" style="padding: 0px 10px;">
                                            <tr>
                                                <td style="padding: 0 20px; text-align: center;"><a href="#"><img src="{{ $iconFacebookUrl }}" alt="Facebook" width="28" height="28"></a></td>
                                                <td style="padding: 0 20px; text-align: center;"><a href="#"><img src="{{ $iconInstagramUrl }}" alt="Instagram" width="28" height="28"></a></td>
                                                <td style="padding: 0 20px; text-align: center;"><a href="#"><img src="{{ $iconXUrl }}" alt="X" width="28" height="28"></a></td>
                                                <td style="padding: 0 20px; text-align: center;"><a href="#"><img src="{{ $iconLinkedinUrl }}" alt="LinkedIn" width="28" height="28"></a></td>
                                                <td style="padding: 0 20px; text-align: center;"><a href="#"><img src="{{ $iconYoutubeUrl }}" alt="YouTube" width="28" height="28"></a></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td style="height: 1px; border-top: 1px solid #453B2C; width: 100%;"></td>
                    </tr>

                    <tr>
                        <td>
                            <!-- Footer -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding: 40px 20px 60px 20px;">
                                <tr>
                                    <td align="center">
                                        <p style="font-size: 12px; color: #453B2C; text-align: center;">If you have any questions, feel free to message us at <a class="inter-bold" style="text-decoration: none; color: #0A0C17;" href="mailto:support@glow.com.de">support@glow.com.de</a>.<br />
                                            All rights reserved. Update email preferences or unsubscribe.</p>
                                        <p style="font-size: 12px; color: #453B2C; text-align: center;">5781 Spring St Salinas, Idaho 88606<br />United States</p>
                                        <p style="font-size: 12px; color: #453B2C; text-align: center;"><a href="#" style="text-decoration: underline; color: inherit;">Terms of use</a> | <a href="#" style="text-decoration: underline; color: inherit;">Privacy Policy</a></p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>

</html>