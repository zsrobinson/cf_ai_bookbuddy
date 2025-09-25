"use client";

import { useState } from "react";
import { AnimatedResponse } from "~/components/animated-response";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Progress } from "~/components/ui/progress";

type Book = { id: string; title: string; author: string };

export default function Page() {
  const steps = ["Your name", "Preferred genres", "Recent books"];
  const total = steps.length;

  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const genreOptions = [
    "Fantasy",
    "Science Fiction",
    "Mystery",
    "Romance",
    "Nonfiction",
    "Historical",
    "Thriller",
  ];
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [books, setBooks] = useState<Book[]>([
    { id: cryptoRandomId(), title: "", author: "" },
  ]);
  const [finished, setFinished] = useState(false);

  const selectedGenresString = (
    selectedGenres.length === 0
      ? ""
      : selectedGenres.length === 1
      ? selectedGenres[0]
      : selectedGenres.length === 2
      ? selectedGenres.join(" and ")
      : selectedGenres.slice(0, -1).join(", ") +
        ", and " +
        selectedGenres[selectedGenres.length - 1]
  ).toLowerCase();

  function cryptoRandomId() {
    return Math.random().toString(36).slice(2, 9);
  }

  function toggleGenre(g: string) {
    setSelectedGenres((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    );
  }

  function updateBook(id: string, field: "title" | "author", value: string) {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, [field]: value } : b))
    );
  }

  function addBook() {
    setBooks((prev) => [
      ...prev,
      { id: cryptoRandomId(), title: "", author: "" },
    ]);
  }

  function removeBook(id: string) {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  }

  function canNext() {
    if (step === 0) return name.trim().length > 0;
    if (step === 1) return selectedGenres.length > 0;
    if (step === 2)
      return books.some(
        (b) => b.title.trim().length > 0 || b.author.trim().length > 0
      );
    return false;
  }

  function handleNext() {
    if (step < total - 1) {
      setStep((s) => s + 1);
    } else {
      // finish
      setFinished(true);
      // Replace with real save logic (API call) as needed
      console.log({
        name,
        selectedGenres,
        books: books.filter((b) => b.title || b.author),
      });
    }
  }

  function handleBack() {
    if (step > 0) setStep((s) => s - 1);
  }

  const progressPercent = Math.round(
    ((step + (finished ? 1 : 0)) / total) * 100
  );

  return (
    <main className="flex flex-col gap-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold">Onboarding</h2>

      <Progress value={progressPercent} />

      <p>
        Step {Math.min(step + 1, total)} of {total}: {steps[step]}
      </p>

      {!finished ? (
        <section>
          {step === 0 && (
            <div>
              <AnimatedResponse text="I'm looking forward to get to know you!" />
              <p>What&apos;s your name?</p>
              <Input
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </div>
          )}

          {step === 1 && (
            <div className="flex flex-col gap-4">
              <AnimatedResponse
                text={`Nice to meet you, ${name || "reader"}!`}
              />
              <p>Which genres do you prefer?</p>
              <div className="grid grid-cols-3 gap-2">
                {genreOptions.map((g, i) => (
                  <label
                    key={g}
                    htmlFor={`genre-${i}`}
                    className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-secondary/50"
                  >
                    <Checkbox
                      checked={selectedGenres.includes(g)}
                      onCheckedChange={() => toggleGenre(g)}
                      id={`genre-${i}`}
                    />
                    <p className="leading-tight">{g}</p>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <AnimatedResponse
                text={`I'll make sure to focus on ${selectedGenresString} books!`}
              />

              <p>Recent books you&apos;ve read</p>

              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {books.map((b, idx) => (
                  <div
                    key={b.id}
                    style={{
                      border: "1px solid #eee",
                      padding: 12,
                      borderRadius: 8,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        alignItems: "center",
                        marginBottom: 8,
                      }}
                    >
                      <strong style={{ minWidth: 24 }}>#{idx + 1}</strong>
                      <Input
                        value={b.title}
                        onChange={(e) =>
                          updateBook(b.id, "title", e.target.value)
                        }
                        placeholder="Title"
                      />
                      <Button
                        onClick={() => removeBook(b.id)}
                        variant="destructive"
                      >
                        Remove
                      </Button>
                    </div>
                    <Input
                      value={b.author}
                      onChange={(e) =>
                        updateBook(b.id, "author", e.target.value)
                      }
                      placeholder="Author (optional)"
                    />
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 12 }}>
                <Button type="button" onClick={addBook}>
                  + Add another book
                </Button>
              </div>
            </div>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <Button
              onClick={handleBack}
              disabled={step === 0}
              variant="secondary"
            >
              Back
            </Button>

            <div style={{ display: "flex", gap: 8 }}>
              <Button
                onClick={() => {
                  setStep(0);
                  setName("");
                  setSelectedGenres([]);
                  setBooks([{ id: cryptoRandomId(), title: "", author: "" }]);
                }}
                variant="ghost"
              >
                Reset
              </Button>

              <Button onClick={handleNext} disabled={!canNext()}>
                {step < total - 1 ? "Next" : "Finish"}
              </Button>
            </div>
          </div>
        </section>
      ) : (
        <section className="flex flex-col gap-4">
          <AnimatedResponse text="Those sound like some great choices. Thanks for sharing, and welcome to BookBuddy!" />

          <p>Here&apos;s a summary of what you told us:</p>

          <div className="border rounded-xl p-4">
            <p>
              <strong>Name:</strong> {name}
            </p>
            <p>
              <strong>Genres:</strong>{" "}
              {selectedGenres.join(", ") || "None selected"}
            </p>
            <div>
              <strong>Recent books:</strong>
              <ul>
                {books
                  .filter((b) => b.title || b.author)
                  .map((b) => (
                    <li key={b.id}>
                      {b.title || "(untitled)"}
                      {b.author ? ` — ${b.author}` : ""}
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <Button
              onClick={() => {
                /* Navigate or close onboarding */
              }}
            >
              Continue
            </Button>
          </div>
        </section>
      )}
    </main>
  );
}
