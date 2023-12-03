const {Router} = require('express');
const {auth} = require("../middlewares/auth")
const {saveAlbumHandler, getAlbumsHandler, listAlbumsArtistHandler, updateAlbumHandler} = require('../handlers/albumHandler')

const albumRoutes = Router();

albumRoutes.post("/save", auth, saveAlbumHandler)
albumRoutes.get("/id/:id", auth, getAlbumsHandler)
albumRoutes.get("/list/:artistId", auth, listAlbumsArtistHandler)
albumRoutes.put("/update/:id", auth, updateAlbumHandler)

module.exports = albumRoutes;