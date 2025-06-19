'use client';
import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { FileUpload } from '@/components/ui/file-upload';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { File, Plus, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'prism-react-renderer';

type Message = {
  text: string;
  sender: 'user' | 'bot' | 'system';
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
    { text: 'Hello, I\'m Katwiran! How can I help you today?', sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [files, setFiles] = useState<FilePreview[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const customPrompt = `You are a legal document assistant, well versed in Philippine law and the Philippine legal system.
  If needed, you will draft documents to the Philippine standard of how legal documents are made.
  Format all responses using CLEAN Markdown with:
  - **Bold** for important terms
  - *Italics* for emphasis
  - Headers using ## for sections
  - Lists with - or 1.
  - NO <think> blocks
  - NO code blocks unless actual code
  - NO triple backticks for non-code content

  Example format:
    ## Document Title
    **Important Note:** *This is a template*
    - Item 1
    - Item 2

  Key details: [exact details]

  IMPORTANT:
  1. You are well versed in Philippine law and the Philippine legal system
  2. You will draft documents to the Philippine standard of how legal documents are structured
  3. Your name is Katwiran, you are a AI legal assistant for the Philippine legal system.
  4. You are to answer questions regarding laws and the law system in the Philippines`;
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

  const verifyOllamaConnection = async () => {
    setConnectionStatus('checking');
    try {
      const res = await fetch('http://localhost:11434/api/tags');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      const data = await res.json();
      if (!data.models || data.models.length === 0) {
        throw new Error("No models found - run 'ollama pull deepseek'");
      }
      
      setConnectionStatus('connected');
      return true;
    } catch (error) {
      setConnectionStatus('error');
      setMessages(prev => [...prev, { 
        text: `System: ${error instanceof Error ? error.message : 'Connection failed'}`, 
        sender: 'system'
      }]);
      return false;
    }
  };

  useEffect(() => {
    verifyOllamaConnection();
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!inputValue.trim() && files.length === 0) || isLoading) return;

    const userMessage: Message = { 
      text: inputValue, 
      sender: 'user',
      files: [...files] 
    };

    setMessages(prev => [...prev, userMessage]);
    const loadingMessage: Message = { text: 'Thinking...', sender: 'bot' };
    setMessages(prev => [...prev, loadingMessage]);
    
    setInputValue('');
    setFiles([]);
    setIsLoading(true);

    try {
      // Verify connection before sending
      if (!await verifyOllamaConnection()) {
        throw new Error('Cannot connect to Ollama');
      }

      const response = await fetch('/ai-agent/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          customPrompt: customPrompt,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      
      setMessages(prev => prev.map(msg => 
        msg === loadingMessage 
          ? { ...msg, text: data.response || "Received empty response" } 
          : msg
      ));

    } catch (error) {
      setMessages(prev => prev.map(msg =>
        msg === loadingMessage
          ? { 
              ...msg, 
              text: `Error: ${error instanceof Error ? error.message : 'Request failed'}`,
              sender: 'system'
            }
          : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const getConnectionStatusBadge = () => {
    switch(connectionStatus) {
      case 'connected': 
        return <span className="text-green-500">● Connected</span>;
      case 'error':
        return <span className="text-red-500">● Disconnected</span>;
      default:
        return <span className="text-yellow-500">● Connecting...</span>;
    }
  };


  const MarkdownRenderer = ({ content }: { content: string }) => {
  // Remove think blocks and clean up markdown
    const cleanedContent = content
      .replace(/<br\s*\/?>/g, '\n\n')
      .replace(/<think>[\s\S]*?<\/think>/g, '')
      .replace(/```markdown/g, '')
      .replace(/```/g, '');

    return (
      <div className="prose prose-sm dark:prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h2: ({ node, ...props }) => (
              <h2 className="text-lg font-bold mt-4 mb-2" {...props} />
            ),
            strong: ({ node, ...props }) => (
              <strong className="font-semibold text-primary" {...props} />
            ),
            em: ({ node, ...props }) => (
              <em className="italic text-muted-foreground" {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul className="list-disc pl-5 space-y-1" {...props} />
            ),
            p: ({ node, ...props }) => (
              <p className="mb-3 leading-relaxed" {...props} />
            )
          }}
        >
          {cleanedContent}
        </ReactMarkdown>
      </div>
    );
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="container px-4 mx-auto flex flex-col h-[calc(100vh-80px)] py-4 gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">AI Assistant</h1>
          <div className="flex items-center gap-4">
            <div className="text-sm flex items-center">
              {getConnectionStatusBadge()}
              <button 
                onClick={verifyOllamaConnection}
                className="ml-2 text-xs underline text-muted-foreground hover:text-primary"
              >
                Retry
              </button>
            </div>
            <ModeToggle />
          </div>
        </div>
        
        <Card className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-background">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`max-w-[80%] flex flex-col gap-2 ${
                msg.sender === 'user' 
                  ? 'self-end items-end' 
                  : msg.sender === 'system'
                    ? 'self-center items-center'
                    : 'self-start items-start'
              }`}
            >
              {msg.files && msg.files.length > 0 && (
                <FileUpload files={msg.files} onRemove={() => {}} />
              )}
              {msg.text && (
                <div className={`p-3 rounded-lg ${
                  msg.sender === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : msg.sender === 'system'
                      ? 'bg-destructive/10 text-destructive-foreground border border-destructive/30'
                      : 'bg-muted text-muted-foreground'
                }`}>
                  <MarkdownRenderer content={msg.text} />
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
                disabled={isLoading || connectionStatus !== 'connected'}
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                multiple
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button 
              type="submit" 
              disabled={isLoading || connectionStatus !== 'connected'}
            >
              {isLoading ? 'Sending...' : 'Send'}
            </Button>
          </div>
          
          {connectionStatus === 'error' && (
            <div className="flex items-center gap-2 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              <span>Cannot connect to Ollama. Make sure it's running.</span>
            </div>
          )}
        </form>
      </div>
    </ThemeProvider>
  );
}