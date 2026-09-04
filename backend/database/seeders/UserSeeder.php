<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'name' => 'Test Administrator',
                'email' => 'admin@example.com',
                'password' => 'Password123!',
                'role' => 'administrator',
                'status' => 'active',
            ],
            [
                'name' => 'Test Property Owner',
                'email' => 'owner@example.com',
                'password' => 'Password123!',
                'role' => 'property_owner',
                'status' => 'active',
            ],
            [
                'name' => 'Test Property Manager',
                'email' => 'manager@example.com',
                'password' => 'Password123!',
                'role' => 'property_manager',
                'status' => 'active',
            ],
            [
                'name' => 'Test Tenant',
                'email' => 'tenant@example.com',
                'password' => 'Password123!',
                'role' => 'tenant',
                'status' => 'active',
            ],
        ];

        foreach ($users as $userData) {
            User::updateOrCreate(
                ['email' => $userData['email']],
                [
                    'name' => $userData['name'],
                    'password' => Hash::make($userData['password']),
                    'role' => $userData['role'],
                    'status' => $userData['status'],
                ]
            );
        }
    }
}