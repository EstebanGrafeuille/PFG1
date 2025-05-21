const User = require("../models/User.js");

class UserService {
async getByUsername(username) {
    const user = await User.findOne({ username }).select("name email username");
    if (!user) throw new Error("Usuario no encontrado");
    return user;
  };
}

module.exports = new UserService();