import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.ComponentProps<"section"> {
  variant?: "default" | "dark" | "alternate";
}

export function Section({
  className,
  variant = "default",
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "relative py-10 sm:py-12 overflow-hidden",
        variant === "alternate" && "bg-surface-1",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
