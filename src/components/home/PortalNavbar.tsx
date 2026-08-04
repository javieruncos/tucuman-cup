"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/landing/Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Partidos", href: "#partidos" },
  { label: "Tabla", href: "#tabla" },
  { label: "Goleadores", href: "#goleadores" },
  { label: "Equipos", href: "#equipos" },
  { label: "Noticias", href: "#noticias" },
];

export function PortalNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/70 bg-background/85 shadow-lg shadow-black/20 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
        aria-hidden="true"
      />
      <Container
        clean
        className={cn(
          "flex items-center justify-between transition-all duration-300",
          scrolled ? "h-14" : "h-16"
        )}
      >
        <a href="#inicio" aria-label="Tucumán Cup - Inicio" className="shrink-0">
          <Logo />
        </a>

        <nav
          className="hidden items-center gap-0.5 md:flex"
          aria-label="Navegación principal"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center md:flex">
          <Button
            variant="ghost"
            size="sm"
            nativeButton={false}
            render={<a href="#ingresar" />}
          >
            Ingresar
          </Button>
        </div>

        <div className="flex w-full items-center justify-end md:hidden">
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="flex size-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted"
          >
            {open ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </Container>

      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur-xl md:hidden"
            aria-label="Navegación móvil"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-2">
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Ingresar
                </Button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}