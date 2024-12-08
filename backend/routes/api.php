<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\AdminRecipeController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\CommentsController;
use App\Http\Controllers\UserController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post("/register", [AuthController::class, "register"]);
Route::post("/login", [AuthController::class, "login"]);
Route::get("/recipes",[RecipeController::class, "getAllRecipes"]);
Route::get("/recipe/{id}",[RecipeController::class, "getRecipe"]);
Route::get("/comments/{id}",[CommentsController::class, "getAllCommentsForRecipe"]);

Route::middleware('auth:sanctum')->group(function (): void  {
    Route::post("/logout", [AuthController::class, "logout"]);
    Route::post("/comment",[CommentsController::class, "addCommentForRecipe"]);
    Route::get("/getCurrentUser", [UserController::class, "getCurrentUser"]);
});

Route::middleware(["auth:sanctum", "admin"])->group(function (): void {
    Route::get("/users", [AdminUserController::class, "getAllUsers"]);
});