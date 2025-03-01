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
            'email' => 'admin@glow.com.de',
            'password' => Hash::make('123456')
        ]);
    }
}