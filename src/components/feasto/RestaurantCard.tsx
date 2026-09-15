import { Link } from "@tanstack/react-router";
import { Bike, Clock, Heart, MapPin, Star } from "lucide-react";
import { kitchenImage, type Restaurant, formatINR } from "@/lib/feasto-data";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const { favorites, toggleFavorite } = useCart();
  const liked = favorites.includes(restaurant.id);

  return (
    <article className="card-lift group relative overflow-hidden rounded-3xl bg-card">
      <Link
        to="/restaurants/$restaurantId"
        params={{ restaurantId: restaurant.id }}
        className="block"
      >
        <div className="zoom-media relative aspect-[16/10]">
          <img
            src={kitchenImage[restaurant.kitchen]}
            alt={`${restaurant.name} — ${restaurant.cuisines.join(", ")}`}
            loading="lazy"
            width={1024}
            height={768}
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/5 to-transparent" />
          {restaurant.offer && (
            <span className="absolute bottom-3 left-3 rounded-full gradient-sunset px-3 py-1 text-xs font-bold text-primary-foreground shadow-[var(--shadow-glow)]">
              {restaurant.offer}
            </span>
          )}
          {restaurant.promoted && (
            <span className="absolute left-3 top-3 rounded-full bg-card/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-grape">
              Promoted
            </span>
          )}
        </div>
      </Link>

      <button
        type="button"
        onClick={() => toggleFavorite(restaurant.id)}
        aria-label={
          liked
            ? `Remove ${restaurant.name} from favourites`
            : `Save ${restaurant.name} to favourites`
        }
        aria-pressed={liked}
        className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-card/90 shadow-[var(--shadow-soft)] transition-transform hover:scale-110 active:scale-95"
      >
        <Heart
          className={cn(
            "size-4.5 transition-colors",
            liked ? "fill-raspberry text-raspberry pop-in" : "text-muted-foreground",
          )}
        />
      </button>

      <div className="space-y-2.5 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-bold leading-tight">
            <Link to="/restaurants/$restaurantId" params={{ restaurantId: restaurant.id }}>
              {restaurant.name}
            </Link>
          </h3>
          <span className="flex shrink-0 items-center gap-1 rounded-lg bg-leaf px-2 py-1 text-xs font-bold text-leaf-foreground">
            <Star className="size-3 fill-current" aria-hidden />
            {restaurant.rating}
          </span>
        </div>

        <p className="truncate text-sm text-muted-foreground">{restaurant.cuisines.join(" • ")}</p>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" aria-hidden /> {restaurant.deliveryMins} min
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3.5" aria-hidden /> {restaurant.distanceKm} km
          </span>
          <span>{formatINR(restaurant.priceForTwo)} for two</span>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <span
            className={cn(
              "rounded-md border px-1.5 py-0.5 text-[10px] font-bold",
              restaurant.pureVeg ? "border-leaf text-leaf" : "border-raspberry text-raspberry",
            )}
          >
            {restaurant.pureVeg ? "PURE VEG" : "VEG & NON-VEG"}
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-[10px] font-semibold text-secondary-foreground">
            <Bike className="size-3" aria-hidden /> Feasto delivery
          </span>
        </div>
      </div>
    </article>
  );
}

export function RestaurantCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-soft)]">
      <div className="aspect-[16/10] animate-pulse bg-muted" />
      <div className="space-y-3 p-4">
        <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}
