import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RestaurantCard } from "@/components/feasto/RestaurantCard";
import { CategoryStrip } from "@/components/feasto/CategoryStrip";
import { categories, restaurants } from "@/lib/feasto-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/restaurants/")({
  head: () => ({
    meta: [
      { title: "All restaurants near you — Feasto" },
      {
        name: "description",
        content:
          "Browse every Feasto restaurant: filter by rating, delivery time, price, cuisine, vegetarian and offers.",
      },
      { property: "og:title", content: "All restaurants near you — Feasto" },
      {
        property: "og:description",
        content: "Filter by rating, delivery time, price, cuisine, vegetarian options and offers.",
      },
    ],
  }),
  component: RestaurantsPage,
});

const sorts = [
  { id: "popular", label: "Popularity" },
  { id: "rating", label: "Rating" },
  { id: "time", label: "Delivery time" },
  { id: "priceLow", label: "Price: low to high" },
] as const;

function RestaurantsPage() {
  const [category, setCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<(typeof sorts)[number]["id"]>("popular");
  const [vegOnly, setVegOnly] = useState(false);
  const [offersOnly, setOffersOnly] = useState(false);
  const [fastOnly, setFastOnly] = useState(false);
  const [topRated, setTopRated] = useState(false);
  const [cuisine, setCuisine] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const cuisineList = useMemo(
    () => Array.from(new Set(restaurants.flatMap((r) => r.cuisines))).sort(),
    [],
  );

  const list = useMemo(() => {
    let out = restaurants.filter((r) => {
      if (category && !r.categories.includes(category)) return false;
      if (vegOnly && !r.pureVeg) return false;
      if (offersOnly && !r.offer) return false;
      if (fastOnly && r.deliveryMins > 28) return false;
      if (topRated && r.rating < 4.5) return false;
      if (cuisine && !r.cuisines.includes(cuisine)) return false;
      return true;
    });
    out = [...out].sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "time") return a.deliveryMins - b.deliveryMins;
      if (sort === "priceLow") return a.priceForTwo - b.priceForTwo;
      return b.reviews - a.reviews;
    });
    return out;
  }, [category, vegOnly, offersOnly, fastOnly, topRated, cuisine, sort]);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Restaurants near you</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        {list.length} kitchens delivering to Bandra West right now.
      </p>

      <div className="mt-6">
        <CategoryStrip active={category} onSelect={setCategory} />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          className="rounded-full lg:hidden"
          onClick={() => setShowFilters((v) => !v)}
        >
          <SlidersHorizontal className="mr-1 size-4" /> Filters
        </Button>
        {sorts.map((s) => (
          <button
            key={s.id}
            type="button"
            aria-pressed={sort === s.id}
            onClick={() => setSort(s.id)}
            className={cn(
              "rounded-full border px-4 py-2 text-xs font-bold transition-colors",
              sort === s.id
                ? "border-primary bg-accent text-accent-foreground"
                : "border-border text-muted-foreground hover:border-primary",
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside
          className={cn(
            "h-fit space-y-5 rounded-3xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]",
            showFilters ? "block" : "hidden lg:block",
          )}
          aria-label="Filters"
        >
          <div>
            <h2 className="font-display text-base font-bold">Quick filters</h2>
            <div className="mt-3 space-y-3">
              <Toggle id="veg" label="Pure vegetarian" checked={vegOnly} onChange={setVegOnly} />
              <Toggle
                id="offers"
                label="Has offers"
                checked={offersOnly}
                onChange={setOffersOnly}
              />
              <Toggle id="fast" label="Under 30 min" checked={fastOnly} onChange={setFastOnly} />
              <Toggle id="rated" label="Rated 4.5+" checked={topRated} onChange={setTopRated} />
            </div>
          </div>
          <div>
            <h2 className="font-display text-base font-bold">Cuisine</h2>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {cuisineList.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={cuisine === c}
                  onClick={() => setCuisine(cuisine === c ? null : c)}
                  className={cn(
                    "rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-colors",
                    cuisine === c
                      ? "border-primary bg-accent text-accent-foreground"
                      : "border-border text-muted-foreground hover:border-primary",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full rounded-full text-xs"
            onClick={() => {
              setVegOnly(false);
              setOffersOnly(false);
              setFastOnly(false);
              setTopRated(false);
              setCuisine(null);
              setCategory(null);
            }}
          >
            Clear all filters
          </Button>
        </aside>

        <div>
          {list.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center">
              <span className="text-4xl" aria-hidden>
                🥲
              </span>
              <h2 className="mt-3 font-display text-xl font-bold">No kitchens match that</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Try removing a filter — {categories.length} categories are still available.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {list.map((r) => (
                <RestaurantCard key={r.id} restaurant={r} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Toggle({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <Checkbox id={id} checked={checked} onCheckedChange={(v) => onChange(Boolean(v))} />
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
    </div>
  );
}
