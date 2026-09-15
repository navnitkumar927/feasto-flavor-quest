import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Banknote, CreditCard, Home, Smartphone, Wallet } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckoutSteps } from "@/components/feasto/CheckoutSteps";
import { useCart } from "@/lib/cart";
import { formatINR } from "@/lib/feasto-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Feasto" },
      {
        name: "description",
        content:
          "Confirm your delivery address, choose a payment method and place your Feasto order.",
      },
      { property: "og:title", content: "Checkout — Feasto" },
      {
        property: "og:description",
        content: "Address, payment and order summary in one clean step.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Checkout,
});

const addresses = [
  { id: "home", label: "Home", icon: Home, value: "402 Palm Grove, Bandra West, Mumbai 400050" },
  {
    id: "work",
    label: "Work",
    icon: Home,
    value: "7th floor, Beacon Tower, Lower Parel, Mumbai 400013",
  },
  {
    id: "other",
    label: "Other",
    icon: Home,
    value: "Flat 12, Sea Breeze, Khar West, Mumbai 400052",
  },
];

const payments = [
  { id: "card", label: "Credit / Debit Card", icon: CreditCard, note: "Visa, Mastercard, RuPay" },
  { id: "upi", label: "UPI", icon: Smartphone, note: "Pay by any UPI app" },
  { id: "cod", label: "Cash on Delivery", icon: Banknote, note: "Pay the rider directly" },
  { id: "wallet", label: "Feasto Wallet", icon: Wallet, note: "Balance ₹450" },
];

function Checkout() {
  const cart = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState(addresses[0]!);
  const [payment, setPayment] = useState(payments[0]!);
  const [placing, setPlacing] = useState(false);

  if (cart.lines.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <span className="text-5xl" aria-hidden>
          🧾
        </span>
        <h1 className="mt-4 font-display text-2xl font-extrabold">Your cart is empty</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Add a few dishes and your checkout will appear here.
        </p>
        <Button asChild className="mt-6 rounded-full">
          <Link to="/restaurants">Find something tasty</Link>
        </Button>
      </div>
    );
  }

  function placeOrder() {
    setPlacing(true);
    const order = cart.placeOrder(address.value, payment.label);
    if (!order) {
      setPlacing(false);
      toast.error("Something went wrong placing that order");
      return;
    }
    toast.success("Order placed!", { description: `Order ${order.id} is confirmed.` });
    navigate({ to: "/orders/$orderId", params: { orderId: order.id } });
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
      <h1 className="font-display text-3xl font-extrabold">Checkout</h1>
      <div className="mt-5 max-w-md">
        <CheckoutSteps current={1} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <section className="rounded-3xl border border-border bg-card p-6">
            <h2 className="font-display text-lg font-bold">Delivery address</h2>
            <div className="mt-4 space-y-3">
              {addresses.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  aria-pressed={address.id === a.id}
                  onClick={() => setAddress(a)}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-colors",
                    address.id === a.id
                      ? "border-primary bg-accent/60"
                      : "border-border hover:border-primary",
                  )}
                >
                  <a.icon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  <span>
                    <span className="block text-sm font-bold">{a.label}</span>
                    <span className="block text-sm text-muted-foreground">{a.value}</span>
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-border bg-card p-6">
            <h2 className="font-display text-lg font-bold">Payment</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {payments.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={payment.id === p.id}
                  onClick={() => setPayment(p)}
                  className={cn(
                    "flex items-start gap-3 rounded-2xl border p-4 text-left transition-colors",
                    payment.id === p.id
                      ? "border-primary bg-accent/60"
                      : "border-border hover:border-primary",
                  )}
                >
                  <p.icon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  <span>
                    <span className="block text-sm font-bold">{p.label}</span>
                    <span className="block text-xs text-muted-foreground">{p.note}</span>
                  </span>
                </button>
              ))}
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-3xl border border-border bg-card p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-lg font-bold">Order summary</h2>
          <p className="mt-1 text-sm text-muted-foreground">{cart.restaurantName}</p>
          <ul className="mt-4 space-y-2">
            {cart.lines.map((l) => (
              <li key={l.id} className="flex justify-between gap-2 text-sm">
                <span className="min-w-0 truncate">
                  {l.qty} × {l.name}
                </span>
                <span className="font-medium">{formatINR(l.price * l.qty)}</span>
              </li>
            ))}
          </ul>
          <Separator className="my-4" />
          <SummaryRow label="Subtotal" value={formatINR(cart.subtotal)} />
          <SummaryRow
            label="Delivery"
            value={cart.deliveryFee === 0 ? "FREE" : formatINR(cart.deliveryFee)}
          />
          <SummaryRow label="Taxes" value={formatINR(cart.taxes)} />
          {cart.discount > 0 && (
            <SummaryRow label="Discount" value={`− ${formatINR(cart.discount)}`} accent />
          )}
          <Separator className="my-4" />
          <div className="flex items-center justify-between">
            <span className="font-display font-bold">Total</span>
            <span className="font-display text-xl font-extrabold">{formatINR(cart.total)}</span>
          </div>
          <Button
            size="lg"
            disabled={placing}
            onClick={placeOrder}
            className="mt-5 w-full rounded-full gradient-sunset text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-95"
          >
            {placing ? "Placing order…" : "Place Order"}
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Demo checkout — no real payment is taken.
          </p>
        </aside>
      </div>
    </div>
  );
}

function SummaryRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between py-0.5 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={accent ? "font-semibold text-leaf" : "font-medium"}>{value}</span>
    </div>
  );
}
