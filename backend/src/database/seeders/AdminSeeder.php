<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run()
    {
        Admin::create([
            'name' => 'Admin Glow',
            'email' => 'therapyst.glow@gmail.com',
            'password' => Hash::make('Therapyst.glow%93')
        ]);
    }
}