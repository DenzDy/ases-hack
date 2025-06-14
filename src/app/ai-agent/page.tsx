'use client';
import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { FileUpload } from '@/components/ui/file-upload';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { File, Plus } from 'lucide-react';

type Message = {
  text: string;
  sender: 'user' | 'bot';
  files?: FilePreview[];
};

type FilePreview = {
  id: string;
  name: string;
  type: string;
  file: File;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Hello! How can I help you today?', sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [files, setFiles] = useState<FilePreview[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, files]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => ({
        file,
        id: Math.random().toString(36).substring(2, 9),
        name: file.name,
        type: file.type
      }));
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() && files.length === 0) return;

    // Add user message with files
    const newMessage: Message = { 
      text: inputValue, 
      sender: 'user',
      files: [...files] 
    };
    setMessages(prev => [...prev, newMessage]);
    
    setInputValue('');
    setFiles([]);

    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: files.length > 0 
          ? `I received ${files.length} file(s): ${files.map(f => f.name).join(', ')}` 
          : `You said: "${inputValue}"`,
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
              className={`max-w-[80%] flex flex-col gap-2 ${
                msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
              }`}
            >
              {msg.files && msg.files.length > 0 && (
                <FileUpload files={msg.files} onRemove={() => {}} />
              )}
              {msg.text && (
                <div className={`p-3 rounded-lg ${
                  msg.sender === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {msg.text}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </Card>

        <form onSubmit={handleSend} className="flex flex-col gap-2 w-full">
          {files.length > 0 && (
            <FileUpload files={files} onRemove={removeFile} />
          )}
          
          <div className="flex gap-2 w-full">
            <div className="relative flex-1">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="pr-12"
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                multiple
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={() => fileInputRef.current?.click()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button type="submit">Send</Button>
          </div>
        </form>
      </div>
    </ThemeProvider>
  );
}