<?php

declare(strict_types=1);

namespace App\Http\Controllers;


use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AdminUserController extends Controller
{

    public function getAllUsers()
    {
        $users = User::all();

        return response()->json($users);
        
    }
    

  
}
