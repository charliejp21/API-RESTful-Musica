const {Router} = require('express');
const {auth} = require("../middlewares/auth")
const {registerUserHandler, loginUserHandler, userProfileHandler} = require('../handlers/userHandler')
const userRoutes = Router();

userRoutes.post("/register", registerUserHandler)
userRoutes.post("/login", loginUserHandler)
userRoutes.get("/profile/:id", auth, userProfileHandler)


module.exports = userRoutes;