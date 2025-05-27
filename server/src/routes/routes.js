const { Router } = require("express");
const authRoutes = require("./auth");
const bookRoutes = require("./books");
const userRoutes = require("./users");

const routes = Router();

routes.use("/api/auth", authRoutes);
routes.use("/api/books", bookRoutes);
routes.use("/api/users", userRoutes);

module.exports = routes;
