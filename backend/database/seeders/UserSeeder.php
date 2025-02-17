<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = [
            [
                'login' => 'admin',
                'email' => 'admin@admin.com',
                'password' => Hash::make('admin'),
                'name' => 'Admin',
                'isAdmin' => true,
                'favorites' => null,
                'toDo' => null,
            ],
            [
                'login' => 'user1',
                'email' => 'user1@example.com',
                'password' => Hash::make('password1'),
                'name' => 'John Doe',
                'isAdmin' => false,
                'favorites' => null,
                'toDo' => null,
            ],
            [
                'login' => 'user2',
                'email' => 'user2@example.com',
                'password' => Hash::make('password2'),
                'name' => 'Jane Smith',
                'isAdmin' => false,
                'favorites' => null,
                'toDo' => null,
            ],
            [
                'login' => 'user3',
                'email' => 'user3@example.com',
                'password' => Hash::make('password3'),
                'name' => 'Alice Johnson',
                'isAdmin' => false,
                'favorites' => null,
                'toDo' => null,
            ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}