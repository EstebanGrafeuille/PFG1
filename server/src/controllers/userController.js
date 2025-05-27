const userService = require("../services/userService.js");

class UserController {

  getByUsername = async (req, res) => {
    try {
      const { username } = req.params;
      const data = await userService.getByUsername(username);
      res.status(200).send({ success: true, message: data });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  getById = async (req, res) => {
    try {
      const { id } = req.params;
      const data = await userService.getById(id);
      res.status(200).send({ success: true, message: data });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  
  updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { username, email } = req.body;
      const updatedUser = await userService.updateUser(id, { username, email });
      res.status(200).send({ success: true, message: updatedUser });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  updateImage = async (req, res) => {
   try {
     const userId = req.params.id;
     if (!req.file || !req.file.path) {
       return res.status(400).json({ message: 'No se subió ninguna imagen' });
     }

     const imageUrl = req.file.path;
     const user = await userService.updateImage(userId, imageUrl);
     res.json({ message: 'Imagen actualizada', user });
   } catch (error) {
     res.status(500).json({ message: 'Error al actualizar imagen', error: error.message });
   }
  }
}


module.exports = new UserController();