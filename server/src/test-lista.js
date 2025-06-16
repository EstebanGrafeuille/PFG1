/**
 * Script de prueba para verificar la funcionalidad de agregar libros a listas
 */
const mongoose = require('mongoose');
require('dotenv').config();
const UserBook = require('./models/UserBook');

// IDs de prueba
const USUARIO_ID = "6840d3b12f43413966e77eb2";
const LIBRO_ID = "bIZiAAAAMAAJ";
const LISTA = "Read";

// Conectar a la base de datos
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB conectado para pruebas');
    runTests();
  })
  .catch(err => {
    console.error('❌ Error al conectar a MongoDB:', err);
    process.exit(1);
  });

async function runTests() {
  try {
    console.log('\n--- INICIO DE PRUEBAS ---\n');

    // 1. Verificar si el usuario existe
    console.log('1. Buscando UserBook para el usuario:', USUARIO_ID);
    let userBook = await UserBook.findOne({ userId: USUARIO_ID });

    if (!userBook) {
      console.log('❌ Usuario no encontrado. Creando uno nuevo...');
      userBook = new UserBook({
        userId: USUARIO_ID,
        listasUser: ["Read", "Reading", "Favorites"],
        libros: []
      });
      await userBook.save();
      console.log('✅ Usuario creado exitosamente');
    } else {
      console.log('✅ Usuario encontrado:', userBook._id);
      console.log('Listas disponibles:', userBook.listasUser);
    }

    // 2. Verificar si la lista existe
    console.log('\n2. Verificando si la lista existe:', LISTA);
    if (!userBook.listasUser.includes(LISTA)) {
      console.log(`❌ Lista "${LISTA}" no encontrada. Creándola...`);
      userBook.listasUser.push(LISTA);
      await userBook.save();
      console.log(`✅ Lista "${LISTA}" creada`);
    } else {
      console.log(`✅ Lista "${LISTA}" encontrada`);
    }

    // 3. Verificar si el libro ya está en la lista
    console.log('\n3. Verificando si el libro ya está en la lista');
    const libroIndex = userBook.libros.findIndex(l => l.googleId === LIBRO_ID);

    if (libroIndex !== -1) {
      console.log('✅ Libro encontrado en el UserBook');

      // Verificar si ya está en la lista específica
      if (userBook.libros[libroIndex].listasLibro.includes(LISTA)) {
        console.log(`⚠️ El libro ya está en la lista "${LISTA}"`);

        // Opcional: Quitarlo para poder probarlo de nuevo
        userBook.libros[libroIndex].listasLibro = userBook.libros[libroIndex].listasLibro.filter(l => l !== LISTA);
        await userBook.save();
        console.log(`✅ Libro eliminado de la lista "${LISTA}" para pruebas`);
      } else {
        console.log(`ℹ️ El libro existe pero no está en la lista "${LISTA}"`);
      }
    } else {
      console.log('ℹ️ Libro no encontrado en el UserBook');
    }

    // 4. Agregar libro a la lista
    console.log('\n4. Agregando libro a la lista');

    if (libroIndex !== -1) {
      // El libro ya existe, solo agregar a la lista
      await UserBook.updateOne(
        { userId: USUARIO_ID, "libros.googleId": LIBRO_ID },
        { $addToSet: { "libros.$.listasLibro": LISTA } }
      );
    } else {
      // El libro no existe, crear nuevo registro
      await UserBook.updateOne(
        { userId: USUARIO_ID },
        { $push: { libros: {
          googleId: LIBRO_ID,
          listasLibro: [LISTA]
        }}}
      );
    }

    console.log('✅ Operación completada');

    // 5. Verificar el resultado
    console.log('\n5. Verificando resultado');
    userBook = await UserBook.findOne({ userId: USUARIO_ID });

    const libroActualizado = userBook.libros.find(l => l.googleId === LIBRO_ID);
    if (libroActualizado && libroActualizado.listasLibro.includes(LISTA)) {
      console.log(`✅ ÉXITO: El libro está ahora en la lista "${LISTA}"`);
    } else {
      console.log(`❌ ERROR: El libro no se agregó a la lista "${LISTA}"`);
    }

    console.log('\n--- PRUEBAS COMPLETADAS ---\n');

  } catch (error) {
    console.error('❌ Error durante las pruebas:', error);
  } finally {
    // Cerrar conexión
    mongoose.connection.close();
    console.log('Conexión a MongoDB cerrada');
  }
}
