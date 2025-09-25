"use client";

import { WorkDetails } from "open-library-client";
import { FormEvent, useState } from "react";
import { Book } from "~/app/library/page";
import { Rating } from "~/components/rating";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { useLocalStorage } from "~/lib/use-local-storage";

export function BookReview({ result }: { result: WorkDetails }) {
  const [library, setLibrary] = useLocalStorage<Book[]>("library", []);
  const existing = library.find((entry) => entry.result.key === result.key);
  const [rating, setRating] = useState<number>(existing?.rating || 0);
  const [review, setReview] = useState<string>(existing?.review || "");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newEntry: Book = { result, rating, review };

    setLibrary((lib) => [
      ...lib.filter((entry) => entry.result.key !== result.key),
      newEntry,
    ]);
  }

  function onDelete() {
    setLibrary((lib) => lib.filter((entry) => entry.result.key !== result.key));
    setRating(0);
    setReview("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <h3 className="text-lg font-semibold">
        {existing ? "Edit" : "Add"} Review for &quot;{result.title}&quot;
      </h3>
      <Textarea
        className="w-full p-2 border rounded"
        placeholder="Write your review here..."
        value={review}
        defaultValue={existing?.review || ""}
        onChange={(e) => setReview(e.target.value)}
        name="review"
        rows={4}
      />

      <div className="flex justify-between items-center gap-2">
        <Rating value={rating} onChange={(n) => setRating(n)} />

        {existing && (
          <Button
            type="button"
            variant="ghost"
            onClick={onDelete}
            className="ml-auto"
          >
            Delete Review
          </Button>
        )}

        <Button
          disabled={existing?.rating === rating && existing?.review === review}
        >
          Save Review
        </Button>
      </div>
    </form>
  );
}
