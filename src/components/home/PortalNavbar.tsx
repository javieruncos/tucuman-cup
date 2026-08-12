"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Bell, Menu, Search, User, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/fixtures", label: "Fixture" },
  { href: "/standings", label: "Tabla" },
  { href: "/teams", label: "Equipos" },
  { href: "/stats", label: "Estadísticas" },
  { href: "/news", label: "Noticias" },
  { href: "/info", label: "Torneo" },
];

export function PortalNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-xl">
      <Container
        clean
        className="flex h-16 max-w-[1400px] items-center gap-6 px-4 sm:px-6 lg:px-8"
      >
        <Link href="/" className="flex items-center gap-2.5">
          <span className="relative grid h-9 w-9 place-items-center rounded-md bg-gold text-primary-foreground">
            <span className="font-display text-lg font-bold leading-none">TC</span>
          </span>
          <span className="font-display hidden text-lg font-semibold uppercase tracking-wide sm:block">
            Tucumán <span className="text-gold">Cup</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive(l.href)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {l.label}
              {isActive(l.href) && (
                <span className="absolute inset-x-3 -bottom-[1px] h-0.5 rounded-full bg-gold" />
              )}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Link
            href="/search"
            className="grid h-9 w-9 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="Buscar"
          >
            <Search className="h-[18px] w-[18px]" />
          </Link>
          <Link
            href="/notifications"
            className="relative grid h-9 w-9 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="Notificaciones"
          >
            <Bell className="h-[18px] w-[18px]" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-gold" />
          </Link>
          <Link
            href="/login"
            className="ml-1 hidden items-center gap-2 rounded-md bg-secondary px-3.5 py-2 text-sm font-semibold text-secondary-foreground transition-opacity hover:opacity-90 sm:flex"
          >
            <User className="h-4 w-4" />
            Ingresar
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-md text-foreground lg:hidden"
            aria-label="Alternar menú"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {open && (
        <nav className="border-t border-border bg-background px-4 pb-4 pt-2 lg:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block rounded-md px-3 py-2.5 text-sm font-medium",
                isActive(l.href) ? "bg-accent text-gold" : "text-muted-foreground"
              )}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 rounded-md bg-secondary px-3.5 py-2.5 text-sm font-semibold text-secondary-foreground"
          >
            <User className="h-4 w-4" /> Ingresar
          </Link>
        </nav>
      )}
    </header>
  );
}
