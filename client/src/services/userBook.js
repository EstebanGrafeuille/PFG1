import BASE_URL from '../services/connection.js';

const addLista = async (userId, lista, token) => {
  try {
    const response = await fetch(`${BASE_URL}/books/addLista`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ userId, lista })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al crear la lista");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

const getListas = async (userId, token) => {
  try {
    const response = await fetch(`${BASE_URL}/books/getListas?userId=${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Cache-Control": "no-cache"
      }
    });

    if (!response.ok) {
      throw new Error("No se pudo obtener el UserBook");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const addToLista = async (userId, lista, bookId, token) => {
  console.log("Cliente enviando:", userId, lista, bookId);
  try {
    // Validación de datos
    if (!userId || !lista || !bookId) {
      console.error("Error: Faltan datos requeridos", { userId, lista, bookId });
      throw new Error("Faltan datos requeridos para agregar a lista");
    }

    // Realizar la petición
    console.log(`Enviando solicitud POST a ${BASE_URL}/books/addLibroToLista`);
    console.log("Datos:", JSON.stringify({ userId, lista, bookId }));

    const response = await fetch(`${BASE_URL}/books/addLibroToLista`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
      },
      body: JSON.stringify({ userId, lista, bookId })
    });

    const data = await response.json();
    console.log("Respuesta del servidor:", data);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${data.message || data.error || "No se pudo agregar Libro a la lista"}`);
    }

    return data;
  } catch (error) {
    console.error("Error en addToLista:", error);
    throw error;
  }
};

const removeFromLista = async (userId, lista, bookId, token) => {
  console.log(userId, lista, bookId, token);
  try {
    const response = await fetch(`${BASE_URL}/books/removeFromLista`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
      },
      body: JSON.stringify({ userId, lista, bookId })
    });

    if (!response.ok) {
      throw new Error("No se pudo libro de la Lista");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
};

const removeList = async (userId, lista, token) => {
  try {
    const response = await fetch(`${BASE_URL}/books/deleteLista`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
      },
      body: JSON.stringify({ userId, lista })
    });

    if (!response.ok) {
      throw new Error("No se pudo eliminar la lista");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
};

const getLista = async (userId, lista, token) => {
  try {
    const response = await fetch(
      `${BASE_URL}/books/getLista?userId=${userId}&lista=${lista}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache"
        }
      }
    );

    if (!response.ok) {
      throw new Error("No se pudo obtener la Lista");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const isInLista = async (userId, lista, bookId, token) => {
  try {
    console.log(`Verificando si el libro ${bookId} está en la lista ${lista}`);

    const response = await fetch(
      `${BASE_URL}/books/getLista?userId=${userId}&lista=${lista}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache"
        }
      }
    );

    if (!response.ok) {
      throw new Error("No se pudo obtener la Lista");
    }

    const data = await response.json();
    console.log(`Libros en la lista ${lista}:`, data);

    // Verificar si el bookId está en la lista
    const exists = Array.isArray(data) && data.includes(bookId);
    console.log(`¿Libro ${bookId} está en la lista ${lista}?`, exists);

    return exists;
  } catch (error) {
    console.error(`Error al verificar si el libro está en la lista ${lista}:`, error);
    return false;
  }
};

export default {
  addLista,
  getListas,
  addToLista,
  getLista,
  removeFromLista,
  isInLista,
  removeList
};
