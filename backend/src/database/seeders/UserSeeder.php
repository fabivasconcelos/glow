<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'first_name' => 'Fabiano',
            'last_name' => 'Vasconcelos',
            'email' => 'vasc.fabis@gmail.com',
            'password' => Hash::make('12345678'),
        ]);
    }
}