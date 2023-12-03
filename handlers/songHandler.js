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

    const {id} = req.params;

    if(!id){

        return res.status(400).json({

            status: "error",
            mensaje: "Falta el id de la canción"
        })
    }

    try {

        const getSongDb = await getSongController(id)
        
        if(getSongDb){

            return res.status(200).json({

                status: "success",
                mensaje: "Se ha obtenido la canción exitosamente",
                song:getSongDb

            })
        }
        
    } catch (error) {
        
        return res.status(404).json({

            status: "error", 
            mensaje: "No se ha podido obtener la canción con el id proporcionado"
        })
        
    }

    return res.status(500).json({

        status: "error",
        mensaje: "Error del servidor al buscar la canción"

    })

}


module.exports = {saveSongHandler, getSongHandler};