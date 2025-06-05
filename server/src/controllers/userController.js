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
      const { username, email, biography, image } = req.body;
      
      // Crear objeto con los campos que se van a actualizar
      const updateData = {};
      if (username !== undefined) updateData.username = username;
      if (email !== undefined) updateData.email = email;
      if (biography !== undefined) updateData.biography = biography;
      if (image !== undefined) updateData.image = image;
      
      console.log(`Actualizando usuario ${id} con datos:`, updateData);
      
      const updatedUser = await userService.updateUser(id, updateData);
      res.status(200).send({ success: true, message: updatedUser });
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      
      // Validación específica de Mongoose
      if (error.name === "ValidationError") {
        const messages = Object.values(error.errors).map((err) => err.message);
        return res.status(400).json({ message: messages.join(", ") });
      }
      res.status(400).send({ success: false, message: error.message });
    }
  };

  updateImage = async (req, res) => {
    try {
      const userId = req.params.id;
      if (!req.file || !req.file.path) {
        return res.status(400).json({ message: "No se subió ninguna imagen" });
      }

      const imageUrl = req.file.path;
      const user = await userService.updateImage(userId, imageUrl);
      res.json({ message: "Imagen actualizada", user });
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar imagen", error: error.message });
    }
  };

  deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await userService.deleteUser(id);
      res.status(200).send({ success: true, message: result.message });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };
}

module.exports = new UserController();
