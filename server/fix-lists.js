/**
 * Script para corregir las listas de usuario
 */
const mongoose = require('mongoose');
const UserBook = require('./src/models/UserBook');
require('dotenv').config();

// ID del usuario a corregir
const USER_ID = "6840d3b12f43413966e77eb2";

// Listas estándar que deberían existir
const LISTAS_ESTANDAR = ["Read", "Reading", "Favorites"];

async function corregirListas() {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    // Buscar el UserBook del usuario
    const userBook = await UserBook.findOne({ userId: USER_ID });

    if (!userBook) {
      console.log('❌ Usuario no encontrado. Creando nuevo UserBook...');
      const nuevoUserBook = new UserBook({
        userId: USER_ID,
        listasUser: LISTAS_ESTANDAR,
        libros: []
      });
      await nuevoUserBook.save();
      console.log('✅ Nuevo UserBook creado con listas estándar');
      return;
    }

    console.log('Listas actuales:', userBook.listasUser);

    // Verificar las listas estándar y agregarlas si faltan
    let listasActualizadas = [...userBook.listasUser];
    let cambiosRealizados = false;

    for (const lista of LISTAS_ESTANDAR) {
      if (!listasActualizadas.includes(lista)) {
        console.log(`Añadiendo lista estándar: ${lista}`);
        listasActualizadas.push(lista);
        cambiosRealizados = true;
      }
    }

    // Si hay cambios, actualizar el documento
    if (cambiosRealizados) {
      console.log('Actualizando listas del usuario...');
      await UserBook.updateOne(
        { userId: USER_ID },
        { $set: { listasUser: listasActualizadas } }
      );
      console.log('✅ Listas actualizadas correctamente');
    } else {
      console.log('✅ Las listas estándar ya están configuradas correctamente');
    }

    // Mostrar el resultado final
    const userBookActualizado = await UserBook.findOne({ userId: USER_ID });
    console.log('Listas finales:', userBookActualizado.listasUser);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    // Cerrar la conexión
    await mongoose.disconnect();
    console.log('Desconectado de MongoDB');
  }
}

// Ejecutar la función principal
corregirListas();
