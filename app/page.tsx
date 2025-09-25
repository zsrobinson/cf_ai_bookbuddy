"use client";

import { BookAutoComplete } from "~/components/book-autocomplete";

export default function Chat() {
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <BookAutoComplete />
    </div>
  );
}
