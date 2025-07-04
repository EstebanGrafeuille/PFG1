const bookService = require("../services/bookService");

class BookController {
	getLista = async (req, res) => {
		try {
			const lista = await bookService.getLista(req.query.userId, req.query.lista);
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

	addLista = async (req, res) => {
		try {
			await bookService.addListaToUser(req.body.userId, req.body.lista);
			res.status(201).json({ message: "lista añadida", lista: req.body.lista });
		} catch (error) {
			res
				.status(500)
				.json({ message: "error al agregar lista", error: error.message });
		}
	};

	addToLista = async (req, res) => {
		try {
			await bookService.addLibroToLista(
				req.body.userId,
				req.body.lista,
				req.body.bookId
			);
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
			await bookService.removeFromLista(
				req.body.userId,
				req.body.lista,
				req.body.bookId
			);
			res.json({ message: "Libro eliminado de " + req.body.lista });
		} catch (error) {
			res.status(500).json({
				message: "Error al eliminar de favoritos",
				error: error.message,
			});
		}
	};
	getListas = async (req, res) => {
		console.log("userId recibido:", req.query.userId);

		try {
			// const libros = await bookService.getListas(req.body.userId);

			const userId = req.query.userId;
			const libros = await bookService.getListas(userId);

			res.status(200).json(libros);
		} catch (error) {
			res.status(500).json({
				message: "Error traer libros de la lista",
				error: error.message,
			});
		}
	};

   createUserBook = async (req,res)=> {
    try{
      	const result = await bookService.createUB(req);
		if(result == "usuario ya registrado"){
			console.log("usuario ya registrado");
			res.status(500).json({
				message: "Error al crear userbook " + result
			});
			console.log("");
		}
		console.log("usuario no registrado")
	  	res.status(201).json({message:"userbook creado para el usuario: " + result})
    }catch(error){
		res.status(500).json({
				message: "Error al crear userbook",
				error: error.message,
			});
    }
  }
  deleteLista = async(req,res)=>{
	try{
		console.log("empiezo a borrar")
		const borrada = await bookService.deleteLista(req.body.userId,req.body.lista)
		console.log(borrada)
		if (borrada instanceof Error){
			throw borrada
		}
		res.status(201).json({message: "lista " + borrada +" borrada"})
	}catch(error){
		res.status(500).json({
				message: "Error al borrar lista",
				error: error.message,
			});
	}
  }
}

module.exports = new BookController();
