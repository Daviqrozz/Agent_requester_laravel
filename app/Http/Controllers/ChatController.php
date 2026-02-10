<?php

namespace App\Http\Controllers;

use App\Services\ChatService;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function __construct(private ChatService $chatService ) {
    }

    public function hello(Request $request){

        $message = $request->message;

        if (!$message) {
            return response()->json([
                'role' => 'assistent',
                'content' => 'Nao foi possivel enviar sua mensagem ao agente agora, tente novamente'
            ],401);
        } 

        return response()->json($this->chatService->reply($message));

    }
}
