# Technical Stack

> **Proyecto:** Tucumán Cup
> **Versión:** 1.0
> **Estado:** Activo
> **Última actualización:** Agosto 2026

---

# 1. Objetivo

Este documento define la arquitectura técnica y las tecnologías oficiales utilizadas en Tucumán Cup.

Todas las decisiones técnicas deben respetar este documento para mantener:

* Escalabilidad.
* Mantenibilidad.
* Rendimiento.
* Calidad de código.

---

# 2. Arquitectura General

Tucumán Cup utiliza una arquitectura Full Stack basada en Next.js.

```text id="2l1z5q"
Frontend
    │
    │
Next.js App Router
    │
    ├── React Components
    ├── Server Components
    ├── Client Components
    └── UI System


Backend
    │
    ├── Route Handlers
    ├── Server Actions
    ├── Authentication
    └── Business Logic


Database
    │
    └── MongoDB + Mongoose
```

---

# 3. Frontend

## Framework

```text id="zj8j8q"
Next.js 16
```

Utilizar:

* App Router.
* Server Components.
* Route Handlers.
* Streaming cuando sea necesario.

---

## Lenguaje

```text id="r4d6xq"
TypeScript
```

Reglas:

* No utilizar `any` salvo casos justificados.
* Tipar componentes.
* Tipar respuestas API.
* Mantener interfaces claras.

---

## UI Library

```text id="b8s9q0"
shadcn/ui
```

Uso:

* Componentes base.
* Formularios.
* Modales.
* Tablas.
* Inputs.

Los componentes deben adaptarse al Design System de Tucumán Cup.

---

## Estilos

```text id="j2p8h4"
Tailwind CSS 4
```

Reglas:

* Utilizar clases utilitarias.
* Evitar CSS innecesario.
* Crear componentes antes que estilos duplicados.

---

## Animaciones

```text id="8c9m2a"
Framer Motion
```

Uso:

* Transiciones.
* Estados.
* Microinteracciones.

Evitar animaciones decorativas.

---

# 4. Gestión de Estado

## Estado del servidor

```text id="k4l7m1"
TanStack Query
```

Uso:

* Fetching.
* Cache.
* Mutaciones.
* Estados loading/error.

---

## Estado local

Utilizar:

* React State.
* Context API cuando corresponda.

No agregar librerías externas sin necesidad.

---

# 5. Formularios

## Librerías oficiales

```text id="x5t9p2"
React Hook Form
```

Validación:

```text id="q2v6s8"
Zod
```

Flujo:

```text
Input
 ↓
React Hook Form
 ↓
Zod Schema
 ↓
API
 ↓
Database
```

---

# 6. Backend

## API

Utilizar:

```text id="m2x8c5"
Next.js Route Handlers
```

Ubicación:

```text
src/app/api/
```

Ejemplo:

```text id="n8k3v1"
src/
 └── app/
     └── api/
         ├── auth/
         ├── tournaments/
         ├── teams/
         ├── players/
         └── matches/
```

---

# 7. Base de Datos

## Database

```text id="p7w4d9"
MongoDB
```

---

## ODM

```text id="a3k6m8"
Mongoose
```

Responsabilidades:

* Modelos.
* Validaciones.
* Relaciones.
* Queries.

---

# 8. Modelos Principales

Entidades principales:

```text id="s9v2l5"
User

Organization

Tournament

Season

Team

Player

Match

Referee

Statistics
```

Relaciones:

```text
Organization
      |
      |
  Tournament
      |
      |
   Teams
      |
      |
 Players
```

---

# 9. Autenticación

Sistema:

```text id="d4m8x2"
JWT Authentication
```

Debe soportar:

* Login.
* Registro.
* Sesión.
* Roles.
* Protección de rutas.

---

# 10. Autorización

Sistema basado en roles:

```text id="r6t1k9"
ADMIN
ORGANIZER
DELEGATE
PLAYER
VIEWER
```

Cada acción debe validar permisos.

---

# 11. Estructura del Proyecto

```text
src/

├── app/
│   ├── dashboard/
│   ├── tournaments/
│   ├── teams/
│   ├── players/
│   ├── matches/
│   └── api/


├── components/

│   ├── ui/
│   ├── layout/
│   ├── dashboard/
│   ├── tournaments/
│   ├── teams/
│   ├── players/
│   └── matches/


├── hooks/

├── lib/

├── services/

├── models/

├── schemas/

├── types/

└── utils/
```

---

# 12. Separación de Responsabilidades

Componentes:

Solo UI.

---

Services:

Lógica de comunicación.

Ejemplo:

```text
services/tournament.service.ts
```

---

Models:

Esquemas MongoDB.

Ejemplo:

```text
models/Tournament.ts
```

---

Schemas:

Validaciones Zod.

Ejemplo:

```text
schemas/tournament.schema.ts
```

---

Types:

Tipos compartidos.

Ejemplo:

```text
types/tournament.ts
```

---

# 13. Convenciones de Código

## Componentes

PascalCase:

```text
TournamentCard.tsx
```

---

## Funciones

camelCase:

```text
createTournament()
```

---

## Archivos

kebab-case cuando corresponda:

```text
tournament-service.ts
```

---

# 14. Server vs Client Components

Preferencia:

Server Components por defecto.

Usar Client Components solamente cuando sea necesario:

* Hooks.
* Eventos.
* Estado local.
* Browser APIs.

---

# 15. Manejo de Errores

Todos los errores deben:

* Ser capturados.
* Tener mensajes claros.
* Mantener logs útiles.

Nunca mostrar errores internos al usuario.

---

# 16. Seguridad

Implementar:

* Validación de inputs.
* Sanitización.
* Protección de rutas.
* Control de permisos.
* Variables de entorno.

---

# 17. Variables de Entorno

Ejemplo:

```env
DATABASE_URL=

JWT_SECRET=

NEXT_PUBLIC_APP_URL=
```

Nunca subir:

```text
.env
```

al repositorio.

---

# 18. Deploy

Plataforma recomendada:

```text id="f7k3s1"
Vercel
```

Base de datos:

```text id="m9q2w8"
MongoDB Atlas
```

---

# 19. Calidad

Antes de realizar un Pull Request:

Verificar:

* TypeScript sin errores.
* ESLint correcto.
* Build exitoso.
* Componentes reutilizables.
* Documentación actualizada.

---

# 20. Regla Principal

La prioridad técnica de Tucumán Cup es:

1. Código limpio.
2. Arquitectura escalable.
3. Buena experiencia de usuario.
4. Fácil mantenimiento.
5. Preparación para futuras funcionalidades con IA.
