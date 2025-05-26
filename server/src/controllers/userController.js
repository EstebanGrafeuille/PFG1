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
}

module.exports = new UserController();