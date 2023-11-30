const {Router} = require('express');
const {auth} = require("../middlewares/auth")

const {saveArtistHandler, getArtistHandler} = require('../handlers/artistHandler')
const artistRoutes = Router();


artistRoutes.post("/save", auth, saveArtistHandler)
artistRoutes.get("/id/:id", auth, getArtistHandler)

module.exports = artistRoutes;