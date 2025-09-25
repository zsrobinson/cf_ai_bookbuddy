import { BookHeartIcon, SearchIcon } from "lucide-react";
import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { Providers } from "~/components/providers";

export const metadata: Metadata = {
  title: "BookBuddy",
  description: "Your personal book recommendation assistant.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <Providers>
        <body className="antialiased p-8 max-w-4xl mx-auto">
          <nav className="flex gap-4 items-center">
            <BookHeartIcon size={32} />
            <div>
              <Link href="/">
                <h1 className="text-2xl font-bold leading-tight">BookBuddy</h1>
              </Link>
              <p className="leading-tight">
                Your personal book recommendation assistant
              </p>
            </div>
            <form action="/search" className="ml-auto flex gap-2">
              <Input type="text" name="q" placeholder="Search books..." />
              <Button type="submit" variant="secondary">
                <SearchIcon />
              </Button>
            </form>
          </nav>

          <hr className="mt-4 mb-2" />
          <div className="flex gap-4 font-medium mx-4">
            <Link href="/">Home</Link>
            <Link href="/onboarding">Onboarding</Link>
            <Link href="/library">Library</Link>
          </div>
          <hr className="mt-2 mb-4" />

          {children}
        </body>
      </Providers>
    </html>
  );
}
