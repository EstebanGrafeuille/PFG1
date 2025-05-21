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
}

module.exports = new UserController();