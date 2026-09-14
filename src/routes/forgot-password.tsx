import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { AuthShell } from "@/components/feasto/AuthShell";
import { Field } from "./login";

const schema = z.object({ email: z.string().trim().email("Enter a valid email address").max(255) });

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset your password — Feasto" },
      { name: "description", content: "Request a Feasto password reset link by email." },
      { property: "og:title", content: "Reset your password — Feasto" },
      { property: "og:description", content: "Request a Feasto password reset link." },
    ],
  }),
  component: ForgotPassword,
});

function ForgotPassword() {
  const [error, setError] = useState<string | undefined>();
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message);
      return;
    }
    setError(undefined);
    setSent(true);
    toast.success("Reset link sent", { description: "Demo flow — no email is actually delivered." });
  }

  return (
    <AuthShell
      title="Forgot your password?"
      subtitle="We'll email you a link to set a new one."
      footer={
        <>
          Remembered it?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Back to login
          </Link>
        </>
      }
    >
      {sent ? (
        <div className="rounded-2xl gradient-garden p-5 text-leaf-foreground">
          <p className="font-display text-lg font-bold">Check your inbox</p>
          <p className="mt-1 text-sm opacity-95">
            If an account exists for that address, a reset link is on its way.
          </p>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4" noValidate>
          <Field label="Email" name="email" type="email" error={error} placeholder="you@example.com" />
          <Button type="submit" size="lg" className="w-full rounded-full">
            Send reset link
          </Button>
        </form>
      )}
    </AuthShell>
  );
}
