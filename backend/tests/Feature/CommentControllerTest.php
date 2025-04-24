<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Recipe;
use App\Models\Comment;

class CommentControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testAuthenticatedUserCanAddComment()
    {
        $user = User::factory()->create([
            'login' => 'testuser123',
            'isAdmin' => false
        ]);
    
        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'login' => 'testuser123',
        ]);
    
        $recipe = Recipe::factory()->create([
            'isApproved' => 1,
            'foodPreferences' => 'vegetarian'
        ]);
    
        $this->actingAs($user, 'sanctum');
    
        $response = $this->postJson('/api/comment', [
            'recipeId' => $recipe->id,
            'contents' => 'Treść przepisu xyz',
            'userId' => $user->id
        ]);
    
        $response->assertStatus(201);

        $this->assertDatabaseHas('comments', [
            'recipeId' => $recipe->id,
            'contents' => 'Treść przepisu xyz',
            'userId' => $user->id
        ]);
    }
}
