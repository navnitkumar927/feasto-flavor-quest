import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthShell, SocialButtons } from "@/components/feasto/AuthShell";

const schema = z.object({
  email: z.string().trim().email("Enter a valid email address").max(255),
  password: z.string().min(6, "Password must be at least 6 characters").max(72),
});

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — Feasto" },
      {
        name: "description",
        content: "Sign in to Feasto for faster checkout and live order tracking.",
      },
      { property: "og:title", content: "Login — Feasto" },
      { property: "og:description", content: "Sign in to Feasto for faster checkout." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
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
    toast.success("Signed in", { description: "Accounts are demo-only until login is connected." });
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in with your email or phone to continue."
      footer={
        <>
          New to Feasto?{" "}
          <Link to="/register" className="font-semibold text-primary hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-4" noValidate>
        <Field
          label="Email or phone"
          name="email"
          type="email"
          error={errors["email"]}
          placeholder="you@example.com"
        />
        <Field
          label="Password"
          name="password"
          type="password"
          error={errors["password"]}
          placeholder="••••••••"
        />
        <div className="text-right">
          <Link
            to="/forgot-password"
            className="text-xs font-semibold text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <Button type="submit" size="lg" className="w-full rounded-full">
          Log in
        </Button>
      </form>
      <div className="my-5 flex items-center gap-3 text-xs uppercase text-muted-foreground">
        <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
      </div>
      <SocialButtons />
    </AuthShell>
  );
}

export function Field({
  label,
  name,
  type = "text",
  error,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string | undefined;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className="rounded-xl"
      />
      {error && (
        <p id={`${name}-error`} className="text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
