import { useState, useRef, useEffect } from 'react';

export default function Page() {
    const [messages, setMessages] = useState<{ sender: string; text: string; }[]>([]);
    const [input, setInput] = useState('');
    const bottomRef = useRef<HTMLDivElement>(null);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);

        try {
            const response = await fetch('http://localhost:3001/api/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input }),
            });
            const data = await response.json();

            const botMessage = { sender: 'bot', text: data.reply };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('送訊息失敗', error);
        }

        setInput('');
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [messages]);

    return (
        <div className="p-4 max-w-md mx-auto">
            <div className="h-96 overflow-y-scroll shadow mb-4 p-2 rounded bg-white">
                {messages.map((msg, idx) => (
                    <div
                        key={`${idx}${msg}`}
                        className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
                        ref={idx === messages.length - 1 ? bottomRef : undefined}
                    >
                        <span className={`inline-block text-sm px-3.5 py-1.5 rounded-full ${msg.sender === 'user' ? 'bg-sky-600 text-white' : 'bg-gray-100'}`}>
                            {msg.text}
                        </span>
                    </div>
                ))}
            </div>
            <div className="flex shadow">
                <input
                    className="flex-1 bg-white p-2 rounded-l"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="輸入訊息..."
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSend();
                        }
                    }}
                />
                <button
                    className="bg-sky-600 text-white p-2 rounded-r cursor-pointer"
                    onClick={handleSend}
                >
                    送出
                </button>
            </div>
        </div>
    );
}