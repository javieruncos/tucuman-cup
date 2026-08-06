import Link from "next/link";

import { Container } from "@/components/ui/Container";

const groups = [
  {
    title: "Competencia",
    links: [
      { label: "Fixture", href: "/fixtures" },
      { label: "Tabla", href: "/standings" },
      { label: "Estadísticas", href: "/stats" },
      { label: "Torneo", href: "/info" },
    ],
  },
  {
    title: "Clubes",
    links: [
      { label: "Todos los equipos", href: "/teams" },
      { label: "Jugadores", href: "/stats" },
      { label: "Goleadores", href: "/stats" },
    ],
  },
  {
    title: "Medios",
    links: [
      { label: "Noticias", href: "/news" },
      { label: "Match Center", href: "/" },
      { label: "Buscar", href: "/search" },
    ],
  },
  {
    title: "Cuenta",
    links: [
      { label: "Ingresar", href: "/login" },
      { label: "Perfil", href: "/profile" },
      { label: "Ajustes", href: "/settings" },
      { label: "Notificaciones", href: "/notifications" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-card/40">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-md bg-gold text-primary-foreground">
                <span className="font-display text-lg font-bold">TC</span>
              </span>
              <span className="font-display text-lg font-semibold uppercase tracking-wide">
                Tucumán <span className="text-gold">Cup</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
              El hogar digital oficial de la Tucumán Cup. Fútbol bajo las luces
              del estadio — en vivo, siempre.
            </p>
          </div>
          {groups.map((group) => (
            <div key={group.title}>
              <h4 className="font-display text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {group.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/80 transition-colors hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">
            © 2026 Tucumán Cup. Un concepto de producto demo. No afiliado a
            ninguna liga real.
          </p>
          <div className="flex gap-5 text-xs text-muted-foreground">
            <Link href="/info" className="hover:text-foreground">
              Privacidad
            </Link>
            <Link href="/info" className="hover:text-foreground">
              Términos
            </Link>
            <Link href="/info" className="hover:text-foreground">
              Accesibilidad
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
