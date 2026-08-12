import { BarChart3, CalendarDays, ShieldCheck, Trophy } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Reveal } from "@/components/landing/Reveal";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { landingFeatures } from "@/lib/mock/landing";

const iconMap = {
  trophy: Trophy,
  calendar: CalendarDays,
  chart: BarChart3,
  shield: ShieldCheck,
} as const;

export function FeaturesSection() {
  return (
    <section id="caracteristicas" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Características"
            title="Todo para dirigir tu torneo"
            description="Diseñada para organizadores y delegados, con las herramientas que un torneo profesional necesita para funcionar sin fricción."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {landingFeatures.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            return (
              <Reveal key={feature.id} delay={index * 0.08}>
                <Card className="h-full gap-5 bg-surface-1 transition-colors hover:border-primary/40">
                  <CardHeader>
                    <span className="flex size-12 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-2">
                    <CardTitle className="font-heading text-base uppercase tracking-wide">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}