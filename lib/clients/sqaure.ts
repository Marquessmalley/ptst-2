import { SquareClient, SquareEnvironment } from 'square';

export const client = new SquareClient({
  environment: SquareEnvironment.Sandbox,
  token: process.env.SQUARE_SANDBOX_ACCESS_TOKEN,
});
