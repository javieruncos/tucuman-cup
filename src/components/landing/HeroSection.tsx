"use client";

import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  MapPin,
  PlayCircle,
  Trophy,
  Users,
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Eyebrow, Typography } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

type TeamBadgeProps = {
  shortName: string;
  name: string;
  color: string;
  align: "left" | "right";
};

function TeamBadge({ shortName, name, color, align }: TeamBadgeProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2",
        align === "left" ? "items-start" : "items-end"
      )}
    >
      <span
        className="flex size-12 items-center justify-center rounded-full border-2 font-heading text-sm font-bold transition-transform duration-200 hover:scale-110"
        style={{ backgroundColor: `${color}1f`, borderColor: `${color}66`, color }}
      >
        {shortName}
      </span>
      <span className="max-w-24 text-center text-xs font-medium text-foreground">
        {name}
      </span>
    </div>
  );
}

export function HeroSection() {
  return (
    <section id="inicio" className="relative overflow-hidden pt-28 sm:pt-36 lg:pt-44">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-[560px] w-[980px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 translate-x-1/3 translate-y-1/3 rounded-full bg-success/5 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-conic-gradient(#fff 0% 0.0002%, transparent 0.0002% 0.02%, transparent 100%)",
          }}
        />
      </div>

      <Container className="relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex max-w-xl flex-col items-start gap-6"
        >
          <motion.div variants={item}>
            <Eyebrow>
              <Trophy className="size-3.5 text-primary" aria-hidden="true" />
              Temporada 2026
            </Eyebrow>
          </motion.div>

          <motion.div variants={item}>
            <Typography variant="h1" as="h1">
              Gestioná tu torneo de fútbol{" "}
              <span className="text-primary">de forma profesional.</span>
            </Typography>
          </motion.div>

          <motion.div variants={item}>
            <Typography variant="lead">
              La plataforma todo-en-uno para organizar torneos amateur: fixture
              automático, equipos, resultados y estadísticas en tiempo real,
              desde un solo lugar.
            </Typography>
          </motion.div>

          <motion.div variants={item} className="flex flex-wrap items-center gap-3 pt-1">
            <Button variant="gold" size="xl" render={<a href="#cta" />}>
              Comenzá gratis
              <ArrowRight className="size-4.5" aria-hidden="true" />
            </Button>
            <Button variant="outline" size="xl" render={<a href="#como-funciona" />}>
              <PlayCircle className="size-4.5 text-primary" aria-hidden="true" />
              Ver cómo funciona
            </Button>
          </motion.div>

          <motion.div variants={item} className="mt-2 flex items-center gap-3">
            <div className="flex -space-x-2" aria-hidden="true">
              {["SM", "AN", "US", "CO"].map((initials, index) => (
                <span
                  key={initials}
                  className={cn(
                    "flex size-8 items-center justify-center rounded-full border-2 border-background font-heading text-[10px] font-bold",
                    index === 0 && "bg-primary text-primary-foreground",
                    index === 1 && "bg-danger text-white",
                    index === 2 && "bg-info text-white",
                    index === 3 && "bg-football-green text-white"
                  )}
                >
                  {initials}
                </span>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">320 equipos</span>{" "}
              ya compiten en Tucumán
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-lg"
        >
          <div
            className="absolute -inset-6 rounded-[2rem] bg-primary/10 blur-3xl"
            aria-hidden="true"
          />

          <Card className="relative overflow-hidden rounded-2xl bg-surface-1 ring-border shadow-lg shadow-black/40">
            <div
              className="h-2 bg-gradient-to-r from-primary-600 via-primary to-primary-600"
              aria-hidden="true"
            />
            <div className="flex flex-col gap-5 p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-foreground">
                  <Trophy className="size-4 text-primary" aria-hidden="true" />
                  Tucumán Cup 2026
                </span>
                <Badge variant="live">
                  <span className="relative flex size-1.5" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-success" />
                  </span>
                  En vivo
                </Badge>
              </div>

              <div className="flex items-center justify-between gap-4">
                <TeamBadge
                  shortName="SM"
                  name="San Martín"
                  color="#f5c542"
                  align="left"
                />
                <div className="flex flex-col items-center gap-1">
                  <Typography
                    variant="h2"
                    as="span"
                    className="text-4xl tabular-nums tracking-tight sm:text-5xl"
                  >
                    2 : 1
                  </Typography>
                  <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    12’ 2T
                  </span>
                </div>
                <TeamBadge
                  shortName="AN"
                  name="Atlético Norte"
                  color="#ef4444"
                  align="right"
                />
              </div>

              <div className="flex items-center justify-between border-t border-border/60 pt-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-primary" aria-hidden="true" />
                  Cancha Central
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays
                    className="size-3.5 text-primary"
                    aria-hidden="true"
                  />
                  Sáb 09 Ago · 16:00
                </span>
              </div>
            </div>
          </Card>

          <motion.div
            className="absolute -left-4 top-8 hidden items-center gap-2 rounded-lg border border-border bg-surface-2 px-3 py-2 shadow-md shadow-black/30 sm:flex"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Users className="size-4 text-primary" aria-hidden="true" />
            <span className="text-xs font-medium text-foreground">320 equipos</span>
          </motion.div>

          <motion.div
            className="absolute -right-3 bottom-10 hidden items-center gap-2 rounded-lg border border-border bg-surface-2 px-3 py-2 shadow-md shadow-black/30 sm:flex"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <BarChart3 className="size-4 text-primary" aria-hidden="true" />
            <span className="text-xs font-medium text-foreground">Tabla en vivo</span>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}