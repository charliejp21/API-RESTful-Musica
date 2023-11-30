const {Router} = require('express');
const {auth} = require("../middlewares/auth")

const saveArtistHandler = require('../handlers/artistHandler')
const artistRoutes = Router();


artistRoutes.post("/save", auth, saveArtistHandler)

module.exports = artistRoutes;