import { getCloudflareContext } from "@opennextjs/cloudflare";
import { convertToModelMessages, streamText, UIMessage } from "ai";
import { createWorkersAI } from "workers-ai-provider";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  const env = getCloudflareContext().env as { AI: Ai };
  const model: keyof AiModels = "@cf/meta/llama-3.3-70b-instruct-fp8-fast";
  const workersai = createWorkersAI({ binding: env.AI });
  const result = streamText({
    model: workersai(model as Parameters<typeof workersai>[0]),
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
