"use client";

import { useState } from "react";
import Link from "next/link";
import { Trophy, Mail, Lock, ArrowRight } from "lucide-react";

import { Logo } from "@/components/landing/Logo";
import { TeamCrest } from "@/components/shared/TeamCrest";
import { Button } from "@/components/ui/button";
import { useMatches } from "@/hooks/useMatches";
import { useTeams } from "@/hooks/useTeams";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const { data: teams = [] } = useTeams();
  const { data: matches = [] } = useMatches();

  const finished = matches.filter((match) => match.status === "finished");
  const goals = finished.reduce(
    (sum, match) => sum + match.homeScore + match.awayScore,
    0
  );

  return (
    <main className="flex min-h-screen flex-col overflow-hidden bg-background lg:flex-row">
      <aside className="relative order-1 hidden overflow-hidden sm:block sm:h-52 lg:order-2 lg:h-auto lg:w-[55%]">
        <div className="stadium-glow absolute inset-0" aria-hidden="true" />
        <div className="field-lines absolute inset-0 opacity-[0.05]" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(80% 60% at 70% -10%, color-mix(in oklab, var(--gold) 26%, transparent), transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
          aria-hidden="true"
        />

        <div className="relative z-10 flex h-full flex-col justify-center gap-4 p-8 sm:items-center sm:text-center lg:items-start lg:text-left lg:gap-6 lg:p-16 xl:p-20">
          <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            <Trophy className="size-4" aria-hidden="true" />
            Tucumán Cup
          </span>
          <h2 className="font-display text-3xl font-bold uppercase leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl xl:text-6xl">
            Donde empieza la <span className="text-gold">pasión.</span>
          </h2>
          <p className="hidden max-w-md text-base leading-relaxed text-muted-foreground lg:block">
            Viví el fútbol tucumano. Seguí cada partido, cada equipo y cada
            historia de la Tucumán Cup.
          </p>
          <div className="hidden items-center gap-3 lg:flex">
            {teams.slice(0, 6).map((team) => (
              <TeamCrest key={team._id} team={team} size={40} />
            ))}
          </div>
          <div className="hidden gap-8 border-t border-border/60 pt-6 text-xs uppercase tracking-widest text-muted-foreground lg:flex">
            <span>{teams.length} clubes</span>
            <span>{finished.length} partidos</span>
            <span>{goals} goles</span>
          </div>
        </div>
      </aside>

      <section className="relative order-2 flex w-full flex-col justify-center px-4 py-12 sm:px-8 lg:order-1 lg:w-[45%] lg:px-12 lg:py-16">
        <div
          className="stadium-glow pointer-events-none absolute inset-0 opacity-70 lg:hidden"
          aria-hidden="true"
        />

        <div className="relative mx-auto w-full max-w-md">
          <Link href="/" className="mb-10 flex justify-center">
            <Logo />
          </Link>

          <div className="mb-8 grid grid-cols-2 gap-1 rounded-lg bg-elevated p-1">
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={cn(
                  "rounded-md py-2.5 text-sm font-semibold uppercase tracking-wide transition-colors",
                  mode === m
                    ? "bg-gold text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {m === "login" ? "Ingresar" : "Registrarse"}
              </button>
            ))}
          </div>

          <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-foreground">
            {mode === "login" ? "Bienvenido de nuevo" : "Sumate a la tribuna"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "login"
              ? "Inicia sesión para seguir a tus clubes y guardar el fixture."
              : "Crea una cuenta para personalizar tu centro de partidos."}
          </p>

          <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
            {mode === "register" && (
              <Field label="Nombre completo" htmlFor="name">
                <input
                  id="name"
                  type="text"
                  placeholder="Diego Sosa"
                  className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
                />
              </Field>
            )}
            <Field
              label="Correo electrónico"
              htmlFor="email"
              icon={<Mail className="size-4" />}
            >
              <input
                id="email"
                type="email"
                placeholder="tu@ejemplo.com"
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
              />
            </Field>
            <Field
              label="Contraseña"
              htmlFor="password"
              icon={<Lock className="size-4" />}
            >
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
              />
            </Field>

            {mode === "login" && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-xs text-primary hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            )}

            <Button type="submit" variant="gold" size="xl" className="w-full">
              {mode === "login" ? "Ingresar" : "Crear cuenta"}
              <ArrowRight className="size-4.5 transition-transform group-hover/button:translate-x-0.5" />
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "login" ? (
              <>
                ¿No tenés una cuenta?{" "}
                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className="font-semibold text-primary hover:underline"
                >
                  Registrate
                </button>
              </>
            ) : (
              <>
                ¿Ya tenés una cuenta?{" "}
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="font-semibold text-primary hover:underline"
                >
                  Ingresá
                </button>
              </>
            )}
          </p>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  htmlFor,
  icon,
  children,
}: {
  label: string;
  htmlFor: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-1.5 block font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      <span className="flex items-center gap-2.5 rounded-lg border border-border bg-elevated px-3.5 py-3 transition-colors focus-within:border-primary/60">
        {icon && <span className="text-muted-foreground">{icon}</span>}
        {children}
      </span>
    </label>
  );
}
