const {Router} = require('express');
const {auth} = require("../middlewares/auth")

const {saveArtistHandler, getArtistHandler, getAllArtistsHandler} = require('../handlers/artistHandler')
const artistRoutes = Router();


artistRoutes.post("/save", auth, saveArtistHandler)
artistRoutes.get("/id/:id", auth, getArtistHandler)
artistRoutes.get("/list/:page?", auth, getAllArtistsHandler)

module.exports = artistRoutes;