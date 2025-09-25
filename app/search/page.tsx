/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import OpenLibraryClient from "open-library-client";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const client = new OpenLibraryClient();
  const q = Array.isArray(params.q) ? params.q.join(" ") : params.q ?? "";
  const {
    data: { docs: books },
  } = await client.searchBooks({ q });

  return (
    <main className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Search: {params.q}</h2>

      <div className="grid grid-cols-4 gap-4">
        {books.map((book) => (
          <div
            key={book.key.split("/works/")[1]}
            className="flex flex-col  items-center"
          >
            <Link
              href={`/book/${book.key.split("/works/")[1]}`}
              className=" font-semibold text-xl leading-tight text-center text-balance"
            >
              {book.title}
            </Link>

            <p>{book.author_name && ` by ${book.author_name.join(", ")}`}</p>

            {book.cover_i ? (
              <Link href={`/book/${book.key.split("/works/")[1]}`}>
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                  alt={`Cover for ${book.title}`}
                  className="mt-2"
                />
              </Link>
            ) : (
              <div className="mt-2 bg-secondary aspect-[2/3] flex justify-center items-center w-full">
                No Cover Available
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
