const {Router} = require('express');
const {auth} = require("../middlewares/auth")
const {saveAlbumHandler, editAlbumHandler} = require('../handlers/albumHandler')

const albumRoutes = Router();

albumRoutes.post("/save", auth, saveAlbumHandler)
albumRoutes.post("/edit", auth, editAlbumHandler)

module.exports = albumRoutes;