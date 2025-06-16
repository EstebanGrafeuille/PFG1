// server\src\services\bookService.js
const UserBook = require("../models/UserBook");

class BookService {
	// Obtener libros favoritos del usuario
  async createUB(id){
    console.log("Creando UserBook con ID: " + id)
    try{
      // Verificar si el usuario ya tiene un UserBook
      const existente = await UserBook.findOne({userId: id});

      if(existente != null){
        console.log("Ya existe el UserBook:", existente)
        return existente; // Devolver el existente en lugar de lanzar un error
      } else {
        // Crear un nuevo UserBook con las listas predeterminadas
        const userbook = new UserBook({
          userId: id,
          listasUser: ["Read", "Reading", "Favorites"],
          libros: []
        });

        console.log("Creando nuevo UserBook:", userbook);
        await userbook.save();
        return userbook;
      }
    } catch(error) {
      console.error("Error al crear UserBook:", error);
      throw error; // Propagar el error para manejarlo en el controlador
    }
  }
	async getFavorites(userId) {
		const userBooks = await UserBook.find({
			user: userId,
			status: "favorite",
		});
		return userBooks.map((ub) => ub.googleId);
	}

	// Añadir libro a favoritos
	async addToFavorites(userId, bookId) {
		const existingFavorite = await UserBook.findOne({
			user: userId,
			googleId: bookId,
			status: "favorite",
		});

		if (existingFavorite) throw new Error("El libro ya está en favoritos");

		await UserBook.create({
			user: userId,
			googleId: bookId,
			status: "favorite",
		});
	}

  async removeFromLista(userId, lista, libroId) {
  const userbook = await UserBook.findOne({ userId });
  //console.log(userbook.listasUser);

  if (!userbook) {
    throw new Error("usuario inexistente");
  }
  // Verifica que la lista exista para el usuario
  const listaExiste = userbook.listasUser.includes(lista);
  //console.log(listaExiste)
  if (!listaExiste) {
    throw new Error("lista inexistente");
  }
  // Verifica si el libro existe
  const libroExistente = userbook.libros.find(libro => libro.googleId === libroId);
  if (!libroExistente) {
    throw new Error("libro no encontrado en el usuario");
  }
  // Elimina la lista de listasLibro del libro correspondiente
  await UserBook.updateOne(
    { userId, "libros.googleId": libroId },
    { $pull: { "libros.$.listasLibro": lista } }
  );
  // Opcional: Eliminar el libro si ya no pertenece a ninguna lista
  const updatedUserbook = await UserBook.findOne({ userId });
  const libroActualizado = updatedUserbook.libros.find(libro => libro.googleId === libroId);
  if (libroActualizado && libroActualizado.listasLibro.length === 0) {
    await UserBook.updateOne(
      { userId },
      { $pull: { libros: { googleId: libroId } } }
    );
  }
}
	async addListaToUser(userId, nombreListaNueva) {
    //console.log(userId + nombreListaNueva);
    if(nombreListaNueva ==""){
      throw new Error("nombre de lista vacia");
    }
		const userbook = await UserBook.findOne({ userId: userId });
    //console.log(userbook);
		if (userbook) {
			const lista = await UserBook.findOne({
				userId: userId,
				listasUser: nombreListaNueva,
			});
      console.log(lista);
			if (lista) {
				throw new Error("la lista ya existe");
			}
			await UserBook.updateOne(
				{ userId: userId },
				{ $push: { listasUser: nombreListaNueva } }
			);
			return nombreListaNueva;
		}
		throw new Error("usuario no encontrado");
	}  async addLibroToLista(userId, lista, libroId){
    try {
      // Validaciones iniciales
      if(!userId) throw new Error("ID de usuario no proporcionado");
      if(!lista) throw new Error("Nombre de lista no proporcionado");
      if(!libroId) throw new Error("ID del libro no proporcionado");

      console.log("Service params validados:", userId, lista, libroId);

      // Buscar el UserBook
      const userbook = await UserBook.findOne({"userId": userId});

      if(!userbook) {
        throw new Error("Usuario inexistente");
      }

      // Comprobar si la lista existe
      if(!userbook.listasUser.includes(lista)) {
        throw new Error("Lista inexistente");
      }

      // Comprobar si el libro ya está en las listas del usuario
      const libroExistente = userbook.libros.find(
        libro => libro.googleId === libroId
      );

      let resultado;

      if(libroExistente) {
        // Si el libro ya existe, agregarlo a la lista específica si no está ya
        if(!libroExistente.listasLibro.includes(lista)) {
          resultado = await UserBook.updateOne(
            {"userId": userId, "libros.googleId": libroId},
            {$addToSet: {"libros.$.listasLibro": lista}}
          );
        } else {
          console.log("El libro ya está en esta lista");
          return { message: "El libro ya está en esta lista" };
        }
      } else {
        // Si el libro no existe, crear nuevo registro
        resultado = await UserBook.updateOne(
          {"userId": userId},
          {$push: {"libros": {
            "googleId": libroId,
            "listasLibro": [lista]
          }}}
        );
      }

      console.log("Operación completada:", resultado);
      return resultado;
    } catch(error) {
      console.error("Error en addLibroToLista:", error);
      throw error;
    }
  }
  async getLista(userId,lista){
    try{
      const results = await UserBook.aggregate([
      {
        $match: {
          userId: userId // Match the user's document
        }
      },
      {
        $unwind: "$libros" // Deconstruct the 'libros' array into multiple documents
      },
      {
        $match: {
          "libros.listasLibro": lista // Filter for libros where 'listasLibro' contains "favoritos"
        }
      },
      {
        $project: {
          _id: 0, // Exclude the default _id
          "libros.googleId": 1 // Include only the 'libros' object
        }
      }
    ]);
    //console.log(results)
    const libros = []
    results.forEach(function(result){
      libros.push(result.libros.googleId)
    });
    console.log(libros)
    return libros
    }catch(error){
      return error.message
    }
  }

  async getAllLibros(userId){
    try{
      const librosLista = await UserBook.find({"userId":userId},{"userId":1,"libros.googleId":1,"_id":0});
      return librosLista
    }catch(error){
      return error.message
    }
  }
  async getListas(userId){
    try{
      const listas = await UserBook.find({"userId":userId},{"listasUser":1,"_id":0})
      return listas;
    }catch(error){
      return error.message;
    }

  }

  async deleteLista(userId,borrar){
    try{
      const userbook = await UserBook.findOne({"userId":userId})

    if(!userbook){
      throw new Error("user inexsistente");
    }
    //console.log(userbook)
    const listaExiste = userbook.listasUser.includes(borrar);
    //console.log(listaExiste)

    if (!listaExiste) {
      throw new Error("lista inexistente");
    }
    console.log("busco los libros")
    const librosEnLista = await this.getLista(userId,borrar)
    console.log(librosEnLista)

    librosEnLista.forEach(libro =>{
      this.removeFromLista(userId,borrar,libro);
    });

    await UserBook.updateOne(
      { userId },
      { $pull: { "listasUser": borrar } }
      );

    return borrar
    } catch(error){
      throw new Error(error.message)
    }

  }


}

module.exports = new BookService();
