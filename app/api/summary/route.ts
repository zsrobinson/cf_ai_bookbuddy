import { getCloudflareContext } from "@opennextjs/cloudflare";
import { streamText } from "ai";
import OpenLibraryClient from "open-library-client";
import { createWorkersAI } from "workers-ai-provider";

export const maxDuration = 30;

export async function POST(req: Request) {
  const env = getCloudflareContext().env as { AI: Ai };
  const model: keyof AiModels = "@cf/meta/llama-3.3-70b-instruct-fp8-fast";
  const workersai = createWorkersAI({ binding: env.AI });

  const { id } = (await req.json()) as { id: string };
  const client = new OpenLibraryClient();
  const { data: book } = await client.getWork(id);

  const result = streamText({
    model: workersai(model as Parameters<typeof workersai>[0]),
    system:
      "You are a helpful book recommendation assistant. Do not include any preamble, just provide the summary.",
    prompt: `Based on the following book information, provide a brief summary of the book, including its main themes and any notable aspects that would help a user understand what the book is about. Keep the summary very concise, ideally within 2-3 sentences. ${JSON.stringify(
      book
    )}`,
  });

  return result.toUIMessageStreamResponse();
}
