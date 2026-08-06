import { Clock } from "lucide-react";

import { TeamCrest } from "@/components/shared/TeamCrest";
import type { NewsItem } from "@/lib/mock/portal";
import { cn } from "@/lib/utils";

export function NewsCard({
  article,
  variant = "default",
  href = "#noticias",
}: {
  article: NewsItem;
  variant?: "default" | "feature" | "compact";
  href?: string;
}) {
  const team = article.team ?? null;

  if (variant === "feature") {
    return (
      <a
        href={href}
        className="group relative flex min-h-[380px] flex-col justify-end overflow-hidden rounded-xl border border-border bg-card p-6 sm:p-8"
      >
        <div
          className="absolute inset-0 opacity-70 transition-transform duration-500 group-hover:scale-105"
          style={{
            background: team
              ? `radial-gradient(120% 90% at 20% 0%, ${team.color}44, transparent 60%), linear-gradient(to top, var(--card), transparent)`
              : "linear-gradient(to top, var(--card), transparent)",
          }}
          aria-hidden="true"
        />
        {team && (
          <div className="absolute right-6 top-6 opacity-30 blur-[1px] transition-opacity group-hover:opacity-50">
            <TeamCrest team={team} size={140} />
          </div>
        )}
        <div className="relative">
          <div className="mb-3 flex items-center gap-2">
            <span className="font-display rounded bg-gold px-2 py-0.5 text-[11px] font-bold uppercase tracking-widest text-primary-foreground">
              {article.category}
            </span>
          </div>
          <h3 className="font-display text-2xl font-semibold uppercase leading-tight tracking-wide text-balance sm:text-3xl">
            {article.title}
          </h3>
          <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground">
            {article.excerpt}
          </p>
          <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
            {article.author && (
              <span className="font-medium text-foreground">{article.author}</span>
            )}
            {article.author && <span>·</span>}
            <span>{article.date}</span>
            {article.readTime && (
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3" aria-hidden="true" /> {article.readTime}
              </span>
            )}
          </div>
        </div>
      </a>
    );
  }

  return (
    <a
      href={href}
      className={cn(
        "group flex gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:border-gold/40 hover:bg-elevated",
        variant === "compact" ? "items-center" : "flex-col sm:flex-row"
      )}
    >
      <div
        className={cn(
          "relative grid h-24 shrink-0 place-items-center overflow-hidden rounded-md sm:h-20 sm:w-28",
          variant === "compact" ? "w-24" : "w-full"
        )}
        style={{
          background: team
            ? `linear-gradient(135deg, ${team.color}55, var(--elevated))`
            : "var(--elevated)",
        }}
      >
        {team ? (
          <TeamCrest team={team} size={44} />
        ) : (
          <span className="font-display text-gold">TC</span>
        )}
      </div>
      <div className="min-w-0">
        <div className="mb-1.5 flex items-center gap-2 text-[11px] uppercase tracking-wide">
          <span className="font-semibold text-gold">{article.category}</span>
          <span className="text-muted-foreground">· {article.date}</span>
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
