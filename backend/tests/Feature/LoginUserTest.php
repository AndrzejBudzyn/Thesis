<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class LoginUserTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::create([
            'login' => 'testuser',
            'email' => 'testuser@example.com',
            'password' => bcrypt('securepassword'),
            'name' => 'Test User',
            'isAdmin' => false,
        ]);
    }

    public function testUserCanLoginWithEmail()
    {
        $response = $this->postJson('/api/login', [
            'login_or_email' => 'testuser@example.com',
            'password' => 'securepassword',
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure(['user', 'token']);
    }

    public function testUserCanLoginWithLogin()
    {
        $response = $this->postJson('/api/login', [
            'login_or_email' => 'testuser',
            'password' => 'securepassword',
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure(['user', 'token']);
    }

    public function testLoginFailsWithWrongPassword()
    {
        $response = $this->postJson('/api/login', [
            'login_or_email' => 'testuser',
            'password' => 'wrongpassword',
        ]);

        $response->assertStatus(400);
        $response->assertJsonFragment([
            'message' => 'Invalid login or password',
        ]);
    }

    public function testLoginFailsWithNonExistentUser()
    {
        $response = $this->postJson('/api/login', [
            'login_or_email' => 'ghost@example.com',
            'password' => 'password',
        ]);

        $response->assertStatus(422);
    }

    public function testLoginFailsWithMissingData()
    {
        $response = $this->postJson('/api/login', []);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['login_or_email', 'password']);
    }

    public function testLoginFailsWithSqlInjection()
    {
        $response = $this->postJson('/api/login', [
            'login_or_email' => "' OR 1=1; --",
            'password' => 'anything',
        ]);

        $response->assertStatus(422);
        $response->assertJsonFragment([
            'message' => 'The login_or_email is invalid.',
        ]);
    }

    public function testLoginFailsWithBackdoorLikeInput()
    {
        $response = $this->postJson('/api/login', [
            'login_or_email' => 'admin@example.com" --',
            'password' => 'admin123',
        ]);

        $response->assertStatus(422);
        $response->assertJsonFragment([
            'message' => 'The login_or_email is invalid.',
        ]);
    }
}
