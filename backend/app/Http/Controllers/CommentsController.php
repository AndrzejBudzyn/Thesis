<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Recipe;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\CommentRequests\AddComentRequest;

class CommentsController extends Controller
{

    public function getAllCommentsForRecipe($id)
    {
        try {
           
            $comments = Comment::where('recipeId', $id)
                ->with('user:id,name') 
                ->get();
    
           
            return response()->json($comments, 200);
        } catch (\Exception $e) {
            return response()->json([
                "error" => "Nie udało się pobrać komentarzy.",
                "message" => $e->getMessage(),
            ], 500);
        }
    }

    public function addCommentForRecipe(AddComentRequest $request)
    {
        try {
            
            $validatedData = $request->validated();
    
           
            $comment = Comment::create($validatedData);

            $comment->load('user:id,name');

    
           
            return response()->json($comment, 201);
        } catch (\Exception $e) {
           
            return response()->json([
                "error" => "Nie udało się dodać komentarza.",
                "message" => $e->getMessage(),
            ], 500);
        }
    }
}
