const {Router} = require('express');
const {auth} = require("../middlewares/auth")
const {saveAlbumHandler, getAlbumsHandler, listAlbumsArtistHandler} = require('../handlers/albumHandler')

const albumRoutes = Router();

albumRoutes.post("/save", auth, saveAlbumHandler)
albumRoutes.get("/id/:id", auth, getAlbumsHandler)
albumRoutes.get("/list/:artistId", auth, listAlbumsArtistHandler)

module.exports = albumRoutes;