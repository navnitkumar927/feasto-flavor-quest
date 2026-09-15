import { createFileRoute, Link } from "@tanstack/react-router";
import { Bike, Check, MapPin, Phone, Store } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckoutSteps } from "@/components/feasto/CheckoutSteps";
import { useCart } from "@/lib/cart";
import { formatINR } from "@/lib/feasto-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/orders/$orderId")({
  head: ({ params }) => ({
    meta: [
      { title: `Tracking order ${params.orderId} — Feasto` },
      { name: "description", content: "Follow your Feasto delivery from kitchen to doorstep." },
      { property: "og:title", content: "Live order tracking — Feasto" },
      {
        property: "og:description",
        content: "Follow your Feasto delivery from kitchen to doorstep.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: TrackOrder,
});

const stages = [
  { label: "Order Confirmed", note: "Payment authorised" },
  { label: "Restaurant Preparing", note: "Your food is on the stove" },
  { label: "Out for Delivery", note: "Rider is on the way" },
  { label: "Delivered", note: "Enjoy your meal!" },
];

function TrackOrder() {
  const { orderId } = Route.useParams();
  const { orders } = useCart();
  const order = orders.find((o) => o.id === orderId);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!order) return;
    const elapsed = Date.now() - order.placedAt;
    const computed =
      elapsed > 20 * 60 * 1000 ? 3 : elapsed > 8 * 60 * 1000 ? 2 : elapsed > 60 * 1000 ? 1 : 0;
    setStage(computed);
    if (computed >= 3) return;
    const t = setInterval(() => setStage((s) => Math.min(3, s + 1)), 12000);
    return () => clearInterval(t);
  }, [order]);

  if (!order) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <span className="text-5xl" aria-hidden>
          📦
        </span>
        <h1 className="mt-4 font-display text-2xl font-extrabold">We can't find that order</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Orders are saved on the device you ordered from.
        </p>
        <Button asChild className="mt-6 rounded-full">
          <Link to="/orders">Back to your orders</Link>
        </Button>
      </div>
    );
  }

  const eta = Math.max(0, 32 - Math.round((Date.now() - order.placedAt) / 60000));

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
      <div className="max-w-md">
        <CheckoutSteps current={2} />
      </div>
      <h1 className="mt-6 font-display text-3xl font-extrabold">
        {stage === 3 ? "Delivered — enjoy!" : `Arriving in about ${eta || 2} min`}
      </h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Order {order.id} · {order.restaurantName} · {formatINR(order.total)}
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-border bg-card p-6">
            <Progress value={((stage + 1) / 4) * 100} className="h-2" />
            <ol className="mt-6 space-y-5">
              {stages.map((s, i) => {
                const done = i < stage;
                const active = i === stage;
                return (
                  <li key={s.label} className="flex gap-4">
                    <span
                      className={cn(
                        "grid size-9 shrink-0 place-items-center rounded-full text-sm transition-colors",
                        done && "gradient-garden text-leaf-foreground",
                        active && "gradient-sunset text-primary-foreground",
                        !done && !active && "bg-muted text-muted-foreground",
                      )}
                      aria-hidden
                    >
                      {done ? (
                        <Check className="size-4" />
                      ) : i === 2 ? (
                        <Bike className="size-4" />
                      ) : (
                        i + 1
                      )}
                    </span>
                    <span>
                      <span
                        className={cn(
                          "block font-semibold",
                          !done && !active && "text-muted-foreground",
                        )}
                      >
                        {s.label}
                      </span>
                      <span className="block text-sm text-muted-foreground">{s.note}</span>
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-border gradient-warm-wash p-10 text-center">
            <span
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, transparent 0 38px, oklch(0.85 0.03 70) 38px 39px), repeating-linear-gradient(0deg, transparent 0 38px, oklch(0.85 0.03 70) 38px 39px)",
              }}
              aria-hidden
            />
            <div className="relative">
              <Bike className="mx-auto size-10 text-primary" aria-hidden />
              <p className="mt-3 font-display text-lg font-bold">Live map coming to this space</p>
              <p className="text-sm text-muted-foreground">
                Rider location updates every few seconds once maps are connected.
              </p>
            </div>
          </div>
        </div>

        <aside className="h-fit space-y-4">
          <div className="rounded-3xl border border-border bg-card p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Delivery partner
            </p>
            <p className="mt-1 font-display text-lg font-bold">Ravi Kulkarni</p>
            <p className="text-sm text-muted-foreground">Feasto rider · 4.9 ⭐</p>
            <Button variant="outline" className="mt-4 w-full rounded-full">
              <Phone className="mr-1 size-4" /> Contact rider
            </Button>
          </div>
          <div className="rounded-3xl border border-border bg-card p-5">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <Store className="size-4 text-primary" aria-hidden /> {order.restaurantName}
            </p>
            <p className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden /> {order.address}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">Paid via {order.payment}</p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Items
            </p>
            <ul className="mt-2 space-y-1.5">
              {order.lines.map((l) => (
                <li key={l.id} className="flex justify-between text-sm">
                  <span className="truncate">
                    {l.qty} × {l.name}
                  </span>
                  <span className="font-medium">{formatINR(l.price * l.qty)}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
