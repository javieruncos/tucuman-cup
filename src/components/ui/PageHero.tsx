import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  image?: string;
  children?: ReactNode;
  compact?: boolean;
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  children,
  compact = false,
}: PageHeroProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border-b border-border bg-card/40",
        compact
          ? "h-[260px] sm:h-[300px] lg:h-[340px]"
          : "h-[320px] sm:h-[380px] lg:h-[460px]"
      )}
    >
      {image ? (
        <div className="absolute inset-0" aria-hidden="true">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-70"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/20" />
        </div>
      ) : (
        <div className="stadium-glow absolute inset-0" aria-hidden="true" />
      )}
      <div
        className={cn(
          "relative mx-auto flex h-full max-w-[1400px] flex-col justify-center px-5 py-10 sm:px-6 sm:py-12 lg:px-8",
          compact && "py-8 sm:py-10"
        )}
      >
        <div className={cn("max-w-[680px]", compact && "max-w-[560px]")}>
          <p className="font-display text-xs font-semibold uppercase tracking-widest text-gold">
            {eyebrow}
          </p>
          <h1
            className={cn(
              "font-display mt-2 font-bold uppercase leading-none tracking-wide text-balance",
              compact
                ? "text-3xl sm:text-4xl lg:text-5xl"
                : "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl"
            )}
          >
            {title}
          </h1>
          {description && (
            <p
              className={cn(
                "mt-4 max-w-[620px] text-pretty leading-relaxed text-muted-foreground",
                compact
                  ? "mt-3 max-w-[520px] text-sm sm:text-base"
                  : "text-base sm:text-lg"
              )}
            >
              {description}
            </p>
          )}
          {children && <div className="mt-6">{children}</div>}
        </div>
      </div>
    </div>
  );
}