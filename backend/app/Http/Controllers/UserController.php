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
        if (Auth::check()) {
            $user = Auth::user();

            return response()->json(["user" => $user], 200);
        }

        return response()->json(["message" => "User not Auth"], 401);
    }

  
}
