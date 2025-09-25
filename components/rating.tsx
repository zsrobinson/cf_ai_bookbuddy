import { StarIcon } from "lucide-react";

export function Rating({
  value,
  name,
  onChange,
}: {
  value: number;
  name?: string;
  onChange: (n: number) => void;
}) {
  return (
    <div className="flex gap-1">
      <input type="hidden" name={name} value={value} />
      {Array.from({ length: 5 }).map((_, i) => {
        const isFilled = i < value;
        return (
          <StarIcon
            key={i}
            size={24}
            className={`cursor-pointer ${isFilled ? "fill-current" : ""}`}
            onClick={() => onChange(i + 1)}
          />
        );
      })}
    </div>
  );
}
