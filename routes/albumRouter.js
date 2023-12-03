const {Router} = require('express');
const {auth} = require("../middlewares/auth")
const {saveAlbumHandler, getAlbumsHandler} = require('../handlers/albumHandler')

const albumRoutes = Router();

albumRoutes.post("/save", auth, saveAlbumHandler)
albumRoutes.get("/id/:id", auth, getAlbumsHandler)

module.exports = albumRoutes;