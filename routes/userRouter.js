const {Router} = require('express');
const {auth} = require("../middlewares/auth")
const multer = require("multer")
const {registerUserHandler, loginUserHandler, userProfileHandler, updateUserHandler, updateAvatarHandler} = require('../handlers/userHandler')
const userRoutes = Router();

//Imporar multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        cb(null, "./uploads/avatars/")
    }, 
    filename: (req, file, cb) => {

        cb(null, "avatar-"+ Date.now() + "-" + file.originalname)
    }
})

const uploads = multer({storage})

userRoutes.post("/register", registerUserHandler)
userRoutes.post("/login", loginUserHandler)
userRoutes.get("/profile/:id", auth, userProfileHandler)
userRoutes.put("/update", auth, updateUserHandler)
userRoutes.post("/upload-avatar", [auth, uploads.single("file0")], updateAvatarHandler)

module.exports = userRoutes;