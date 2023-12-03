const {Router} = require('express');
const {auth} = require("../middlewares/auth")
const multer = require("multer")
const {saveAlbumHandler, getAlbumsHandler, listAlbumsArtistHandler, updateAlbumHandler, updateImgAlbumHandler, getImgAlbumHandler} = require('../handlers/albumHandler')

const albumRoutes = Router();

//Imporar multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        cb(null, "./uploads/albums/")
    }, 
    filename: (req, file, cb) => {

        cb(null, "album-"+ Date.now() + "-" + file.originalname)
    }
})

const uploads = multer({storage})

albumRoutes.post("/save", auth, saveAlbumHandler)
albumRoutes.get("/id/:id", auth, getAlbumsHandler)
albumRoutes.get("/list/:artistId", auth, listAlbumsArtistHandler)
albumRoutes.put("/update/:id", auth, updateAlbumHandler)
albumRoutes.post("/upload-img/:id", [auth, uploads.single("file0")], updateImgAlbumHandler)
albumRoutes.get("/img/:file", getImgAlbumHandler)

module.exports = albumRoutes;