import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { formatINR } from "@/lib/feasto-data";

export const Route = createFileRoute("/orders/")({
  head: () => ({
    meta: [
      { title: "Your orders — Feasto" },
      {
        name: "description",
        content: "Track live Feasto deliveries and revisit everything you have ordered before.",
      },
      { property: "og:title", content: "Your orders — Feasto" },
      { property: "og:description", content: "Live tracking and full order history in one place." },
    ],
  }),
  component: OrdersPage,
});

function OrdersPage() {
  const { orders } = useCart();

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
      <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Your orders</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Everything you have ordered on this device.
      </p>

      {orders.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-dashed border-border bg-card p-12 text-center">
          <span className="text-4xl" aria-hidden>
            🍽️
          </span>
          <h2 className="mt-3 font-display text-xl font-bold">No orders yet</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Your first Feasto order will appear here with live tracking.
          </p>
          <Button asChild className="mt-6 rounded-full">
            <Link to="/restaurants">Start ordering</Link>
          </Button>
        </div>
      ) : (
        <ul className="mt-8 space-y-4">
          {orders.map((o) => (
            <li key={o.id}>
              <Link
                to="/orders/$orderId"
                params={{ orderId: o.id }}
                className="card-lift block rounded-3xl bg-card p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-display text-lg font-bold">{o.restaurantName}</p>
                    <p className="text-xs text-muted-foreground">
                      Order {o.id} · {new Date(o.placedAt).toLocaleString()}
                    </p>
                  </div>
                  <span className="rounded-full gradient-garden px-3 py-1 text-xs font-bold text-leaf-foreground">
                    {Date.now() - o.placedAt < 30 * 60 * 1000 ? "In progress" : "Delivered"}
                  </span>
                </div>
                <p className="mt-3 truncate text-sm text-muted-foreground">
                  {o.lines.map((l) => `${l.qty} × ${l.name}`).join(", ")}
                </p>
                <p className="mt-2 font-bold">{formatINR(o.total)}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
