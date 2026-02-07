<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\Validated;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Credenciais inválidas'], 401);
        }

        $user  = $request->user();
        $token = $user->createToken('api_token')->plainTextToken;

        return response()->json([
            'token' => $token,
        ]);
    }
}
