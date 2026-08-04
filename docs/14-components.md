# Components Architecture

> **Proyecto:** Tucumán Cup
> **Versión:** 1.0
> **Estado:** Activo
> **Última actualización:** Agosto 2026

---

# 1. Objetivo

Este documento define la arquitectura de componentes frontend de Tucumán Cup.

Los componentes deben:

* Ser reutilizables.
* Tener responsabilidades claras.
* Mantener consistencia visual.
* Respetar el Design System.
* Evitar duplicación de código.

---

# 2. Arquitectura de Componentes

Estructura:

```text
src/components/

├── ui/
│
├── layout/
│
├── dashboard/
│
├── tournaments/
│
├── teams/
│
├── players/
│
├── matches/
│
├── statistics/
│
└── shared/
```

---

# 3. UI Components

Componentes base reutilizables.

Ubicación:

```text
components/ui/
```

---

# Button

Archivo:

```text
Button.tsx
```

Responsabilidad:

Botón principal del sistema.

Variantes:

```text
primary

secondary

outline

ghost

danger
```

Debe soportar:

* Loading.
* Disabled.
* Icon.
* Sizes.

Ejemplo:

```tsx
<Button>
Crear torneo
</Button>
```

---

# Input

Archivo:

```text
Input.tsx
```

Uso:

* Formularios.
* Búsquedas.
* Filtros.

Debe incluir:

* Label.
* Error.
* Placeholder.
* Estado disabled.

---

# Select

Archivo:

```text
Select.tsx
```

Uso:

* Categorías.
* Estados.
* Filtros.

---

# Modal

Archivo:

```text
Modal.tsx
```

Uso:

* Confirmaciones.
* Formularios rápidos.

Debe incluir:

* Header.
* Content.
* Actions.

---

# Card

Archivo:

```text
Card.tsx
```

Uso:

Base para:

* Estadísticas.
* Equipos.
* Torneos.

---

# Badge

Archivo:

```text
Badge.tsx
```

Uso:

Estados:

```text
Activo

Finalizado

Pendiente

Cancelado
```

---

# Avatar

Archivo:

```text
Avatar.tsx
```

Uso:

* Usuarios.
* Jugadores.
* Equipos.

---

# Table

Archivo:

```text
Table.tsx
```

Uso:

Datos tabulares:

* Jugadores.
* Equipos.
* Estadísticas.

Debe soportar:

* Sorting.
* Pagination.
* Empty state.

---

# 4. Layout Components

Ubicación:

```text
components/layout/
```

---

# AppLayout

Responsabilidad:

Contenedor principal privado.

Incluye:

* Sidebar.
* Navbar.
* Content.

---

# Sidebar

Responsabilidad:

Navegación principal.

Secciones:

```text
Dashboard

Torneos

Equipos

Jugadores

Partidos

Estadísticas

Configuración
```

Debe soportar:

* Desktop.
* Mobile.
* Estado colapsado.

---

# TopNavbar

Incluye:

* Usuario.
* Notificaciones.
* Selector torneo.

---

# Breadcrumb

Uso:

Mostrar ubicación actual.

Ejemplo:

```text
Dashboard / Torneos / Tucumán Cup
```

---

# 5. Dashboard Components

Ubicación:

```text
components/dashboard/
```

---

# TournamentBanner

Muestra:

* Nombre torneo.
* Estado.
* Información principal.

---

# StatsCard

Muestra métricas:

Ejemplo:

```text
Equipos

24
```

Props:

```ts
title

value

icon

trend?
```

---

# QuickActions

Acciones rápidas:

* Crear torneo.
* Agregar equipo.
* Registrar resultado.

---

# UpcomingMatches

Lista próximos partidos.

Incluye:

* Equipos.
* Fecha.
* Hora.
* Estado.

---

# MatchCard

Representa un partido.

Debe reutilizarse en:

* Dashboard.
* Fixture.
* Resultados.

---

# MiniStandings

Tabla resumida.

Mostrar:

* Posición.
* Equipo.
* Puntos.

---

# ActivityFeed

Actividad reciente:

* Cambios.
* Resultados.
* Nuevos registros.

---

# 6. Tournament Components

Ubicación:

```text
components/tournaments/
```

---

# TournamentCard

Muestra:

* Logo.
* Nombre.
* Estado.
* Equipos.

---

# TournamentForm

Formulario crear/editar.

Campos:

* Nombre.
* Categoría.
* Formato.
* Fechas.

---

# TournamentTabs

Navegación:

```text
Resumen

Equipos

Fixture

Resultados

Estadísticas

Configuración
```

---

# 7. Team Components

Ubicación:

```text
components/teams/
```

---

# TeamCard

Muestra:

* Escudo.
* Nombre.
* Jugadores.

---

# TeamForm

Formulario:

* Nombre.
* Logo.
* Delegado.

---

# TeamPlayers

Lista de jugadores del equipo.

---

# 8. Player Components

Ubicación:

```text
components/players/
```

---

# PlayerCard

Muestra:

* Foto.
* Nombre.
* Posición.
* Equipo.

---

# PlayerForm

Campos:

* Nombre.
* Apellido.
* Número.
* Posición.

---

# PlayerStats

Muestra:

* Goles.
* Asistencias.
* Tarjetas.

---

# 9. Match Components

Ubicación:

```text
components/matches/
```

---

# FixtureBoard

Muestra calendario completo.

---

# MatchResultForm

Registrar resultado.

Campos:

* Equipo local.
* Equipo visitante.
* Marcador.

---

# MatchEvents

Eventos:

* Goles.
* Tarjetas.
* Cambios.

---

# 10. Statistics Components

Ubicación:

```text
components/statistics/
```

---

# StandingsTable

Tabla completa.

Columnas:

```text
Pos

Equipo

PJ

PG

PE

PP

GF

GC

PTS
```

---

# TopScorers

Ranking:

* Jugador.
* Equipo.
* Goles.

---

# 11. Shared Components

Ubicación:

```text
components/shared/
```

---

# SearchBar

Uso global:

* Equipos.
* Jugadores.
* Torneos.

---

# Filters

Filtros reutilizables.

---

# EmptyState

Cuando no existen datos.

Ejemplo:

"No tienes equipos creados."

---

# LoadingSkeleton

Estados de carga.

Variantes:

* Card.
* Table.
* Page.

---

# ErrorState

Mostrar errores.

Incluye:

* Mensaje.
* Retry.

---

# 12. Component Rules

Todos los componentes deben:

* Usar TypeScript.
* Tener props tipadas.
* Evitar lógica de negocio.
* Ser reutilizables.

---

# 13. Server Components

Preferidos para:

* Layout.
* Pages.
* Información estática.

---

# 14. Client Components

Usar solamente cuando exista:

* useState.
* useEffect.
* Eventos.
* Interacción del usuario.

---

# 15. Component Naming

Usar PascalCase:

Correcto:

```text
TournamentCard.tsx
```

Incorrecto:

```text
tournament-card.tsx
```

---

# 16. Organización Interna

Ejemplo:

```text
components/
└── tournaments/
    ├── TournamentCard.tsx
    ├── TournamentForm.tsx
    └── TournamentTabs.tsx
```

---

# 17. Regla Principal

Antes de crear un nuevo componente preguntar:

"¿Este componente puede reutilizarse?"

Si la respuesta es sí:

Debe existir como componente independiente.
