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
| Framework | Vue 3 (Options API + Composition API / composables) |
| Manejo de estado | Vuex 4, organizado por módulos (`auth`, `journal`) |
| Ruteo | Vue Router 4 (hash history) |
| HTTP | Axios |
| UI | Bootstrap 5, SCSS, Font Awesome, SweetAlert2 |
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
│       ├── helpers/       # Subida/borrado de imágenes, formateo de fechas
│       ├── layouts/
│       ├── router/
│       ├── store/
│       └── views/
├── router/               # Router raíz, combina los routers de cada módulo
├── store/                # Store raíz, combina los módulos de Vuex
└── views/                # Home / About
```

## 🚀 Cómo correrlo localmente

### Requisitos previos

Necesitas tu propio proyecto de **Firebase** (Authentication con proveedor Email/Password + Realtime Database) y tu propia cuenta de **Cloudinary** con un *upload preset* (unsigned).

### Instalación

```bash
npm install
```

### Configura tus credenciales

Actualmente las credenciales de Firebase y Cloudinary están definidas directamente en:

- [`src/api/authApi.js`](src/api/authApi.js) — API key de Firebase
- [`src/api/journalApi.js`](src/api/journalApi.js) — URL de la Realtime Database
- [`src/modules/daybook/helpers/uploadImage.js`](src/modules/daybook/helpers/uploadImage.js) — cloud name y upload preset de Cloudinary

Reemplázalas por las de tu propio proyecto antes de correr la app.

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
- El *upload preset* de Cloudinary es de tipo *unsigned*, pensado para uso didáctico; en un entorno de producción real debería restringirse (tamaño, formato, carpeta) o reemplazarse por un flujo firmado desde un backend.
- La función de borrado de imágenes en Cloudinary ([`deleteImage.js`](src/modules/daybook/helpers/deleteImage.js)) no está implementada todavía: las imágenes subidas no se eliminan del storage al borrar una entrada.
- Las vistas `Home` y `About` son de propósito general / placeholder.

## 📌 Roadmap / posibles mejoras

- [ ] Mover las credenciales a variables de entorno (`.env`) en vez de tenerlas hardcodeadas.
- [ ] Implementar el borrado real de imágenes en Cloudinary al eliminar una entrada.
- [ ] Migrar el manejo de estado de Vuex a Pinia.
- [ ] Agregar paginación o carga incremental de entradas.
- [ ] Mejorar accesibilidad y diseño responsive.

## 📄 Licencia

Proyecto de uso personal / educativo.
