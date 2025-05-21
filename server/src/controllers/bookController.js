const bookService = require("../services/bookService");

class BookController {

  saveBook = async (req, res) => {
    try {
      const book = await bookService.saveBook(req.body);
      res.status(201).json(book);
    } catch (error) {
      res.status(500).json({
        message: "Error al guardar libro",
        error: error.message,
      });
    }
  };

  getFavorites = async (req, res) => {
    try {
      const favorites = await bookService.getFavorites(req.user.id);
      res.json(favorites);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener favoritos",
        error: error.message,
      });
    }
  };

  addToFavorites = async (req, res) => {
    try {
      await bookService.addToFavorites(req.user.id, req.body.bookId);
      res.status(201).json({ message: "Libro añadido a favoritos" });
    } catch (error) {
      res.status(500).json({
        message: "Error al añadir a favoritos",
        error: error.message,
      });
    }
  };

  removeFromFavorites = async (req, res) => {
    try {
      await bookService.removeFromFavorites(req.user.id, req.params.bookId);
      res.json({ message: "Libro eliminado de favoritos" });
    } catch (error) {
      res.status(500).json({
        message: "Error al eliminar de favoritos",
        error: error.message,
      });
    }
  };
}

module.exports = new BookController();