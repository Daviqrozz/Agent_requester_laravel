<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

$response = Http::get('http://example.com');

class ChatService
{
    public function reply($message)
    {

        $chat_endpoint = 'http://127.0.0.1:1234/v1/chat/completions';

        $payload = [
            'messages' => [
                [
                    'role'    => 'system',
                    'content' => 'Você é o agente Estocar. Sua função é entender pedidos sobre estoque e preparar dados para requisições de API. Responda sempre de forma breve e objetiva.',
                ],
                [
                    'role'    => 'user',
                    'content' => $message,
                ],
            ],
        ];
        $response = Http::post($chat_endpoint, $payload);

        if (!$response) {
            $content = [
                'role' => 'assistent',
                'content' => 'Nao foi possivel falar com o agente no momento'
            ];
        }

        $reply = $response->json();

        $content = $reply['choices'][0]['message'];

        return $content;
    }
}
