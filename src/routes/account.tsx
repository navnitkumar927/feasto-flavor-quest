import { createFileRoute, Link } from "@tanstack/react-router";
import { CreditCard, Heart, MapPin, Receipt, Settings, Ticket, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { formatINR, offers, restaurants } from "@/lib/feasto-data";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Your Feasto dashboard" },
      {
        name: "description",
        content:
          "Manage your Feasto profile, orders, favourite restaurants, addresses and payment methods.",
      },
      { property: "og:title", content: "Your Feasto dashboard" },
      {
        property: "og:description",
        content: "Profile, orders, favourites, addresses and payments.",
      },
    ],
  }),
  component: Account,
});

function Account() {
  const { orders, favorites } = useCart();
  const favRestaurants = restaurants.filter((r) => favorites.includes(r.id));

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-center gap-4 rounded-3xl gradient-sunset p-6 text-primary-foreground shadow-[var(--shadow-glow)]">
        <span className="grid size-16 place-items-center rounded-2xl bg-white/20">
          <User className="size-7" aria-hidden />
        </span>
        <div>
          <h1 className="font-display text-2xl font-extrabold">Hey, Navnit 👋</h1>
          <p className="text-sm opacity-95">navnit@feasto.app · Gold member</p>
        </div>
        <Button asChild variant="secondary" className="ml-auto rounded-full">
          <Link to="/orders">View orders</Link>
        </Button>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Panel title="Recent orders" icon={Receipt}>
          {orders.length === 0 ? (
            <Empty text="No orders yet — your history will build up here." />
          ) : (
            <ul className="space-y-2">
              {orders.slice(0, 4).map((o) => (
                <li key={o.id} className="flex justify-between gap-2 text-sm">
                  <Link
                    to="/orders/$orderId"
                    params={{ orderId: o.id }}
                    className="truncate font-medium hover:text-primary"
                  >
                    {o.restaurantName}
                  </Link>
                  <span className="text-muted-foreground">{formatINR(o.total)}</span>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel title="Favourite restaurants" icon={Heart}>
          {favRestaurants.length === 0 ? (
            <Empty text="Tap the heart on any restaurant to save it here." />
          ) : (
            <ul className="space-y-2">
              {favRestaurants.map((r) => (
                <li key={r.id} className="text-sm">
                  <Link
                    to="/restaurants/$restaurantId"
                    params={{ restaurantId: r.id }}
                    className="font-medium hover:text-primary"
                  >
                    {r.name}
                  </Link>
                  <span className="text-muted-foreground"> · {r.cuisines[0]}</span>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel title="Saved addresses" icon={MapPin}>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <strong className="text-foreground">Home</strong> — 402 Palm Grove, Bandra West
            </li>
            <li>
              <strong className="text-foreground">Work</strong> — Beacon Tower, Lower Parel
            </li>
            <li>
              <strong className="text-foreground">Other</strong> — Sea Breeze, Khar West
            </li>
          </ul>
        </Panel>

        <Panel title="Payment methods" icon={CreditCard}>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Visa •••• 4421 (default)</li>
            <li>UPI — navnit@upi</li>
            <li>Feasto Wallet — {formatINR(450)}</li>
          </ul>
        </Panel>

        <Panel title="Your offers" icon={Ticket}>
          <ul className="space-y-2 text-sm">
            {offers.slice(0, 3).map((o) => (
              <li key={o.id}>
                <span className="font-semibold">{o.title}</span>
                <span className="text-muted-foreground">
                  {" "}
                  — {o.subtitle} ({o.code})
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Account settings" icon={Settings}>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Order notifications: on</li>
            <li>Marketing emails: off</li>
            <li>Language: English (India)</li>
          </ul>
        </Panel>
      </div>
    </div>
  );
}

function Panel({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
      <h2 className="flex items-center gap-2 font-display text-lg font-bold">
        <Icon className="size-4 text-primary" /> {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Empty({ text }: { text: string }) {
  return <p className="text-sm text-muted-foreground">{text}</p>;
}
