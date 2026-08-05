import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { sponsors } from "@/lib/mock/portal";

export function SponsorsSection() {
  return (
    <Section id="sponsors">
      <Container>
        <div className="rounded-xl border border-border bg-card/40 px-6 py-8">
          <p className="font-display mb-6 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Socios oficiales de la Tucumán Cup
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
            {sponsors.map((sponsor) => (
              <span
                key={sponsor.id}
                className="font-display text-lg font-semibold uppercase tracking-wide text-muted-foreground/60 transition-colors hover:text-foreground"
              >
                {sponsor.name}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
