const {Router} = require('express');
const registerUserHandler = require('../handlers/userHandler')
const userRoutes = Router();

userRoutes.post("/register", registerUserHandler)

module.exports = userRoutes;