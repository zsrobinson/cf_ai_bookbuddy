"use client";

import { useCompletion } from "@ai-sdk/react";
import { useEffect } from "react";
import { ResponseBox } from "~/components/response-box";

export function Summary({ id }: { id: string }) {
  const { completion, complete } = useCompletion({
    api: "/api/summary",
    body: { id },
  });

  useEffect(() => {
    complete("");
  }, [complete]);

  return <ResponseBox>{completion}</ResponseBox>;
}
