import openai from '@/lib/clients/openai';
import chatSystemPrompt from '@/lib/prompts/chatSystemPrompt';

export async function POST(request: Request) {
    try {
        const { messages } = await request.json();

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "system", content: chatSystemPrompt }, ...messages],
            stream: true,
        });

        // Creates a Web Streams API ReadableStream. The start callback runs once when the stream is consumed.
        // It uses controller to push data and close the stream.
        const stream = new ReadableStream({
            async start(controller) {
                for await (const chunk of response) {
                    const text = chunk.choices[0]?.delta?.content;
                    if (text) {
                        controller.enqueue(new TextEncoder().encode(text));
                    }
                }
                controller.close();
            },
        });

        return new Response(stream, {
            headers: { "Content-Type": "text/plain; charset=utf-8" },
        });
    } catch (error) {
        console.error("Chat API error:", error);
        return Response.json(
            { error: "Failed to generate response" },
            { status: 500 }
        );
    }
}