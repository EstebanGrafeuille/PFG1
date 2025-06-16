# BookTracker API - Backend

API REST para la aplicación BookTracker que permite gestionar usuarios, libros y listas de lectura con integración a Google Books API.

## Estructura del Proyecto

El proyecto sigue una arquitectura MVC organizada por funcionalidad:

```
server/
  ├── config/               # Configuración de base de datos y variables
  ├── controllers/          # Controladores de las rutas
  ├── middleware/           # Middleware personalizado (auth, validación, upload de imagenes)
  ├── models/               # Modelos de MongoDB/Mongoose
  ├── routes/               # Definición de rutas de la API
  ├── services/             # Lógica de negocio y servicios externos
  ├── utils/                # Utilidades y helpers
  ├── tests/                # Tests unitarios e integración
```

## Características Principales

- **Autenticación JWT**: Registro y login de usuarios
- **Gestión de Listas**: CRUD de listas con integración a Google Books API
- **Listas de Usuario**: Favoritos, por leer, leídos (favorites, next, read)
- **Perfil de Usuario**: Estadísticas y preferencias
- **Reseñas**: Sistema de reseñas y calificaciones
- **Validación**: Validación de datos con middleware personalizado

## Tecnologías Utilizadas

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación con tokens
- **bcryptjs** - Hash de contraseñas
- **Google Books API** - Búsqueda de libros
- **Joi/express-validator** - Validación de datos

## Variables de Entorno

Crea un archivo `.env` en la raíz del servidor con las siguientes variables:

```env
# Base de datos
MONGODB_URI=mongodb://localhost:27017/booktracker

# JWT
JWT_SECRET=tu_secreto_jwt_super_seguro
JWT_EXPIRES_IN=7d

# Google Books API
GOOGLE_BOOKS_API_KEY=tu_google_books_api_key

# Servidor
PORT=3001
NODE_ENV=development
```

## Instalación y Ejecución

### Desarrollo

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Configura las variables de entorno (ver sección anterior)

3. Inicia MongoDB:

   ```bash
   # Windows
   net start MongoDB

   # macOS/Linux
   sudo systemctl start mongod
   ```

4. Ejecuta el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

### Producción

```bash
npm start
```

## Scripts Disponibles

```json
{
  "start": "node app.js",
  "dev": "nodemon app.js"
}
```

## API Endpoints

### Autenticación

```
POST /api/auth/register         # Registrar usuario
POST /api/auth/login            # Iniciar sesión
POST /api/auth/forgotPassword   # Solicitar reset de contraseña
POST /api/auth/resetPassword    # Restablecer contraseña
GET  /api/auth/me               # Obtener perfil (requiere auth)
```

### Usuarios

```
GET    /api/users/:id                    # Obtener usuario por ID (requiere auth)
GET    /api/users/username/:username     # Obtener usuario por username (requiere auth)
PUT    /api/users/:id                    # Actualizar usuario (requiere auth)
PUT    /api/users/:id/image              # Actualizar imagen de perfil (requiere auth)
DELETE /api/users/:id                    # Eliminar usuario (requiere auth)
```

### Libros y Listas

```
GET    /api/books/getLista               # Obtener lista específica (requiere auth)
GET    /api/books/getAllLibros           # Obtener todos los libros (requiere auth)
GET    /api/books/getListas              # Obtener todas las listas del usuario (requiere auth)
POST   /api/books/addLista               # Crear nueva lista (requiere auth)
POST   /api/books/addLibroToLista        # Agregar libro a lista (requiere auth)
DELETE /api/books/removeFromLista        # Remover libro de lista (requiere auth)
DELETE /api/books/deleteLista            # Eliminar lista completa (requiere auth)
```

### Reseñas

```
GET    /api/reviews/book/:googleId                   # Obtener reseñas de un libro (público)
GET    /api/reviews/:id                              # Obtener reseña por ID (público)
GET    /api/reviews/user/:userId/book/:googleId      # Obtener reseña específica de usuario (requiere auth)
POST   /api/reviews                                  # Crear reseña (requiere auth)
PUT    /api/reviews/:id                              # Actualizar reseña (requiere auth)
DELETE /api/reviews/:id                              # Eliminar reseña (requiere auth)
```

## Estructura de Datos

### Usuario

```json
{
  "_id": "ObjectId",
  "username": "string (4-15 caracteres, único)",
  "email": "string (único, formato válido)",
  "password": "string (hashed, mínimo 8 caracteres)",
  "biography": "string (máximo 500 caracteres)",
  "image": "string (URL de imagen de perfil)",
  "createdAt": "Date",
  "resetCode": "string (código de reset de contraseña)",
  "resetCodeExpires": "Date (expiración del código)"
}
```

### UserBook (Listas de Usuario)

```json
{
  "_id": "ObjectId",
  "userId": "string (referencia a User)",
  "listasUser": ["string (nombres de listas del usuario)"],
  "libros": [
    {
      "googleId": "string (ID de Google Books)",
      "listasLibro": ["string (listas que contienen este libro)"]
    }
  ]
}
```

**Métodos disponibles:**

- `checkLista(lista)`: Verifica si el usuario tiene una lista específica

### Review (Reseñas)

```json
{
  "_id": "ObjectId",
  "user": "ObjectId (referencia a User)",
  "googleId": "string (ID del libro de Google Books)",
  "comment": "string (máximo 2000 caracteres)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

**Índices:**

- Índice único compuesto en `user` + `googleId` (un usuario solo puede reseñar un libro una vez)

## Relaciones entre Modelos

### Usuario → UserBook

- Un usuario puede tener múltiples listas personalizadas
- Cada UserBook pertenece a un solo usuario (`userId`)

### Usuario → Review

- Un usuario puede crear múltiples reseñas
- Cada reseña pertenece a un solo usuario (`user`)
- Un usuario solo puede reseñar cada libro una vez (índice único)

### UserBook → Google Books

- Los libros se identifican por `googleId` (ID de Google Books API)
- No se almacena información completa del libro en la BD local
- La información del libro se obtiene dinámicamente de Google Books API

## Desarrollo

### Convenciones

1. **Controladores**: Un archivo por recurso (userController.js)
2. **Modelos**: Usar Mongoose schemas con validación
3. **Rutas**: Agrupar por funcionalidad
4. **Servicios**: Lógica de negocio separada de controladores

## Seguridad

- Contraseñas hasheadas con bcryptjs
- Validación de datos en todas las rutas
- Rate limiting implementado
- Headers de seguridad configurados
- Variables sensibles en .env (no commitear)
