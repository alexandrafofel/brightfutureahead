// components/FeatureList.tsx
import { CheckCircle } from "lucide-react";

interface FeatureListProps {
  items: string[];
  title?: string; // optional heading for screen readers
}

export function FeatureList({ items, title }: FeatureListProps) {
  return (
    <ul
      role="list"
      aria-label={title}
      className="space-y-3"
       style={{
            textAlign: "center",
       }}
    >
      {items.map((item, idx) => (
        <li
          key={idx}
          role="listitem"
          className="flex items-start gap-2 text-gray-800 leading-relaxed text-center"
        >
          <CheckCircle className="w-5 h-5 text-blue-600 shrink-0" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
