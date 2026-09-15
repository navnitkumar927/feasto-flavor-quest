import { createFileRoute, Link } from "@tanstack/react-router";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { offers, restaurants } from "@/lib/feasto-data";

export const Route = createFileRoute("/offers")({
  head: () => ({
    meta: [
      { title: "Offers & coupons — Feasto" },
      {
        name: "description",
        content:
          "Save on every order with Feasto offers: 50% off your first order, free delivery above ₹299 and weekend discounts.",
      },
      { property: "og:title", content: "Offers & coupons — Feasto" },
      {
        property: "og:description",
        content: "50% off first orders, free delivery and weekend deals.",
      },
    ],
  }),
  component: OffersPage,
});

function OffersPage() {
  const withOffers = restaurants.filter((r) => r.offer);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Offers just for you</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Stack a coupon with restaurant deals — the best price applies automatically at checkout.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {offers.map((o) => (
          <article
            key={o.id}
            className={`card-lift relative overflow-hidden rounded-[2rem] p-7 text-primary-foreground ${o.gradient}`}
          >
            <span
              className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-white/20 blur-xl"
              aria-hidden
            />
            <p className="font-display text-4xl font-extrabold leading-none">{o.title}</p>
            <p className="mt-2 text-base font-semibold opacity-95">{o.subtitle}</p>
            <p className="mt-4 text-xs opacity-90">{o.terms}</p>
            <button
              type="button"
              onClick={() => toast.success(`Coupon ${o.code} copied`)}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur transition-colors hover:bg-white/25"
            >
              <Copy className="size-3.5" aria-hidden /> {o.code}
            </button>
          </article>
        ))}
      </div>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-extrabold">Restaurants running deals</h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {withOffers.map((r) => (
            <li key={r.id}>
              <Link
                to="/restaurants/$restaurantId"
                params={{ restaurantId: r.id }}
                className="card-lift flex items-center justify-between gap-3 rounded-2xl bg-card p-4"
              >
                <div className="min-w-0">
                  <p className="truncate font-semibold">{r.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{r.cuisines.join(" • ")}</p>
                </div>
                <span className="shrink-0 rounded-full gradient-mango px-3 py-1 text-[11px] font-bold text-primary-foreground">
                  {r.offer}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Button asChild className="mt-8 rounded-full">
          <Link to="/restaurants">Browse all restaurants</Link>
        </Button>
      </section>
    </div>
  );
}
