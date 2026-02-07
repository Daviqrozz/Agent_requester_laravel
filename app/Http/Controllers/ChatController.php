<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function hello(Request $request){

        $message = $request->message;
        $user = $request->user;

        

        return response()->json([
            'mensagem' => $message,
            'resposta' => 'ola'
        ]);
    }
}
