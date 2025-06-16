<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Recipe;
use App\Models\User;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testAddToFavoritesWhenNotAuthenticated()
    {
    $response = $this->postJson('/api/favorites', ['recipeId' => 1]);
    $response->assertStatus(404);
    }
}
