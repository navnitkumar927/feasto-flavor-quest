import { Link } from "@tanstack/react-router";
import { Compass, Home, Receipt, User } from "lucide-react";

const items = [
  { to: "/", label: "Home", Icon: Home },
  { to: "/explore", label: "Explore", Icon: Compass },
  { to: "/orders", label: "Orders", Icon: Receipt },
  { to: "/account", label: "Profile", Icon: User },
] as const;

export function BottomNav() {
  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden"
    >
      <ul className="grid grid-cols-4">
        {items.map(({ to, label, Icon }) => (
          <li key={to}>
            <Link
              to={to}
              activeOptions={{ exact: to === "/" }}
              className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold text-muted-foreground transition-colors data-[status=active]:text-primary"
            >
              <Icon className="size-5" aria-hidden />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
