const Book = require("../models/Book");
const UserBook = require("../models/UserBook");

class BookService {

  // Guardar un libro en la base de datos
  async saveBook(data) {
    const {
      googleId,
      title,
      authors,
      description,
      thumbnail,
      pageCount,
      categories,
      publishedDate,
    } = data;

    // Verificar si el libro ya existe
    let book = await Book.findOne({ googleId });

    if (!book) {
      // Crear nuevo libro si no existe
      book = new Book({
        googleId,
        title,
        authors,
        description,
        thumbnail,
        pageCount,
        categories,
        publishedDate,
      });

      await UserBook.save(book);
    }

    return book;
  }

  // Obtener libros favoritos del usuario
  async getFavorites(userId) {
    const userBooks = await UserBook.find({
      user: userId,
      status: "favorite",
    }).populate("book");

    return userBooks.map((ub) => ub.book);
  }

  // Añadir libro a favoritos
  async addToFavorites(userId, bookId) {
    // Verificar si el libro existe
    const book = await Book.findById(bookId);
    if (!book) throw new Error("Libro no encontrado");

    // Verificar si ya está en favoritos
    const existingFavorite = await UserBook.findOne({
      user: userId,
      book: bookId,
      status: "favorite",
    });

    if (existingFavorite) throw new Error("El libro ya está en favoritos");

    // Añadir a favoritos
    const userBook = new UserBook({
      user: userId,
      book: bookId,
      status: "favorite",
    });

    await userBook.save();
  }

  // Eliminar libro de favoritos
  async removeFromLista(userId,lista, bookId) {
    try{
      await UserBook.updateOne({"userId":userId,"libros.googleId":bookId},{$pull:{"libros.listasLibro":lista}});
    }catch(error){
      throw new Error("error al remover libro de la lista")
    }
  }
  
  async createUserBook(userId){
    const registrado = UserBook.findOne({"userId":userId});
    if(registrado){
      throw new Error("el usuario ya tiene un UserBook");
    }
    const userbook = new UserBook(userId);
    await userbook.save();
  }
  async addListaToUser(userId,nombreListaNueva){
    const userbook = await UserBook.findOne({"userId":userId});
    if(userbook){
      const lista = await UserBook.findOne({"userId":userId,"libros.listas":nombreListaNueva});
      if(lista){
        throw new Error("la lista ya existe");
      }
      await UserBook.updateOne({"userId":userId},{$push:{"listasUser":nombreListaNueva}})
      return nombreListaNueva
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
          await UserBook.updateOne({"userId":userId,"libros.googleId":libroId},{$push:{"libros.listasLibro":lista}})
        }else{
          console.log("libro no encontrado")
          await UserBook.updateOne({"userId":userId},{$set:{"libros":{
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
      const librosLista = await UserBook.find({"userId":userId,"libros.listas":lista },{"userId":1,"libros.googleId":1,"_id":0});
      return librosLista
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


  
}

module.exports = new BookService();
