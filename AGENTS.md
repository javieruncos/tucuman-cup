# Tucumán Cup — Filosofía y Reglas de Desarrollo Frontend

## Identidad del producto

Tucumán Cup es un **portal deportivo oficial de fútbol**.

NO es:

* SaaS
* dashboard
* panel administrativo
* aplicación empresarial
* CRM
* sistema de gestión
* web app genérica

La experiencia visual debe acercarse más a:

* sitio oficial de una competición
* portal de una federación
* medio deportivo oficial
* cobertura editorial de un torneo

y alejarse de:

* dashboard SaaS
* aplicación CRUD
* panel administrativo
* template genérico de Tailwind
* colección de cards estadísticas

Una interfaz pública nunca debe sentirse como el panel interno de administración de un torneo.

Si una decisión visual puede resolverse de dos maneras:

* A) como portal deportivo
* B) como aplicación SaaS

siempre elegir A.

---

## Principio fundamental

**El contenido debe determinar la composición.**

La dirección de diseño debe seguir esta jerarquía:

```
CONTENIDO
   ↓
JERARQUÍA
   ↓
COMPOSICIÓN
   ↓
COMPONENTES
```

Nunca:

```
COMPONENTES
   ↓
CARDS
   ↓
GRID
   ↓
CONTENIDO
```

No crear una card simplemente porque existe un dato.

No convertir cada estadística en una tarjeta.

No utilizar grids de cards como solución predeterminada para organizar información.

Antes de crear una card preguntarse:

> ¿Este contenido realmente necesita estar encerrado dentro de una superficie independiente?

Si la respuesta es no, utilizar:

* tipografía
* divisores
* líneas
* bandas
* fondos
* columnas
* espacios negativos
* jerarquía visual
* composición editorial

---

## Referencias visuales

La dirección visual debe estudiar los principios de composición de:

* FIFA
* UEFA
* CONMEBOL
* AFA
* Premier League
* LaLiga
* sitios oficiales de clubes profesionales
* medios deportivos profesionales
* Sofascore

NO copiar diseños.

Utilizar estas referencias únicamente para comprender:

* jerarquía
* tipografía
* fotografía
* ritmo
* composición
* uso del espacio
* tratamiento de resultados
* tratamiento de noticias
* tratamiento de competición

La referencia principal debe ser siempre un portal deportivo profesional, no una aplicación SaaS.

---

## Lenguaje visual

La interfaz debe transmitir:

**competición + fútbol + prestigio + evento deportivo + actualidad**

La estética debe sentirse como la identidad digital de un torneo real.

Priorizar:

* fotografía deportiva de alta calidad
* imágenes de estadios
* escudos grandes
* titulares fuertes
* tipografía deportiva
* números grandes únicamente cuando tengan protagonismo real
* composiciones asimétricas
* bloques horizontales
* líneas divisorias
* bandas de contenido
* fondos fotográficos
* overlays
* contraste
* espacios negativos controlados

La interfaz NO debe parecer generada automáticamente a partir de componentes.

---

## Señales de diseño tipo dashboard

Evitar como estructura predominante:

* KPI cards consecutivas
* grids repetitivos
* grids de 3x3 cards
* múltiples paneles idénticos
* cada dato encerrado en una caja
* exceso de bordes
* exceso de `rounded-xl` / `rounded-2xl`
* exceso de badges
* badges dentro de badges
* sombras exageradas
* widgets visualmente idénticos
* botones para acciones triviales
* sidebar como estructura principal
* apariencia administrativa
* composición completamente simétrica
* superficies idénticas para todas las secciones
* estadísticas presentadas como dashboard
* animaciones que no aporten información

Regla:

> Si una sección podría existir sin modificaciones dentro de un dashboard administrativo, reconsiderar su composición.

---

## Tipografía

La tipografía debe tener presencia editorial y ser uno de los principales elementos de identidad.

Utilizar las fuentes existentes del proyecto.

**Display** para:

* titulares
* nombres de equipos
* resultados
* grandes números deportivos
* títulos de sección importantes

**Body** para:

* descripciones
* información secundaria
* metadatos

Utilizar:

* uppercase cuando tenga sentido
* tracking editorial
* `tabular-nums` para estadísticas
* tamaños importantes para titulares

Evitar:

* que toda la interfaz parezca una aplicación
* textos importantes excesivamente pequeños
* abusar de `text-[10px]` / `text-[11px]`
* usar tipografía pequeña para información que debería tener protagonismo

---

## Fotografía

La fotografía es parte fundamental de la identidad del portal.

Cuando exista una imagen apropiada, priorizar fotografías deportivas de alta calidad.

Para Hero:

* mínimo recomendado 1920×1080
* composición cinematográfica
* estadio, jugadores, público, luces, competición
* colores vivos
* alto contraste
* recorte `cover`
* posicionamiento `center` cuando corresponda

Una fotografía debe integrarse con:

```
FOTOGRAFÍA
   +
OVERLAY
   +
TIPOGRAFÍA
   +
CONTENIDO
```

Nunca colocar texto directamente sobre una fotografía si no existe contraste suficiente.

Utilizar overlays/degradados para garantizar legibilidad.

NO colocar una fotografía detrás de cada card.

La fotografía debe reservarse principalmente para:

* Hero
* noticia protagonista
* partido protagonista
* campañas
* momentos importantes del torneo

---

## Composición editorial

Las páginas deben utilizar diferentes tipos de composición según su contenido.

### Noticias

Lead principal + noticias secundarias.

No:

`Card Card Card`

### Partidos

Match Center o agenda editorial.

No:

`Card Card Card Card`

### Clasificación

Tabla protagonista o resumen competitivo.

No:

`StatsCard StatsCard StatsCard`

### Equipos

Banda horizontal de escudos y nombres.

No necesariamente cards individuales.

### Estadísticas

Rankings, tablas o composiciones de datos.

No convertir cada número en una card.

### Sponsors

Banda institucional.

No utilizar automáticamente:

```
SectionHeader
   ↓
Card
   ↓
Grid
```

Cada sección debe tener una composición apropiada para su contenido.

---

## Jerarquía

Toda página debe definir claramente:

1. **Protagonista** — un contenido que domine visualmente la página.
2. **Secundario** — información que complementa al protagonista.
3. **Terciario** — información de apoyo.

No todos los elementos deben tener el mismo peso visual.

El protagonista debe dominar mediante una combinación de:

* tamaño
* tipografía
* fotografía
* posición
* contraste
* espacio

---

## Espacio negativo

El espacio vacío debe utilizarse intencionalmente.

No llenar espacio vacío simplemente agregando contenido.

NO agregar:

* cards
* estadísticas
* botones
* widgets
* textos

solo para aumentar la densidad visual.

Una página limpia y bien jerarquizada es preferible a una página saturada.

---

## Superficies

Las superficies (cards, bordes, sombras) deben ser excepcionales.

Prioridad visual:

```
DIVISOR / BANDA / FONDO / TIPOGRAFÍA
              >
          SUPERFICIE
```

No utilizar una sombra o un borde para separar cada sección.

Evitar sombras gigantes.

Evitar efectos como:

```
shadow-[0_80px_160px...]
```

La profundidad debe lograrse principalmente mediante:

* contraste
* fotografía
* overlay
* tipografía
* separación
* fondos
* divisores

---

## Cards

Las cards son una herramienta, no el lenguaje visual principal.

Utilizarlas solamente cuando el contenido realmente necesite una superficie independiente y cuando:

* separan claramente una unidad de contenido
* mejoran la lectura
* representan una entidad independiente
* aportan jerarquía

Preferir cuando corresponda:

* bloques abiertos
* divisores
* bandas
* filas editoriales
* composiciones asimétricas
* columnas
* fotografía
* tipografía
* espacios negativos

Evitar Card + Card + Card como estructura automática de una sección.

NO crear componentes duplicados solamente para cambiar estilos:

`HomeCard`
`PremiumCard`
`FeaturedCard2`
`NewsCard2`
`MatchCard2`
`StatsCard2`

Antes de crear una card nueva, revisar si puede resolverse con un componente existente o mediante composición editorial.

---

## Datos

Nunca inventar información deportiva para llenar una composición.

Antes de diseñar una sección:

1. verificar si existe el dato
2. verificar si existe un hook
3. verificar si existe un componente reutilizable
4. determinar si puede derivarse correctamente

No inventar:

* KPIs
* estadísticas
* rankings
* jugadores
* resultados
* números decorativos

Los datos deben tener significado deportivo real.

Cuando existan datos reales disponibles (hooks, API del proyecto), utilizarlos.

---

## Responsive editorial

No limitar el responsive a "apilar cards".

En mobile debe conservarse:

* jerarquía
* protagonista
* fotografía
* tipografía
* ritmo
* contraste

El diseño debe sentirse intencional en:

* desktop
* tablet
* mobile

---

## QA visual

Antes de considerar terminada una página, responder obligatoriamente:

1. ¿Parece un portal deportivo?
2. ¿Parece el sitio oficial de una competición?
3. ¿Existe un protagonista visual?
4. ¿La tipografía tiene presencia?
5. ¿La fotografía tiene presencia cuando corresponde?
6. ¿Hay demasiadas cards?
7. ¿Hay demasiados bordes?
8. ¿Hay demasiados badges?
9. ¿Hay demasiadas superficies?
10. ¿Parece una dashboard?
11. ¿Cada sección tiene una composición adecuada a su contenido?
12. ¿Existe suficiente espacio negativo?
13. ¿La información importante se identifica inmediatamente?
14. ¿La composición mantiene su jerarquía en mobile?

Si la respuesta a "¿parece una dashboard?" es sí, **la página NO está terminada**.

---

## Regla de oro

> Tucumán Cup debe sentirse como el sitio oficial de una competición de fútbol, no como una aplicación que administra una competición de fútbol.

> Fotografía y tipografía tienen prioridad sobre cards, bordes y superficies.

> Si una composición funciona mejor como dashboard que como portal deportivo, debe replantearse.

---

## Reglas de desarrollo frontend

### Stack obligatorio

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS 4
* shadcn/ui
* Framer Motion

### Arquitectura

* Components → solamente interfaz.
* Hooks → lógica reutilizable de React.
* Lib → utilidades y configuración frontend.
* Mock → datos simulados.
* Types → tipos TypeScript.

Sin backend: no crear APIs, Route Handlers, modelos Mongoose, schemas de base de datos, autenticación, JWT, cookies de sesión, middleware de autorización, Server Actions ni lógica de negocio.

### Server y Client Components

Usar Server Components por defecto.

Crear Client Components solamente cuando sea necesario:

* useState
* useEffect
* Eventos del usuario
* Formularios interactivos
* Animaciones que requieran cliente

### Datos

Toda la información debe ser simulada cuando corresponda.

Los datos deben vivir en `src/lib/mock/`.

Cuando existan datos reales disponibles, priorizar su uso.

### Reutilización y calidad

* Un componente = una responsabilidad.
* No duplicar lógica.
* No duplicar estilos.
* Preferir composición sobre herencia.
* Priorizar reutilización.
* Tipado estricto.

Antes de crear un componente nuevo:

1. buscar componentes existentes
2. determinar si pueden reutilizarse
3. determinar si pueden adaptarse
4. evitar duplicaciones

### Estados

Los componentes deben contemplar los estados necesarios:

* Loading
* Empty
* Error
* Success

---

## Documentos antiguos

Los documentos de `docs/` (por ejemplo `docs/02-brand-identity.md`, `docs/03-design-system.md`, `docs/06-components.md`, `docs/07-design-tokens.md`, `docs/08-dashboard.md`, `docs/09-pages.md`) pueden contener reglas de una etapa anterior del proyecto.

Ante una contradicción entre `AGENTS.md` y cualquier documento de `docs/`, **estas reglas de dirección visual tienen prioridad**.

Los documentos antiguos se revisarán en una etapa posterior y separada. No resolver las contradicciones ahora.

---

La prioridad es:

**identidad deportiva > composición > jerarquía > componentes > velocidad de implementación.**