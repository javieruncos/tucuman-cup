import { Clock } from "lucide-react";

import { TeamCrest } from "@/components/shared/TeamCrest";
import { cn } from "@/lib/utils";
import type { NewsResponseType } from "@/types/news";

function formatNewsDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.round(diffMs / 60000);
  const diffH = Math.round(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMin < 1) return "Ahora";
  if (diffMin < 60) return `Hace ${diffMin} min`;
  if (diffH < 24) return `Hace ${diffH} h`;

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);

  if (date >= startOfYesterday && date < startOfToday) return "Ayer";
  if (date >= startOfToday) return "Hoy";
  if (diffDays < 7) return diffDays === 1 ? "Hace 1 día" : `Hace ${diffDays} días`;

  return date.toLocaleDateString("es-AR");
}

function NewsMeta({ article }: { article: NewsResponseType }) {
  return (
    <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
      {article.author && (
        <span className="font-medium text-foreground">{article.author}</span>
      )}
      {article.author && <span>·</span>}
      <span>{formatNewsDate(article.date)}</span>
      {article.readTime && (
        <span className="inline-flex items-center gap-1">
          <Clock className="size-3" aria-hidden="true" /> {article.readTime}
        </span>
      )}
    </div>
  );
}

const NEWS_FALLBACK_IMAGE = "/images/news-hero.jpg";

export function NewsCard({
  article,
  variant = "default",
  href = "#noticias",
  index,
  className,
}: {
  article: NewsResponseType;
  variant?: "default" | "feature" | "compact" | "row" | "cover";
  href?: string;
  index?: number;
  className?: string;
}) {
  const team = article.team ?? null;

  if (variant === "feature") {
    const image = article.image ?? NEWS_FALLBACK_IMAGE;
    return (
      <a
        href={href}
        className={cn(
          "group relative block min-h-[420px] overflow-hidden rounded-xl sm:min-h-[480px] lg:min-h-0 lg:h-full",
          className
        )}
      >
        <div
          role="img"
          aria-label={article.title}
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/15"
          aria-hidden="true"
        />
        <div className="relative flex h-full min-h-[420px] flex-col justify-end p-6 sm:min-h-[480px] sm:p-8 lg:min-h-0">
          <div className="mb-3 flex items-center gap-2">
            <span className="font-display rounded bg-gold px-2 py-0.5 text-[11px] font-bold uppercase tracking-widest text-primary-foreground">
              {article.category}
            </span>
          </div>
          <h3 className="font-display text-2xl font-semibold uppercase leading-tight tracking-wide text-balance sm:text-3xl lg:text-4xl">
            {article.title}
          </h3>
          <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground">
            {article.excerpt}
          </p>
          <NewsMeta article={article} />
        </div>
      </a>
    );
  }

  if (variant === "row") {
    return (
      <a
        href={href}
        className="group flex items-center gap-4 py-5 sm:gap-5"
      >
        {typeof index === "number" && (
          <span className="tabular font-display w-7 shrink-0 text-sm font-bold text-muted-foreground/70">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        {team && <TeamCrest team={team} size={40} />}
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2 text-[11px] uppercase tracking-wide">
            <span className="font-semibold text-gold">{article.category}</span>
            <span className="text-muted-foreground">
              · {formatNewsDate(article.date)}
            </span>
          </div>
          <h3 className="font-medium leading-snug text-balance transition-colors group-hover:text-gold">
            {article.title}
          </h3>
        </div>
      </a>
    );
  }

  if (variant === "cover") {
    const team = article.team ?? null;
    return (
      <a
        href={href}
        className={cn(
          "group flex h-full flex-col overflow-hidden rounded-xl border border-card-border bg-card transition-colors hover:border-gold/40 hover:bg-elevated",
          className
        )}
      >
        <div className="relative aspect-[16/10] shrink-0 overflow-hidden">
          {article.image ? (
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              role="img"
              aria-label={article.title}
              style={{ backgroundImage: `url(${article.image})` }}
            />
          ) : team ? (
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${team.color}55, var(--elevated))`,
              }}
              aria-hidden="true"
            />
          ) : (
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              role="img"
              aria-label={article.title}
              style={{ backgroundImage: `url(${NEWS_FALLBACK_IMAGE})` }}
            />
          )}
          {!article.image && team && (
            <div className="absolute inset-0 grid place-items-center">
              <TeamCrest team={team} size={64} />
            </div>
          )}
          <span className="font-display absolute left-4 top-4 rounded bg-gold px-2 py-0.5 text-[11px] font-bold uppercase tracking-widest text-primary-foreground">
            {article.category}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="font-display text-lg font-semibold uppercase leading-tight tracking-wide text-balance transition-colors group-hover:text-gold sm:text-xl">
            {article.title}
          </h3>
          <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {article.excerpt}
          </p>
          <div className="mt-auto pt-4">
            <NewsMeta article={article} />
          </div>
        </div>
      </a>
    );
  }

  return (
    <a
      href={href}
      className={cn(
        "group flex gap-4 rounded-xl border border-card-border bg-card p-4 transition-colors hover:border-gold/40 hover:bg-elevated",
        variant === "compact" ? "items-center" : "flex-col sm:flex-row"
      )}
    >
      <div
        className={cn(
          "relative grid h-24 shrink-0 place-items-center overflow-hidden rounded-md sm:h-20 sm:w-28",
          variant === "compact" ? "w-24" : "w-full"
        )}
      >
        {article.image ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            role="img"
            aria-label={article.title}
            style={{ backgroundImage: `url(${article.image})` }}
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: team
                ? `linear-gradient(135deg, ${team.color}55, var(--elevated))`
                : "var(--elevated)",
            }}
            aria-hidden="true"
          />
        )}
        {!article.image &&
          (team ? (
            <TeamCrest team={team} size={44} />
          ) : (
            <span className="font-display text-gold">TC</span>
          ))}
      </div>
      <div className="min-w-0">
        <div className="mb-1.5 flex items-center gap-2 text-[11px] uppercase tracking-wide">
          <span className="font-semibold text-gold">{article.category}</span>
          <span className="text-muted-foreground">· {formatNewsDate(article.date)}</span>
        </div>
        <h3 className="font-medium leading-snug text-balance transition-colors group-hover:text-gold">
          {article.title}
        </h3>
        {variant !== "compact" && (
          <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
            {article.excerpt}
          </p>
        )}
      </div>
    </a>
  );
}
