const { Router } = require("express");
const authRoutes = require("./auth");
const bookRoutes = require("./books");
const userRoutes = require("./users");
const reviewRoutes = require("./reviews");

const routes = Router();

routes.use("/api/auth", authRoutes);
routes.use("/api/books", bookRoutes);
routes.use("/api/users", userRoutes);
routes.use("/api/reviews", reviewRoutes);

module.exports = routes;
