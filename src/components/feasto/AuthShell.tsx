import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Logo } from "./Logo";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="mx-auto grid w-full max-w-5xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:items-center">
      <div className="hidden rounded-[2.5rem] gradient-sunset p-10 text-primary-foreground shadow-[var(--shadow-glow)] lg:block">
        <p className="font-display text-4xl font-extrabold leading-tight">
          Good food is always a good idea.
        </p>
        <p className="mt-4 text-base opacity-95">
          Join Feasto for faster checkout, saved addresses, exclusive coupons and live order
          tracking.
        </p>
        <ul className="mt-8 space-y-2 text-sm font-semibold">
          <li>🍕 22 kitchens near you</li>
          <li>🚴 Average delivery in 24 minutes</li>
          <li>🎁 50% off your very first order</li>
        </ul>
      </div>
      <div className="rounded-[2rem] border border-border bg-card p-7 shadow-[var(--shadow-lift)]">
        <Logo />
        <h1 className="mt-6 font-display text-2xl font-extrabold">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        <div className="mt-6">{children}</div>
        <div className="mt-6 text-sm text-muted-foreground">{footer}</div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          By continuing you agree to Feasto's{" "}
          <Link to="/" className="underline">
            terms
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

export function SocialButtons() {
  return (
    <div className="space-y-2">
      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card py-2.5 text-sm font-semibold transition-colors hover:bg-accent"
      >
        <span aria-hidden>🇬</span> Continue with Google
      </button>
      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card py-2.5 text-sm font-semibold transition-colors hover:bg-accent"
      >
        <span aria-hidden>📱</span> Continue with phone OTP
      </button>
    </div>
  );
}
