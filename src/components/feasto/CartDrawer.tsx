import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";
import { formatINR } from "@/lib/feasto-data";
import { CheckoutSteps } from "./CheckoutSteps";

export function CartDrawer() {
  const cart = useCart();
  const empty = cart.lines.length === 0;

  return (
    <Sheet open={cart.cartOpen} onOpenChange={cart.setCartOpen}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border p-5">
          <SheetTitle className="font-display text-xl">Your cart</SheetTitle>
          {cart.restaurantName && (
            <p className="text-sm text-muted-foreground">from {cart.restaurantName}</p>
          )}
        </SheetHeader>

        {empty ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <span className="grid size-20 place-items-center rounded-3xl gradient-mango text-3xl">
              🛒
            </span>
            <div>
              <p className="font-display text-lg font-bold">Nothing here yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Add a few dishes and they will show up right here.
              </p>
            </div>
            <Button asChild className="rounded-full" onClick={() => cart.setCartOpen(false)}>
              <Link to="/restaurants">Browse restaurants</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="px-5 pt-4">
              <CheckoutSteps current={0} />
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto p-5">
              {cart.lines.map((line) => (
                <div
                  key={line.id}
                  className="flex items-start gap-3 rounded-2xl bg-secondary/60 p-3"
                >
                  <span
                    className={`mt-1 size-3 shrink-0 rounded-sm border-2 ${line.veg ? "border-leaf" : "border-raspberry"}`}
                    aria-label={line.veg ? "Vegetarian" : "Non-vegetarian"}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{line.name}</p>
                    <p className="text-xs text-muted-foreground">{formatINR(line.price)} each</p>
                  </div>
                  <div className="flex items-center gap-1 rounded-full border border-primary/40 bg-card p-0.5">
                    <button
                      type="button"
                      onClick={() => cart.decrement(line.id)}
                      aria-label={`Reduce ${line.name}`}
                      className="grid size-7 place-items-center rounded-full text-primary transition-colors hover:bg-accent"
                    >
                      {line.qty === 1 ? (
                        <Trash2 className="size-3.5" />
                      ) : (
                        <Minus className="size-3.5" />
                      )}
                    </button>
                    <span className="w-5 text-center text-sm font-bold">{line.qty}</span>
                    <button
                      type="button"
                      onClick={() => cart.increment(line.id)}
                      aria-label={`Add another ${line.name}`}
                      className="grid size-7 place-items-center rounded-full text-primary transition-colors hover:bg-accent"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                  <p className="w-16 shrink-0 text-right text-sm font-bold">
                    {formatINR(line.price * line.qty)}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t border-border p-5">
              <Row label="Subtotal" value={formatINR(cart.subtotal)} />
              <Row
                label="Delivery fee"
                value={cart.deliveryFee === 0 ? "FREE" : formatINR(cart.deliveryFee)}
              />
              <Row label="Taxes & charges" value={formatINR(cart.taxes)} />
              {cart.discount > 0 && (
                <Row label="Discount" value={`− ${formatINR(cart.discount)}`} accent />
              )}
              <Separator className="my-2" />
              <div className="flex items-center justify-between">
                <span className="font-display text-base font-bold">Total</span>
                <span className="font-display text-xl font-extrabold">{formatINR(cart.total)}</span>
              </div>
              <Button
                asChild
                size="lg"
                className="mt-2 w-full rounded-full gradient-sunset text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-95"
                onClick={() => cart.setCartOpen(false)}
              >
                <Link to="/checkout">
                  <ShoppingBag className="mr-1 size-4" /> Proceed to Checkout
                </Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={accent ? "font-semibold text-leaf" : "font-medium"}>{value}</span>
    </div>
  );
}
