import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Clock, Heart, MapPin, Minus, Plus, Share2, Star, Utensils } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/lib/cart";
import {
  MENU_SECTIONS,
  formatINR,
  getMenu,
  getRestaurant,
  getReviews,
  kitchenImage,
  restaurants,
  type MenuItem,
} from "@/lib/feasto-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/restaurants/$restaurantId")({
  loader: ({ params }) => {
    const restaurant = getRestaurant(params.restaurantId);
    if (!restaurant) throw notFound();
    return { restaurant };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Restaurant unavailable — Feasto" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const r = loaderData.restaurant;
    const title = `${r.name} — ${r.cuisines.join(", ")} | Feasto`;
    const description = `Order from ${r.name}. Rated ${r.rating} across ${r.reviews} reviews, delivery in about ${r.deliveryMins} minutes.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: RestaurantDetail,
});

function RestaurantDetail() {
  const { restaurant } = Route.useLoaderData();
  const { favorites, toggleFavorite } = useCart();
  const menu = getMenu(restaurant.id);
  const reviews = getReviews(restaurant.id);
  const liked = favorites.includes(restaurant.id);

  const recommended = menu.filter((m) => m.bestseller);
  const similar = restaurants
    .filter((r) => r.kitchen === restaurant.kitchen && r.id !== restaurant.id)
    .slice(0, 3);

  return (
    <div>
      <div className="relative h-56 w-full overflow-hidden sm:h-72 lg:h-80">
        <img
          src={kitchenImage[restaurant.kitchen]}
          alt={`Signature dishes at ${restaurant.name}`}
          width={1024}
          height={768}
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/35 to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="-mt-16 rounded-3xl bg-card p-5 shadow-[var(--shadow-lift)] sm:p-7">
          <div className="flex flex-wrap items-start gap-5">
            <span className="grid size-16 shrink-0 place-items-center rounded-2xl gradient-sunset text-2xl text-primary-foreground shadow-[var(--shadow-glow)]">
              <Utensils className="size-7" aria-hidden />
            </span>
            <div className="min-w-[220px] flex-1">
              <h1 className="font-display text-2xl font-extrabold sm:text-3xl">
                {restaurant.name}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {restaurant.cuisines.join(" • ")} · {formatINR(restaurant.priceForTwo)} for two
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                <span className="inline-flex items-center gap-1 rounded-lg bg-leaf px-2 py-1 text-xs font-bold text-leaf-foreground">
                  <Star className="size-3 fill-current" aria-hidden /> {restaurant.rating}
                </span>
                <span className="text-muted-foreground">{restaurant.reviews} reviews</span>
                <span className="inline-flex items-center gap-1 text-muted-foreground">
                  <Clock className="size-4" aria-hidden /> {restaurant.deliveryMins} min
                </span>
                <span className="inline-flex items-center gap-1 text-muted-foreground">
                  <MapPin className="size-4" aria-hidden /> {restaurant.distanceKm} km
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {restaurant.address} · Open {restaurant.hours}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="rounded-full"
                aria-pressed={liked}
                onClick={() => toggleFavorite(restaurant.id)}
              >
                <Heart className={cn("mr-1 size-4", liked && "fill-raspberry text-raspberry")} />
                {liked ? "Saved" : "Favourite"}
              </Button>
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => toast.success("Link copied to clipboard")}
              >
                <Share2 className="mr-1 size-4" /> Share
              </Button>
            </div>
          </div>
          {restaurant.offer && (
            <p className="mt-5 rounded-2xl gradient-mango px-4 py-3 text-sm font-bold text-primary-foreground">
              🎉 {restaurant.offer} — applied automatically at checkout
            </p>
          )}
        </div>

        <Tabs defaultValue="menu" className="mt-8">
          <TabsList className="rounded-full">
            <TabsTrigger value="overview" className="rounded-full">
              Overview
            </TabsTrigger>
            <TabsTrigger value="menu" className="rounded-full">
              Menu
            </TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-full">
              Reviews
            </TabsTrigger>
            <TabsTrigger value="photos" className="rounded-full">
              Photos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6 space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <InfoCard
                title="Delivery"
                value={`${restaurant.deliveryMins} min`}
                note="Average, live traffic aware"
              />
              <InfoCard
                title="Cost for two"
                value={formatINR(restaurant.priceForTwo)}
                note="Excluding taxes"
              />
              <InfoCard
                title="Kitchen type"
                value={restaurant.pureVeg ? "Pure veg" : "Veg & non-veg"}
                note="Marked on every dish"
              />
            </div>
            <div className="rounded-3xl border border-border bg-card p-6">
              <h2 className="font-display text-lg font-bold">About {restaurant.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {restaurant.name} is a neighbourhood favourite serving{" "}
                {restaurant.cuisines.join(" and ")} cooked to order. The kitchen runs a small daily
                menu so everything leaves hot, and the team packs each order in tamper-proof,
                spill-safe boxes. Seating, takeaway and Feasto delivery all run from{" "}
                {restaurant.hours}.
              </p>
            </div>
            {similar.length > 0 && (
              <div>
                <h2 className="font-display text-lg font-bold">Similar kitchens</h2>
                <ul className="mt-3 grid gap-3 sm:grid-cols-3">
                  {similar.map((s) => (
                    <li key={s.id}>
                      <Link
                        to="/restaurants/$restaurantId"
                        params={{ restaurantId: s.id }}
                        className="card-lift block rounded-2xl bg-card p-4"
                      >
                        <p className="font-semibold">{s.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {s.cuisines[0]} · ⭐ {s.rating}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </TabsContent>

          <TabsContent value="menu" className="mt-6">
            {recommended.length > 0 && <MenuSectionBlock title="Recommended" items={recommended} />}
            {MENU_SECTIONS.filter((s) => s !== "Recommended").map((section) => {
              const items = menu.filter((m) => m.section === section);
              if (!items.length) return null;
              return <MenuSectionBlock key={section} title={section} items={items} />;
            })}
          </TabsContent>

          <TabsContent value="reviews" className="mt-6 space-y-4">
            {reviews.map((r) => (
              <article key={r.id} className="rounded-3xl border border-border bg-card p-5">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{r.author}</p>
                  <span className="inline-flex items-center gap-1 rounded-lg bg-leaf px-2 py-0.5 text-xs font-bold text-leaf-foreground">
                    <Star className="size-3 fill-current" aria-hidden /> {r.rating}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{r.body}</p>
                <p className="mt-2 text-xs text-muted-foreground">{r.date}</p>
              </article>
            ))}
          </TabsContent>

          <TabsContent value="photos" className="mt-6">
            <div className="grid gap-4 sm:grid-cols-3">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="zoom-media overflow-hidden rounded-3xl">
                  <img
                    src={kitchenImage[restaurant.kitchen]}
                    alt={`Dish photo ${i + 1} from ${restaurant.name}`}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function InfoCard({ title, value, note }: { title: string; value: string; note: string }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-5">
      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{title}</p>
      <p className="mt-1 font-display text-xl font-extrabold">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{note}</p>
    </div>
  );
}

function MenuSectionBlock({ title, items }: { title: string; items: MenuItem[] }) {
  return (
    <section className="mb-8">
      <h2 className="font-display text-xl font-extrabold">
        {title}{" "}
        <span className="text-sm font-semibold text-muted-foreground">({items.length})</span>
      </h2>
      <ul className="mt-4 divide-y divide-border overflow-hidden rounded-3xl border border-border bg-card">
        {items.map((item) => (
          <li key={item.id}>
            <MenuRow item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function MenuRow({ item }: { item: MenuItem }) {
  const { addItem, increment, decrement, qtyOf } = useCart();
  const qty = qtyOf(item.id);

  return (
    <div className="flex items-start gap-4 p-4 transition-colors hover:bg-secondary/40">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "grid size-4 shrink-0 place-items-center rounded-sm border-2",
              item.veg ? "border-leaf" : "border-raspberry",
            )}
            aria-label={item.veg ? "Vegetarian" : "Non-vegetarian"}
          >
            <span className={cn("size-1.5 rounded-full", item.veg ? "bg-leaf" : "bg-raspberry")} />
          </span>
          {item.bestseller && (
            <span className="rounded-full bg-golden px-2 py-0.5 text-[10px] font-bold text-golden-foreground">
              BESTSELLER
            </span>
          )}
        </div>
        <h3 className="mt-1.5 font-semibold">{item.name}</h3>
        <p className="text-sm font-bold">{formatINR(item.price)}</p>
        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="size-3 fill-golden text-golden" aria-hidden /> {item.rating}
        </p>
        <p className="mt-1.5 max-w-prose text-sm text-muted-foreground">{item.description}</p>
      </div>

      {qty === 0 ? (
        <Button
          size="sm"
          onClick={() => addItem(item)}
          className="rounded-full px-5 transition-transform active:scale-95"
        >
          Add
        </Button>
      ) : (
        <div className="pop-in flex items-center gap-1 rounded-full border border-primary bg-card p-1">
          <button
            type="button"
            onClick={() => decrement(item.id)}
            aria-label={`Reduce ${item.name}`}
            className="grid size-7 place-items-center rounded-full text-primary hover:bg-accent"
          >
            <Minus className="size-3.5" />
          </button>
          <span className="w-5 text-center text-sm font-bold">{qty}</span>
          <button
            type="button"
            onClick={() => increment(item.id)}
            aria-label={`Add another ${item.name}`}
            className="grid size-7 place-items-center rounded-full text-primary hover:bg-accent"
          >
            <Plus className="size-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
