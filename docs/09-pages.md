# Pages

> **Proyecto:** Tucumán Cup
> **Versión:** 1.0
> **Estado:** Activo
> **Última actualización:** Agosto 2026

---

# 1. Objetivo

Este documento define todas las páginas principales de Tucumán Cup.

Cada página debe tener:

* Un objetivo claro.
* Una estructura definida.
* Componentes asignados.
* Estados contemplados.
* Experiencia responsive.

---

# 2. Arquitectura General de Rutas

```text
/
├── Landing
│
├── auth/
│   ├── login
│   ├── register
│   └── forgot-password
│
├── dashboard
│
├── tournaments
│   ├── /
│   ├── create
│   └── [id]
│
├── teams
│   ├── /
│   ├── create
│   └── [id]
│
├── players
│   ├── /
│   ├── create
│   └── [id]
│
├── matches
│   ├── fixture
│   ├── results
│   └── [id]
│
├── statistics
│
├── referees
│
├── users
│
├── settings
│
└── profile
```

---

# 3. Landing Page

Ruta:

```text
/
```

## Objetivo

Presentar Tucumán Cup y convertir visitantes en usuarios.

---

## Secciones

### Hero

Debe incluir:

* Nombre de la plataforma.
* Propuesta de valor.
* Imagen deportiva impactante.
* CTA principal.

Ejemplo:

"Gestiona tu torneo de fútbol de forma profesional."

---

### Features

Mostrar:

* Gestión de torneos.
* Equipos.
* Fixture automático.
* Estadísticas.
* Resultados.

---

### Preview del producto

Mostrar:

* Dashboard.
* Tabla de posiciones.
* Fixture.

---

### CTA Final

Acción:

* Crear cuenta.
* Solicitar demo.

---

# 4. Login

Ruta:

```text
/auth/login
```

## Objetivo

Permitir acceso seguro.

Componentes:

* Input email.
* Input contraseña.
* Button login.
* Link recuperar contraseña.

Estados:

* Loading.
* Error.
* Success.

---

# 5. Registro

Ruta:

```text
/auth/register
```

## Objetivo

Crear una cuenta.

Campos:

* Nombre.
* Email.
* Contraseña.
* Organización.

---

# 6. Dashboard

Ruta:

```text
/dashboard
```

## Objetivo

Centro operativo del torneo.

Componentes:

* TournamentBanner.
* StatsCards.
* UpcomingMatches.
* RecentResults.
* MiniStandings.
* QuickActions.
* ActivityFeed.

---

# 7. Torneos

Ruta:

```text
/tournaments
```

## Objetivo

Administrar torneos.

Mostrar:

* Lista de torneos.
* Estado.
* Temporada.
* Equipos.
* Acciones.

Componentes:

* TournamentCard.
* Filters.
* SearchBar.

---

# 8. Crear Torneo

Ruta:

```text
/tournaments/create
```

## Objetivo

Crear un nuevo torneo.

Formulario:

Información general:

* Nombre.
* Logo.
* Categoría.
* Temporada.

Configuración:

* Formato.
* Cantidad de equipos.
* Fechas.

---

# 9. Detalle de Torneo

Ruta:

```text
/tournaments/[id]
```

## Objetivo

Gestionar un torneo específico.

Tabs:

```text
Resumen
Equipos
Fixture
Resultados
Estadísticas
Configuración
```

---

# 10. Equipos

Ruta:

```text
/teams
```

## Objetivo

Administrar equipos participantes.

Mostrar:

* Escudo.
* Nombre.
* Categoría.
* Jugadores.

Componentes:

* TeamCard.
* Filters.
* Search.

---

# 11. Detalle de Equipo

Ruta:

```text
/teams/[id]
```

Mostrar:

* Información del equipo.
* Plantel.
* Estadísticas.
* Historial.

---

# 12. Jugadores

Ruta:

```text
/players
```

Mostrar:

* Lista.
* Foto.
* Equipo.
* Posición.

---

# 13. Perfil de Jugador

Ruta:

```text
/players/[id]
```

Mostrar:

* Datos personales.
* Estadísticas.
* Historial.
* Partidos.

---

# 14. Fixture

Ruta:

```text
/matches/fixture
```

## Objetivo

Consultar calendario.

Mostrar:

* Fecha.
* Hora.
* Equipos.
* Cancha.

Acciones:

* Generar fixture.
* Editar partido.

---

# 15. Partido

Ruta:

```text
/matches/[id]
```

Mostrar:

* Equipos.
* Resultado.
* Eventos.
* Estadísticas.

---

# 16. Resultados

Ruta:

```text
/matches/results
```

Mostrar:

* Partidos finalizados.
* Marcadores.
* Fechas.

---

# 17. Estadísticas

Ruta:

```text
/statistics
```

Mostrar:

* Tabla de posiciones.
* Goleadores.
* Asistencias.
* Tarjetas.
* Estadísticas por equipo.

---

# 18. Árbitros

Ruta:

```text
/referees
```

Mostrar:

* Lista de árbitros.
* Disponibilidad.
* Partidos asignados.

---

# 19. Usuarios

Ruta:

```text
/users
```

Administración:

* Crear usuarios.
* Roles.
* Permisos.

---

# 20. Configuración

Ruta:

```text
/settings
```

Opciones:

* Organización.
* Preferencias.
* Seguridad.
* Integraciones.

---

# 21. Perfil

Ruta:

```text
/profile
```

Mostrar:

* Información personal.
* Avatar.
* Contraseña.
* Preferencias.

---

# 22. Estados Globales

Todas las páginas deben contemplar:

## Loading

Skeleton UI.

---

## Empty

Mensaje + acción.

---

## Error

Mensaje entendible + retry.

---

## Success

Feedback visual.

---

# 23. Reglas de Navegación

Toda página privada debe incluir:

* Sidebar.
* Header.
* Breadcrumb cuando sea necesario.

Toda página pública debe incluir:

* Navbar pública.
* Footer.

---

# 24. Criterio de Calidad

Una página está lista cuando:

* Tiene un objetivo definido.
* Tiene estados completos.
* Es responsive.
* Usa componentes existentes.
* Respeta el Design System.
* Tiene navegación clara.

---

# 25. Objetivo Final

Tucumán Cup debe sentirse como una plataforma profesional de gestión deportiva, donde cualquier organizador pueda administrar un torneo completo desde un único lugar.
