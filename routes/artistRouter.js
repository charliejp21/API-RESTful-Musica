const {Router} = require('express');
const {auth} = require("../middlewares/auth")
const multer = require("multer")
const {saveArtistHandler, getArtistHandler, getAllArtistsHandler, updateArtistHandler, removeArtistHandler, updateImgArtistHandler, getImgArtistHandler} = require('../handlers/artistHandler')
const artistRoutes = Router();

//Imporar multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        cb(null, "./uploads/artists/")
    }, 
    filename: (req, file, cb) => {

        cb(null, "artist-"+ Date.now() + "-" + file.originalname)
    }
})

const uploads = multer({storage})

artistRoutes.post("/save", auth, saveArtistHandler)
artistRoutes.get("/id/:id", auth, getArtistHandler)
artistRoutes.get("/list/:page?", auth, getAllArtistsHandler)
artistRoutes.put("/update/:id", auth, updateArtistHandler)
artistRoutes.delete("/delete/:id", auth, removeArtistHandler)
artistRoutes.post("/upload-img/:id", [auth, uploads.single("file0")], updateImgArtistHandler)
artistRoutes.get("/img/:file", getImgArtistHandler)

module.exports = artistRoutes;