<?php

declare(strict_types=1);

namespace App\Http\Controllers;


use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\Recipe;

class UserController extends Controller
{

    public function getCurrentUser()
    {
        $user = Auth::user();
    
        if ($user) {
           
            $userData = $user->only(['id', 'name', 'email', 'isAdmin','favorites','toDo']); 
    
            return response()->json(["user" => $userData], 200);
        }
    
        return response()->json(["message" => "User not authenticated"], 401);
    }

    public function getUserFavorites(Request $request)
    {
           
            $userId = $request->input('userId') ?? $request->user()->id;
        
          
            $user = User::find($userId);
        
           
            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }
        
            
            $favorites = json_decode($user->favorites, true) ?? [];
        
           
            if (empty($favorites)) {
                return response()->json([]);
            }
        
           
            $recipes = Recipe::whereIn('id', $favorites)
                             ->select('id', 'name', 'photo')  
                             ->get();
        
                             foreach ($recipes as $recipe) {
                                if ($recipe->photo) {
                                    $recipe->photo = "data:image/jpeg;base64," . base64_encode($recipe->photo);
                                } else {
                                    $recipe->photo = null;
                                }
                            }
                        
         
            return response()->json($recipes);
        }
        
    

    public function getUserToDo(Request $request)
    {
        $userId = $request->input('userId') ?? $request->user()->id;
        
          
        $user = User::find($userId);
    
       
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
    
        
        $toDo = json_decode($user->toDo, true) ?? [];
    
       
        if (empty($toDo)) {
            return response()->json([]);
        }
    
       
        $recipes = Recipe::whereIn('id', $toDo)
                         ->select('id', 'name', 'photo')  
                         ->get();
    
                         foreach ($recipes as $recipe) {
                            if ($recipe->photo) {
                                $recipe->photo = "data:image/jpeg;base64," . base64_encode($recipe->photo);
                            } else {
                                $recipe->photo = null;
                            }
                        }
                    
     
        return response()->json($recipes);
    }


    public function addToToDoList(Request $request)
    {
        $user = Auth::user();
    
        if (!$user) {
            return response()->json(['error' => 'Musisz być zalogowany, aby dodać do listy zadań.'], 401);
        }
    
        $recipeId = (int) $request->input('recipeId');
    
      
        $toDo = is_array($user->toDo) ? $user->toDo : json_decode($user->toDo, true) ?? [];
    
       
        if (!in_array($recipeId, $toDo)) {
            $toDo[] = $recipeId;
            $user->toDo = $toDo; 
            $user->save(); 
        } else {
            return response()->json(['message' => 'Przepis już istnieje na liście zadań.'], 200);
        }
    
        return response()->json(['message' => 'Przepis dodany do listy zadań!'], 200);
    }
    
    public function addToFavorites(Request $request)
    {
        $user = Auth::user();
    
        if (!$user) {
            return response()->json(['error' => 'Musisz być zalogowany, aby dodać do ulubionych.'], 401);
        }
    
        $recipeId = (int) $request->input('recipeId');
    
       
        $favorites = is_array($user->favorites) ? $user->favorites : json_decode($user->favorites, true) ?? [];
    
       
        if (!in_array($recipeId, $favorites)) {
            $favorites[] = $recipeId; 
            $user->favorites = $favorites; 
            $user->save();
        } else {
            return response()->json(['message' => 'Przepis już istnieje na liście ulubionych.'], 200);
        }
    
        return response()->json(['message' => 'Przepis dodany do ulubionych!'], 200);
    }

    public function removeFromFavorites(Request $request)
    {
        $userId = $request->input('userId') ?? $request->user()->id;
        $recipeId = $request->input('recipeId');

        $user = User::find($userId);

        if (!$user || !$recipeId) {
            return response()->json(['error' => 'Invalid data'], 400);
        }

        $favorites = json_decode($user->favorites, true) ?? [];
        $favorites = array_filter($favorites, fn($id) => $id != $recipeId);
        $user->favorites = json_encode($favorites);
        $user->save();

        return response()->json(['message' => 'Removed from favorites', 'favorites' => $favorites]);
    }

    public function removeFromToDo(Request $request)
    {
        $userId = $request->input('userId') ?? $request->user()->id;
        $recipeId = $request->input('recipeId');

        $user = User::find($userId);

        if (!$user || !$recipeId) {
            return response()->json(['error' => 'Invalid data'], 400);
        }

        $toDo = json_decode($user->toDo, true) ?? [];
        $toDo = array_filter($toDo, fn($id) => $id != $recipeId);
        $user->toDo = json_encode($toDo);
        $user->save();

        return response()->json(['message' => 'Removed from to-do list', 'toDo' => $toDo]);
    }
    
     
}
