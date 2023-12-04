const {Router} = require('express');
const {auth} = require("../middlewares/auth")
const {saveSongHandler, getSongHandler, getSongsHandler, updateSongHandler, deleteSongHandler} = require('../handlers/songHandler')

const songRoutes = Router();

songRoutes.post("/save", auth, saveSongHandler)
songRoutes.get("/id/:id", auth, getSongHandler)
songRoutes.get("/list/:albumId", auth, getSongsHandler)
songRoutes.put("/update/:songId", auth, updateSongHandler)
songRoutes.delete("/delete/:songId", auth, deleteSongHandler)


module.exports = songRoutes;