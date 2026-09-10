import { Star } from "lucide-react";

/** Vijf sterren als iconen (B3, KAN-425): 4 gevuld Sage, de laatste leeg. Decoratief; de score staat als tekst ernaast. */
export default function Stars({ filled = 4, className = "" }: { filled?: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 text-sage ${className}`} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} size={16} strokeWidth={1.5} fill={i < filled ? "currentColor" : "none"} />
      ))}
    </span>
  );
}
