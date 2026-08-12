# 📔 Journal — Bitácora diaria con Vue 3

Aplicación de diario/bitácora personal donde cada usuario puede registrarse, iniciar sesión y llevar entradas diarias con texto y una foto opcional. Construida con **Vue 3**, **Vuex 4** y **Vue Router 4**, con autenticación y persistencia contra **Firebase** y almacenamiento de imágenes en **Cloudinary**.

> Proyecto personal de práctica / aprendizaje, construido siguiendo un curso de Vue 3, y luego extendido con pruebas unitarias propias.

## ✨ Funcionalidades

- **Registro e inicio de sesión** con email y contraseña.
- **Rutas protegidas**: la sección `/daybook` solo es accesible con sesión activa (route guard que valida el token contra Firebase).
- **CRUD de entradas**: crear, editar, buscar y borrar entradas del diario.
- Cada entrada guarda **fecha, texto y una foto opcional**.
- **Subida de imágenes** a Cloudinary asociadas a cada entrada.
- **Buscador** de entradas por texto.
- Sesión persistente (token guardado en `localStorage`, se revalida al recargar la app).
- Cierre de sesión que limpia el estado de auth y del diario.

## 🧱 Stack técnico

| Categoría | Tecnología |
|---|---|
| Framework | Vue 3 (Composition API vía `setup()`, con composables) |
| Manejo de estado | Vuex 4, organizado por módulos (`auth`, `journal`) |
| Ruteo | Vue Router 4 (hash history) |
| HTTP | Axios |
| UI | Bootstrap 5, SCSS, Font Awesome 6 (vía CDN), SweetAlert2 |
| Testing | Jest + Vue Test Utils + `vue-router-mock` |
| Build | Vue CLI 5 |

## 🔌 Servicios de terceros

| Servicio | Para qué se usa |
|---|---|
| [Firebase Authentication](https://firebase.google.com/docs/auth) (REST / Identity Toolkit) | Registro, login y verificación de sesión |
| [Firebase Realtime Database](https://firebase.google.com/docs/database) | Persistencia de las entradas del diario |
| [Cloudinary](https://cloudinary.com/) | Almacenamiento y entrega de las imágenes subidas en cada entrada |

## 🗂️ Estructura del proyecto

El código está organizado por **módulos de dominio**, cada uno con su propio router, store y vistas:

```
src/
├── api/                 # Instancias de Axios (Firebase Auth / Realtime Database)
├── modules/
│   ├── auth/             # Login, registro, guard de rutas, store de sesión
│   │   ├── composables/  # useAuth()
│   │   ├── layouts/
│   │   ├── router/
│   │   ├── store/
│   │   └── views/
│   └── daybook/          # Bitácora: listado y edición de entradas
│       ├── components/
│       ├── helpers/       # Subida de imágenes, formateo de fechas
│       ├── layouts/
│       ├── router/
│       ├── store/
│       └── views/
├── router/               # Router raíz, combina los routers de cada módulo
└── store/                # Store raíz, combina los módulos de Vuex
```

## 🚀 Cómo correrlo localmente

### Requisitos previos

Necesitas tu propio proyecto de **Firebase** (Authentication con proveedor Email/Password + Realtime Database) y tu propia cuenta de **Cloudinary** con un *upload preset* (unsigned).

### Instalación

```bash
npm install
```

### Configura tus credenciales

Las credenciales de Firebase y Cloudinary se leen desde variables de entorno. Copia el archivo de ejemplo y completa los valores con los de tu propio proyecto:

```bash
cp .env.example .env.local
```

```bash
# .env.local (nunca se sube a git)
VUE_APP_FIREBASE_API_KEY=
VUE_APP_FIREBASE_DB_URL=

VUE_APP_CLOUDINARY_CLOUD_NAME=
VUE_APP_CLOUDINARY_UPLOAD_PRESET=
```

`.env.local` está ignorado por git (ver `.gitignore`), así que tus credenciales nunca quedan en el historial.

### Levantar en modo desarrollo

```bash
npm run serve
```

### Compilar para producción

```bash
npm run build
```

### Correr las pruebas unitarias

```bash
npm run test:unit
```

### Lint

```bash
npm run lint
```

## 🧪 Testing

El proyecto incluye pruebas unitarias con Jest y Vue Test Utils que cubren:

- Acciones, mutaciones y getters del módulo de autenticación (Vuex).
- El composable `useAuth`.
- La vista de Login (con snapshot testing).
- El componente Navbar (usando `vue-router-mock`).

## ⚠️ Notas y limitaciones conocidas

- El registro de usuarios es público y sin verificación de email — cualquiera puede crear una cuenta.
- El *upload preset* de Cloudinary es de tipo *unsigned* (validado en cliente por tipo y tamaño de archivo como mitigación básica), pensado para uso didáctico; en un entorno de producción real debería reemplazarse por un flujo firmado desde un backend.
- El borrado de imágenes en Cloudinary al eliminar una entrada **no está implementado a propósito**: hacerlo de forma segura requiere una petición firmada con el API secret de Cloudinary, algo que no se puede exponer en un cliente sin backend. Las imágenes borradas de una entrada quedan huérfanas en el storage.
- Las credenciales ya viven en variables de entorno (`.env.local`, fuera de git), pero la API key de Firebase usada durante el desarrollo del curso quedó expuesta en commits antiguos del historial — pendiente rotarla en la consola de Firebase.

## 📌 Roadmap / posibles mejoras

- [ ] Rotar la API key de Firebase expuesta en commits antiguos del historial de git.
- [ ] Reemplazar el *upload preset* unsigned de Cloudinary por un flujo firmado desde un backend (y con eso, implementar el borrado real de imágenes).
- [ ] Migrar el manejo de estado de Vuex a Pinia.
- [ ] Agregar paginación o carga incremental de entradas.
- [ ] Mejorar accesibilidad y diseño responsive.
- [ ] Reemplazar los tests de integración que pegan contra Firebase real ([`auth-module.spec.js`](tests/unit/modules/auth/store/auth-module.spec.js), [`journal-module.spec.js`](tests/unit/modules/daybook/store/journal/journal-module.spec.js)) por mocks de `authApi`/`journalApi`.

## 📄 Licencia

Proyecto de uso personal / educativo.
