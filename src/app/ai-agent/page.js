'use client';
import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { ModeToggle } from '@/components/ui/mode-toggle';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I help you today?', sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setMessages([...messages, { text: inputValue, sender: 'user' }]);
    setInputValue('');

    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: `I received: "${inputValue}". This is a simulated response.`, 
        sender: 'bot' 
      }]);
    }, 1000);
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="container px-4 mx-auto flex flex-col h-[calc(100vh-80px)] py-4 gap-4">
        <div className="flex justify-end">
          <ModeToggle />
        </div>
        
        <Card className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-background">
          {messages.map((msg, index) => (
            <div 
              key={index}
              className={`max-w-[80%] p-3 rounded-lg ${
                msg.sender === 'user' 
                  ? 'bg-primary text-primary-foreground self-end' 
                  : 'bg-muted text-muted-foreground self-start'
              }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </Card>

        <form onSubmit={handleSend} className="flex gap-2 w-full">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" className="shrink-0">Send</Button>
        </form>
      </div>
    </ThemeProvider>
  );
}