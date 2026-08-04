"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/landing/Logo";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Torneos", href: "#torneos" },
  { label: "Equipos", href: "#caracteristicas" },
  { label: "Estadísticas", href: "#estadisticas" },
];

export function LandingNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#inicio" aria-label="Tucumán Cup - Inicio">
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navegación principal">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#cta"
            className={buttonVariants({
              size: "sm",
              className: "bg-primary text-primary-foreground hover:bg-primary-600",
            })}
          >
            Acceder
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="flex size-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted md:hidden"
        >
          {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden border-t border-border/60 bg-background/95 md:hidden"
            aria-label="Navegación móvil"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                  )}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#cta"
                onClick={() => setOpen(false)}
                className={buttonVariants({
                  className: "mt-2 bg-primary text-primary-foreground hover:bg-primary-600",
                })}
              >
                Acceder
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}