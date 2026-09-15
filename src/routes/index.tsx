import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, MapPin, Search, Sparkles, Star, Timer } from "lucide-react";
import { useState } from "react";
import heroImage from "@/assets/hero-feast.jpg";
import { Button } from "@/components/ui/button";
import { CategoryStrip } from "@/components/feasto/CategoryStrip";
import { RestaurantCard } from "@/components/feasto/RestaurantCard";
import { offers, popularSearches, restaurants } from "@/lib/feasto-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Feasto — Good food is always a good idea" },
      {
        name: "description",
        content:
          "Discover the best restaurants, cafés and hidden food gems around you. Order in minutes with Feasto.",
      },
      { property: "og:title", content: "Feasto — Good food is always a good idea" },
      {
        property: "og:description",
        content: "Discover the best restaurants, cafés and hidden food gems around you.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const suggestions =
    query.length > 1
      ? restaurants
          .filter(
            (r) =>
              r.name.toLowerCase().includes(query.toLowerCase()) ||
              r.cuisines.some((c) => c.toLowerCase().includes(query.toLowerCase())),
          )
          .slice(0, 5)
      : [];

  const featured = restaurants.filter((r) => (category ? r.categories.includes(category) : true));

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    navigate({ to: "/explore", search: { q: query || undefined } });
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden gradient-warm-wash">
        <div
          className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full gradient-mango opacity-25 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-32 -left-24 size-96 rounded-full gradient-berry opacity-20 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-4 pb-14 pt-10 sm:px-6 lg:grid-cols-2 lg:pb-20 lg:pt-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-card px-3 py-1.5 text-xs font-bold text-grape shadow-[var(--shadow-soft)]">
              <Sparkles className="size-3.5" aria-hidden /> 22 kitchens delivering near you
            </span>
            <h1 className="mt-5 max-w-xl font-display text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-6xl">
              Good food is always a <span className="text-gradient-sunset">good idea.</span>
            </h1>
            <p className="mt-4 max-w-lg text-base text-muted-foreground sm:text-lg">
              Discover the best restaurants, cafés, and hidden food gems around you.
            </p>

            <form
              onSubmit={submitSearch}
              className="relative mt-7 rounded-3xl bg-card p-3 shadow-[var(--shadow-lift)]"
            >
              <div className="flex flex-col gap-2 sm:flex-row">
                <label className="flex items-center gap-2 rounded-2xl bg-secondary/70 px-4 py-3 sm:w-52">
                  <MapPin className="size-4 shrink-0 text-primary" aria-hidden />
                  <span className="sr-only">Your location</span>
                  <select
                    className="w-full bg-transparent text-sm font-semibold outline-none"
                    defaultValue="Bandra West"
                    aria-label="Your location"
                  >
                    <option>Bandra West</option>
                    <option>Lower Parel</option>
                    <option>Powai</option>
                    <option>Andheri East</option>
                  </select>
                </label>
                <div className="flex flex-1 items-center gap-2 rounded-2xl bg-secondary/70 px-4 py-3">
                  <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                  <label htmlFor="hero-search" className="sr-only">
                    Search for restaurants, cuisines, or dishes
                  </label>
                  <input
                    id="hero-search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for restaurants, cuisines, or dishes..."
                    className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="rounded-2xl gradient-sunset px-7 text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-95"
                >
                  Search
                </Button>
              </div>

              {suggestions.length > 0 && (
                <ul className="absolute inset-x-3 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-lift)]">
                  {suggestions.map((s) => (
                    <li key={s.id}>
                      <Link
                        to="/restaurants/$restaurantId"
                        params={{ restaurantId: s.id }}
                        className="flex items-center justify-between px-4 py-3 text-sm transition-colors hover:bg-accent"
                      >
                        <span className="font-semibold">{s.name}</span>
                        <span className="text-xs text-muted-foreground">{s.cuisines[0]}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </form>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Popular
              </span>
              {popularSearches.map((p) => (
                <Link
                  key={p}
                  to="/explore"
                  search={{ q: p }}
                  className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold transition-colors hover:border-primary hover:text-primary"
                >
                  {p}
                </Link>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[2.5rem] shadow-[var(--shadow-lift)]">
              <img
                src={heroImage}
                alt="A colourful spread of pizza, burgers, sushi, curries, salad and dessert"
                width={1600}
                height={1200}
                className="size-full object-cover"
              />
            </div>
            <div className="float-slow absolute -left-3 top-8 rounded-2xl bg-card p-3 shadow-[var(--shadow-lift)] sm:-left-6">
              <p className="flex items-center gap-2 text-sm font-bold">
                <Timer className="size-4 text-tangerine" aria-hidden /> 24 min average
              </p>
              <p className="text-xs text-muted-foreground">Delivery in your area</p>
            </div>
            <div className="float-slow absolute -right-2 bottom-8 rounded-2xl bg-card p-3 shadow-[var(--shadow-lift)] sm:-right-6">
              <p className="flex items-center gap-2 text-sm font-bold">
                <Star className="size-4 fill-golden text-golden" aria-hidden /> 4.6 average rating
              </p>
              <p className="text-xs text-muted-foreground">Across 38k reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
        <SectionHead
          title="What are you craving?"
          subtitle="Ten cuisines, hand-picked kitchens, zero guesswork."
        />
        <div className="mt-6">
          <CategoryStrip active={category} onSelect={setCategory} />
        </div>
      </section>

      {/* Offers strip */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {offers.slice(0, 3).map((o) => (
            <Link
              key={o.id}
              to="/offers"
              className={`card-lift group relative overflow-hidden rounded-3xl p-6 text-primary-foreground ${o.gradient}`}
            >
              <p className="font-display text-3xl font-extrabold">{o.title}</p>
              <p className="mt-1 text-sm opacity-95">{o.subtitle}</p>
              <p className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider">
                Use {o.code}{" "}
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular near you */}
      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead
            title="Popular near you"
            subtitle={
              category
                ? "Filtered by your category pick."
                : "Loved by people in your neighbourhood."
            }
          />
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/restaurants">
              See all restaurants <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.slice(0, 9).map((r) => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      </section>
    </>
  );
}

export function SectionHead({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-extrabold sm:text-3xl">{title}</h2>
      {subtitle && <p className="mt-1.5 text-sm text-muted-foreground sm:text-base">{subtitle}</p>}
    </div>
  );
}
