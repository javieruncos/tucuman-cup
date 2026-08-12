import { ArrowRight, Sparkles } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/landing/Reveal";

export function CallToAction() {
  return (
    <section id="cta" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-surface-1 px-6 py-16 text-center shadow-lg shadow-black/30 sm:px-12 sm:py-20">
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden="true"
            >
              <div className="absolute -top-24 left-1/2 h-72 w-[640px] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
              <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10" />
              <div className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10" />
            </div>

            <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-300">
                <Sparkles className="size-3.5" aria-hidden="true" />
                Comenzá hoy
              </span>
              <h2 className="font-heading text-3xl font-bold uppercase leading-tight tracking-tight text-foreground sm:text-5xl">
                Organizá tu torneo y{" "}
                <span className="text-primary">sacá la competencia a la cancha.</span>
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                Creá tu torneo gratis, cargá los equipos y generá el fixture en
                minutos. Sin instalaciones, sin papeles, sin complicaciones.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="#inicio"
                  className={buttonVariants({
                    size: "lg",
                    className: "h-11 gap-2 bg-primary px-6 text-primary-foreground hover:bg-primary-600",
                  })}
                >
                  Crear torneo gratis
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
                <a
                  href="#torneos"
                  className={buttonVariants({
                    variant: "outline",
                    size: "lg",
                    className: "h-11 px-6 text-foreground",
                  })}
                >
                  Ver torneo destacado
                </a>
              </div>
              <p className="text-sm text-muted-foreground">
                Sin tarjeta de crédito · Configuración en 2 minutos
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}