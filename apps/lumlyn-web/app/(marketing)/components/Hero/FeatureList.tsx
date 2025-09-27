// components/FeatureList.tsx
import { BulletFavicon } from "./BulletFavicon";

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
          <BulletFavicon/>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
