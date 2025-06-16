import BASE_URL from "../services/connection.js";

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
    // Usamos la función estándar fetch para mantener compatibilidad
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
  try {
    const response = await fetch(`${BASE_URL}/books/addLibroToLista`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Cache-Control": "no-cache"
      },
      body: JSON.stringify({ userId, lista, bookId })
    });

    if (!response.ok) {
      throw new Error("No se pudo agregar Libro a la lista");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const removeFromLista = async (userId, lista, bookId, token) => {
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
    const response = await fetch(`${BASE_URL}/books/getLista?userId=${userId}&lista=${lista}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Cache-Control": "no-cache"
      }
    });

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
    const response = await fetch(`${BASE_URL}/books/getLista?userId=${userId}&lista=${lista}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Cache-Control": "no-cache"
      }
    });

    if (!response.ok) {
      throw new Error("No se pudo obtener la Lista");
    }

    const data = await response.json();

    const exists = data.includes(bookId);

    return exists;
  } catch (error) {
    throw error;
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
