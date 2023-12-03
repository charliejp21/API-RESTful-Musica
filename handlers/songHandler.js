const {saveSongController, getSongController} = require("../controllers/songController")
const saveSongHandler = async(req, res) => {

    if(!req.body){

        return res.status(400).json({

            status: "error", 
            mensaje: "Faltan datos por enviar"
        })

    }

    try {
        
        const saveSongDb = await saveSongController(req.body)

        if(saveSongDb){

            return res.status(200).json({

                status: "success",
                mensaje: "Se ha guardado la canción exitosamente",
                song: saveSongDb

            })
        }

    } catch (error) {

        return res.status(500).json({

            status: "error",
            mensaje: "Error del servidor al guardar la canción"
        })
        
    }
      
}

const getSongHandler = async(req, res) => {

}


module.exports = {saveSongHandler, getSongHandler};