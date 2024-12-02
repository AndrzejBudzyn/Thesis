<?php

declare(strict_types=1);

namespace App\Http\Requests\AuthRequests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
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
            'login_or_email' => [
                'required',
                function ($attribute, $value, $fail) {
                    if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
                       
                        $user = \App\Models\User::where('login', $value)->first();
                        if (!$user) {
                            $fail('The ' . $attribute . ' is invalid.');
                        }
                    } else {
                       
                        $user = \App\Models\User::where('email', $value)->first();
                        if (!$user) {
                            $fail('The ' . $attribute . ' is invalid.');
                        }
                    }
                }
            ],
            "password" => "required",
        ];
    }
}
