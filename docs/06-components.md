# Components

> **Proyecto:** Tucumán Cup
> **Versión:** 1.0
> **Estado:** Activo
> **Última actualización:** Agosto 2026

---

# 1. Objetivo

Este documento define el catálogo oficial de componentes reutilizables de Tucumán Cup.

Todo nuevo componente deberá reutilizar componentes existentes siempre que sea posible.

No se deben crear componentes duplicados.

---

# 2. Jerarquía

Los componentes se dividen en cuatro niveles:

## Nivel 1 — Foundation

Componentes básicos reutilizables.

* Button
* IconButton
* Input
* Textarea
* Select
* Checkbox
* Radio
* Switch
* Badge
* Avatar
* Tooltip
* Separator
* Spinner
* Skeleton

---

## Nivel 2 — Layout

Componentes estructurales.

* AppSidebar
* TopNavbar
* PageHeader
* Breadcrumb
* SectionHeader
* Container
* Grid
* EmptyState
* LoadingState
* ErrorState

---

## Nivel 3 — UI

Componentes reutilizables de interfaz.

* Card
* StatsCard
* ChartCard
* Table
* DataTable
* Modal
* Drawer
* Dialog
* Tabs
* Accordion
* DropdownMenu
* Pagination
* SearchBar
* Filters
* CommandPalette
* Toast

---

## Nivel 4 — Dominio

Componentes propios de Tucumán Cup.

* TournamentCard
* TournamentBanner
* TournamentStatusBadge
* TeamCard
* TeamAvatar
* TeamRankingCard
* PlayerCard
* PlayerStat
* MatchCard
* MatchTimeline
* MatchScore
* MatchStatus
* FixtureTable
* StandingsTable
* TopScorersCard
* RefereeCard
* SeasonCard

---

# 3. Convenciones de Nombres

Todos los componentes utilizarán PascalCase.

Ejemplos:

* TournamentCard
* MatchCard
* TeamCard
* PlayerCard

Evitar abreviaturas.

---

# 4. Responsabilidad

Cada componente debe tener una única responsabilidad.

Incorrecto:

TournamentPage con toda la lógica y la UI.

Correcto:

* TournamentHeader
* TournamentInfo
* TournamentTeams
* TournamentStatistics
* TournamentMatches

---

# 5. Props

Las props deben ser:

* Claras.
* Estrictamente tipadas.
* Reutilizables.
* Mínimas.

Evitar props ambiguas.

Incorrecto:

```tsx
data
```

Correcto:

```tsx
tournament
team
player
matches
```

---

# 6. Variantes

Los componentes que lo requieran deben implementar variantes.

Ejemplo:

Button

* Primary
* Secondary
* Outline
* Ghost
* Destructive

Badge

* Success
* Warning
* Danger
* Neutral
* Live

---

# 7. Estados

Todo componente interactivo debe contemplar:

* Default
* Hover
* Active
* Focus
* Disabled
* Loading
* Error

---

# 8. Componentes del Dashboard

DashboardStats

Debe mostrar métricas generales.

DashboardQuickActions

Acciones frecuentes.

UpcomingMatches

Próximos partidos.

RecentResults

Últimos resultados.

TournamentSummary

Resumen del torneo.

NotificationsPanel

Alertas importantes.

---

# 9. Componentes de Torneos

TournamentCard

Información resumida.

TournamentBanner

Cabecera visual del torneo.

TournamentHeader

Título y acciones.

TournamentSettings

Configuración.

TournamentFilters

Filtros.

---

# 10. Componentes de Equipos

TeamCard

Resumen.

TeamHeader

Cabecera.

TeamPlayers

Listado de jugadores.

TeamStatistics

Estadísticas.

TeamForm

Formulario.

---

# 11. Componentes de Jugadores

PlayerCard

Ficha.

PlayerProfile

Perfil completo.

PlayerStatistics

Rendimiento.

PlayerHistory

Historial.

---

# 12. Componentes de Partidos

MatchCard

Resumen.

MatchHeader

Equipos y marcador.

MatchTimeline

Eventos.

MatchStatistics

Datos del partido.

MatchOfficials

Árbitros.

---

# 13. Componentes de Estadísticas

StandingsTable

Tabla de posiciones.

TopScorers

Goleadores.

TopAssists

Asistencias.

CardsTable

Tarjetas.

GoalsChart

Gráfico de goles.

---

# 14. Estados Vacíos

Todo módulo debe tener un EmptyState reutilizable.

Debe incluir:

* Icono.
* Título.
* Descripción.
* Acción principal.

---

# 15. Formularios

Cada formulario debe reutilizar:

* Input
* Select
* Textarea
* DatePicker
* Checkbox
* Button

Nunca crear variantes específicas sin necesidad.

---

# 16. Accesibilidad

Todos los componentes deben:

* Ser navegables mediante teclado.
* Tener foco visible.
* Utilizar HTML semántico.
* Incluir atributos ARIA cuando corresponda.

---

# 17. Rendimiento

Los componentes deben:

* Evitar renders innecesarios.
* Recibir únicamente las props necesarias.
* Mantener la lógica separada de la presentación.

---

# 18. Organización de Carpetas

```text
src/
└── components/
    ├── ui/
    ├── layout/
    ├── dashboard/
    ├── tournaments/
    ├── teams/
    ├── players/
    ├── matches/
    ├── statistics/
    └── shared/
```

---

# 19. Reglas

Antes de crear un componente nuevo:

1. Verificar si ya existe uno similar.
2. Evaluar si puede extenderse.
3. Mantener consistencia visual.
4. Mantener nombres descriptivos.
5. Documentar su propósito.

---

# 20. Criterios de Calidad

Un componente se considera listo cuando:

* Cumple una única responsabilidad.
* Está correctamente tipado.
* Es reutilizable.
* Es responsive.
* Es accesible.
* Sigue el Design System.
* Está alineado con la identidad visual de Tucumán Cup.
