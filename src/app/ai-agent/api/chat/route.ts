import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    // Verify Ollama connection first
    const healthCheck = await fetch('http://localhost:11434/api/tags');
    if (!healthCheck.ok) {
      throw new Error(`Ollama connection failed: ${healthCheck.status}`);
    }

    const { messages, customPrompt } = await req.json();
    const ollamaUrl = 'http://localhost:11434/api/chat';

    const response = await fetch(ollamaUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'deepseek-r1',
        messages: [
          { role: 'system', content: customPrompt },
          ...messages.map((msg: any) => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text
          }))
        ],
        stream: false,
      }),
    });

    // Check for HTML response
    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      const text = await response.text();
      console.error('Received HTML response:', text.substring(0, 200));
      throw new Error('Ollama returned HTML instead of JSON');
    }

    const data = await response.json();
    console.log('🧠 Ollama raw response:', data);
    const cleanedResponse = data.message.content.replace(/<think>[\s\S]*?<\/think>/g, '');
    return NextResponse.json({ response: cleanedResponse });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        error: 'API request failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}