import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { AuthShell, SocialButtons } from "@/components/feasto/AuthShell";
import { Field } from "./login";

const schema = z.object({
  name: z.string().trim().min(2, "Tell us your name").max(80),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().regex(/^[0-9+\-\s]{8,15}$/, "Enter a valid phone number"),
  password: z.string().min(6, "Use at least 6 characters").max(72),
});

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create your Feasto account" },
      { name: "description", content: "Sign up for Feasto to unlock 50% off your first food order." },
      { property: "og:title", content: "Create your Feasto account" },
      { property: "og:description", content: "Sign up and get 50% off your first order." },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    toast.success("Account created", { description: "Demo sign-up — no data is stored yet." });
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="It takes less than a minute — and your first order is 50% off."
      footer={
        <>
          Already with us?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-4" noValidate>
        <Field label="Full name" name="name" error={errors.name} placeholder="Navnit Rathor" />
        <Field label="Email" name="email" type="email" error={errors.email} placeholder="you@example.com" />
        <Field label="Phone" name="phone" type="tel" error={errors.phone} placeholder="+91 98765 43210" />
        <Field label="Password" name="password" type="password" error={errors.password} placeholder="••••••••" />
        <Button type="submit" size="lg" className="w-full rounded-full">
          Create account
        </Button>
      </form>
      <div className="my-5 flex items-center gap-3 text-xs uppercase text-muted-foreground">
        <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
      </div>
      <SocialButtons />
    </AuthShell>
  );
}
