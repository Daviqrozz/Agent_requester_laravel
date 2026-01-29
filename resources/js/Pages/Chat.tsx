import { FormEvent, useState } from 'react';
import { Head } from '@inertiajs/react';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import AppLayout from '@/layouts/app-layout';

type ChatMessage = {
    role: 'user' | 'assistant';
    content: string;
};

export default function Chat() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const text = input.trim();
        if (!text || loading) return;

        // adiciona mensagem do usuário
        setMessages(prev => [...prev, { role: 'user', content: text }]);
        setInput('');
        setLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text }),
            });

            const data = await res.json();

            setMessages(prev => [
                ...prev,
                { role: 'assistant', content: data.reply ?? 'Sem resposta do agente.' },
            ]);
        } catch (error) {
            setMessages(prev => [
                ...prev,
                {
                    role: 'assistant',
                    content: 'Ocorreu um erro ao falar com o assistente.',
                },
            ]);
        } finally {
            setLoading(false);
        }
    }

    return (

        <AppLayout>
            <Head title='Agente' />
            <div className="max-w-2xl mx-auto h-full w-full flex flex-col mt-1">

                {/* Header com foto do agente */}
                <div className="flex justify-center items-center pb-6 border-b">
                    <div className="flex flex-col items-center">
                        <img
                            src="https://ui-avatars.com/api/?name=Agent+Bot&background=3b82f6&color=fff&size=80"
                            alt="Agent Avatar"
                            className="w-20 h-20 rounded-full border-4 border-blue-100 mb-2"
                        />
                        <h2 className="text-lg font-semibold text-white text-white">
                            Assistente de Estoque
                        </h2>
                        <p className="text-xs text-white ">Online</p>
                    </div>
                </div>

                {/* Área de mensagens */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#33343B]">
                    {messages.length === 0 && (
                        <div className="flex justify-center items-center h-full">
                            <div className="text-center">
                                <p className="text-white text-sm">
                                    Comece uma conversa com o assistente
                                </p>
                            </div>
                        </div>
                    )}

                    {messages.map((m, i) => (
                        <div
                            key={i}
                            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`flex gap-3 max-w-xs ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                                    }`}
                            >
                                {m.role === 'assistant' && (
                                    <img
                                        src="https://ui-avatars.com/api/?name=Agent+Bot&background=3b82f6&color=fff&size=32"
                                        alt="Agent"
                                        className="w-8 h-8 rounded-full flex-shrink-0"
                                    />
                                )}

                                <div
                                    className={`px-4 py-2 rounded-lg text-sm break-words ${m.role === 'user'
                                        ? 'bg-blue-600 text-white rounded-br-none'
                                        : 'bg-white text-black border border-gray-200 rounded-bl-none'
                                        }`}
                                >
                                    {m.content}
                                </div>
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="flex justify-start">
                            <div className="flex gap-3">
                                <img
                                    src="https://ui-avatars.com/api/?name=Agent+Bot&background=3b82f6&color=fff&size=32"
                                    alt="Agent"
                                    className="w-8 h-8 rounded-full flex-shrink-0"
                                />
                                <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm text-white">
                                    Digitando
                                    <span className="animate-pulse">...</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input de mensagem */}
                <form
                    onSubmit={handleSubmit}
                    className="border-t p-4 bg-[#33343B] flex gap-2 "
                >
                    <input
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                        placeholder="Digite sua mensagem..."
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                    <button
                        type="submit"
                        disabled={loading || !input.trim()}
                        className="px-6 py-2 text-sm rounded-lg bg-blue-600 text-white font-medium disabled:opacity-50 hover:bg-blue-700 transition"
                    >
                        Enviar
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
