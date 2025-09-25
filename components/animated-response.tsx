import { BookHeartIcon } from "lucide-react";

export function AnimatedResponse({ text }: { text: string }) {
  const processedWords = text
    .split(" ")
    .map((word) => word + " ")
    .flatMap((word) =>
      word.length > 8
        ? [
            word.slice(0, Math.floor(word.length / 2)),
            word.slice(Math.floor(word.length / 2)),
          ]
        : [word]
    );

  return (
    <div className="border border-cyan-500/50 rounded-xl p-4 flex gap-4 items-center bg-gradient-to-tr from-blue-500/10 to-emerald-500/10 ">
      <BookHeartIcon size={24} className="shrink-0 text-cyan-500/80" />

      <p className="text-cyan-900 dark:text-cyan-100">
        {processedWords.map((word, index) => (
          <span
            key={index}
            className="inline-block animate-in fade-in whitespace-pre"
            style={{
              animationDelay: `${index * 0.1}s`,
              animationFillMode: "both",
            }}
          >
            {word}
          </span>
        ))}
      </p>
    </div>
  );
}
