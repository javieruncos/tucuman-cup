import { ArrowRight } from "lucide-react";

import { news } from "@/lib/mock/portal";
import { cn } from "@/lib/utils";

function CategoryDot({ color }: { color?: string }) {
  return (
    <span
      className={cn("size-1.5 rounded-full", !color && "bg-primary")}
      style={color ? { backgroundColor: color } : undefined}
      aria-hidden="true"
    />
  );
}

export function NewsFeed() {
  const [featured, ...secondary] = news;

  return (
    <div className="flex flex-col gap-5">
      <a
        href="#noticias"
        className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-border/50 bg-surface-1/40 p-6 transition-colors duration-300 hover:border-primary/30"
      >
        <div
          className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full opacity-25 blur-3xl transition-opacity duration-300 group-hover:opacity-40"
          style={
            featured.team ? { backgroundColor: featured.team.color } : undefined
          }
          aria-hidden="true"
        />
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          <CategoryDot color={featured.team?.color} />
          {featured.category}
          <span className="text-muted-foreground/60">· {featured.date}</span>
        </div>
        <h3 className="max-w-2xl font-heading text-2xl font-bold uppercase leading-tight tracking-tight text-foreground transition-colors group-hover:text-primary-300 sm:text-3xl">
          {featured.title}
        </h3>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {featured.excerpt}
        </p>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
          Leer nota
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </a>

      <ul className="flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-surface-1/40">
        {secondary.map((item) => (
          <li key={item.id} className="[&+li]:border-t [&+li]:border-border/40">
            <a
              href="#noticias"
              className="group flex items-start gap-3 px-5 py-3 transition-colors duration-200 hover:bg-surface-1/60"
            >
              <span className="mt-1.5">
                <CategoryDot color={item.team?.color} />
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {item.category} · {item.date}
                </span>
                <h4 className="text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary-300">
                  {item.title}
                </h4>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}