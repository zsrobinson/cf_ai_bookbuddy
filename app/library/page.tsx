/* eslint-disable @next/next/no-img-element */
"use client";

import { type WorkDetails } from "open-library-client";
import { useLocalStorage } from "~/lib/use-local-storage";

export type Book = {
  result: WorkDetails;
  rating: number | undefined;
  review: string;
};

export default function Page() {
  const [library, setLibrary] = useLocalStorage<Book[]>("library", []);

  return (
    <main className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Library</h2>

      {library.length === 0 && <p>Your library is empty.</p>}

      <div className=" grid grid-cols-2 gap-4">
        {library.map((entry, index) => (
          <div key={index} className="flex gap-4">
            {entry.result.covers && entry.result.covers.length > 0 ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${entry.result.covers[0]}-M.jpg`}
                alt={`Cover for ${entry.result.title}`}
                className="w-24 h-auto rounded shadow"
              />
            ) : (
              <div className="w-24 h-36 bg-secondary flex items-center justify-center rounded border">
                <span className="text-gray-500 text-sm">
                  No cover available
                </span>
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold">{entry.result.title}</h3>
              <p className="italic text-sm">
                {(entry.result.authors ?? []).join(", ") || "Unknown author"}
              </p>
              {entry.rating && <p>Rating: {entry.rating} / 5</p>}
              {entry.review && (
                <div>
                  <h4 className="font-semibold">Review:</h4>
                  <p>{entry.review}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
