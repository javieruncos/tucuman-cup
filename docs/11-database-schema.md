# Database Schema

> **Proyecto:** Tucumán Cup
> **Versión:** 1.0
> **Estado:** Activo
> **Última actualización:** Agosto 2026

---

# 1. Objetivo

Este documento define el modelo de datos principal de Tucumán Cup.

La base de datos debe permitir gestionar:

* Organizaciones.
* Usuarios.
* Torneos.
* Temporadas.
* Equipos.
* Jugadores.
* Partidos.
* Estadísticas.
* Árbitros.

La estructura debe ser escalable para futuras versiones.

---

# 2. Base de Datos

## Tecnología

```text
MongoDB
```

## ODM

```text
Mongoose
```

---

# 3. Modelo General de Relaciones

```text
Organization

    |
    |
    └── Users

    |
    |
    └── Tournaments

             |
             |
             ├── Seasons
             |
             ├── Teams
             |
             ├── Matches
             |
             └── Statistics


Team

    |
    |
    └── Players


Match

    |
    |
    ├── Home Team
    ├── Away Team
    ├── Referee
    └── Events
```

---

# 4. Organization

Representa la entidad que administra torneos.

Ejemplo:

* Liga amateur.
* Club.
* Organización deportiva.

---

## Schema

```ts
Organization {
  _id: ObjectId

  name: string

  logo?: string

  description?: string

  owner: ObjectId

  createdAt: Date

  updatedAt: Date
}
```

---

## Campos

| Campo       | Tipo     | Descripción         |
| ----------- | -------- | ------------------- |
| name        | String   | Nombre              |
| logo        | String   | Imagen              |
| description | String   | Descripción         |
| owner       | ObjectId | Usuario propietario |

---

# 5. User

Representa usuarios del sistema.

---

## Schema

```ts
User {
  _id: ObjectId

  name: string

  email: string

  password: string

  avatar?: string

  role: UserRole

  organization: ObjectId

  createdAt: Date

  updatedAt: Date
}
```

---

## Roles

```ts
ADMIN

ORGANIZER

DELEGATE

PLAYER

VIEWER
```

---

# 6. Tournament

Entidad principal del sistema.

---

## Schema

```ts
Tournament {

  _id: ObjectId

  organization: ObjectId

  name: string

  logo?: string

  category: string

  season: ObjectId

  format: TournamentFormat

  status: TournamentStatus

  startDate: Date

  endDate: Date


  teams: ObjectId[]

  createdAt: Date

  updatedAt: Date
}
```

---

## Estados

```text
DRAFT

ACTIVE

FINISHED

CANCELLED
```

---

## Formatos

```text
LEAGUE

GROUP_STAGE

KNOCKOUT

MIXED
```

---

# 7. Season

Representa una edición del torneo.

---

## Schema

```ts
Season {

  _id: ObjectId

  name: string

  year: number

  tournament: ObjectId

  createdAt: Date

}
```

---

Ejemplo:

```text
Tucumán Cup 2026
```

---

# 8. Team

Representa equipos participantes.

---

## Schema

```ts
Team {

  _id: ObjectId

  tournament: ObjectId

  name: string

  logo?: string

  city?: string

  delegate?: ObjectId


  players: ObjectId[]


  createdAt: Date

  updatedAt: Date
}
```

---

# 9. Player

Representa jugadores.

---

## Schema

```ts
Player {

  _id: ObjectId

  team: ObjectId


  name: string

  lastName: string

  photo?: string


  number?: number

  position?: PlayerPosition


  birthDate?: Date


  statistics?: ObjectId


  createdAt: Date

  updatedAt: Date
}
```

---

## Posiciones

```text
GOALKEEPER

DEFENDER

MIDFIELDER

FORWARD
```

---

# 10. Match

Representa un partido.

---

## Schema

```ts
Match {

  _id: ObjectId


  tournament: ObjectId


  homeTeam: ObjectId

  awayTeam: ObjectId


  referee?: ObjectId


  date: Date

  field?: string


  status: MatchStatus


  homeScore: number

  awayScore: number


  events: MatchEvent[]


  createdAt: Date

  updatedAt: Date

}
```

---

## Estados

```text
SCHEDULED

LIVE

FINISHED

POSTPONED

CANCELLED
```

---

# 11. Match Events

Eventos dentro de un partido.

---

## Schema

```ts
MatchEvent {

  type:
    GOAL |
    YELLOW_CARD |
    RED_CARD |
    SUBSTITUTION


  player: ObjectId


  minute: number

}
```

---

# 12. Referee

Representa árbitros.

---

## Schema

```ts
Referee {

  _id: ObjectId


  name: string


  phone?: string


  available: boolean


  createdAt: Date

}
```

---

# 13. Statistics

Información estadística.

---

## Schema

```ts
Statistics {

  _id: ObjectId


  player: ObjectId


  matchesPlayed: number


  goals: number


  assists: number


  yellowCards: number


  redCards: number


}
```

---

# 14. Tournament Standing

Tabla de posiciones.

Puede calcularse dinámicamente.

---

## Schema conceptual

```ts
Standing {

team: ObjectId

played: number

wins: number

draws: number

losses: number

goalsFor: number

goalsAgainst: number

goalDifference: number

points: number

}
```

---

# 15. Índices Importantes

Crear índices para:

## User

```text
email
```

---

## Tournament

```text
organization
status
```

---

## Team

```text
tournament
```

---

## Match

```text
tournament
date
```

---

# 16. Reglas de Datos

## Validaciones

Todos los datos deben validarse antes de guardar.

---

## Referencias

Usar ObjectId para relaciones.

---

## Eliminación

Preferir:

Soft Delete

antes que eliminar registros importantes.

---

# 17. Preparación para IA

El modelo debe permitir futuras funciones:

* Predicción de resultados.
* Análisis de rendimiento.
* Recomendaciones.
* Estadísticas avanzadas.
* Generación automática de informes.

---

# 18. Criterios de Calidad

El modelo está correcto cuando:

* Evita duplicación de datos.
* Permite consultas eficientes.
* Soporta crecimiento.
* Mantiene relaciones claras.
* Es fácil de extender.

---

# 19. Regla Principal

La base de datos debe representar el dominio real del fútbol.

Antes de agregar un campo preguntarse:

"¿Este dato ayuda a gestionar, analizar o mejorar la experiencia del torneo?"
