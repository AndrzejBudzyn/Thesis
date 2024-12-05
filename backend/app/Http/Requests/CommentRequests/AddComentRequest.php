<?php

declare(strict_types=1);

namespace App\Http\Requests\CommentRequests;

use Illuminate\Foundation\Http\FormRequest;

class AddComentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    { 
        return [
        'recipeId' => ['required', 'integer', 'exists:recipes,id'],
        'userId' => ['required', 'integer' , 'exists:users,id'],
        'contents' => ['required', 'string']
         ];
    }
}
