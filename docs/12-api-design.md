# API Design

> **Proyecto:** Tucumán Cup
> **Versión:** 1.0
> **Estado:** Activo
> **Última actualización:** Agosto 2026

---

# 1. Objetivo

Este documento define el diseño de la API de Tucumán Cup.

La API será utilizada por:

* Aplicación web.
* Panel administrativo.
* Futuras aplicaciones móviles.
* Integraciones externas.

---

# 2. Arquitectura API

Tecnología:

```text id="4mg7ws"
Next.js Route Handlers
```

Ubicación:

```text id="k9w1ph"
src/app/api/
```

Ejemplo:

```text id="3t0a1m"
src/
└── app/
    └── api/
        └── tournaments/
            └── route.ts
```

---

# 3. Convenciones Generales

## Base URL

Desarrollo:

```text
/api
```

Producción:

```text
https://tucumancup.com/api
```

---

# 4. Formato de Respuesta

Todas las respuestas exitosas deben mantener esta estructura:

```json id="e2d8jp"
{
  "success": true,
  "data": {},
  "message": "Operation completed successfully"
}
```

---

# 5. Respuesta de Error

Formato estándar:

```json id="z6n3q0"
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Description"
  }
}
```

---

# 6. Códigos HTTP

| Código | Uso               |
| ------ | ----------------- |
| 200    | Operación exitosa |
| 201    | Creación exitosa  |
| 400    | Datos inválidos   |
| 401    | No autenticado    |
| 403    | Sin permisos      |
| 404    | No encontrado     |
| 500    | Error interno     |

---

# 7. Autenticación

Sistema:

```text id="y3m8xa"
JWT
```

Header:

```http
Authorization: Bearer TOKEN
```

---

# 8. Auth API

## Registro

### POST

```text id="7prh6d"
/api/auth/register
```

Body:

```json id="4x6h8v"
{
  "name": "Juan Perez",
  "email": "juan@email.com",
  "password": "password"
}
```

Response:

```json id="nv8lq4"
{
  "success": true,
  "data": {
    "user": {}
  }
}
```

---

## Login

### POST

```text id="j8r2wp"
/api/auth/login
```

Body:

```json id="09l5kt"
{
  "email": "",
  "password": ""
}
```

Response:

```json id="j8x3ac"
{
  "success": true,
  "data": {
    "token": "",
    "user": {}
  }
}
```

---

# 9. Users API

## Obtener usuarios

GET

```text id="5k2m0w"
/api/users
```

Permiso:

ADMIN

---

## Obtener usuario

GET

```text id="4l6zqo"
/api/users/:id
```

---

## Actualizar usuario

PATCH

```text id="y6q7kt"
/api/users/:id
```

---

## Eliminar usuario

DELETE

```text id="c3y1tx"
/api/users/:id
```

---

# 10. Tournament API

## Obtener torneos

GET

```text id="j3p7nh"
/api/tournaments
```

Filtros:

```text
status
season
organization
```

---

## Crear torneo

POST

```text id="k5f9qd"
/api/tournaments
```

Body:

```json id="3bqk1s"
{
"name":"",
"category":"",
"format":"",
"startDate":"",
"endDate":""
}
```

Permiso:

ADMIN

---

## Obtener torneo

GET

```text id="7d9p2v"
/api/tournaments/:id
```

---

## Actualizar torneo

PATCH

```text id="a5x8fd"
/api/tournaments/:id
```

---

## Eliminar torneo

DELETE

```text id="n2k6wx"
/api/tournaments/:id
```

---

# 11. Teams API

## Obtener equipos

GET

```text id="2p8z1a"
/api/teams
```

---

## Crear equipo

POST

```text id="7f4r9k"
/api/teams
```

Body:

```json id="q1z5wm"
{
"name":"",
"logo":"",
"tournamentId":""
}
```

---

## Obtener equipo

GET

```text id="r6n0yc"
/api/teams/:id
```

---

## Actualizar equipo

PATCH

```text id="w3h7pk"
/api/teams/:id
```

---

## Eliminar equipo

DELETE

```text id="x9c2vm"
/api/teams/:id
```

---

# 12. Players API

## Obtener jugadores

GET

```text id="p5d8ka"
/api/players
```

Filtros:

```text
team
position
```

---

## Crear jugador

POST

```text id="s7q4ne"
/api/players
```

---

## Obtener jugador

GET

```text id="f2k8lx"
/api/players/:id
```

---

## Actualizar jugador

PATCH

```text id="m9v3qd"
/api/players/:id
```

---

# 13. Matches API

## Obtener partidos

GET

```text id="w8k4sa"
/api/matches
```

Filtros:

```text
tournament
date
status
```

---

## Crear partido

POST

```text id="z4m7pt"
/api/matches
```

---

## Actualizar resultado

PATCH

```text id="q8y2lm"
/api/matches/:id/result
```

Body:

```json id="t3n6qx"
{
"homeScore":2,
"awayScore":1
}
```

---

## Obtener partido

GET

```text id="v7c1mw"
/api/matches/:id
```

---

# 14. Statistics API

## Tabla de posiciones

GET

```text id="f8x2lp"
/api/statistics/standings/:tournamentId
```

---

## Goleadores

GET

```text id="k2m9wd"
/api/statistics/scorers/:tournamentId
```

---

## Estadísticas equipo

GET

```text id="h5q8vs"
/api/statistics/team/:teamId
```

---

# 15. Referees API

## Obtener árbitros

GET

```text id="n6z3tp"
/api/referees
```

---

## Crear árbitro

POST

```text id="c7v4mx"
/api/referees
```

---

# 16. Validaciones

Toda entrada debe pasar por:

```text id="r3m8yk"
Request

↓

Zod Schema

↓

Business Logic

↓

Database
```

---

# 17. Seguridad

Todas las rutas privadas deben validar:

* Usuario autenticado.
* Rol permitido.
* Organización correcta.

---

# 18. Paginación

Listados grandes deben soportar:

Query:

```text id="x6m2qa"
?page=1&limit=20
```

Respuesta:

```json id="p8q3vz"
{
"data":[],
"pagination":{
 "page":1,
 "limit":20,
 "total":100
}
}
```

---

# 19. Ordenamiento

Permitir:

```text id="m7q1bx"
?sort=name
?order=asc
```

---

# 20. Regla Principal

La API debe ser:

* Predecible.
* Segura.
* Fácil de consumir.
* Bien documentada.
* Preparada para crecer.

Antes de crear un endpoint nuevo debe existir una necesidad funcional clara.
