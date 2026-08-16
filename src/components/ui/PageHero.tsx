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
    <div className="relative h-[320px] overflow-hidden border-b border-border bg-card/40 sm:h-[380px] lg:h-[460px]">
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
      <div className="relative mx-auto flex h-full max-w-[1400px] flex-col justify-center px-5 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="max-w-[680px]">
          <p className="font-display text-xs font-semibold uppercase tracking-widest text-gold">
            {eyebrow}
          </p>
          <h1 className="font-display mt-2 text-4xl font-bold uppercase leading-none tracking-wide text-balance sm:text-5xl lg:text-6xl xl:text-7xl">
            {title}
          </h1>
          {description && (
            <p className="mt-4 max-w-[620px] text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {description}
            </p>
          )}
          {children && <div className="mt-6">{children}</div>}
        </div>
      </div>
    </div>
  );
}
