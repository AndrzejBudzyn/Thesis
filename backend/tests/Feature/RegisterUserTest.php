<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class RegisterUserTest extends TestCase
{
    use RefreshDatabase;

    public function testUserCanRegister()
    {
        $response = $this->postJson('/api/register', [
            'login' => 'TestUser',
            'email' => 'test@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'name' => 'TestUser',
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('users', ['email' => 'test@example.com']);
    }

    public function testRegistrationFailsWithMissingFields()
    {
        $response = $this->postJson('/api/register', []);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['login', 'email', 'password', 'name']);
    }

    public function testRegistrationFailsWithInvalidEmail()
    {
        $response = $this->postJson('/api/register', [
            'login' => 'name',
            'email' => 'email',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'name' => 'name',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['email']);
    }

    public function testRegistrationFailsWithPasswordMismatch()
    {
        $response = $this->postJson('/api/register', [
            'login' => 'MismatchUser',
            'email' => 'mismatch@example.com',
            'password' => 'password123',
            'password_confirmation' => 'differentpassword',
            'name' => 'Mismatch',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['password']);
    }

    public function testRegistrationWithHtmlInjectionInName()
    {
        $response = $this->postJson('/api/register', [
            'login' => 'SafeLogin',
            'email' => 'xss@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'name' => '<script>alert("XSS")</script>',
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('users', ['email' => 'xss@example.com']);
    }
    public function testRegistrationFailsWithDuplicateEmail()
    {
    $this->postJson('/api/register', [
        'login' => 'FirstUser',
        'email' => 'duplicate@example.com',
        'password' => 'password123',
        'password_confirmation' => 'password123',
        'name' => 'Original User',
    ]);

    $response = $this->postJson('/api/register', [
        'login' => 'SecondUser',
        'email' => 'duplicate@example.com',
        'password' => 'password123',
        'password_confirmation' => 'password123',
        'name' => 'Duplicate User',
    ]);

    $response->assertStatus(422);
    $response->assertJsonValidationErrors(['email']);
    }

}
