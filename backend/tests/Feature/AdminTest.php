<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class AdminTest extends TestCase
{
    use RefreshDatabase;

    public function testAdminUserCanAccessAdminRoute()
    {
        $admin = User::factory()->create([
            'isAdmin' => 1,
        ]);

        $response = $this->actingAs($admin)->get('/api/users');

        $response->assertStatus(200);
    }

    public function testNonAdminUserCannotAccessAdminRoute()
    {
        $user = User::factory()->create([
            'isAdmin' => 0,
        ]);

        $response = $this->actingAs($user)->get('/api/users');

        $response->assertStatus(403);
        $response->assertJson(['error' => 'Unauthorized']);
    }
}