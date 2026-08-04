# Design System

> **Proyecto:** Tucumán Cup
> **Versión:** 1.0
> **Estado:** Activo
> **Última actualización:** Agosto 2026

---

# 1. Objetivo

Este documento define las reglas del sistema de diseño de Tucumán Cup.

Su propósito es garantizar que toda la interfaz sea consistente, escalable y fácil de mantener.

Todo nuevo componente debe seguir estas reglas.

---

# 2. Principios

Cada componente debe cumplir con los siguientes principios:

* Simplicidad.
* Consistencia.
* Reutilización.
* Accesibilidad.
* Rendimiento.
* Escalabilidad.

---

# 3. Grid

Utilizar una cuadrícula de 12 columnas.

Contenedor máximo:

* 1440px

Padding horizontal:

* Desktop: 32px
* Tablet: 24px
* Mobile: 16px

---

# 4. Breakpoints

| Dispositivo | Tamaño          |
| ----------- | --------------- |
| Mobile      | < 640px         |
| Tablet      | 640px - 1023px  |
| Laptop      | 1024px - 1279px |
| Desktop     | 1280px+         |

---

# 5. Sistema de Espaciado

Basado en una escala de 8px.

| Token | Valor |
| ----- | ----: |
| xs    |   4px |
| sm    |   8px |
| md    |  16px |
| lg    |  24px |
| xl    |  32px |
| 2xl   |  48px |
| 3xl   |  64px |
| 4xl   |  80px |

No utilizar valores arbitrarios salvo que exista una justificación clara.

---

# 6. Border Radius

| Token | Valor |
| ----- | ----: |
| sm    |   8px |
| md    |  12px |
| lg    |  16px |
| xl    |  24px |

Utilizar `rounded-md` o `rounded-lg` en la mayoría de los componentes.

---

# 7. Elevación

Tres niveles de sombra:

### Nivel 1

Tarjetas estándar.

### Nivel 2

Dropdowns y modales.

### Nivel 3

Elementos flotantes.

Evitar sombras exageradas.

---

# 8. Tipografía

## Headings

Oswald

Peso:

* 600
* 700

---

## Body

Inter (o Geist)

Pesos:

* 400
* 500
* 600

---

# 9. Colores

Todos los colores deben utilizar tokens.

Nunca utilizar colores hardcodeados directamente en componentes.

Ejemplo:

```text
bg-background
bg-surface
text-primary
text-muted
border-border
text-success
bg-danger
```

---

# 10. Componentes Base

Todo componente complejo debe construirse reutilizando componentes base.

## Base

* Button
* Input
* Select
* Badge
* Avatar
* Card
* Modal
* Drawer
* Dialog
* Tabs
* Tooltip
* Dropdown Menu
* Separator
* Skeleton
* Alert
* Toast

---

# 11. Componentes de Negocio

Estos componentes representan conceptos propios de Tucumán Cup.

## TournamentCard

Debe mostrar:

* Nombre
* Categoría
* Temporada
* Estado
* Cantidad de equipos

---

## TeamCard

Debe mostrar:

* Escudo
* Nombre
* Ciudad
* Estadísticas rápidas

---

## PlayerCard

Debe mostrar:

* Foto
* Nombre
* Posición
* Equipo
* Número

---

## MatchCard

Debe mostrar:

* Equipos
* Resultado
* Fecha
* Estado
* Cancha

---

## StandingTable

Debe incluir:

* PJ
* PG
* PE
* PP
* GF
* GC
* DG
* Puntos

---

## FixtureTable

Debe mostrar:

* Fecha
* Hora
* Cancha
* Equipos
* Estado

---

## StatsCard

Debe mostrar una única métrica importante.

Ejemplos:

* Equipos registrados
* Partidos jugados
* Goles
* Jugadores

---

# 12. Estados

Cada componente interactivo debe contemplar:

* Default
* Hover
* Active
* Focus
* Disabled
* Loading
* Error
* Empty

---

# 13. Formularios

Todos los formularios deben:

* Validar entradas.
* Mostrar errores claros.
* Indicar campos obligatorios.
* Ser accesibles mediante teclado.

---

# 14. Tablas

Las tablas deben:

* Ser responsivas.
* Permitir ordenamiento cuando sea necesario.
* Mantener encabezados visibles en listados largos.
* Evitar saturación visual.

---

# 15. Iconografía

Biblioteca oficial:

* Lucide React

Los iconos deben acompañar la información, no reemplazarla.

---

# 16. Animaciones

Duración:

* 150ms
* 200ms
* 250ms

Permitir:

* Fade
* Scale
* Slide

Evitar animaciones decorativas.

---

# 17. Responsive

Todos los componentes deben funcionar correctamente en:

* Desktop
* Tablet
* Mobile

No crear componentes exclusivos para un único tamaño de pantalla salvo que sea imprescindible.

---

# 18. Accesibilidad

Todo componente debe:

* Tener etiquetas semánticas.
* Ser navegable mediante teclado.
* Mostrar foco visible.
* Mantener contraste adecuado.
* Incluir atributos ARIA cuando corresponda.

---

# 19. Convenciones

* Un componente = una responsabilidad.
* No duplicar lógica.
* No duplicar estilos.
* Preferir composición sobre herencia.
* Priorizar reutilización.

---

# 20. Criterios de Aceptación

Antes de añadir un componente al proyecto, verificar que:

* Sigue el Design System.
* Es reutilizable.
* Es responsive.
* Es accesible.
* Está correctamente tipado.
* No introduce dependencias innecesarias.
* Puede mantenerse fácilmente en el tiempo.
