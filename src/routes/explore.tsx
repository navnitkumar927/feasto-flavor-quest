import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { RestaurantCard } from "@/components/feasto/RestaurantCard";
import { CategoryStrip } from "@/components/feasto/CategoryStrip";
import {
  formatINR,
  menuItems,
  popularSearches,
  restaurants,
} from "@/lib/feasto-data";

const searchSchema = z.object({ q: z.string().optional() });
const RECENT_KEY = "feasto.recent-searches";

export const Route = createFileRoute("/explore")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Search restaurants, dishes and cuisines — Feasto" },
      {
        name: "description",
        content:
          "Search Feasto for restaurants, dishes, cuisines and categories, with filters and sorting built in.",
      },
      { property: "og:title", content: "Search restaurants, dishes and cuisines — Feasto" },
      { property: "og:description", content: "Find exactly the dish you are craving on Feasto." },
    ],
  }),
  component: Explore,
});

function Explore() {
  const { q } = Route.useSearch();
  const navigate = useNavigate();
  const [term, setTerm] = useState(q ?? "");
  const [category, setCategory] = useState<string | null>(null);
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(RECENT_KEY);
      if (raw) setRecent(JSON.parse(raw) as string[]);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    setTerm(q ?? "");
    if (!q) return;
    setRecent((prev) => {
      const next = [q, ...prev.filter((p) => p.toLowerCase() !== q.toLowerCase())].slice(0, 6);
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      return next;
    });
  }, [q]);

  const needle = (q ?? "").trim().toLowerCase();

  const matchedRestaurants = restaurants.filter((r) => {
    if (category && !r.categories.includes(category)) return false;
    if (!needle) return true;
    return (
      r.name.toLowerCase().includes(needle) ||
      r.cuisines.some((c) => c.toLowerCase().includes(needle))
    );
  });

  const matchedDishes = needle
    ? menuItems
        .filter(
          (m) =>
            m.name.toLowerCase().includes(needle) || m.description.toLowerCase().includes(needle),
        )
        .slice(0, 12)
    : [];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Explore</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Search restaurants, dishes, cuisines and categories.
      </p>

      <form
        className="mt-6 flex flex-col gap-2 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ to: "/explore", search: { q: term.trim() || undefined } });
        }}
      >
        <div className="flex flex-1 items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 shadow-[var(--shadow-soft)]">
          <Search className="size-4 text-muted-foreground" aria-hidden />
          <label htmlFor="explore-search" className="sr-only">
            Search Feasto
          </label>
          <input
            id="explore-search"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search for restaurants, cuisines, or dishes..."
            className="w-full bg-transparent text-sm outline-none"
          />
          {term && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => {
                setTerm("");
                navigate({ to: "/explore", search: {} });
              }}
            >
              <X className="size-4 text-muted-foreground" />
            </button>
          )}
        </div>
        <Button type="submit" size="lg" className="rounded-2xl px-8">
          Search
        </Button>
      </form>

      {recent.length > 0 && (
        <Chips title="Recent searches" items={recent} />
      )}
      <Chips title="Popular searches" items={popularSearches} />

      <div className="mt-8">
        <CategoryStrip active={category} onSelect={setCategory} />
      </div>

      {matchedDishes.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-2xl font-extrabold">Dishes</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {matchedDishes.map((d) => {
              const r = restaurants.find((x) => x.id === d.restaurantId)!;
              return (
                <li key={d.id}>
                  <Link
                    to="/restaurants/$restaurantId"
                    params={{ restaurantId: d.restaurantId }}
                    className="card-lift block rounded-2xl bg-card p-4"
                  >
                    <p className="font-semibold">{d.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {r.name} · {formatINR(d.price)}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <section className="mt-10">
        <h2 className="font-display text-2xl font-extrabold">
          {needle ? `Restaurants matching “${q}”` : "All restaurants"}
        </h2>
        {matchedRestaurants.length === 0 ? (
          <div className="mt-4 rounded-3xl border border-dashed border-border bg-card p-12 text-center">
            <span className="text-4xl" aria-hidden>
              🔍
            </span>
            <h3 className="mt-3 font-display text-xl font-bold">Nothing matched that search</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Try a cuisine like “Biryani” or a dish like “Cold Brew”.
            </p>
          </div>
        ) : (
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {matchedRestaurants.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Chips({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-5">
      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{title}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((i) => (
          <Link
            key={i}
            to="/explore"
            search={{ q: i }}
            className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold transition-colors hover:border-primary hover:text-primary"
          >
            {i}
          </Link>
        ))}
      </div>
    </div>
  );
}
