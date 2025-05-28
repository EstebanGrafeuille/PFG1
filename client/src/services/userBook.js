const BASE_URL = "http://localhost:5000";

const addLista = async (userId, lista, token) => {
  try {
    const response = await fetch(`http://localhost:5000/api/books/addLista`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
    const response = await fetch(`http://localhost:5000/api/books/getListas?userId=${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Cache-Control': 'no-cache',
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
  console.log(userId, lista, bookId, token)
  try {
    const response = await fetch(`http://localhost:5000/api/books/addLibroToLista`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify({ userId, lista, bookId })
    });

    if (!response.ok) {
      throw new Error("No se pudo agregar Libro a la lista");
    }

    const data = await response.json();
    console.log(data)
    return data;

  } catch (error) {
    throw error;
  }
};


export default {
  addLista, getListas, addToLista
};