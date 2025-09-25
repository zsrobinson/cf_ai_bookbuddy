/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import OpenLibraryClient from "open-library-client";
import { Summary } from "./summary";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = new OpenLibraryClient();
  const { data: book } = await client.getWork(id);

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-64 flex-shrink-0">
          {book.covers && book.covers.length > 0 ? (
            <img
              src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`}
              alt={`Cover for ${book.title}`}
              className="w-full h-auto rounded shadow"
            />
          ) : (
            <div className="w-full h-64 flex items-center justify-center rounded border">
              <span className="text-gray-500">No cover available</span>
            </div>
          )}
          {book.covers && book.covers.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-2">
              {book.covers.slice(1, 10).map((coverId) => (
                <img
                  key={coverId}
                  src={`https://covers.openlibrary.org/b/id/${coverId}-M.jpg`}
                  alt={`Cover for ${book.title}`}
                  className="w-full h-auto rounded shadow"
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-bold">{book.title}</h1>

          <p className="italic text-sm mt-2">
            {(book.authors ?? []).map((a) => JSON.stringify(a)).join(", ") ||
              "Unknown author"}
          </p>

          <Summary id={id} />

          <div className="mt-4 text-sm space-y-3">
            <div>
              {book.description
                ? typeof book.description === "string"
                  ? book.description
                  : book.description.value
                : "No description available."}
            </div>

            {book.excerpts && book.excerpts.length > 0 && (
              <div className=" p-3 rounded border">
                <strong className="block text-xs mb-1">Excerpt</strong>
                <div className="text-sm">
                  {typeof book.excerpts[0] === "string"
                    ? book.excerpts[0]
                    : book.excerpts[0].excerpt ??
                      JSON.stringify(book.excerpts[0])}
                </div>
              </div>
            )}

            <div className="text-sm">
              <strong className="">First published:</strong>{" "}
              {book.first_publish_date || book.created?.value || "Unknown"}
            </div>

            {book.subject_places && book.subject_places.length > 0 && (
              <div className="text-sm">
                <strong className="">Places:</strong>{" "}
                {(book.subject_places ?? []).slice(0, 8).join(", ")}
              </div>
            )}

            {book.subject_people && book.subject_people.length > 0 && (
              <div className="text-sm">
                <strong className="">People:</strong>{" "}
                {(book.subject_people ?? []).slice(0, 8).join(", ")}
              </div>
            )}
          </div>

          {/* Subjects / tags */}
          {book.subjects && book.subjects.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {(book.subjects ?? []).slice(0, 12).map((s: string) => (
                <span key={s} className="text-xs px-2 py-1 rounded-full border">
                  {s}
                </span>
              ))}
            </div>
          )}

          {/* Links */}
          <div className="mt-4 flex items-center gap-4">
            <Link href="/" className="text-blue-500 underline">
              Back to Home
            </Link>

            {book.key && (
              <a
                href={`https://openlibrary.org${book.key}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View on Open Library
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
