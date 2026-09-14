import { Link } from "@tanstack/react-router";
import { MapPin, Search, ShoppingBag, User, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "./Logo";
import { useCart } from "@/lib/cart";

const links = [
  { to: "/", label: "Home" },
  { to: "/restaurants", label: "Restaurants" },
  { to: "/explore", label: "Explore" },
  { to: "/offers", label: "Offers" },
  { to: "/orders", label: "Orders" },
] as const;

export function Navbar() {
  const { count, setCartOpen } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 glass-bar">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-4 sm:px-6"
      >
        <Logo />

        <ul className="ml-6 hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground data-[status=active]:bg-accent data-[status=active]:text-accent-foreground"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-1.5">
          <button
            type="button"
            className="hidden items-center gap-1.5 rounded-full border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-foreground md:inline-flex"
          >
            <MapPin className="size-4 text-primary" aria-hidden />
            Bandra West
          </button>
          <Button asChild variant="ghost" size="icon" aria-label="Search Feasto">
            <Link to="/explore">
              <Search className="size-5" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon" aria-label="Your account">
            <Link to="/account">
              <User className="size-5" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label={`Cart with ${count} items`}
            onClick={() => setCartOpen(true)}
          >
            <ShoppingBag className="size-5" />
            {count > 0 && (
              <span className="pop-in absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full gradient-sunset text-[10px] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </Button>
          <Button asChild className="ml-1 hidden rounded-full sm:inline-flex">
            <Link to="/login">Login</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="mt-8 flex flex-col gap-1">
                {links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-base font-semibold transition-colors hover:bg-accent data-[status=active]:text-primary"
                  >
                    {l.label}
                  </Link>
                ))}
                <Link
                  to="/account"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-semibold transition-colors hover:bg-accent"
                >
                  Profile
                </Link>
                <Link
                  to="/owner"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-semibold transition-colors hover:bg-accent"
                >
                  Restaurant portal
                </Link>
                <Link
                  to="/admin"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-semibold transition-colors hover:bg-accent"
                >
                  Admin
                </Link>
                <Button asChild className="mt-4 rounded-full">
                  <Link to="/login" onClick={() => setOpen(false)}>
                    Login
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
