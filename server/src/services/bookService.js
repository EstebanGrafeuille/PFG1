// server\src\services\bookService.js
const UserBook = require("../models/UserBook");

class BookService {
	// Obtener libros favoritos del usuario
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
	async removeFromLista(userId, lista, bookId) {
		try {
			await UserBook.updateOne(
				{ user: userId, "libros.googleId": bookId },
				{ $pull: { "libros.listasLibro": lista } }
			);
		} catch (error) {
			throw new Error("error al remover libro de la lista");
		}
	}

	async createUserBook(userId) {
		const registrado = UserBook.findOne({ user: userId });
		if (registrado) {
			throw new Error("el usuario ya tiene un UserBook");
		}
		const userbook = new UserBook(userId);
		await userbook.save();
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
          console.log("libro encontrado")
          await UserBook.updateOne({"userId":userId,"libros.googleId":libroId},{$push:{"libros.$.listasLibro":lista}})
        }else{
          console.log("libro no encontrado")
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
