const {Router} = require('express');
const {auth} = require("../middlewares/auth")
const {saveSongHandler, getSongHandler, getSongsHandler} = require('../handlers/songHandler')

const songRoutes = Router();

songRoutes.post("/save", auth, saveSongHandler)
songRoutes.get("/id/:id", auth, getSongHandler)
songRoutes.get("/list/:albumId", auth, getSongsHandler)


module.exports = songRoutes;