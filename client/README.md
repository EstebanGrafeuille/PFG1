# Aplicación de Búsqueda y Gestión de Libros

Esta aplicación permite buscar libros utilizando la API de Google Books, ver detalles de los libros y organizarlos en diferentes listas (favoritos, por leer, leídos).

## Estructura del Proyecto

El proyecto sigue una estructura organizada por funcionalidad para facilitar el mantenimiento y la escalabilidad:

```
src/
  ├── api/                  # Servicios y llamadas a API
  ├── components/           # Componentes reutilizables
  │   ├── ui/               # Componentes de UI básicos
  │   ├── books/            # Componentes específicos de libros
  │   └── profile/          # Componentes de perfil
  ├── hooks/                # Hooks personalizados
  ├── navigation/           # Configuración de navegación
  ├── screens/              # Pantallas organizadas por funcionalidad
  ├── utils/                # Utilidades y helpers
  ├── constants/            # Constantes, colores, dimensiones
  └── context/              # Contextos de React
```

Para más detalles sobre la estructura, consulta [ESTRUCTURA.md](./ESTRUCTURA.md).

## Documentación

- [ESTRUCTURA.md](./ESTRUCTURA.md): Describe la estructura del proyecto y las convenciones utilizadas.
- [MIGRACION.md](./MIGRACION.md): Guía para migrar el código a la nueva estructura.
- [IMPLEMENTACION.md](./IMPLEMENTACION.md): Plan de implementación gradual de la nueva estructura.

## Características Principales

- Búsqueda de libros en la API de Google Books
- Visualización de detalles de libros
- Gestión de listas de libros (favoritos, por leer, leídos)
- Perfil de usuario con estadísticas de lectura

## Tecnologías Utilizadas

- React Native
- React Navigation
- Context API para gestión de estado
- Hooks personalizados para lógica reutilizable
- Google Books API

## Instalación y Ejecución

1. Clona el repositorio
2. Instala las dependencias:
   ```
   npm install
   ```
3. Inicia la aplicación:
   ```
   npm start
   ```

## Desarrollo

Para contribuir al desarrollo:

1. Sigue la estructura de directorios descrita en [ESTRUCTURA.md](./ESTRUCTURA.md)
2. Utiliza los hooks personalizados para la lógica reutilizable
3. Mantén los componentes pequeños y enfocados
4. Documenta el código con JSDoc
5. Sigue las convenciones de nomenclatura establecidas
