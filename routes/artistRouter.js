const {Router} = require('express');
const {auth} = require("../middlewares/auth")

const {saveArtistHandler, getArtistHandler, getAllArtistsHandler, updateArtistHandler, removeArtistHandler} = require('../handlers/artistHandler')
const artistRoutes = Router();


artistRoutes.post("/save", auth, saveArtistHandler)
artistRoutes.get("/id/:id", auth, getArtistHandler)
artistRoutes.get("/list/:page?", auth, getAllArtistsHandler)
artistRoutes.put("/update/:id", auth, updateArtistHandler)
artistRoutes.delete("/delete/:id", auth, removeArtistHandler)

module.exports = artistRoutes;