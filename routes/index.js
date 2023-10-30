const {Router} = require('express');
const userRouter = require("./userRouter");
const albumRouter = require("./albumRouter")
const artistRouter = require("./artistRouter")
const songRouter = require("./songRouter")

//Importar todos los routers
const router = Router();

//Configurar los routers
router.use('/user', userRouter);
router.use("/album", albumRouter);
router.use('/artist', artistRouter)
router.use('/song', songRouter)


module.exports = router;