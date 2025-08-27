<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Therapist;
use App\Models\Availability;

class AvailabilitySeeder extends Seeder
{
    public function run(): void
    {
        // Horários padrão: 9h às 12h e 14h às 17h
        $scheduleBlocks = [
            ['start_time' => '09:00:00', 'end_time' => '12:00:00'],
            ['start_time' => '14:00:00', 'end_time' => '17:00:00'],
        ];

        // Dias da semana (0 = domingo ... 6 = sábado)
        $weekdays = [1, 2, 3, 4, 5]; // Segunda a sexta

        // Para cada terapeuta
        Therapist::all()->each(function ($therapist) use ($weekdays, $scheduleBlocks) {
            foreach ($weekdays as $weekday) {
                foreach ($scheduleBlocks as $block) {
                    Availability::create([
                        'therapist_id' => $therapist->id,
                        'weekday' => $weekday,
                        'start_time' => $block['start_time'],
                        'end_time' => $block['end_time'],
                    ]);
                }
            }
        });
    }
}
