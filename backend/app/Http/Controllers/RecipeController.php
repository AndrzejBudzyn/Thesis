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
            $data = Recipe::where('isApproved', 1)->get()->map(function ($recipe) {
               
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

    public function getTopWeeklyRecipes()
{
    try {
      
        $recipes = Recipe::orderBy('weeklyRecipeCount', 'desc')->take(20)->get();

        if ($recipes->isEmpty()) {
            return response()->json([
                "error" => "No recipes available."
            ], 404);
        }

       
        $topRecipes = [];
        $lastCount = null;

        foreach ($recipes as $recipe) {
            if (count($topRecipes) >= 7 && $recipe->weeklyRecipeCount !== $lastCount) {
                break;
            }

            $recipe->photo = $recipe->photo 
            ? "data:image/jpeg;base64," . base64_encode($recipe->photo) 
            : null;

            $lastCount = $recipe->weeklyRecipeCount;
            $topRecipes[] = $recipe;
        }


        if (count($topRecipes) > 7) {
            $finalTiedCount = $lastCount;
            $tiedRecipes = collect($topRecipes)->filter(function ($recipe) use ($finalTiedCount) {
                return $recipe->weeklyRecipeCount === $finalTiedCount;
            });

            $selectedRecipes = $tiedRecipes->shuffle()->take(7 - count($topRecipes) + $tiedRecipes->count());

            $topRecipes = array_merge(
                collect($topRecipes)->filter(function ($recipe) use ($finalTiedCount) {
                    return $recipe->weeklyRecipeCount !== $finalTiedCount;
                })->all(),
                $selectedRecipes->all()
            );
        }

        return response()->json($topRecipes, 200);
    } catch (\Exception $e) {
        return response()->json([
            "error" => "Something went wrong.",
            "message" => $e->getMessage(),
        ], 500);
    }
}


    public function AddUserRecipe(Request $request)
    
    {
        if ($request->has('ingredients')) {
            $request->merge(['ingredients' => json_decode($request->input('ingredients'), true)]);
        }
        if ($request->has('preparation')) {
            $request->merge(['preparation' => json_decode($request->input('preparation'), true)]);
        }
        
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'photo' => 'nullable|image|max:2048', 
            'ingredients' => 'required|array', 
            'ingredients.*.title' => 'nullable|string|max:255',
            'ingredients.*.items' => 'nullable|array',
            'ingredients.*.items.*' => 'nullable|string|max:255',
            'preparation' => 'required|array', 
            'preparation.*.title' => 'nullable|string|max:255',
            'preparation.*.items' => 'nullable|array',
            'preparation.*.items.*' => 'nullable|string|max:255',
            'calories' => 'required|integer|min:0',
            'foodPreferences' => 'nullable|string|max:255',
            'type' => 'required|string|max:255',
            'kitchen' => 'nullable|string|max:255',
            'foodPreferences' => 'nullable|string|max:255',
        ]);

    
        $photoData = null;
        if ($request->hasFile('photo')) {
            $photoData = file_get_contents($request->file('photo')->path());
        }

        $recipe = Recipe::create([
            'name' => $validatedData['name'],
            'photo' => $photoData, 
            'ingredients' => json_encode($validatedData['ingredients']), 
            'preparation' => json_encode($validatedData['preparation']), 
            'sumOfIngredients' => count($validatedData['ingredients']), 
            'calories' => $validatedData['calories'],
            'type' => $validatedData['type'],
            'kitchen' => $validatedData['kitchen'] ?? null,
            'foodPreferences' => $validatedData['foodPreferences'] ?? null,
            'weeklyRecipeCount' => 0,
            'isApproved' => false,
        ]);

        return response()->json(['message' => 'Przepis został zapisany!', 'recipe' => $recipe], 201);
    }
}
