import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = ["Cart", "Checkout", "Tracking"];

export function CheckoutSteps({ current }: { current: number }) {
  return (
    <ol className="flex items-center gap-2" aria-label="Order progress">
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={step} className="flex flex-1 items-center gap-2">
            <span
              className={cn(
                "grid size-6 shrink-0 place-items-center rounded-full text-[11px] font-bold transition-colors",
                done && "gradient-garden text-leaf-foreground",
                active && "gradient-sunset text-primary-foreground",
                !done && !active && "bg-muted text-muted-foreground",
              )}
            >
              {done ? <Check className="size-3.5" aria-hidden /> : i + 1}
            </span>
            <span
              className={cn(
                "text-xs font-semibold",
                active ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {step}
            </span>
            {i < steps.length - 1 && (
              <span
                className={cn("h-0.5 flex-1 rounded-full", done ? "bg-leaf" : "bg-muted")}
                aria-hidden
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
