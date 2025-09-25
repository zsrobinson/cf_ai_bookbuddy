import { BookHeartIcon, SearchIcon } from "lucide-react";
import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "BookBuddy",
  description: "Your personal book recommendation assistant.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased p-8 max-w-4xl mx-auto">
        <nav className="flex gap-4 items-center">
          <BookHeartIcon size={32} />
          <div>
            <Link href="/">
              <h1 className="text-3xl font-bold">BookBuddy</h1>
            </Link>
            <p>Your personal book recommendation assistant</p>
          </div>
          <form action="/search" className="ml-auto flex gap-2">
            <Input type="text" name="q" placeholder="Search books..." />
            <Button type="submit" variant="secondary">
              <SearchIcon />
            </Button>
          </form>
        </nav>
        <hr className="my-4" />
        {children}
      </body>
    </html>
  );
}
