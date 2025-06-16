# BookTracker App

Aplicación fullstack para buscar, guardar y gestionar libros utilizando React Native y Node.js.

## Estructura del proyecto

- **client/**: Frontend en React Native
- **server/**: Backend en Node.js

## Requisitos

- Node.js 16+
- npm o yarn
- Expo CLI

## Instalación

```bash
# Instalar todas las dependencias
npm run install-all

# Iniciar desarrollo (frontend y backend)
npm run dev

# Iniciar solo frontend
npm run client

# Iniciar solo backend
npm run server
```

## Configuración de seguridad

La aplicación implementa diversas medidas de seguridad:

1. **Variables de entorno**: Crear archivo `.env` basado en `.env.template` con tus credenciales.
2. **Autenticación**: Sistema JWT con middleware de autorización para rutas protegidas.
3. **Protección contra ataques**: Implementación de rate limiting, cabeceras HTTP seguras y validaciones.
4. **Almacenamiento seguro**: Contraseñas hasheadas con bcrypt, imágenes almacenadas en Cloudinary con validación.

Para más detalles sobre la seguridad del sistema, consulta el documento [seguridad-integridad-sistemas.md](./seguridad-integridad-sistemas.md).

### Buenas prácticas de seguridad

- Mantener las dependencias actualizadas: `npm audit` y `npm update`
- No exponer variables de entorno en el código fuente
- Usar HTTPS en producción
- Implementar políticas de contraseñas seguras
- Validar todas las entradas de usuario

## Notas para desarrollo

```
// "userId": "6834a749616656319f70feb4"

// Codigo de libros para testear
// In8mDwAAQBAJ
// L88qEAAAQBAJ
// KVGd-NabpW0C
// UGUahZnpa0MC

// LIistas de USERBOOK:

# 0
# "favoritos"
# 1
# "leidos"
# 2
# "leyendo"
# 3
# "Lista del Front"
```
