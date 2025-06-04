const BASE_URL = "http://localhost:5000/api"; // Cambiá si usás IP real o deploy

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

export default {
  addReview,
  getReviewsByBook,
  getUserReview
};
