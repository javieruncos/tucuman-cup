import { Reveal } from "@/components/landing/Reveal";
import { SectionHeading } from "@/components/landing/SectionHeading";
import { landingSteps } from "@/lib/mock/landing";

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="scroll-mt-20 border-y border-border/60 bg-surface-1 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Cómo funciona"
            title="Tres pasos para empezar"
            description="De cero a la primera fecha sin planillas ni papeles. La plataforma guía cada etapa del torneo."
          />
        </Reveal>

        <div className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          <div
            className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block"
            aria-hidden="true"
          />

          {landingSteps.map((step, index) => (
            <Reveal key={step.id} delay={index * 0.12} className="relative">
              <div className="flex flex-col items-start gap-4">
                <span className="flex size-12 items-center justify-center rounded-full border border-primary/40 bg-background font-heading text-lg font-bold text-primary">
                  {step.number}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="font-heading text-xl font-semibold uppercase tracking-wide text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}