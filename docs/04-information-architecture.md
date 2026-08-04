# Information Architecture

> **Proyecto:** Tucumán Cup
> **Versión:** 1.0
> **Estado:** Activo
> **Última actualización:** Agosto 2026

---

# 1. Objetivo

Este documento define la estructura funcional de Tucumán Cup y cómo se organiza la información dentro de la aplicación.

Su propósito es garantizar una navegación clara, escalable y consistente para todos los usuarios.

---

# 2. Principios de Organización

Toda la arquitectura debe seguir estos principios:

* La información importante debe encontrarse en pocos clics.
* Cada sección debe tener un objetivo claro.
* Evitar duplicación de funcionalidades.
* Mantener una navegación predecible.
* Priorizar la experiencia del organizador del torneo.

---

# 3. Roles de Usuario

## Administrador

Puede:

* Crear torneos.
* Administrar equipos.
* Administrar jugadores.
* Configurar temporadas.
* Registrar resultados.
* Gestionar árbitros.
* Administrar usuarios.
* Acceder a estadísticas completas.

---

## Delegado

Puede:

* Gestionar su equipo.
* Ver fixtures.
* Consultar estadísticas.
* Confirmar información del equipo.

---

## Jugador

Puede:

* Consultar partidos.
* Ver estadísticas personales.
* Consultar la tabla de posiciones.
* Ver información de su equipo.

---

## Espectador

Puede:

* Consultar resultados.
* Ver fixtures.
* Seguir tablas de posiciones.
* Explorar estadísticas públicas.

---

# 4. Mapa General de la Aplicación

```text
Inicio
│
├── Dashboard
│
├── Torneos
│   ├── Lista
│   ├── Crear
│   ├── Detalle
│   ├── Editar
│   └── Configuración
│
├── Equipos
│   ├── Lista
│   ├── Crear
│   ├── Perfil
│   └── Editar
│
├── Jugadores
│   ├── Lista
│   ├── Perfil
│   ├── Crear
│   └── Editar
│
├── Partidos
│   ├── Fixture
│   ├── Resultados
│   ├── Calendario
│   └── Detalle
│
├── Estadísticas
│   ├── Tabla de Posiciones
│   ├── Goleadores
│   ├── Asistencias
│   ├── Tarjetas
│   └── Equipos
│
├── Árbitros
│
├── Usuarios
│
├── Configuración
│
└── Perfil
```

---

# 5. Dashboard

El Dashboard debe responder rápidamente a estas preguntas:

* ¿Qué torneos están activos?
* ¿Cuántos partidos se juegan hoy?
* ¿Cuáles son los próximos encuentros?
* ¿Qué estadísticas son relevantes?
* ¿Qué acciones requieren atención?

Debe funcionar como centro de operaciones del organizador.

---

# 6. Navegación Principal

Sidebar permanente en escritorio.

Elementos principales:

* Dashboard
* Torneos
* Equipos
* Jugadores
* Partidos
* Estadísticas
* Árbitros
* Usuarios
* Configuración

---

# 7. Navegación Secundaria

Cada módulo puede tener navegación interna mediante:

* Tabs
* Breadcrumbs
* Menús contextuales

Ejemplo:

Torneos → Detalle → Equipos → Jugadores

---

# 8. Flujo de Creación de un Torneo

1. Crear torneo.
2. Configurar temporada.
3. Registrar equipos.
4. Registrar jugadores.
5. Generar fixture.
6. Publicar torneo.
7. Registrar resultados.
8. Consultar estadísticas.

---

# 9. Jerarquía de Información

Prioridad Alta:

* Próximos partidos.
* Resultados recientes.
* Tabla de posiciones.
* Estado del torneo.

Prioridad Media:

* Equipos.
* Jugadores.
* Estadísticas.

Prioridad Baja:

* Configuración.
* Administración avanzada.

---

# 10. Arquitectura de Datos (Conceptual)

```text
Organización
│
└── Torneo
    │
    ├── Temporada
    │
    ├── Equipos
    │   └── Jugadores
    │
    ├── Partidos
    │
    ├── Árbitros
    │
    └── Estadísticas
```

---

# 11. Búsqueda

La búsqueda global debe permitir localizar rápidamente:

* Torneos.
* Equipos.
* Jugadores.
* Partidos.

Los filtros deben ser claros y acumulables.

---

# 12. Acciones Rápidas

Desde el Dashboard el usuario debe poder:

* Crear torneo.
* Registrar equipo.
* Registrar jugador.
* Cargar resultado.
* Generar fixture.

Reducir al mínimo la cantidad de clics.

---

# 13. Escalabilidad

La arquitectura debe permitir agregar en el futuro:

* Múltiples organizaciones.
* Diferentes deportes.
* Streaming.
* Notificaciones.
* Aplicación móvil.
* Inteligencia Artificial.
* Sistema de pagos.
* Panel público.

Sin modificar la estructura principal.

---

# 14. Principios de Navegación

Toda pantalla debe responder claramente:

* ¿Dónde estoy?
* ¿Qué puedo hacer aquí?
* ¿Cómo regreso?
* ¿Cuál es el siguiente paso?

---

# 15. Criterios de Calidad

Antes de agregar una nueva sección, verificar que:

* Tiene un propósito claro.
* No duplica otra funcionalidad.
* Es fácil de descubrir.
* Mantiene la coherencia con la arquitectura existente.
* Puede escalar sin romper la navegación.
