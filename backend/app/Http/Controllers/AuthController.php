<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\AuthRequests\LoginRequest;
use App\Http\Requests\AuthRequests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(SignupRequest $request)
    {
        $data = $request->validated();
        /** @var User $user */
        $user = User::create([
            "login"=>$data["login"],
            "email" => $data["email"],
            "password" => bcrypt($data["password"]),
            "name" => $data["name"],
            "isAdmin" => false,
        ]);
        $token = $user->createToken("auth_token")->plainTextToken;

        $res = [
            "user" => $user,
            "token" => $token,
        ];

        return response($res);
    }

    public function login(LoginRequest $request)
    {
            $credentials = $request->validated();

        
        $loginOrEmail = $credentials['login_or_email'];

        if (filter_var($loginOrEmail, FILTER_VALIDATE_EMAIL)) {
            $user = User::where('email', $loginOrEmail)->first();
        } else {
        
            $user = User::where('login', $loginOrEmail)->first();
        }
    
        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response([
                "message" => "Invalid login or password",
            ], 400);
        }
        
        Auth::login($user);
        
        $token = $user->createToken("auth_token")->plainTextToken;
    
        $res = [
            "user" => $user,
            "token" => $token,
        ];

        return response($res);
    }

    public function logout(Request $request)
    {
        /** @var User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete;

        return response("", 204);
    }
}
