# Authentication & Authorization

> **Proyecto:** Tucumán Cup
> **Versión:** 1.0
> **Estado:** Activo
> **Última actualización:** Agosto 2026

---

# 1. Objetivo

Este documento define el sistema de autenticación y autorización de Tucumán Cup.

El sistema debe garantizar:

* Acceso seguro.
* Protección de información.
* Control de permisos.
* Separación de responsabilidades.

---

# 2. Sistema de Autenticación

Tecnología:

```text id="1f3q8z"
JWT Authentication
```

El usuario inicia sesión y recibe un token que permite acceder a recursos protegidos.

---

# 3. Flujo de Login

Proceso:

```text id="r9w4ks"
Usuario

↓

Email + Password

↓

Validación

↓

Generación JWT

↓

Cookie segura

↓

Acceso al sistema
```

---

# 4. Registro

Ruta:

```text id="3m6p1q"
/api/auth/register
```

Proceso:

1. Usuario completa formulario.
2. Validación con Zod.
3. Password se encripta.
4. Usuario creado.
5. Se genera sesión.

---

# 5. Login

Ruta:

```text id="8k2v5n"
/api/auth/login
```

Datos requeridos:

```json id="1h6s9w"
{
"email":"",
"password":""
}
```

Proceso:

```text id="9z4q7x"
Buscar usuario

↓

Comparar password

↓

Crear JWT

↓

Guardar sesión
```

---

# 6. Password Security

Las contraseñas nunca deben almacenarse directamente.

Proceso:

```text id="q6w2kc"
Password

↓

bcrypt

↓

Hash almacenado
```

Ejemplo:

Nunca:

```text id="v5m8dz"
password123
```

Correcto:

```text id="2p9xla"
$2b$10$xxxxxxxx
```

---

# 7. JWT Payload

El token debe contener información mínima:

```json id="m7r2pq"
{
"userId":"",
"role":"",
"organizationId":"",
"iat":"",
"exp":""
}
```

Nunca guardar:

* Password.
* Información sensible.

---

# 8. Cookie de Sesión

El token debe almacenarse mediante cookie segura.

Configuración:

```text id="5h9v3s"
httpOnly: true

secure: true

sameSite: strict
```

Objetivo:

* Evitar acceso desde JavaScript.
* Reducir ataques XSS.

---

# 9. Middleware de Protección

Las rutas privadas deben usar middleware.

Ejemplo:

```text id="2d7x4n"
Usuario

↓

Middleware

↓

Validar JWT

↓

Permitir acceso
```

---

# 10. Rutas Públicas

No requieren autenticación:

```text id="n4p7xm"
/

/auth/login

/auth/register

/public/tournaments

/public/standings
```

---

# 11. Rutas Privadas

Requieren sesión:

```text id="t8k3mv"
/dashboard

/tournaments

/teams

/players

/settings
```

---

# 12. Roles del Sistema

## ADMIN

Administrador general.

Permisos:

* Crear organizaciones.
* Gestionar usuarios.
* Configuración global.
* Acceso total.

---

## ORGANIZER

Organizador del torneo.

Permisos:

* Crear torneos.
* Gestionar equipos.
* Registrar resultados.
* Administrar jugadores.

---

## DELEGATE

Delegado de equipo.

Permisos:

* Gestionar su equipo.
* Registrar jugadores.
* Consultar partidos.

---

## PLAYER

Jugador.

Permisos:

* Ver perfil.
* Consultar estadísticas.
* Ver partidos.

---

## VIEWER

Usuario público.

Permisos:

* Ver información pública.

---

# 13. Matriz de Permisos

| Acción              | Admin | Organizer | Delegate | Player | Viewer |
| ------------------- | ----- | --------- | -------- | ------ | ------ |
| Crear torneo        | ✓     | ✓         | ✗        | ✗      | ✗      |
| Editar torneo       | ✓     | ✓         | ✗        | ✗      | ✗      |
| Crear equipo        | ✓     | ✓         | ✓        | ✗      | ✗      |
| Editar jugadores    | ✓     | ✓         | ✓        | ✗      | ✗      |
| Registrar resultado | ✓     | ✓         | ✗        | ✗      | ✗      |
| Ver estadísticas    | ✓     | ✓         | ✓        | ✓      | ✓      |
| Configuración       | ✓     | ✓         | ✗        | ✗      | ✗      |

---

# 14. Protección por Organización

Los usuarios solo pueden acceder a recursos de su organización.

Ejemplo:

Usuario:

```text id="6m4q9b"
Organization A
```

No puede modificar:

```text id="x2k8pw"
Tournament B
```

---

# 15. Middleware Logic

Proceso:

```text id="7q2m8d"
Request

↓

Existe token?

↓

Token válido?

↓

Usuario existe?

↓

Rol permitido?

↓

Continuar
```

---

# 16. Manejo de Sesión

Debe existir:

## Obtener usuario actual

Ejemplo:

```ts id="3x7n5p"
getCurrentUser()
```

Retorna:

```ts id="v8m1qz"
{
id,
name,
role,
organization
}
```

---

# 17. Logout

Ruta:

```text id="9k3s6m"
/api/auth/logout
```

Proceso:

* Eliminar cookie.
* Finalizar sesión.

---

# 18. Recuperación de Password

Futuro MVP+

Flujo:

```text id="w5q8nm"
Email

↓

Token temporal

↓

Nueva contraseña
```

---

# 19. Seguridad Adicional

Implementar:

* Rate limiting.
* Validación de inputs.
* Protección CSRF.
* Sanitización.
* Logs de seguridad.

---

# 20. Variables de Entorno

Necesarias:

```env id="2c9m7x"
JWT_SECRET=

JWT_EXPIRES_IN=

DATABASE_URL=
```

---

# 21. Estados de Usuario

Un usuario puede estar:

```text id="m5v9kx"
ACTIVE

INACTIVE

BLOCKED
```

---

# 22. Regla Principal

La autenticación responde:

"¿Quién eres?"

La autorización responde:

"¿Qué puedes hacer?"

Ambas deben estar separadas y siempre aplicarse antes de modificar datos.
