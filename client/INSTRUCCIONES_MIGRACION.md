# Instrucciones para Migrar a la Nueva Estructura

Este documento proporciona instrucciones paso a paso para migrar el proyecto a la nueva estructura de directorios.

## Paso 1: Crear Directorios

Crear los siguientes directorios en la estructura del proyecto:

```
src/api
src/hooks
src/utils
src/constants
src/context
src/components/ui
src/components/books
src/components/profile
```

## Paso 2: Mover y Renombrar Archivos

### API

1. Copiar el contenido de `src/api_booksApi.js` a un nuevo archivo `src/api/booksApi.js`
2. Eliminar `src/api_booksApi.js` cuando se confirme que todo funciona correctamente

### Hooks

1. Copiar el contenido de `src/hooks_useBookSearch.js` a un nuevo archivo `src/hooks/useBookSearch.js`
2. Copiar el contenido de `src/hooks_useBookDetails.js` a un nuevo archivo `src/hooks/useBookDetails.js`
3. Eliminar los archivos originales cuando se confirme que todo funciona correctamente

### Componentes UI

1. Copiar el contenido de `src/components/ui_SearchBar.js` a un nuevo archivo `src/components/ui/SearchBar.js`
2. Copiar el contenido de `src/components/ui_LoadingIndicator.js` a un nuevo archivo `src/components/ui/LoadingIndicator.js`
3. Eliminar los archivos originales cuando se confirme que todo funciona correctamente

### Componentes de Libros

1. Copiar el contenido de `src/components/books_BookItem.js` a un nuevo archivo `src/components/books/BookItem.js`
2. Copiar el contenido de `src/components/BookItem.js` a un nuevo archivo `src/components/books/BookItem.js` (si se prefiere la versión original)
3. Eliminar los archivos originales cuando se confirme que todo funciona correctamente

### Constantes

1. Copiar el contenido de `src/constants_colors.js` a un nuevo archivo `src/constants/colors.js`
2. Copiar el contenido de `src/constants_layout.js` a un nuevo archivo `src/constants/layout.js`
3. Eliminar los archivos originales cuando se confirme que todo funciona correctamente

### Utilidades

1. Copiar el contenido de `src/utils_helpers.js` a un nuevo archivo `src/utils/helpers.js`
2. Eliminar el archivo original cuando se confirme que todo funciona correctamente

### Contexto

1. Copiar el contenido de `src/context_BooksContext.js` a un nuevo archivo `src/context/BooksContext.js`
2. Eliminar el archivo original cuando se confirme que todo funciona correctamente

## Paso 3: Actualizar Importaciones

### En App.js

Cambiar:

```javascript
import { BooksProvider } from "./src/context_BooksContext";
```

A:

```javascript
import { BooksProvider } from "./src/context/BooksContext";
```

### En SearchScreen.js

Cambiar:

```javascript
import BookItem from "../../components/BookItem";
import useBookSearch from "../../hooks_useBookSearch";
import { LoadingIndicator, LoadingFooter } from "../../components/ui_LoadingIndicator";
import SearchBar from "../../components/ui_SearchBar";
import Colors from "../../constants_colors";
import Layout from "../../constants_layout";
```

A:

```javascript
import BookItem from "../../components/books/BookItem";
import useBookSearch from "../../hooks/useBookSearch";
import { LoadingIndicator, LoadingFooter } from "../../components/ui/LoadingIndicator";
import SearchBar from "../../components/ui/SearchBar";
import Colors from "../../constants/colors";
import Layout from "../../constants/layout";
```

### En DetailBookScreen.js

Cambiar:

```javascript
import useBookDetails from "../../hooks_useBookDetails";
import { LoadingIndicator } from "../../components/ui_LoadingIndicator";
import Colors from "../../constants_colors";
import Layout from "../../constants_layout";
import { useBooks } from "../../context_BooksContext";
import { formatDate, getLanguageName } from "../../utils_helpers";
```

A:

```javascript
import useBookDetails from "../../hooks/useBookDetails";
import { LoadingIndicator } from "../../components/ui/LoadingIndicator";
import Colors from "../../constants/colors";
import Layout from "../../constants/layout";
import { useBooks } from "../../context/BooksContext";
import { formatDate, getLanguageName } from "../../utils/helpers";
```

### En hooks/useBookSearch.js

Cambiar:

```javascript
import { searchBooks } from "../api_booksApi";
```

A:

```javascript
import { searchBooks } from "../api/booksApi";
```

### En hooks/useBookDetails.js

Cambiar:

```javascript
import { getBookDetails } from "../api_booksApi";
```

A:

```javascript
import { getBookDetails } from "../api/booksApi";
```

## Paso 4: Verificar Funcionalidad

Después de completar la migración, verificar que la aplicación funcione correctamente:

1. Ejecutar la aplicación
2. Probar la búsqueda de libros
3. Probar la visualización de detalles de libros
4. Verificar que todas las funcionalidades sigan funcionando como se espera

## Notas Adicionales

- Realizar la migración de manera gradual, verificando la funcionalidad después de cada paso
- Mantener copias de seguridad de los archivos originales hasta confirmar que todo funciona correctamente
- Seguir las convenciones de nomenclatura establecidas en ESTRUCTURA.md
