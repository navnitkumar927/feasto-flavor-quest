import { createFileRoute } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { formatINR, menuItems, restaurants } from "@/lib/feasto-data";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin console — Feasto" },
      {
        name: "description",
        content: "Platform metrics for Feasto: users, restaurants, orders and revenue.",
      },
      { property: "og:title", content: "Admin console — Feasto" },
      { property: "og:description", content: "Users, restaurants, orders, revenue and analytics." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});

const revenueSeries = [
  { day: "Mon", revenue: 184000, orders: 620 },
  { day: "Tue", revenue: 172500, orders: 588 },
  { day: "Wed", revenue: 201300, orders: 704 },
  { day: "Thu", revenue: 219800, orders: 742 },
  { day: "Fri", revenue: 288400, orders: 968 },
  { day: "Sat", revenue: 342100, orders: 1180 },
  { day: "Sun", revenue: 310700, orders: 1094 },
];

const cuisineSplit = [
  { cuisine: "Indian", orders: 1820 },
  { cuisine: "Burgers", orders: 1240 },
  { cuisine: "Italian", orders: 1105 },
  { cuisine: "Asian", orders: 980 },
  { cuisine: "Café", orders: 860 },
  { cuisine: "Mexican", orders: 540 },
];

const sections = [
  "Users",
  "Restaurants",
  "Menu items",
  "Orders",
  "Payments",
  "Offers",
  "Reviews",
  "Analytics",
];

function Admin() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Admin console</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">Platform health at a glance.</p>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <Stat label="Total users" value="18,402" gradient="gradient-sunset" />
        <Stat label="Restaurants" value={String(restaurants.length)} gradient="gradient-mango" />
        <Stat label="Menu items" value={String(menuItems.length)} gradient="gradient-garden" />
        <Stat label="Total orders" value="42,918" gradient="gradient-berry" />
        <Stat label="Revenue (7d)" value={formatINR(1728800)} gradient="gradient-sunset" />
        <Stat label="Active orders" value="128" gradient="gradient-mango" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Panel title="Revenue this week">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={revenueSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="var(--color-coral)"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Panel>
        <Panel title="Orders per day">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={revenueSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip />
              <Bar dataKey="orders" fill="var(--color-tangerine)" radius={8} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>
        <Panel title="Popular cuisines">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={cuisineSplit} layout="vertical">
              <XAxis type="number" hide />
              <Tooltip />
              <Bar dataKey="orders" fill="var(--color-grape)" radius={8} />
            </BarChart>
          </ResponsiveContainer>
          <ul className="mt-3 grid grid-cols-2 gap-1 text-xs text-muted-foreground">
            {cuisineSplit.map((c) => (
              <li key={c.cuisine}>
                {c.cuisine} — {c.orders}
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Management">
          <ul className="grid grid-cols-2 gap-2">
            {sections.map((s) => (
              <li
                key={s}
                className="rounded-2xl border border-border bg-secondary/50 px-4 py-3 text-sm font-semibold"
              >
                {s}
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel title="Today's orders" className="mt-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="py-2">Order</th>
                <th className="py-2">Restaurant</th>
                <th className="py-2">Status</th>
                <th className="py-2 text-right">Value</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.slice(0, 8).map((r, i) => (
                <tr key={r.id} className="border-t border-border">
                  <td className="py-2.5 font-medium">FST10{40 + i}</td>
                  <td className="py-2.5">{r.name}</td>
                  <td className="py-2.5">
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold">
                      {["Preparing", "Out for delivery", "Delivered", "Confirmed"][i % 4]}
                    </span>
                  </td>
                  <td className="py-2.5 text-right font-medium">{formatINR(420 + i * 63)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}

function Stat({ label, value, gradient }: { label: string; value: string; gradient: string }) {
  return (
    <div
      className={`rounded-3xl p-5 text-primary-foreground shadow-[var(--shadow-soft)] ${gradient}`}
    >
      <p className="text-xs font-bold uppercase tracking-wider opacity-90">{label}</p>
      <p className="mt-1 font-display text-2xl font-extrabold">{value}</p>
    </div>
  );
}

function Panel({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] ${className}`}
    >
      <h2 className="font-display text-lg font-bold">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}
