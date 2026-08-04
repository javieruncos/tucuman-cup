# AGENTS.md

# Tucumán Cup - Reglas de Desarrollo Frontend

## Objetivo del Proyecto

Este proyecto actualmente está enfocado únicamente en el desarrollo del frontend.

El objetivo es construir una interfaz profesional para la gestión de torneos de fútbol utilizando datos simulados (mock data).

La implementación del backend será desarrollada manualmente posteriormente.

---

# Responsabilidades del Agente

El agente debe encargarse únicamente de:

* Crear interfaces de usuario.
* Construir componentes React reutilizables.
* Crear layouts.
* Implementar diseño responsive.
* Crear animaciones e interacciones visuales.
* Construir formularios visuales.
* Crear tablas, cards y elementos UI.
* Crear estados visuales:

  * Loading.
  * Empty states.
  * Error states.
  * Success states.
* Crear datos estáticos para representar información.

---

# Restricciones Importantes

El agente NO debe crear:

* APIs.
* Route Handlers.
* Backend.
* Conexión con bases de datos.
* Modelos Mongoose.
* Schemas de base de datos.
* Autenticación.
* JWT.
* Cookies de sesión.
* Middleware de autorización.
* Server Actions.
* Lógica de negocio.
* Integraciones externas.

---

# Uso de Datos

Toda la información debe ser simulada.

Los datos deben vivir en:

```
src/lib/mock/
```

Ejemplo:

```
src/lib/mock/

├── tournaments.ts
├── teams.ts
├── players.ts
├── matches.ts
└── statistics.ts
```

Ejemplo permitido:

```ts
export const tournaments = [
  {
    id: "1",
    name: "Tucumán Cup 2026",
    category: "Senior",
    teams: 24,
    status: "Activo"
  }
]
```

No crear:

```ts
fetch("/api/tournaments")
```

---

# Stack Obligatorio

El desarrollo debe utilizar:

* Next.js 16.
* React 19.
* TypeScript.
* Tailwind CSS 4.
* shadcn/ui.
* Framer Motion.

---

# Arquitectura del Frontend

Seguir la estructura definida en:

```
docs/15-folder-structure.md
```

Reglas:

* Components → solamente interfaz.
* Hooks → lógica reutilizable de React.
* Lib → utilidades y configuración frontend.
* Mock → datos simulados.
* Types → tipos TypeScript.

---

# Componentes

Antes de crear un componente nuevo:

1. Revisar si ya existe.
2. Reutilizar componentes existentes.
3. Mantener componentes pequeños.

Ejemplo correcto:

```
components/

├── ui/
│   ├── Button.tsx
│   ├── Card.tsx
│   └── Table.tsx
│
├── teams/
│   └── TeamCard.tsx
```

Evitar:

```
DashboardTeamButton.tsx
AnotherCard.tsx
CustomButton2.tsx
```

---

# Componentes Server y Client

Usar Server Components por defecto.

Crear Client Components solamente cuando sea necesario:

* useState.
* useEffect.
* Eventos del usuario.
* Formularios interactivos.
* Animaciones que requieran cliente.

---

# Diseño Visual

Seguir obligatoriamente:

```
docs/02-design-system.md
docs/07-design-tokens.md
```

La interfaz debe transmitir:

* Fútbol profesional.
* Competición.
* Modernidad.
* Tecnología.
* Estilo SaaS premium.

Características visuales:

* Tema oscuro.
* Tonos negros.
* Acentos dorados/amarillos.
* Diseño limpio.
* Espaciado consistente.
* Animaciones suaves.

Evitar:

* Colores aleatorios.
* Diseños genéricos.
* Componentes sin coherencia visual.

---

# Desarrollo de Pantallas

Implementar únicamente la parte visual.

Orden recomendado:

## 1. Landing Page

Debe incluir:

* Hero principal.
* Información del torneo.
* Características.
* Estadísticas.
* Call to action.

---

## 2. Autenticación Visual

Crear:

* Login.
* Registro.
* Recuperación de contraseña visual.

Sin implementar autenticación real.

---

## 3. Dashboard

Crear:

* Sidebar.
* Navbar.
* Cards estadísticas.
* Próximos partidos.
* Tabla de posiciones.
* Actividad reciente.

Usar datos mock.

---

## 4. Torneos

Crear:

* Lista de torneos.
* Cards.
* Detalle del torneo.
* Tabs.
* Formularios visuales.

---

## 5. Equipos

Crear:

* Lista de equipos.
* Perfil del equipo.
* Jugadores.
* Estadísticas visuales.

---

## 6. Jugadores

Crear:

* Cards.
* Perfil.
* Estadísticas.
* Filtros visuales.

---

## 7. Partidos

Crear:

* Fixture.
* Resultado.
* Eventos.
* Vista del partido.

---

## 8. Estadísticas

Crear:

* Tablas.
* Rankings.
* Gráficos visuales.

---

# Formularios

Los formularios deben ser únicamente visuales.

Permitido:

* Inputs.
* Selects.
* Botones.
* Mensajes de validación simulados.

No permitido:

* Enviar información a APIs.
* Guardar datos.
* Conectar con backend.

---

# Calidad del Código

Siempre:

* Usar TypeScript.
* Crear componentes reutilizables.
* Usar nombres descriptivos.
* Evitar código duplicado.
* Mantener archivos organizados.
* Respetar la documentación del proyecto.

---

# Antes de Crear Código

El agente debe:

1. Leer la documentación dentro de `/docs`.
2. Respetar la arquitectura definida.
3. Crear solamente lo solicitado.
4. No agregar funcionalidades fuera del alcance.

---

# Regla Principal

Tucumán Cup debe construirse como un frontend profesional listo para producción.

El backend será desarrollado manualmente posteriormente.

El objetivo es aprender y controlar la arquitectura completa del sistema.
