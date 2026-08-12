import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const typographyVariants = cva("text-foreground transition-colors", {
  variants: {
    variant: {
      h1: "font-heading text-4xl font-bold uppercase leading-[1.1] tracking-tight sm:text-5xl lg:text-7xl",
      h2: "font-heading text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl lg:text-5xl",
      h3: "font-heading text-2xl font-bold uppercase leading-snug tracking-tight sm:text-3xl",
      h4: "font-heading text-xl font-bold uppercase leading-normal tracking-tight sm:text-2xl",
      lead: "text-lg leading-relaxed text-muted-foreground sm:text-xl",
      body: "text-base leading-relaxed text-muted-foreground",
      small: "text-sm font-medium leading-none",
      caption: "text-xs text-muted-foreground uppercase tracking-widest font-semibold",
      eyebrow: "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

type TypographyElement = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";

interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: TypographyElement;
}

export function Typography({
  className,
  variant,
  as,
  ...props
}: TypographyProps) {
  const Component = as || (variant?.startsWith("h") ? (variant as TypographyElement) : "p");

  return (
    <Component
      className={cn(typographyVariants({ variant, className }))}
      {...props}
    />
  );
}

export function Eyebrow({ className, children, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <Typography variant="eyebrow" as="span" className={className} {...props}>
      <span className="h-px w-6 bg-primary/60" aria-hidden="true" />
      {children}
    </Typography>
  );
}
