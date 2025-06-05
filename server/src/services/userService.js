// server\src\services\userService.js
const User = require("../models/User.js");

class UserService {
  async getByUsername(username) {
    const user = await User.findOne({ username }).select("username email");
    if (!user) throw new Error("Usuario no encontrado");
    return user;
  }

  async getById(id) {
    const user = await User.findById(id).select("username email biography image");
    if (!user) throw new Error("Usuario no encontrado");
    return user;
  }

  async updateUser(id, updateData) {
    // Extraer los campos que pueden ser actualizados
    const { username, email, biography, image } = updateData;
    const updateFields = {};
    
    // Solo incluir los campos que están presentes en updateData
    if (username !== undefined) updateFields.username = username;
    if (email !== undefined) updateFields.email = email;
    if (biography !== undefined) updateFields.biography = biography;
    if (image !== undefined) updateFields.image = image;
    
    // Si se está actualizando username o email, verificar que no existan duplicados
    if (username || email) {
      const conditions = [];
      if (username) conditions.push({ username });
      if (email) conditions.push({ email });
      
      const existingUser = await User.findOne({
        $or: conditions,
        _id: { $ne: id } // Excluir al usuario actual
      });

      if (existingUser) {
        throw new Error("El nombre de usuario o email ya está en uso");
      }
    }

    // Actualizar y devolver el usuario
    const user = await User.findByIdAndUpdate(
      id,
      updateFields,
      { new: true, runValidators: true }
    ).select("username email biography image");

    if (!user) throw new Error("Usuario no encontrado");
    return user;
  }

  async updateImage(userId, imageUrl) {
    const user = await User.findByIdAndUpdate(userId, { image: imageUrl }, { new: true });
    if (!user) throw new Error("Usuario no encontrado");
    return user;
  }

  async deleteUser(id) {
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new Error("Usuario no encontrado");
    return { message: "Usuario eliminado correctamente" };
  }
}

module.exports = new UserService();
