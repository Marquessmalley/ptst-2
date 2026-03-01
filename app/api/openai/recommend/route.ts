import openai from '@/lib/clients/openai';
import { generateText } from 'ai';
import { buildRecommenderPrompt } from '@/lib/prompts/recommenderPrompt';

export async function POST(request: Request) {
  const body = await request.json();
  const prompt = buildRecommenderPrompt(
    body.vehicleType,
    body.answers.lastDetail,
    body.answers.mainConcern,
    body.answers.budget,
  );
  try {
    const result = await generateText({
      model: openai('gpt-4o-mini'),
      system: prompt,
      messages: [
        {
          role: 'user',
          content: 'Recommend packages based on the profile above.',
        },
      ],
    });

    const recommendations = JSON.parse(result.text);
    return Response.json(recommendations);
  } catch (error) {
    console.error('Recommend API error:', error);
    return Response.json(
      { error: 'Failed to generate recommendations' },
      { status: 500 },
    );
  }
}
