import { categories } from "@/lib/feasto-data";
import { cn } from "@/lib/utils";

export function CategoryStrip({
  active,
  onSelect,
}: {
  active?: string | null;
  onSelect?: (id: string | null) => void;
}) {
  return (
    <div
      className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0"
      role="group"
      aria-label="Food categories"
    >
      {categories.map((c) => {
        const isActive = active === c.id;
        return (
          <button
            key={c.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect?.(isActive ? null : c.id)}
            className={cn(
              "group w-24 shrink-0 snap-start rounded-3xl border bg-card p-3 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]",
              isActive ? "border-primary shadow-[var(--shadow-lift)]" : "border-border shadow-[var(--shadow-soft)]",
            )}
          >
            <span
              className={cn(
                "mx-auto grid size-14 place-items-center rounded-2xl text-2xl transition-transform group-hover:scale-110",
                c.gradient,
              )}
              aria-hidden
            >
              {c.emoji}
            </span>
            <span
              className={cn(
                "mt-2 block text-xs font-bold",
                isActive ? "text-primary" : "text-foreground",
              )}
            >
              {c.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
