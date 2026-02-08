import openai from '@/lib/clients/openai';
import chatSystemPrompt from '@/lib/prompts/chatSystemPrompt';
import { convertToModelMessages, streamText, UIMessage } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(request: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await request.json();

    const result = streamText({
      model: openai('gpt-4o-mini'),
      messages: await convertToModelMessages(messages),
      system: chatSystemPrompt,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json(
      { error: 'Failed to generate response' },
      { status: 500 },
    );
  }
}
