# AGENTS.md

## Proyecto

**Tucumán Cup** es una aplicación web para la gestión de torneos deportivos.

La prioridad del proyecto es:

* Código limpio.
* Escalabilidad.
* Buenas prácticas.
* Alto rendimiento.
* Excelente experiencia de usuario.
* Código fácil de mantener.

---

# Stack

Siempre utilizar:

* Next.js 16 (App Router)
* React 19
* TypeScript
* Tailwind CSS v4
* pnpm
* ESLint

No instalar nuevas dependencias sin explicar por qué son necesarias.

---

# Filosofía

Antes de escribir código:

* Analizar el contexto.
* Reutilizar componentes existentes.
* Evitar duplicación.
* Priorizar simplicidad.

No generar código innecesariamente complejo.

---

# Arquitectura

Mantener una arquitectura modular.

Separar correctamente:

* UI
* lógica
* servicios
* tipos
* utilidades

Evitar componentes gigantes.

Preferir componentes pequeños y reutilizables.

---

# TypeScript

Siempre utilizar tipado estricto.

No usar:

* any
* @ts-ignore

Crear tipos e interfaces reutilizables.

---

# React

Preferir:

* Server Components cuando sea posible.
* Client Components únicamente cuando sean necesarios.

No agregar `"use client"` si el componente puede ser un Server Component.

---

# Next.js

Utilizar siempre las características modernas:

* App Router
* Route Handlers
* Metadata API
* Image
* Link

Evitar APIs obsoletas.

---

# Componentes

Cada componente debe tener una única responsabilidad.

Cuando un componente crezca demasiado, dividirlo.

Los componentes deben ser reutilizables.

---

# Estilos

Usar exclusivamente Tailwind CSS.

No escribir CSS tradicional salvo que sea estrictamente necesario.

Mantener clases ordenadas.

Evitar estilos repetidos.

---

# Accesibilidad

Siempre incluir:

* etiquetas semánticas
* aria-label cuando corresponda
* navegación mediante teclado
* contraste adecuado

---

# Performance

Optimizar renderizados.

Evitar renders innecesarios.

No optimizar prematuramente.

Explicar cuando una optimización sea realmente útil.

---

# Código

Escribir código legible.

Priorizar claridad sobre cantidad.

Agregar comentarios únicamente cuando aporten contexto.

No comentar código evidente.

---

# Refactorización

Cuando exista una mejor solución:

* explicarla
* indicar ventajas
* luego implementarla

No realizar cambios grandes sin explicarlos.

---

# Aprendizaje

Este proyecto también tiene un objetivo educativo.

Siempre que propongas cambios importantes:

1. Explica el problema.
2. Explica la solución.
3. Explica por qué es una buena práctica.
4. Implementa el cambio.

No asumas que el desarrollador conoce todos los conceptos.

---

# Respuestas

Cuando modifiques código:

* Explica qué cambiaste.
* Explica por qué.
* Indica posibles mejoras futuras.

Si existen varias soluciones, muestra primero la recomendada y menciona las alternativas.

---

# Dependencias

Antes de instalar una librería:

* explicar por qué se necesita
* indicar ventajas
* indicar desventajas
* proponer una alternativa si existe

---

# Calidad

Antes de finalizar cualquier tarea verifica:

* TypeScript sin errores
* ESLint sin errores
* Código consistente
* Sin duplicación innecesaria
* Sin archivos sin usar

---

# Objetivo final

Construir una aplicación profesional que pueda utilizarse como proyecto principal de portfolio y que siga estándares de calidad propios de un entorno de producción.

