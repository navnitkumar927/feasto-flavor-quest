import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import { getRestaurant, type MenuItem } from "./feasto-data";

export type CartLine = {
  id: string;
  name: string;
  price: number;
  veg: boolean;
  qty: number;
};

export type PlacedOrder = {
  id: string;
  restaurantId: string;
  restaurantName: string;
  lines: CartLine[];
  total: number;
  placedAt: number;
  address: string;
  payment: string;
};

type CartState = {
  restaurantId: string | null;
  lines: CartLine[];
};

type CartContextValue = {
  restaurantId: string | null;
  restaurantName: string | null;
  lines: CartLine[];
  count: number;
  subtotal: number;
  deliveryFee: number;
  taxes: number;
  discount: number;
  total: number;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  qtyOf: (itemId: string) => number;
  addItem: (item: MenuItem) => void;
  increment: (itemId: string) => void;
  decrement: (itemId: string) => void;
  clear: () => void;
  favorites: string[];
  toggleFavorite: (restaurantId: string) => void;
  orders: PlacedOrder[];
  placeOrder: (address: string, payment: string) => PlacedOrder | null;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "feasto.state.v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartState>({ restaurantId: null, lines: [] });
  const [favorites, setFavorites] = useState<string[]>([]);
  const [orders, setOrders] = useState<PlacedOrder[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as {
          cart?: CartState;
          favorites?: string[];
          orders?: PlacedOrder[];
        };
        if (parsed.cart) setCart(parsed.cart);
        if (parsed.favorites) setFavorites(parsed.favorites);
        if (parsed.orders) setOrders(parsed.orders);
      }
    } catch {
      /* ignore corrupted storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart, favorites, orders }));
  }, [cart, favorites, orders, hydrated]);

  const addItem = useCallback((item: MenuItem) => {
    setCart((prev) => {
      if (prev.restaurantId && prev.restaurantId !== item.restaurantId) {
        toast.info("Started a new cart", {
          description: `Your cart now holds items from ${getRestaurant(item.restaurantId)?.name ?? "this restaurant"}.`,
        });
        return {
          restaurantId: item.restaurantId,
          lines: [{ id: item.id, name: item.name, price: item.price, veg: item.veg, qty: 1 }],
        };
      }
      const existing = prev.lines.find((l) => l.id === item.id);
      const lines = existing
        ? prev.lines.map((l) => (l.id === item.id ? { ...l, qty: l.qty + 1 } : l))
        : [...prev.lines, { id: item.id, name: item.name, price: item.price, veg: item.veg, qty: 1 }];
      return { restaurantId: item.restaurantId, lines };
    });
  }, []);

  const increment = useCallback((itemId: string) => {
    setCart((prev) => ({
      ...prev,
      lines: prev.lines.map((l) => (l.id === itemId ? { ...l, qty: l.qty + 1 } : l)),
    }));
  }, []);

  const decrement = useCallback((itemId: string) => {
    setCart((prev) => {
      const lines = prev.lines
        .map((l) => (l.id === itemId ? { ...l, qty: l.qty - 1 } : l))
        .filter((l) => l.qty > 0);
      return { restaurantId: lines.length ? prev.restaurantId : null, lines };
    });
  }, []);

  const clear = useCallback(() => setCart({ restaurantId: null, lines: [] }), []);

  const toggleFavorite = useCallback((restaurantId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(restaurantId)
        ? prev.filter((id) => id !== restaurantId)
        : [...prev, restaurantId];
      toast.success(
        prev.includes(restaurantId) ? "Removed from favourites" : "Saved to favourites",
      );
      return next;
    });
  }, []);

  const subtotal = cart.lines.reduce((sum, l) => sum + l.price * l.qty, 0);
  const deliveryFee = subtotal === 0 ? 0 : subtotal >= 299 ? 0 : 39;
  const taxes = Math.round(subtotal * 0.05);
  const discount = subtotal >= 499 ? 100 : 0;
  const total = Math.max(0, subtotal + deliveryFee + taxes - discount);
  const count = cart.lines.reduce((sum, l) => sum + l.qty, 0);

  const placeOrder = useCallback(
    (address: string, payment: string) => {
      if (!cart.restaurantId || cart.lines.length === 0) return null;
      const order: PlacedOrder = {
        id: `FST${Date.now().toString().slice(-7)}`,
        restaurantId: cart.restaurantId,
        restaurantName: getRestaurant(cart.restaurantId)?.name ?? "Feasto Kitchen",
        lines: cart.lines,
        total,
        placedAt: Date.now(),
        address,
        payment,
      };
      setOrders((prev) => [order, ...prev]);
      setCart({ restaurantId: null, lines: [] });
      return order;
    },
    [cart, total],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      restaurantId: cart.restaurantId,
      restaurantName: cart.restaurantId ? getRestaurant(cart.restaurantId)?.name ?? null : null,
      lines: cart.lines,
      count,
      subtotal,
      deliveryFee,
      taxes,
      discount,
      total,
      cartOpen,
      setCartOpen,
      qtyOf: (itemId: string) => cart.lines.find((l) => l.id === itemId)?.qty ?? 0,
      addItem,
      increment,
      decrement,
      clear,
      favorites,
      toggleFavorite,
      orders,
      placeOrder,
    }),
    [cart, count, subtotal, deliveryFee, taxes, discount, total, cartOpen, addItem, increment, decrement, clear, favorites, toggleFavorite, orders, placeOrder],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
