const {saveAlbumController, editAlbumController} = require("../controllers/albumController")
const saveAlbumHandler = async(req, res) => {

    if(!req.body){

        return res.status(400).json({

            status: "error", 
            mensaje: "Faltan datos por enviar"

        })
    }
    
    try {

        const saveAlbumDb = saveAlbumController(req.body)

        if(saveAlbumDb){

            return res.status(200).json({

                status: "success",
                mensaje: "Se ha guarado el abum correctamente"
            })
        }
        
    } catch (error) {

        return res.status(500).json({

            status: "error",
            mensaje: "Error del servidor al guardar el album"
        })
        
    }

}

const editAlbumHandler = async(req, res) => {

   

}

module.exports = {saveAlbumHandler, editAlbumHandler};