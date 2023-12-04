const {Router} = require('express');
const {auth} = require("../middlewares/auth")
const multer = require("multer")
const {saveSongHandler, getSongHandler, getSongsHandler, updateSongHandler, deleteSongHandler, uploadSongHandler, getSongFileHandler} = require('../handlers/songHandler')

const songRoutes = Router();

//Imporar multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        cb(null, "./uploads/songs/")
    }, 
    filename: (req, file, cb) => {

        cb(null, "song-"+ Date.now() + "-" + file.originalname)
    }
})

const uploads = multer({storage})

songRoutes.post("/save", auth, saveSongHandler)
songRoutes.get("/id/:id", auth, getSongHandler)
songRoutes.get("/list/:albumId", auth, getSongsHandler)
songRoutes.put("/update/:songId", auth, updateSongHandler)
songRoutes.delete("/delete/:songId", auth, deleteSongHandler)
songRoutes.post("/upload-song/:id", [auth, uploads.single("file0")], uploadSongHandler)
songRoutes.get("/file/:idFile", getSongFileHandler)



module.exports = songRoutes;