import { Globe, Mail, MapPin, MessageCircle, Share2 } from "lucide-react";

import { Logo } from "@/components/landing/Logo";

const linkGroups = [
  {
    title: "Producto",
    links: [
      { label: "Torneos", href: "#torneos" },
      { label: "Equipos", href: "#caracteristicas" },
      { label: "Estadísticas", href: "#estadisticas" },
      { label: "Cómo funciona", href: "#como-funciona" },
    ],
  },
  {
    title: "Plataforma",
    links: [
      { label: "Fixture automático", href: "#caracteristicas" },
      { label: "Tabla de posiciones", href: "#torneos" },
      { label: "Goleadores", href: "#estadisticas" },
      { label: "Resultados", href: "#torneos" },
    ],
  },
  {
    title: "Contacto",
    links: [
      { label: "hola@tucumancup.com", href: "#cta" },
      { label: "San Miguel de Tucumán", href: "#cta" },
      { label: "Soporte", href: "#cta" },
      { label: "Prensa", href: "#cta" },
    ],
  },
];

const socials = [
  { label: "Comunidad", icon: MessageCircle },
  { label: "Sitio web", icon: Globe },
  { label: "Compartir", icon: Share2 },
];

export function LandingFooter() {
  return (
    <footer className="border-t border-border/60 bg-surface-1">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="flex max-w-sm flex-col gap-4">
            <a href="#inicio" aria-label="Tucumán Cup - Inicio">
              <Logo />
            </a>
            <p className="text-sm leading-relaxed text-muted-foreground">
              La plataforma para organizar torneos de fútbol amateur de forma
              profesional. Competencia, organización y pasión en un solo lugar.
            </p>
            <div className="flex items-center gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href="#inicio"
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <social.icon className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {linkGroups.map((group) => (
            <nav
              key={group.title}
              aria-label={`Enlaces - ${group.title}`}
              className="flex flex-col gap-3"
            >
              <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
                {group.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {group.title === "Contacto" && link.label.includes("@") && (
                        <Mail className="size-3.5" aria-hidden="true" />
                      )}
                      {group.title === "Contacto" && link.label.includes("Miguel") && (
                        <MapPin className="size-3.5" aria-hidden="true" />
                      )}
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Tucumán Cup. Todos los derechos reservados.
          </p>
          <p className="text-xs text-muted-foreground">
            Hecho con pasión en San Miguel de Tucumán.
          </p>
        </div>
      </div>
    </footer>
  );
}