// server\src\services\bookService.js
const UserBook = require("../models/UserBook");

class BookService {
	// Obtener libros favoritos del usuario

  async createUB(id){
    console.log("creando userbook con id " + id)
    try{
      const existente = await UserBook.findOne({userId:id});
      console.log("ya existe el userbook" + existente)
      if(existente){
        throw new Error("usuario ya registrado")
      }else{
        const userbook = new UserBook({
          userId:id,
          listasUser:["favoritos","leidos","leyendo"],
          libros:[]
        });
        console.log(userbook)
        await userbook.save();
        return userbook
      }
    }catch(error){
      return error.message
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

	// Eliminar libro de favoritos / listas personalizadas
	// async removeFromLista(userId, lista, bookId) {
	// 	try {
	// 		await UserBook.updateOne(
	// 			{ user: userId, "libros.googleId": bookId },
	// 			{ $pull: { "libros.listasLibro": lista } }
	// 		);
	// 	} catch (error) {
	// 		throw new Error("error al remover libro de la lista");
	// 	}
	// }

  async removeFromLista(userId, lista, libroId) {
  const userbook = await UserBook.findOne({ userId });
  console.log([userId, lista, libroId]);

  if (!userbook) {
    throw new Error("usuario inexistente");
  }
  // Verifica que la lista exista para el usuario
  const listaExiste = userbook.listasUser.includes(lista);
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
		const userbook = await UserBook.findOne({ user: userId });
		if (userbook) {
			const lista = await UserBook.findOne({
				user: userId,
				"libros.listas": nombreListaNueva,
			});
			if (lista) {
				throw new Error("la lista ya existe");
			}
			await UserBook.updateOne(
				{ user: userId },
				{ $push: { listasUser: nombreListaNueva } }
			);
			return nombreListaNueva;
		}
		throw new Error("usuario no encontrado");
	}

  async addLibroToLista(userId,lista,libroId){
    const userbook = await UserBook.findOne({"userId":userId});
    console.log([userId,lista,libroId]);
    if(userbook){
      if(await UserBook.findOne({"userId":userId,"listasUser":lista})){
        if(await UserBook.findOne({"userId":userId,"libros.googleId":libroId})){
          
          await UserBook.updateOne({"userId":userId,"libros.googleId":libroId},{$push:{"libros.$.listasLibro":lista}})
        }else{
          
          await UserBook.updateOne({"userId":userId},{$push:{"libros":{
            "googleId":libroId,
            "listasLibro":[lista]
          }}});
        }
      }else{
        throw new Error("lista inexistente")
      }
    }else{
          throw new Error("usuario inexistente")
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
    console.log(results[1].libros.googleId)
    const libros = []
    results.forEach(function(result){
      libros.push(result.libros.googleId)
    });
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
  
}

module.exports = new BookService();
