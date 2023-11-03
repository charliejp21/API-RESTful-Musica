const {Router} = require('express');
const {registerUserHandler, loginUserHandler, userProfileHandler} = require('../handlers/userHandler')
const userRoutes = Router();

userRoutes.post("/register", registerUserHandler)
userRoutes.post("/login", loginUserHandler)
userRoutes.get("/profile/:id", userProfileHandler)


module.exports = userRoutes;