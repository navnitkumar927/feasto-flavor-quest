import { createFileRoute } from "@tanstack/react-router";
import { Check, Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { formatINR, getMenu, restaurants } from "@/lib/feasto-data";

export const Route = createFileRoute("/owner")({
  head: () => ({
    meta: [
      { title: "Restaurant portal — Feasto" },
      {
        name: "description",
        content: "Feasto restaurant portal: manage your menu, accept orders and track revenue.",
      },
      { property: "og:title", content: "Restaurant portal — Feasto" },
      { property: "og:description", content: "Manage menu, orders, revenue and ratings." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OwnerPortal,
});

const restaurant = restaurants[0]!;

function OwnerPortal() {
  const [menu, setMenu] = useState(() => getMenu(restaurant.id));
  const [queue, setQueue] = useState(() =>
    [1, 2, 3, 4].map((i) => ({
      id: `FST20${i}`,
      customer: ["Aarav", "Ishita", "Kabir", "Meera"][i - 1],
      items: i + 1,
      value: 380 + i * 95,
      status: "Pending" as "Pending" | "Accepted" | "Rejected" | "Out for delivery",
    })),
  );

  function update(id: string, status: (typeof queue)[number]["status"]) {
    setQueue((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    toast.success(`Order ${id} → ${status}`);
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="font-display text-3xl font-extrabold sm:text-4xl">{restaurant.name} portal</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        {restaurant.address} · Open {restaurant.hours}
      </p>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Stat label="Today's orders" value="46" gradient="gradient-sunset" />
        <Stat label="Revenue today" value={formatINR(28450)} gradient="gradient-mango" />
        <Stat label="Average rating" value={String(restaurant.rating)} gradient="gradient-garden" />
        <Stat label="Pending orders" value={String(queue.filter((q) => q.status === "Pending").length)} gradient="gradient-berry" />
        <Stat label="Menu items" value={String(menu.length)} gradient="gradient-sunset" />
      </div>

      <section className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
        <h2 className="font-display text-lg font-bold">Live order queue</h2>
        <ul className="mt-4 space-y-3">
          {queue.map((o) => (
            <li
              key={o.id}
              className="flex flex-wrap items-center gap-3 rounded-2xl bg-secondary/50 p-4"
            >
              <div className="min-w-40 flex-1">
                <p className="font-semibold">
                  {o.id} · {o.customer}
                </p>
                <p className="text-xs text-muted-foreground">
                  {o.items} items · {formatINR(o.value)}
                </p>
              </div>
              <span className="rounded-full bg-card px-3 py-1 text-xs font-bold">{o.status}</span>
              <div className="flex gap-2">
                <Button size="sm" className="rounded-full" onClick={() => update(o.id, "Accepted")}>
                  <Check className="mr-1 size-3.5" /> Accept
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full"
                  onClick={() => update(o.id, "Out for delivery")}
                >
                  Next status
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="rounded-full text-destructive"
                  onClick={() => update(o.id, "Rejected")}
                >
                  <X className="mr-1 size-3.5" /> Reject
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold">Menu management</h2>
          <Button
            size="sm"
            className="rounded-full"
            onClick={() =>
              setMenu((prev) => [
                {
                  ...prev[0],
                  id: `new-${prev.length}`,
                  name: `New dish ${prev.length + 1}`,
                  price: 250,
                  section: "Starters" as const,
                },
                ...prev,
              ])
            }
          >
            <Plus className="mr-1 size-4" /> Add item
          </Button>
        </div>
        <ul className="mt-4 divide-y divide-border">
          {menu.map((m) => (
            <li key={m.id} className="flex flex-wrap items-center gap-3 py-3">
              <div className="min-w-40 flex-1">
                <p className="font-semibold">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.section}</p>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <span className="sr-only">Price for {m.name}</span>
                <input
                  type="number"
                  value={m.price}
                  onChange={(e) =>
                    setMenu((prev) =>
                      prev.map((x) => (x.id === m.id ? { ...x, price: Number(e.target.value) } : x)),
                    )
                  }
                  className="w-24 rounded-xl border border-border bg-background px-3 py-1.5 text-sm"
                />
              </label>
              <Button
                size="icon"
                variant="ghost"
                aria-label={`Edit ${m.name}`}
                onClick={() => toast.info("Inline editing enabled — change the price field")}
              >
                <Pencil className="size-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                aria-label={`Delete ${m.name}`}
                className="text-destructive"
                onClick={() => {
                  setMenu((prev) => prev.filter((x) => x.id !== m.id));
                  toast.success(`${m.name} removed`);
                }}
              >
                <Trash2 className="size-4" />
              </Button>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
        <h2 className="font-display text-lg font-bold">Popular dishes this week</h2>
        <ol className="mt-4 space-y-2 text-sm">
          {menu.slice(0, 5).map((m, i) => (
            <li key={m.id} className="flex justify-between">
              <span>
                {i + 1}. {m.name}
              </span>
              <span className="text-muted-foreground">{120 - i * 17} orders</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

function Stat({ label, value, gradient }: { label: string; value: string; gradient: string }) {
  return (
    <div className={`rounded-3xl p-5 text-primary-foreground shadow-[var(--shadow-soft)] ${gradient}`}>
      <p className="text-xs font-bold uppercase tracking-wider opacity-90">{label}</p>
      <p className="mt-1 font-display text-2xl font-extrabold">{value}</p>
    </div>
  );
}
