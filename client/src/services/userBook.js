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

const getUserBook = async (userId, token) => {
  const response = await fetch(`${BASE_URL}/api/users/${userId}/userbook`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("No se pudo obtener el UserBook");
  }

  return await response.json();
};

export default {
  createUserList, getUserBook
};