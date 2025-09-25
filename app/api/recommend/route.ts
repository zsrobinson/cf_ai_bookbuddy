import { getCloudflareContext } from "@opennextjs/cloudflare";
import { streamObject } from "ai";
import { NextRequest } from "next/server";
import { createWorkersAI } from "workers-ai-provider";
import z from "zod";

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const env = getCloudflareContext().env as { AI: Ai };
  const model: keyof AiModels = "@cf/meta/llama-3.3-70b-instruct-fp8-fast";
  const workersai = createWorkersAI({ binding: env.AI });

  const { library, genrePref } = (await req.json()) as {
    library: string;
    genrePref: string[];
  };

  const result = streamObject({
    model: workersai(model as Parameters<typeof workersai>[0]),
    system:
      "You are a helpful book recommendation assistant. Do not include any preamble, just provide the summary.",
    prompt: `The user has read books and left reviews, and has the following genre preferences: ${JSON.stringify(
      genrePref
    )}. Based on this information, recommend 5 new books that the user has not read yet. For each recommendation, provide the title, author, and a brief reason why this book would be a good fit for the user. Format the response as a JSON array with each entry containing 'title', 'author', and 'reason'. Here are the user's previously read books and reviews: ${library}`,
    schema: z
      .object({
        title: z.string(),
        author: z.string(),
        reason: z.string(),
      })
      .array(),
  });

  return result.elementStream;
}
