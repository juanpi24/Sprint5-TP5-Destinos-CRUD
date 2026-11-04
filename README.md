# 🧭 Rutas AR Admin — CRUD de Destinos 2026

Aplicación web desarrollada con **React + Vite** para administrar destinos turísticos de Argentina: **listar, ver el detalle, crear, editar y eliminar**, consumiendo una API REST propia creada en **MockAPI** mediante **axios**.

Este proyecto corresponde al **Trabajo Práctico Sprint 5** y completa el ciclo CRUD sobre lo construido en los sprints anteriores: el consumo de API del Sprint 4 (`useEffect`, estados de carga y error) se reorganiza en una capa de API con instancia de axios, y se suman **React Router** para la navegación, **React Hook Form + Zod** para los formularios y la escritura de datos (POST, PUT y DELETE).

---

## 🌎 Demo Online

## 🔗 **Deploy:** (https://crud-destinos.netlify.app/)

---

## 🛠️ Tecnologías Utilizadas

- React 19
- Vite 8
- JavaScript (ES6+)
- React Router DOM 7
- Axios
- React Hook Form
- Zod
- @hookform/resolvers
- Context API
- React Toastify
- Tailwind CSS v4
- MockAPI (backend)
- ESLint

---

## 📦 Dependencias Principales

| Dependencia         | Uso                                                       |
| ------------------- | --------------------------------------------------------- |
| React               | Construcción de interfaces de usuario                     |
| Vite                | Bundler y entorno de desarrollo                           |
| React Router DOM    | Navegación entre pantallas y rutas con parámetros (`:id`) |
| Axios               | Cliente HTTP con una instancia configurada una sola vez   |
| React Hook Form     | Gestión eficiente de formularios                          |
| Zod                 | Validación de datos mediante un schema                    |
| @hookform/resolvers | Integración entre React Hook Form y Zod                   |
| React Toastify      | Avisos de éxito y error en cada acción                    |
| Tailwind CSS        | Estilos utilitarios, tokens de diseño y modo oscuro       |
| Context API         | Estado global del recurso y del tema                      |
| MockAPI             | Backend REST con persistencia para el CRUD                |

---

## 🎯 Objetivos del Sprint

- Implementar un CRUD completo de punta a punta (GET, POST, PUT y DELETE).
- Separar la lógica de consumo de la API fuera de los componentes, con una instancia de axios.
- Navegar entre pantallas con React Router (lista, detalle, alta, edición y 404).
- Construir formularios validados con React Hook Form y Zod.
- Pedir confirmación antes de eliminar y dar feedback en cada acción.
- Manejar los estados de carga y error de cada operación.
- Compartir el estado del recurso con Context, sin prop drilling.
- Usar variables de entorno para la URL de la API.
- Desplegar la aplicación con el ruteo funcionando al recargar.

---

## 📋 Funcionalidades

### 🗺️ Listado de destinos

- Cards con imagen, título, ubicación, categoría, calificación y precio en pesos argentinos.
- Etiquetas **Destacado** y **Sin stock** según los datos.
- Estados de carga, de error (con botón **Reintentar**) y de lista vacía.

### 🔍 Búsqueda y filtros

- Búsqueda por nombre, sin distinguir mayúsculas ni tildes ("iguazu" encuentra "Iguazú").
- Filtro por categoría con botones (Todas, Naturaleza, Lagos y Glaciares, Montaña y Aventura), combinable con la búsqueda.
- Contador "Mostrando X de Y destinos" y aviso cuando ningún destino coincide.


### 📄 Detalle

- Todos los campos del destino en una sola pantalla.
- Acceso directo a editar y a eliminar.
- Aviso claro si el destino no existe (por ejemplo, un enlace viejo).

### ➕ Alta de destinos

- Formulario con React Hook Form y validación con Zod.
- Mensajes de error por campo; si hay errores, no se envía nada a la API.
- El botón se deshabilita y muestra "Guardando..." mientras espera la respuesta.
- Si la API falla, se muestra un aviso y el formulario conserva lo escrito para reintentar.

### ✏️ Edición de destinos

- Mismo formulario que el alta, cargado con los datos del destino (`reset`).
- Funciona también al recargar la página directamente en `/destinos/:id/editar`.

### 🗑️ Eliminación con confirmación

- Un modal de confirmación evita borrar por error; "Cancelar" no hace ninguna petición.
- Disponible desde la lista y desde el detalle.

### 🔔 Feedback en cada acción

- Avisos (toasts) de éxito y de error para crear, editar y eliminar.
- Mensajes de error claros según el problema: sin conexión, error del servidor o tiempo de espera agotado.

### 🌙 Tema claro / oscuro

- Alternancia entre modos visuales.
- Persistencia de la preferencia del usuario en LocalStorage.
- Aplicación global mediante Context API.

---

# 🏗️ Organización del Proyecto

La aplicación fue estructurada separando responsabilidades por dominio:

- **api/** concentra todo lo relacionado con HTTP: instancia de axios, funciones del CRUD y traducción de errores.
- **components/** contiene componentes reutilizables.
- **destinos/** agrupa la card, el formulario y los filtros del recurso.
- **layout/** agrupa elementos permanentes de la interfaz.
- **ui/** contiene componentes genéricos: modales, carga, error y "no encontrado".
- **constants/** almacena valores fijos, como las categorías.
- **context/** centraliza estados globales.
- **hooks/** encapsula lógica reutilizable.
- **pages/** representa cada pantalla de la aplicación.
- **routes/** define todas las rutas en un solo archivo.
- **schemas/** define las reglas de validación.
- **utils/** agrupa funciones auxiliares.

---

# 🌐 Backend y consumo de la API

## MockAPI

| Dato          | Valor                                           |
| ------------- | ----------------------------------------------- |
| Recurso       | `destinos`                                      |
| URL base      | Se lee de la variable de entorno `VITE_API_URL` |
| Formato       | JSON                                            |
| Autenticación | No requiere                                     |
| Identificador | `id` de tipo texto, asignado por el backend     |

### Endpoints utilizados

| Operación | Método   | Ruta            | Función (`api/destinosApi.js`) |
| --------- | -------- | --------------- | ------------------------------ |
| Listar    | `GET`    | `/destinos`     | `listarDestinos()`             |
| Crear     | `POST`   | `/destinos`     | `crearDestino()`               |
| Editar    | `PUT`    | `/destinos/:id` | `actualizarDestino()`          |
| Eliminar  | `DELETE` | `/destinos/:id` | `eliminarDestino()`            |

### Modelo del recurso

| Campo       | Tipo     | Validación (Zod)                                         |
| ----------- | -------- | -------------------------------------------------------- |
| `id`        | texto    | Lo asigna el backend                                     |
| `titulo`    | texto    | Entre 3 y 80 caracteres                                  |
| `ubicacion` | texto    | Mínimo 2 caracteres                                      |
| `categoria` | texto    | Una de: Naturaleza, Lagos y Glaciares, Montaña, Aventura |
| `rating`    | número   | Entre 0 y 5                                              |
| `precio`    | número   | Entero mayor a 0                                         |
| `stock`     | número   | Entero, 0 o más                                          |
| `destacado` | booleano | —                                                        |
| `imagen`    | texto    | URL válida                                               |

## Variables de entorno

| Variable       | Descripción                                                   |
| -------------- | ------------------------------------------------------------- |
| `VITE_API_URL` | URL base del proyecto en MockAPI, **sin** la ruta `/destinos` |

El repositorio incluye `.env` y `.env.example`. Si se modifica el `.env`, hay que reiniciar `npm run dev`.

## Capa de API separada

```text
Página  →  Context  →  api/destinosApi.js  →  api/axiosInstance.js  →  MockAPI
```

- **`axiosInstance.js`** crea la instancia una sola vez con `baseURL` (desde `.env`), el header `Content-Type: application/json` y un `timeout` de 8 segundos.
- **`destinosApi.js`** tiene una función por operación del CRUD. Cada una recibe `headers` opcionales y devuelve la respuesta de axios.
- **`errores.js`** convierte un error de axios en un mensaje claro para el usuario.
- Ningún componente conoce la URL ni usa axios directamente.

## Manejo de errores

| Situación                        | Cómo se detecta               | Qué hace la aplicación                                                 |
| -------------------------------- | ----------------------------- | ---------------------------------------------------------------------- |
| Sin conexión o servidor caído    | `err.response` no existe      | Mensaje: no se pudo conectar con el servidor                           |
| Error del servidor (500, 404...) | `err.response.status`         | Mensaje con el código HTTP recibido                                    |
| Tiempo de espera agotado         | `err.code === 'ECONNABORTED'` | Mensaje: el servidor tardó demasiado en responder                      |
| No carga la lista                | Error en el contexto          | Aviso con botón **Reintentar**                                         |
| Falla un alta, edición o borrado | `catch` en la página          | Toast de error; el estado no cambia y el formulario conserva los datos |

> axios rechaza la promesa ante cualquier respuesta fuera del rango 2xx (a diferencia de `fetch`), por eso el status se lee desde `err.response`.

---

# 🧠 Contextos Globales

## DestinosContext

### Qué guarda

- destinos
- loading
- error

### Funciones disponibles

- recargar()
- crear(datos)
- actualizar(id, datos)
- eliminar(id)

### Quién lo consume

- ListaPage
- DetallePage
- CrearPage
- EditarPage

### Por qué es global

La lista de destinos la usan varias pantallas distintas. Con Context se carga una sola vez y, cuando una pantalla crea, edita o elimina un destino, todas las demás ven el cambio sin volver a pedir los datos.

### Qué hace y qué no hace

- **Sí:** habla con la API mediante las funciones de `api/` y actualiza el estado **solo si la petición salió bien**, siempre creando un arreglo nuevo (`[...prev, nuevo]`, `map`, `filter`).
- **No:** arma URLs, muestra avisos ni navega. El feedback al usuario lo hace cada página.

---

## ThemeContext

### Qué guarda

- isDark
- toggleTheme()

### Quién lo consume

- Navbar

### Por qué es global

Aunque hoy solo se utiliza desde la navegación principal, el tema representa una configuración general de la aplicación que potencialmente puede ser consumida por cualquier componente futuro.

---

# 🎣 Hooks Personalizados

## useLocalStorage(key, initialValue)

Hook genérico encargado de sincronizar estado con LocalStorage. Se usa para la preferencia de tema.

### Responsabilidades

- Lectura inicial lazy.
- Persistencia automática.
- Parseo y serialización JSON.

---

# 🧭 Rutas

Todas las rutas están en `routes/AppRoutes.jsx`, para que `App.jsx` quede limpio.

| Ruta                   | Pantalla     | Descripción                  |
| ---------------------- | ------------ | ---------------------------- |
| `/`                    | —            | Redirige a `/destinos`       |
| `/destinos`            | ListaPage    | Lista con búsqueda y filtros |
| `/destinos/nuevo`      | CrearPage    | Formulario de alta           |
| `/destinos/:id`        | DetallePage  | Detalle de un destino        |
| `/destinos/:id/editar` | EditarPage   | Formulario de edición        |
| `*`                    | NotFoundPage | Página no encontrada         |

React Router ordena las rutas por especificidad, por lo que `/destinos/nuevo` no se confunde con `/destinos/:id` sin importar el orden en que se declaren.

---

# 📊 Decisiones de Estado

## Estado Global

Se decidió utilizar Context únicamente para información compartida por múltiples pantallas:

### Destinos

Necesarios en:

- Lista
- Detalle
- Alta
- Edición

### Tema

Configuración visual aplicable a toda la aplicación.

---

## Estado Local y otros lugares


### Destino a eliminar y modal de confirmación

Permanecen dentro de `ListaPage` y `DetallePage`, porque ningún otro componente necesita conocerlos.

### Campos del formulario

Son administrados íntegramente por React Hook Form, evitando múltiples `useState`.

### Avisos al usuario

Los muestra cada página con `toast`, según el resultado de la operación.

---

# 🔁 Prop Drilling: Antes y Después

## Antes

`App.jsx` tendría que distribuir a cada pantalla:

- destinos
- loading
- error
- crear
- actualizar
- eliminar

## Después

Cada pantalla obtiene únicamente lo que necesita mediante

De esta forma:

- Se elimina el prop drilling.
- Se reduce el acoplamiento.
- Las pantallas se mantienen sincronizadas sin pedir datos de más.

---

## ⚙️ Decisiones técnicas

- **Instancia de axios y una función por endpoint:** la configuración común (URL, headers y timeout) vive en un solo lugar y las páginas nunca arman peticiones. Si cambia el backend, se tocan los archivos de `api/`.
- **El contexto maneja estado y las páginas muestran:** el contexto llama a la API y actualiza la lista solo si salió bien; el feedback (toasts y navegación) lo hacen las páginas.
- **Detalle y edición usan la lista que ya está en memoria**, sin pedir `GET /destinos/:id`. Es menos código y una única fuente de verdad. La contrapartida es que no se ven cambios hechos por otras personas hasta recargar.
- **Los `id` de MockAPI son texto**, igual que el `:id` de la URL, por lo que se comparan sin convertirlos a número.
- **`reset()` en el formulario de edición:** `defaultValues` solo se lee al montar. Como los datos pueden llegar después (por ejemplo, al recargar la página), se cargan con `reset(destino)`.
- **Un solo formulario para alta y edición**, con las reglas de validación en un schema de Zod.
- **Estado inmutable:** crear usa spread, editar usa `map` y eliminar usa `filter`; nunca se modifica el arreglo existente.
- **Redirecciones para el deploy:** el archivo `public/_redirects` hace que Netlify sirva siempre `index.html`; sin él, recargar en `/destinos/3` daría un error 404.
- **`react-toastify`:** resuelve cola, cierre automático y temas sin escribirlo a mano. La contrapartida es una dependencia más.

---

# 📁 Estructura del Proyecto

```text
src/
├── api/
│   ├── axiosInstance.js
│   ├── destinosApi.js
│   └── errores.js
│
├── components/
│   ├── destinos/
│   │   ├── DestinoCard.jsx
│   │   ├── DestinoForm.jsx
│   │   └── FiltrosDestinos.jsx
│   │
│   ├── layout/
│   │   ├── Footer.jsx
│   │   └── Navbar.jsx
│   │
│   └── ui/
│       ├── Cargando.jsx
│       ├── ConfirmationModal.jsx
│       ├── MensajeError.jsx
│       ├── Modal.jsx
│       └── NoEncontrado.jsx
│
├── constants/
│   └── destinos.js
│
├── context/
│   ├── DestinosContext.jsx
│   └── ThemeContext.jsx
│
├── hooks/
│   ├── useLocalStorage.js
│
├── pages/
│   ├── CrearPage.jsx
│   ├── DetallePage.jsx
│   ├── EditarPage.jsx
│   ├── ListaPage.jsx
│   └── NotFoundPage.jsx
│
├── routes/
│   └── AppRoutes.jsx
│
├── schemas/
│   └── destinoSchema.js
│
├── utils/
│   ├── formato.js
│   └── texto.js
│
├── App.jsx
├── main.jsx
└── index.css
```

---

# ▶️ Instalación y Ejecución

### Clonar el repositorio

```bash
git clone https://github.com/juanpi24/Sprint5-TP5-CRUD-Destinos.git
```

### Ingresar a la carpeta del proyecto

```bash
cd Sprint5-TP5-CRUD-Destinos
```

### Instalar dependencias

```bash
npm install
```

### Variables de entorno

El repositorio ya incluye un `.env`. Si no estuviera, copiá el ejemplo y completá la URL de tu proyecto de MockAPI:

```bash
cp .env.example .env
```

### Ejecutar el servidor de desarrollo

```bash
npm run dev
```

### Generar build de producción

```bash
npm run build
```

### Visualizar build localmente

```bash
npm run preview
```

### Revisar el código con ESLint

```bash
npm run lint
```

---

# ✨ Funcionalidades adicionales

## Protección de acciones

- Los modales se cierran con la tecla Escape o haciendo clic en el fondo.
- El botón de guardar se deshabilita mientras se envía el formulario, para evitar envíos duplicados.
- Eliminar nunca ocurre sin confirmación previa.

## Pantallas de error

- Una ruta inexistente muestra una página 404 con un enlace para volver.
- Un `:id` que no existe muestra un aviso propio, tanto en el detalle como en la edición.

## Preferencia inicial del tema

- Si todavía no existe una preferencia guardada, la aplicación toma inicialmente el tema claro u oscuro configurado en el sistema operativo.
- Luego, la selección manual se guarda en LocalStorage y se aplica globalmente.

## Limitaciones conocidas

- La lista se carga completa en una sola petición (sin paginación), lo que alcanza para el tamaño actual del recurso.
- La lista en memoria no se sincroniza con cambios hechos desde otro dispositivo hasta recargar.
- No hay autenticación: cualquier persona con acceso a la aplicación puede crear, editar o eliminar.

---

# 🚀 Conceptos Aplicados

- CRUD completo con peticiones GET, POST, PUT y DELETE.
- Instancia de axios con configuración centralizada.
- Separación de la capa de API respecto de los componentes.
- Context API para el estado del recurso.
- React Router: rutas, parámetros (`useParams`), redirecciones, `NavLink`, `useSearchParams` y navegación programática.
- Formularios controlados con React Hook Form y validación con Zod.
- `useEffect` con cancelación de peticiones (`AbortController`).
- Estado derivado (lista filtrada) en lugar de estado duplicado.
- Manejo inmutable de arrays y objetos.
- Renderizado condicional (carga, error, vacío y lista).
- Variables de entorno con Vite (`import.meta.env`).
- Despliegue de una SPA con redirecciones.
- Separación de responsabilidades y eliminación de prop drilling.

---

# 🤖 Uso de Inteligencia Artificial

Durante el desarrollo del proyecto utilicé Claude (Anthropic) como apoyo para comprender conceptos, validar decisiones técnicas, revisar mi código y mejorar algunas implementaciones específicas.

## Qué partes desarrollé con ayuda de IA

- Análisis de la consigna y plan de trabajo, definiendo qué reutilizar de los sprints anteriores.
- Capa de API siguiendo la devolución del docente: instancia de axios, una función por endpoint y traducción de errores.
- `DestinosContext`: estado de la lista y acciones de crear, actualizar y eliminar, separado de las páginas.
- Rutas con React Router y su separación en `routes/AppRoutes.jsx`.
- Formulario reutilizable con React Hook Form y Zod para el alta y la edición, incluido el uso de `reset`.
- Redirecciones para el deploy en Netlify.
- Pruebas automáticas de comportamiento contra una API simulada, para verificar los flujos del CRUD.

## Qué revisé o corregí manualmente

- Creé la API en MockAPI (recurso `destinos` con sus campos) y probé las peticiones en Postman antes de escribir el código.
- Integré el código en mi repositorio y probé el funcionamiento completo de la aplicación.
- Decidí agregar los filtros por nombre y categoría y separar las rutas en su propio archivo.
- Reutilicé mis propios componentes de sprints anteriores (`Modal`, `ConfirmationModal`, `ThemeContext`, `useLocalStorage` y mi sistema de tokens de `index.css`).
- Revisé las decisiones técnicas para poder explicarlas.

## Qué tipo de consultas realicé

- Organización de una capa de API con axios y manejo de errores.
- Context API para el estado de un recurso con operaciones CRUD.
- Rutas con parámetros, redirecciones y despliegue de una SPA.
- Formularios con React Hook Form y Zod, y carga de datos en la edición.

---

## 👨‍💻 Autor

**Juan Pablo Millicay**

Proyecto realizado como parte del proceso de formación en desarrollo Frontend con React 2026.
