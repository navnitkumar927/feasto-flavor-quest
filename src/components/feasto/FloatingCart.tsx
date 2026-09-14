import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatINR } from "@/lib/feasto-data";

export function FloatingCart() {
  const { count, total, setCartOpen } = useCart();
  if (count === 0) return null;

  return (
    <button
      type="button"
      onClick={() => setCartOpen(true)}
      className="pop-in fixed bottom-20 right-4 z-40 flex items-center gap-3 rounded-full gradient-sunset px-5 py-3.5 text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105 active:scale-95 md:bottom-6 md:right-6"
      aria-label={`Open cart, ${count} items, ${formatINR(total)}`}
    >
      <ShoppingBag className="size-5" aria-hidden />
      <span className="text-sm font-bold">
        {count} {count === 1 ? "item" : "items"} · {formatINR(total)}
      </span>
    </button>
  );
}
