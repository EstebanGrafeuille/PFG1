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

      await book.save();
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
  async removeFromFavorites(userId, bookId) {
    const result = await UserBook.deleteOne({
      user: userId,
      book: bookId,
      status: "favorite",
    });

    if (result.deletedCount === 0) {
      throw new Error("Libro no encontrado en favoritos");
    }
  }
}

module.exports = new BookService();
