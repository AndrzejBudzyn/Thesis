<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\AuthRequests\LoginRequest;
use App\Http\Requests\AuthRequests\SignupRequest;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class RecipeController extends Controller
{
    public function getAllRecipes()
    {
        try {
            $data = Recipe::all()->map(function ($recipe) {
                $recipe->photo = $recipe->photo ? "data:image/jpeg;base64," . base64_encode($recipe->photo) : null;

                
                return $recipe;
            });

            return response()->json($data, 200);
        } catch (Exception $e) {
            return response()->json([
                "error" => "Something went wrong.",
                "message" => $e->getMessage(),
            ], 500);
        }
    }

    public function getRecipe($id)
{
    try {
 
        $recipe = Recipe::find($id);

        if (!$recipe) {
            return response()->json([
                "error" => "Recipe not found."
            ], 404);
        }

        
        $recipe->photo = $recipe->photo 
            ? "data:image/jpeg;base64," . base64_encode($recipe->photo) 
            : null;

        
        return response()->json($recipe, 200);
    } catch (Exception $e) {
       
        return response()->json([
            "error" => "Something went wrong.",
            "message" => $e->getMessage(),
        ], 500);
    }
}
}
