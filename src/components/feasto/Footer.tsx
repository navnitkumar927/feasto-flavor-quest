import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

const groups = [
  {
    title: "Discover",
    links: [
      { to: "/restaurants", label: "Restaurants" },
      { to: "/explore", label: "Search & filters" },
      { to: "/offers", label: "Offers" },
    ],
  },
  {
    title: "Account",
    links: [
      { to: "/orders", label: "My orders" },
      { to: "/account", label: "Dashboard" },
      { to: "/login", label: "Login" },
    ],
  },
  {
    title: "Partners",
    links: [
      { to: "/owner", label: "Restaurant portal" },
      { to: "/admin", label: "Admin console" },
      { to: "/register", label: "Join Feasto" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-secondary/40">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            Feasto brings the neighbourhood's best kitchens to your door — hot, fast and fairly
            priced.
          </p>
        </div>
        {groups.map((g) => (
          <nav key={g.title} aria-label={g.title}>
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">
              {g.title}
            </h2>
            <ul className="mt-3 space-y-2">
              {g.links.map((l) => (
                <li key={l.to + l.label}>
                  <Link
                    to={l.to}
                    className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-border px-4 py-5 text-center text-xs text-muted-foreground sm:px-6">
        © {new Date().getFullYear()} Feasto. Demo restaurants and dishes are fictional.
      </div>
    </footer>
  );
}
