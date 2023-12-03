const {Router} = require('express');
const {auth} = require("../middlewares/auth")
const {saveSongHandler, getSongHandler} = require('../handlers/songHandler')

const songRoutes = Router();

songRoutes.post("/save", auth, saveSongHandler)
songRoutes.get("/id/:id", auth, getSongHandler)


module.exports = songRoutes;