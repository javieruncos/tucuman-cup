# Folder Structure

> **Proyecto:** Tucumán Cup
> **Versión:** 1.0
> **Estado:** Activo
> **Última actualización:** Agosto 2026

---

# 1. Objetivo

Este documento define la estructura oficial de carpetas de Tucumán Cup.

La organización debe permitir:

* Escalabilidad.
* Separación de responsabilidades.
* Fácil navegación.
* Mantenimiento a largo plazo.

---

# 2. Estructura General

```text
tucuman-cup/

├── public/
│
├── src/
│
├── docs/
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

---

# 3. Carpeta src

Toda la aplicación vive dentro de:

```text
src/
```

Estructura:

```text
src/

├── app/
├── components/
├── hooks/
├── lib/
├── services/
├── models/
├── schemas/
├── types/
├── utils/
└── constants/
```

---

# 4. App Router

Ubicación:

```text
src/app/
```

Responsabilidad:

* Páginas.
* Layouts.
* Route Handlers.
* Metadata.

---

Estructura:

```text
app/

├── layout.tsx
├── page.tsx
│
├── (auth)/
│   ├── login/
│   └── register/
│
├── (dashboard)/
│   ├── dashboard/
│   ├── tournaments/
│   ├── teams/
│   ├── players/
│   └── matches/
│
└── api/
```

---

# 5. Route Groups

Utilizar grupos para organizar rutas.

Ejemplo:

```text
(auth)
```

No afecta la URL.

Permite separar:

* Páginas públicas.
* Páginas privadas.

---

# 6. API Routes

Ubicación:

```text
src/app/api/
```

Ejemplo:

```text
api/

├── auth/
│   ├── login/
│   │   └── route.ts
│   └── register/
│       └── route.ts
│
├── tournaments/
│   └── route.ts
│
├── teams/
│   └── route.ts
│
├── players/
│   └── route.ts
│
└── matches/
    └── route.ts
```

---

# 7. Components

Ubicación:

```text
src/components/
```

Responsabilidad:

Solo interfaz.

Nunca debe contener:

* Queries complejas.
* Acceso directo a base de datos.
* Lógica de negocio.

---

Estructura:

```text
components/

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

# 8. Hooks

Ubicación:

```text
src/hooks/
```

Responsabilidad:

Lógica reutilizable de React.

Ejemplos:

```text
useAuth.ts

useTournament.ts

useTeams.ts

usePlayers.ts

useDebounce.ts
```

---

# 9. Services

Ubicación:

```text
src/services/
```

Responsabilidad:

Comunicación con APIs.

Ejemplo:

```text
services/

├── auth.service.ts
├── tournament.service.ts
├── team.service.ts
├── player.service.ts
└── match.service.ts
```

---

Ejemplo:

```ts
getTournaments()

createTournament()

updateTournament()
```

---

# 10. Models

Ubicación:

```text
src/models/
```

Responsabilidad:

Modelos Mongoose.

Ejemplo:

```text
models/

├── User.ts
├── Organization.ts
├── Tournament.ts
├── Team.ts
├── Player.ts
└── Match.ts
```

---

# 11. Schemas

Ubicación:

```text
src/schemas/
```

Responsabilidad:

Validaciones Zod.

Ejemplo:

```text
schemas/

├── auth.schema.ts
├── tournament.schema.ts
├── team.schema.ts
└── player.schema.ts
```

---

# 12. Types

Ubicación:

```text
src/types/
```

Responsabilidad:

Tipos compartidos TypeScript.

Ejemplo:

```text
types/

├── user.ts
├── tournament.ts
├── team.ts
├── player.ts
└── match.ts
```

---

# 13. Lib

Ubicación:

```text
src/lib/
```

Responsabilidad:

Configuraciones y utilidades principales.

Ejemplo:

```text
lib/

├── mongodb.ts
├── auth.ts
├── query-client.ts
└── utils.ts
```

---

# 14. Utils

Ubicación:

```text
src/utils/
```

Responsabilidad:

Funciones auxiliares.

Ejemplo:

```text
utils/

├── formatDate.ts
├── formatCurrency.ts
├── validators.ts
└── helpers.ts
```

---

# 15. Constants

Ubicación:

```text
src/constants/
```

Responsabilidad:

Valores fijos.

Ejemplo:

```text
constants/

├── roles.ts
├── routes.ts
└── config.ts
```

---

# 16. Configuración de Alias

Usar:

```ts
@/*
```

Ejemplo:

```ts
import { Button } from "@/components/ui/button"
```

Evitar:

```ts
../../../components/Button
```

---

# 17. Flujo de Datos

Arquitectura:

```text
Component

↓

Hook

↓

Service

↓

API Route

↓

Model

↓

MongoDB
```

---

Ejemplo:

Crear torneo:

```text
TournamentForm

↓

useTournament()

↓

tournament.service.ts

↓

POST /api/tournaments

↓

Tournament Model

↓

MongoDB
```

---

# 18. Reglas de Organización

## Components

Solo UI.

---

## Hooks

Estado y lógica frontend.

---

## Services

Comunicación externa.

---

## Models

Base de datos.

---

## Schemas

Validación.

---

## Types

Contratos TypeScript.

---

# 19. Archivos Prohibidos

No crear:

```text
components/utils/

components/database/

components/api/
```

La lógica debe estar en su carpeta correspondiente.

---

# 20. Regla Principal

Cada archivo debe tener una única responsabilidad.

Antes de crear un archivo nuevo preguntar:

"¿Pertenece a UI, lógica, datos o configuración?"

La respuesta define dónde debe vivir.
