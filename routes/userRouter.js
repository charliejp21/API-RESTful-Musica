const {Router} = require('express');
const {auth} = require("../middlewares/auth")
const {registerUserHandler, loginUserHandler, userProfileHandler, updateUserHandler} = require('../handlers/userHandler')
const userRoutes = Router();

userRoutes.post("/register", registerUserHandler)
userRoutes.post("/login", loginUserHandler)
userRoutes.get("/profile/:id", auth, userProfileHandler)
userRoutes.put("/update", auth, updateUserHandler)


module.exports = userRoutes;