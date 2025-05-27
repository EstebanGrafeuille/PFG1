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

  getLista = async (req, res) => {
    try {
      const lista = await bookService.getLista(req.body.userId,req.body.lista);
      res.json(lista);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener Lista",
        error: error.message,
      });
    }
  };

  getAllLibros = async (req, res) => {
    try {
      const lista = await bookService.getAllLibros(req.body.userId);
      res.status(200).json(lista);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener Listas",
        error: error.message,
      });
    }
  };

  addLista = async(req,res) =>{
    try{
      await bookService.addListaToUser(req.body.userId,req.body.lista);
    res.status(201).json({message: "lista añadida",lista:req.body.lista})
    }catch(error){
      res.status(500).json({message: "error al agregar lista",error: error.message})
    }
    
  }

  addToLista = async (req, res) => {
    try {
      await bookService.addLibroToLista(req.body.userId,req.body.lista, req.body.bookId);
      res.status(201).json({ message: "Libro añadido a lista" });
    } catch (error) {
      res.status(500).json({
        message: "Error al añadir a lista",
        error: error.message,
      });
    }
  };

  removeFromLista = async (req, res) => {
    try {
      await bookService.removeFromLista(req.body.userId,req.body.lista, req.body.bookId);
      res.json({ message: "Libro eliminado de favoritos" });
    } catch (error) {
      res.status(500).json({
        message: "Error al eliminar de favoritos",
        error: error.message,
      });
    }
  };
  getListas = async (req,res) =>{
    try{
      const libros = await bookService.getListas(req.body.userId);
      res.status(200).json(libros)
    }catch(error){
      res.status(500).json({
        message: "Error traer libros de la lista",
        error: error.message,
      });
    }
  }
}

module.exports = new BookController();