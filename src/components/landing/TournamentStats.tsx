"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

import { Reveal } from "@/components/landing/Reveal";
import { landingStats } from "@/lib/mock/landing";

type CounterProps = {
  value: number;
  suffix: string;
};

function Counter({ value, suffix }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString("es-AR")}
      {suffix}
    </span>
  );
}

export function TournamentStats() {
  return (
    <section id="estadisticas" className="scroll-mt-20 border-y border-border/60 bg-surface-1">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        {landingStats.map((stat, index) => (
          <Reveal
            key={stat.id}
            delay={index * 0.1}
            className="flex flex-col items-center gap-1.5 text-center"
          >
            <span className="font-heading text-4xl font-bold text-primary sm:text-5xl">
              <Counter value={stat.value} suffix={stat.suffix} />
            </span>
            <span className="text-sm text-muted-foreground">{stat.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}