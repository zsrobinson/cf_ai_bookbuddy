import { useQuery } from "@tanstack/react-query";
import { BookSearchResult } from "open-library-client";
import { useState } from "react";
import { AutoComplete } from "./autocomplete";

export function BookAutoComplete() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const { data, isLoading } = useQuery<BookSearchResult[]>({
    queryKey: ["searchBooks", searchValue],
    enabled: searchValue.trim().length > 0,
    queryFn: async ({ signal }) => {
      const res = await fetch(
        `/api/book?q=${encodeURIComponent(searchValue)}`,
        { signal }
      );
      if (!res.ok) throw new Error("Failed to fetch books");
      return (await res.json()) as BookSearchResult[];
    },
  });

  return (
    <AutoComplete
      selectedValue={selectedValue}
      onSelectedValueChange={setSelectedValue}
      searchValue={searchValue}
      onSearchValueChange={setSearchValue}
      items={(data ?? []).map((book) => {
        const full = `"${book.title}"${
          book.author_name ? ` by ${book.author_name.join(", ")}` : ""
        }`;
        const label = full.length > 100 ? full.slice(0, 97) + "..." : full;
        return { value: book.key, label };
      })}
      isLoading={isLoading}
      placeholder="Search for books..."
    />
  );
}
