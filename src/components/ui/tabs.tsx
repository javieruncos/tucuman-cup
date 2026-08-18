"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TabsProps {
  tabs: { id: string; label: ReactNode; content: ReactNode }[];
  variant?: "default" | "editorial";
}

export function Tabs({ tabs, variant = "default" }: TabsProps) {
  const [active, setActive] = useState(tabs[0]?.id);
  const current = tabs.find((t) => t.id === active) ?? tabs[0];

  if (variant === "editorial") {
    return (
      <div>
        <div
          role="tablist"
          aria-label="Secciones"
          className="mb-8 flex gap-3 border-b border-border sm:gap-6"
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active === t.id}
              onClick={() => setActive(t.id)}
              className={cn(
                "relative -mb-px whitespace-nowrap py-3 text-xs font-semibold uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:tracking-widest",
                active === t.id
                  ? "text-gold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span
                className={cn(
                  "absolute inset-x-0 -bottom-px h-0.5 bg-gold transition-opacity",
                  active === t.id ? "opacity-100" : "opacity-0"
                )}
                aria-hidden="true"
              />
              {t.label}
            </button>
          ))}
        </div>
        <div className="animate-rise">{current?.content}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex gap-1 overflow-x-auto rounded-lg border border-border bg-card p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActive(t.id)}
            className={cn(
              "font-display whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium uppercase tracking-wide transition-colors",
              active === t.id
                ? "bg-gold text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="animate-rise">{current?.content}</div>
    </div>
  );
}
