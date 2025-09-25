import { NextRequest, NextResponse } from "next/server";
import OpenLibraryClient from "open-library-client";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q") ?? "";
  const client = new OpenLibraryClient();
  const results = await client.searchBooks({ q: query });
  console.log(results.data.docs);
  return NextResponse.json(results.data.docs);
}
