import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-md shadow-primary/20">
        <Trophy className="size-5" aria-hidden="true" />
      </span>
      <span className="font-heading text-lg font-bold uppercase tracking-wide text-foreground">
        Tucumán <span className="text-primary">Cup</span>
      </span>
    </span>
  );
}