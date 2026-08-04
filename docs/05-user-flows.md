# User Flows

> **Proyecto:** Tucumán Cup
> **Versión:** 1.0
> **Estado:** Activo
> **Última actualización:** Agosto 2026

---

# 1. Objetivo

Este documento describe los recorridos principales que realizan los diferentes tipos de usuarios dentro de Tucumán Cup.

Cada flujo debe ser:

* Intuitivo.
* Corto.
* Predecible.
* Consistente.
* Fácil de aprender.

---

# 2. Roles

La aplicación contempla cuatro tipos principales de usuarios:

* Administrador
* Delegado
* Jugador
* Espectador

Cada uno tendrá permisos y objetivos diferentes.

---

# 3. Flujo del Administrador

## Objetivo

Crear y administrar un torneo completo.

### Recorrido

```text
Login
   ↓
Dashboard
   ↓
Crear Torneo
   ↓
Configurar Temporada
   ↓
Registrar Equipos
   ↓
Registrar Jugadores
   ↓
Generar Fixture
   ↓
Publicar Torneo
   ↓
Registrar Resultados
   ↓
Consultar Estadísticas
```

### Acciones principales

* Crear torneos.
* Editar torneos.
* Administrar equipos.
* Administrar jugadores.
* Programar partidos.
* Registrar resultados.
* Consultar métricas.

---

# 4. Flujo del Delegado

## Objetivo

Gestionar la información de su equipo.

### Recorrido

```text
Login
   ↓
Dashboard
   ↓
Mi Equipo
   ↓
Editar Plantel
   ↓
Consultar Fixture
   ↓
Ver Estadísticas
```

### Acciones principales

* Ver información del equipo.
* Actualizar datos permitidos.
* Consultar próximos partidos.
* Revisar resultados.

---

# 5. Flujo del Jugador

## Objetivo

Seguir el desempeño de su equipo.

### Recorrido

```text
Login
   ↓
Inicio
   ↓
Mi Equipo
   ↓
Próximo Partido
   ↓
Estadísticas
```

### Acciones principales

* Ver partidos.
* Consultar estadísticas.
* Revisar la tabla de posiciones.
* Ver información personal.

---

# 6. Flujo del Espectador

## Objetivo

Consultar información pública del torneo.

### Recorrido

```text
Landing
   ↓
Seleccionar Torneo
   ↓
Fixture
   ↓
Resultados
   ↓
Tabla de Posiciones
   ↓
Estadísticas
```

No requiere autenticación.

---

# 7. Flujo de Creación de un Torneo

```text
Dashboard
   ↓
Nuevo Torneo
   ↓
Datos Generales
   ↓
Temporada
   ↓
Formato de Competencia
   ↓
Guardar
```

Validaciones:

* Nombre obligatorio.
* Temporada obligatoria.
* Formato obligatorio.

---

# 8. Flujo de Registro de Equipos

```text
Torneo
   ↓
Equipos
   ↓
Nuevo Equipo
   ↓
Escudo
   ↓
Información
   ↓
Guardar
```

---

# 9. Flujo de Registro de Jugadores

```text
Equipo
   ↓
Jugadores
   ↓
Nuevo Jugador
   ↓
Datos Personales
   ↓
Número
   ↓
Posición
   ↓
Guardar
```

---

# 10. Flujo de Generación de Fixture

```text
Torneo
   ↓
Fixture
   ↓
Generar Fixture
   ↓
Vista Previa
   ↓
Confirmar
```

Antes de confirmar:

* Validar cantidad de equipos.
* Validar formato.
* Validar disponibilidad de fechas.

---

# 11. Flujo de Registro de Resultados

```text
Partido
   ↓
Ingresar Resultado
   ↓
Confirmar
   ↓
Actualizar Tabla
   ↓
Actualizar Estadísticas
```

---

# 12. Flujo de Consulta

El usuario debe poder acceder rápidamente a:

* Tabla de posiciones.
* Fixture.
* Equipos.
* Jugadores.
* Resultados.
* Estadísticas.

Máximo recomendado:

Tres clics desde el Dashboard.

---

# 13. Estados Vacíos

Cada módulo debe contemplar estados sin información.

Ejemplos:

* No hay torneos.
* No hay equipos.
* No hay jugadores.
* No hay partidos programados.

Cada estado vacío debe:

* Explicar la situación.
* Sugerir una acción.
* Incluir un botón principal.

---

# 14. Estados de Error

Los errores deben:

* Explicar qué ocurrió.
* Indicar cómo solucionarlo.
* Evitar mensajes técnicos.

Ejemplo:

❌ "No se pudo guardar el torneo."

✅ "No pudimos guardar los cambios. Inténtalo nuevamente."

---

# 15. Estados de Carga

Mostrar Skeletons en:

* Dashboard.
* Tablas.
* Cards.
* Listados.

Evitar spinners como indicador principal cuando sea posible.

---

# 16. Confirmaciones

Solicitar confirmación únicamente para acciones destructivas.

Ejemplos:

* Eliminar torneo.
* Eliminar equipo.
* Eliminar jugador.
* Restablecer estadísticas.

---

# 17. Notificaciones

Utilizar Toasts para:

* Éxito.
* Advertencia.
* Error.
* Información.

Las notificaciones deben ser breves y claras.

---

# 18. Principios de UX

Cada flujo debe cumplir:

* Menor cantidad posible de clics.
* Navegación consistente.
* Feedback inmediato.
* Errores comprensibles.
* Acciones reversibles cuando sea posible.

---

# 19. Indicadores de Éxito

Un flujo se considera exitoso cuando:

* El usuario completa la tarea sin ayuda.
* No necesita volver atrás varias veces.
* Encuentra la información rápidamente.
* Comprende el resultado de sus acciones.

---

# 20. Regla General

Toda nueva funcionalidad deberá definir previamente:

1. Usuario objetivo.
2. Objetivo del usuario.
3. Flujo principal.
4. Estados (vacío, carga, error y éxito).
5. Resultado esperado.

Ninguna pantalla nueva debe implementarse sin haber definido primero su flujo de uso.
