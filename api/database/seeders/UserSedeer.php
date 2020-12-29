<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSedeer extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	User::create([
            'name' => 'admin',
            'email' => 'admin@pandora.com',
            'password' => Hash::make('%pandoradmiN21'),
            'role' => 'admin'
        ]);

        User::create([
            'name' => 'dev',
            'email' => 'dev@pandora.com',
            'password' => Hash::make('narobC33klwZ_76'),
            'role' => 'admin'
        ]);
    }
}
