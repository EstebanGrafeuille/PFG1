const Book = require('../models/Book');
const UserBook = require('../models/UserBook');

// Guardar un libro en la base de datos
exports.saveBook = async (req, res) => {
  try {
    const { googleId, title, authors, description, thumbnail, pageCount, categories, publishedDate } = req.body;

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
        publishedDate
      });
      
      await book.save();
    }
    
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar libro', error: error.message });
  }
};

// Obtener libros favoritos del usuario
exports.getFavorites = async (req, res) => {
  try {
    const userBooks = await UserBook.find({ 
      user: req.user.id,
      status: 'favorite'
    }).populate('book');
    
    const favorites = userBooks.map(userBook => userBook.book);
    
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener favoritos', error: error.message });
  }
};

// Añadir libro a favoritos
exports.addToFavorites = async (req, res) => {
  try {
    const { bookId } = req.body;
    
    // Verificar si el libro existe
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }
    
    // Verificar si ya está en favoritos
    const existingFavorite = await UserBook.findOne({
      user: req.user.id,
      book: bookId,
      status: 'favorite'
    });
    
    if (existingFavorite) {
      return res.status(400).json({ message: 'El libro ya está en favoritos' });
    }
    
    // Añadir a favoritos
    const userBook = new UserBook({
      user: req.user.id,
      book: bookId,
      status: 'favorite'
    });
    
    await userBook.save();
    
    res.status(201).json({ message: 'Libro añadido a favoritos' });
  } catch (error) {
    res.status(500).json({ message: 'Error al añadir a favoritos', error: error.message });
  }
};

// Eliminar libro de favoritos
exports.removeFromFavorites = async (req, res) => {
  try {
    const { bookId } = req.params;
    
    const result = await UserBook.deleteOne({
      user: req.user.id,
      book: bookId,
      status: 'favorite'
    });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Libro no encontrado en favoritos' });
    }
    
    res.json({ message: 'Libro eliminado de favoritos' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar de favoritos', error: error.message });
  }
};
