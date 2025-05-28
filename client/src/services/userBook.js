const BASE_URL = "http://localhost:5000";

const createUserList = async (userId, listName, token) => {
  try {
    const response = await fetch(`${BASE_URL}/api/users/${userId}/userbook/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ listName })
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
  console.log("Este es el ID desde services / userBook.js: " + userId)
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

    console.log(data)

    //return await response.json();
    return data;
    
  } catch (error) {
    throw error;
  }
};


export default {
  createUserList, getListas
};