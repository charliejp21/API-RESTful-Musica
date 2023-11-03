const {Router} = require('express');
const {registerUserHandler, loginUserHandler} = require('../handlers/userHandler')
const userRoutes = Router();

userRoutes.post("/register", registerUserHandler)
userRoutes.post("/login", loginUserHandler)

module.exports = userRoutes;