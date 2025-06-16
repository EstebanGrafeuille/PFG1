/**
 * Script de prueba cliente para verificar la funcionalidad de agregar libros a listas
 */

// Configuración de la prueba
const BASE_URL = "http://localhost:5000/api";
const USER_ID = "6840d3b12f43413966e77eb2";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NDBkM2IxMmY0MzQxMzk2NmU3N2ViMiIsImlhdCI6MTc1MDA5Nzk2NSwiZXhwIjoxNzUyNjg5OTY1fQ.tR7y80_vbzB0mj-J80ly5L8cKlxZ6CY9fH3TTjAL-gs";
const BOOK_ID = "bIZiAAAAMAAJ";
const LISTA = "Read";

// Función para agregar un libro a una lista
async function addToLista(userId, lista, bookId, token) {
  console.log("Cliente probando:", userId, lista, bookId);
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

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${data.message || data.error || "No se pudo agregar Libro a la lista"}`);
    }

    console.log("✅ Éxito:", data);
    return data;
  } catch (error) {
    console.error("❌ Error:", error.message);
    throw error;
  }
}

// Función para obtener listas de un usuario
async function getListas(userId, token) {
  try {
    const response = await fetch(`${BASE_URL}/books/getListas?userId=${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Cache-Control": "no-cache"
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${data.message || "No se pudieron obtener las listas"}`);
    }

    console.log("✅ Listas obtenidas:", data);
    return data;
  } catch (error) {
    console.error("❌ Error al obtener listas:", error.message);
    throw error;
  }
}

// Ejecutar pruebas
async function runTests() {
  console.log("\n=== INICIANDO PRUEBAS DEL CLIENTE ===\n");

  try {
    // 1. Obtener listas del usuario
    console.log("1. Obteniendo listas del usuario...");
    const listas = await getListas(USER_ID, TOKEN);

    // 2. Verificar que la lista existe
    console.log("\n2. Verificando que la lista existe...");
    if (listas[0] && listas[0].listasUser.includes(LISTA)) {
      console.log(`✅ Lista "${LISTA}" encontrada`);
    } else {
      console.log(`⚠️ Lista "${LISTA}" no encontrada. El test podría fallar.`);
    }

    // 3. Intentar agregar un libro a la lista
    console.log("\n3. Agregando libro a lista...");
    await addToLista(USER_ID, LISTA, BOOK_ID, TOKEN);

    // 4. Verificar resultado
    console.log("\n4. Verificando resultado...");
    const listasActualizadas = await getListas(USER_ID, TOKEN);
    console.log("\n=== PRUEBAS COMPLETADAS ===\n");

  } catch (error) {
    console.error("\n❌ Error en las pruebas:", error);
  }
}

// Ejecutar las pruebas
runTests();
