import { Link } from "@tanstack/react-router";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-2" aria-label="Feasto home">
      <span className="grid size-10 place-items-center rounded-2xl gradient-sunset text-lg shadow-[var(--shadow-glow)] transition-transform group-hover:scale-105">
        🍴
      </span>
      <span className="leading-none">
        <span className="block font-display text-xl font-extrabold tracking-tight text-gradient-sunset">
          FEASTO
        </span>
        {!compact && (
          <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Discover. Order. Enjoy.
          </span>
        )}
      </span>
    </Link>
  );
}
