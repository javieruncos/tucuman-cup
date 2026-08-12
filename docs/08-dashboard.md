# Dashboard

> **Proyecto:** Tucumán Cup
> **Versión:** 1.0
> **Estado:** Activo
> **Última actualización:** Agosto 2026

---

# 1. Objetivo

El Dashboard es el centro principal de gestión de Tucumán Cup.

Su objetivo es permitir que un administrador pueda conocer rápidamente el estado actual de sus torneos y ejecutar las acciones más importantes sin navegar por múltiples secciones.

El Dashboard debe responder:

* ¿Qué está pasando actualmente?
* ¿Qué necesita atención?
* ¿Qué acciones debo realizar?
* ¿Cómo está evolucionando el torneo?

---

# 2. Principios del Dashboard

El diseño debe priorizar:

* Información importante primero.
* Acciones frecuentes accesibles.
* Lectura rápida.
* Jerarquía visual clara.
* Datos deportivos relevantes.

No debe convertirse en una pantalla llena de números sin contexto.

---

# 3. Estructura General

Layout principal:

```text
Dashboard

┌──────────────────────────────┐
│ Header                       │
├──────────┬───────────────────┤
│          │                   │
│ Sidebar  │ Main Content      │
│          │                   │
└──────────┴───────────────────┘
```

---

# 4. Header

Debe incluir:

* Nombre del torneo activo.
* Selector de temporada.
* Notificaciones.
* Usuario actual.
* Acciones rápidas.

Ejemplo:

```
Tucumán Cup 2026

[Temporada ▼]

🔔  Usuario
```

---

# 5. Hero Section

La parte superior debe generar impacto visual.

Debe mostrar:

* Nombre del torneo.
* Estado.
* Cantidad de equipos.
* Próximo partido importante.

Ejemplo:

```
Tucumán Cup 2026

TORNEO ACTIVO

24 Equipos
156 Jugadores
42 Partidos jugados

Próximo partido:
Atlético Norte vs Unión FC
```

---

# 6. Estadísticas Principales

Componente:

`StatsCard`

Debe mostrar métricas importantes.

Cards:

## Equipos

Información:

* Total registrados.

---

## Jugadores

Información:

* Total participantes.

---

## Partidos

Información:

* Jugados.
* Pendientes.

---

## Goles

Información:

* Total del torneo.

---

# 7. Acciones Rápidas

Componente:

`QuickActions`

Debe permitir:

* Crear torneo.
* Agregar equipo.
* Agregar jugador.
* Registrar resultado.
* Generar fixture.

Las acciones frecuentes deben estar disponibles sin navegar.

---

# 8. Próximos Partidos

Componente:

`UpcomingMatches`

Debe mostrar:

* Equipos.
* Escudos.
* Fecha.
* Hora.
* Cancha.
* Estado.

Ejemplo:

```
⚽

Atlético Norte

VS

Unión FC

20:30
Estadio Central
```

---

# 9. Últimos Resultados

Componente:

`RecentResults`

Mostrar:

* Partido.
* Resultado.
* Fecha.
* Estado.

Ejemplo:

```
Atlético Norte  3 - 1  Unión FC
Finalizado
```

---

# 10. Tabla de Posiciones Resumida

Componente:

`MiniStandings`

Mostrar:

* Posición.
* Equipo.
* Puntos.
* Diferencia de goles.

No reemplaza la tabla completa.

Debe permitir acceder al detalle.

---

# 11. Estado del Torneo

Componente:

`TournamentProgress`

Mostrar:

* Fase actual.
* Porcentaje completado.
* Próximas fechas.

Ejemplo:

```
Fase:

Grupos

Progreso:

████████░░ 80%

Última jornada:
12/09/2026
```

---

# 12. Panel de Actividad

Componente:

`ActivityFeed`

Mostrar eventos recientes:

Ejemplos:

* Resultado registrado.
* Equipo agregado.
* Jugador actualizado.
* Fixture generado.

---

# 13. Diseño Visual

Debe seguir:

* Fondo oscuro.
* Cards con superficie elevada.
* Acentos dorados.
* Datos deportivos destacados.

Priorizar:

* Contraste.
* Lectura rápida.
* Espacio visual.

---

# 14. Orden Visual

Jerarquía:

1. Estado del torneo.
2. Próximos partidos.
3. Acciones rápidas.
4. Estadísticas.
5. Información secundaria.

---

# 15. Responsive

## Desktop

Layout completo:

* Sidebar fija.
* Grid de cards.
* Varias columnas.

---

## Tablet

* Sidebar adaptable.
* Cards en dos columnas.

---

## Mobile

* Sidebar convertida en menú.
* Cards apiladas.
* Información priorizada.

---

# 16. Estados

Debe contemplar:

## Loading

Skeletons:

* Stats.
* Matches.
* Tables.

---

## Empty

Ejemplos:

"No tienes torneos creados todavía."

Acción:

"Crear primer torneo"

---

## Error

Mostrar:

* Mensaje claro.
* Acción de reintentar.

---

# 17. Componentes necesarios

El Dashboard utiliza:

* AppSidebar
* TopNavbar
* PageHeader
* StatsCard
* TournamentBanner
* QuickActions
* MatchCard
* MiniStandings
* ActivityFeed
* EmptyState
* Skeleton

---

# 18. Datos Prioritarios

Mostrar primero:

* Próximo partido.
* Estado del torneo.
* Resultados recientes.
* Alertas importantes.

Evitar:

* Datos sin utilidad.
* Métricas decorativas.

---

# 19. Experiencia Deseada

Al entrar al Dashboard el usuario debe pensar:

"Entiendo todo lo que está pasando en mi torneo en menos de 10 segundos."

---

# 20. Regla Final

El Dashboard no debe mostrar más información.

Debe mostrar la información correcta.

Cada elemento debe ayudar al organizador a tomar una decisión o realizar una acción.
