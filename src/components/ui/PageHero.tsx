import type { ReactNode } from "react";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  image?: string;
  children?: ReactNode;
}

export function PageHero({ eyebrow, title, description, image, children }: PageHeroProps) {
  return (
    <div className="relative overflow-hidden border-b border-border bg-card/40">
      {image ? (
        <div className="absolute inset-0" aria-hidden="true">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/20" />
        </div>
      ) : (
        <div className="stadium-glow absolute inset-0" aria-hidden="true" />
      )}
      <div className="relative mx-auto max-w-[1400px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <p className="font-display text-xs font-semibold uppercase tracking-widest text-gold">
          {eyebrow}
        </p>
        <h1 className="font-display mt-2 text-4xl font-bold uppercase tracking-wide text-balance sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </div>
  );
}
