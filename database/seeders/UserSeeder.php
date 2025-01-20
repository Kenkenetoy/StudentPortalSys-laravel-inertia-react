<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 50 random users
        User::factory()->count(50)->create();

        // Optionally create a specific admin user
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'user_type' => 'admin',
            'status' => 'active',
            'database' => 'active',
            'status' => 'active',
            'birthday' => '25/03/01',
            'profile_picture' => 'placeholder-profile.jpg',
        ]);
    }
}
