import { ArrowRight } from "lucide-react";

import { NewsCard } from "@/components/news/NewsCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { news } from "@/lib/mock/portal";

export function NewsFeed() {
  const [featured, ...secondary] = news;

  return (
    <Section id="noticias">
      <Container>
        <SectionHeader
          eyebrow="Editorial"
          title="Noticias destacadas"
          align="left"
          action={
            <a
              href="#noticias"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-gold"
            >
              Ver todas
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          }
        />
        <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <NewsCard article={featured} variant="feature" />
          <div className="flex flex-col gap-4">
            {secondary.slice(0, 4).map((item) => (
              <NewsCard key={item.id} article={item} variant="compact" />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
