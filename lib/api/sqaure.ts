import { SquareClient, SquareEnvironment } from "square";

export const client = new SquareClient({
  environment: SquareEnvironment.Sandbox,
  token: process.env.SANDBOX_ACCESS_TOKEN,
});
