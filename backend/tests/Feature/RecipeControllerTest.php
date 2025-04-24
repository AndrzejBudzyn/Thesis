<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RecipeControllerTest extends TestCase
{
    use RefreshDatabase;

    public function itReturnsEmptyArrayWhenNoRecipes()
    {
        $response = $this->getJson('/api/recipes');

        $response->assertStatus(200);
        $response->assertJson([]);
    }
    public function testRecipeNotFoundDisplayError()
    {
        $response = $this->getJson('/api/recipe/999');

        $response->assertStatus(404);
        $response->assertJson([
            'error' => 'Recipe not found.'
        ]);
    }
}
