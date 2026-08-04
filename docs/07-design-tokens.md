# Design Tokens

> **Proyecto:** Tucumán Cup
> **Versión:** 1.0
> **Estado:** Activo
> **Última actualización:** Agosto 2026

---

# 1. Objetivo

Los Design Tokens representan los valores fundamentales del sistema visual de Tucumán Cup.

Todos los componentes deben utilizar estos tokens en lugar de valores aislados.

Los tokens controlan:

* Colores.
* Tipografía.
* Espaciado.
* Bordes.
* Sombras.
* Animaciones.
* Breakpoints.
* Capas visuales.

---

# 2. Filosofía

Los tokens deben permitir:

* Consistencia visual.
* Fácil mantenimiento.
* Escalabilidad.
* Cambios globales rápidos.
* Compatibilidad con Tailwind CSS.

---

# 3. Color Tokens

## Background

Color principal de la aplicación.

```text
background-primary
#0B0B0C
```

Uso:

* Body.
* Layout principal.
* Dashboard.

---

## Surface

Superficies elevadas.

```text
surface-1
#111214
```

Uso:

* Cards.
* Panels.
* Sidebar.

---

```text
surface-2
#18191C
```

Uso:

* Modales.
* Dropdowns.
* Elementos destacados.

---

```text
surface-3
#202226
```

Uso:

* Hover.
* Estados activos.

---

# 4. Brand Colors

## Primary

Color principal de marca.

```text
primary-500
#F5C542
```

Representa:

* Victoria.
* Competencia.
* Energía.

---

Variantes:

```text
primary-300
#FDE68A

primary-600
#EAB308
```

---

# 5. Football Colors

## Field Green

```text
football-green
#22C55E
```

Uso:

* Estados positivos.
* Información deportiva.
* Resultados favorables.

No utilizar como color principal.

---

# 6. Semantic Colors

## Success

```text
success
#10B981
```

Uso:

* Confirmaciones.
* Estados completados.

---

## Warning

```text
warning
#F59E0B
```

Uso:

* Alertas.
* Estados pendientes.

---

## Danger

```text
danger
#EF4444
```

Uso:

* Errores.
* Eliminaciones.
* Estados críticos.

---

## Info

```text
info
#3B82F6
```

Uso:

* Información general.

---

# 7. Text Tokens

## Primary Text

```text
text-primary
#FFFFFF
```

Uso:

* Títulos.
* Información importante.

---

## Secondary Text

```text
text-secondary
#A1A1AA
```

Uso:

* Descripciones.
* Metadata.

---

## Muted Text

```text
text-muted
#71717A
```

Uso:

* Información secundaria.

---

# 8. Border Tokens

```text
border-default
#27272A
```

Uso:

* Cards.
* Inputs.
* Separadores.

---

```text
border-focus
#F5C542
```

Uso:

* Estados de foco.

---

# 9. Typography Tokens

## Font Families

### Heading

```text
Oswald
```

Uso:

* Hero.
* Títulos principales.
* Estadísticas destacadas.

---

### Body

```text
Inter
```

Uso:

* Textos.
* Formularios.
* Tablas.

---

# 10. Font Sizes

| Token     | Valor |
| --------- | ----- |
| text-xs   | 12px  |
| text-sm   | 14px  |
| text-base | 16px  |
| text-lg   | 18px  |
| text-xl   | 20px  |
| text-2xl  | 24px  |
| text-3xl  | 30px  |
| text-4xl  | 36px  |
| text-5xl  | 48px  |
| text-6xl  | 60px  |

---

# 11. Font Weights

```text
Regular
400

Medium
500

Semibold
600

Bold
700
```

---

# 12. Spacing Tokens

Sistema base:

```text
8px
```

Escala:

| Token    | Valor |
| -------- | ----- |
| space-1  | 4px   |
| space-2  | 8px   |
| space-3  | 12px  |
| space-4  | 16px  |
| space-5  | 20px  |
| space-6  | 24px  |
| space-8  | 32px  |
| space-10 | 40px  |
| space-12 | 48px  |
| space-16 | 64px  |
| space-20 | 80px  |

---

# 13. Radius Tokens

```text
radius-sm
8px
```

```text
radius-md
12px
```

```text
radius-lg
16px
```

```text
radius-xl
24px
```

Uso recomendado:

Cards:

```
radius-lg
```

Buttons:

```
radius-md
```

Modals:

```
radius-xl
```

---

# 14. Shadow Tokens

## Small

Elementos pequeños.

```text
shadow-sm
```

---

## Medium

Cards elevadas.

```text
shadow-md
```

---

## Large

Modales y overlays.

```text
shadow-lg
```

---

# 15. Animation Tokens

## Fast

```text
150ms
```

Uso:

* Hover.
* Estados.

---

## Normal

```text
200ms
```

Uso:

* Transiciones.

---

## Slow

```text
300ms
```

Uso:

* Animaciones mayores.

---

# 16. Easing

Usar:

```text
ease-out
```

Para:

* Entrada de elementos.
* Aparición de componentes.

---

# 17. Breakpoint Tokens

```text
mobile
<640px
```

```text
tablet
640px
```

```text
desktop
1024px
```

```text
large
1280px
```

---

# 18. Z-Index Tokens

Orden de capas:

```text
base
0
```

```text
dropdown
10
```

```text
sticky
20
```

```text
modal
50
```

```text
toast
100
```

---

# 19. Reglas de Uso

Nunca:

* Usar colores hex directamente dentro de componentes.
* Crear valores de espaciado arbitrarios.
* Crear sombras personalizadas sin necesidad.
* Crear tamaños inconsistentes.

Siempre:

* Usar tokens.
* Mantener consistencia.
* Reutilizar valores existentes.

---

# 20. Objetivo Final

Los Design Tokens permiten que Tucumán Cup tenga una identidad visual consistente y escalable.

Cualquier nueva pantalla o componente debe sentirse parte del mismo producto.
