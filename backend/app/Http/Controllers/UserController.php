<?php

declare(strict_types=1);

namespace App\Http\Controllers;


use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    public function getCurrentUser()
    {
        $user = Auth::user();
    
        if ($user) {
           
            $userData = $user->only(['id', 'name', 'email', 'isAdmin']); 
    
            return response()->json(["user" => $userData], 200);
        }
    
        return response()->json(["message" => "User not authenticated"], 401);
    }
    

  
}
