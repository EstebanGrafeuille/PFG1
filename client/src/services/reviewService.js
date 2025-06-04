const BASE_URL = "http://192.168.0.11:5000/api"; // Cambiá si usás IP real o deploy

const addReview = async (googleId, comment, token) => {
  const response = await fetch(`${BASE_URL}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      googleId,
      comment
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al guardar la reseña");
  }

  return await response.json();
};

const getReviewsByBook = async (googleId) => {
  const response = await fetch(`${BASE_URL}/reviews/book/${googleId}`);

  if (!response.ok) {
    throw new Error("Error al obtener reseñas");
  }

  return await response.json();
};

const getUserReview = async (userId, googleId, token) => {
  const response = await fetch(`${BASE_URL}/reviews/user/${userId}/book/${googleId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error("Error al obtener la reseña del usuario");
  }

  return await response.json();
};

const updateReview = async (reviewId, comment, token) => {
  const response = await fetch(`${BASE_URL}/reviews/${reviewId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ comment }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al actualizar la reseña");
  }

  return await response.json();
};

const deleteReview = async (reviewId, token) => {
  const response = await fetch(`${BASE_URL}/reviews/${reviewId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al eliminar la reseña");
  }

  return await response.json();
};


export default {
  addReview,
  getReviewsByBook,
  getUserReview,
  deleteReview,
  updateReview
};
