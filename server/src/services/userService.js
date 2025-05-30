// server\src\services\userService.js
const User = require("../models/User.js");

class UserService {
  async getByUsername(username) {
    const user = await User.findOne({ username }).select("username email");
    if (!user) throw new Error("Usuario no encontrado");
    return user;
  }

  async getById(id) {
    const user = await User.findById(id).select("username email");
    if (!user) throw new Error("Usuario no encontrado");
    return user;
  }

  async updateUser(id, updateData) {
    const { username, email } = updateData;

    // Verificar si el nuevo username o email ya existen en otro usuario
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
      _id: { $ne: id } // Excluir al usuario actual
    });

    if (existingUser) {
      throw new Error("El nombre de usuario o email ya está en uso");
    }

    // Actualizar y devolver el usuario
    const user = await User.findByIdAndUpdate(
      id,
      { username, email },
      { new: true, runValidators: true }
    ).select("username email");

    if (!user) throw new Error("Usuario no encontrado");
    return user;
  }

  async updateImage(userId, imageUrl) {
    const user = await User.findByIdAndUpdate(userId, { image: imageUrl }, { new: true });
    if (!user) throw new Error("Usuario no encontrado");
    return user;
  }
}

module.exports = new UserService();
