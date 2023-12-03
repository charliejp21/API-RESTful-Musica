const {saveAlbumController, getAlbumsController} = require("../controllers/albumController")
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

const getAlbumsHandler = async(req, res) => {

   const {id} = req.params;

   if(!id) {

    return res.status(400).json({

        status: "error", 
        mensaje: "No se ha proporcionado el id"
    })

   }

   try {

    const getAlbumsDb = await getAlbumsController(id)
    
    if(getAlbumsDb){

        return res.status(200).json({

            status: "success",
            mensaje: "Se ha encontrado resultados",
            resultados: getAlbumsDb
        })
    }
    
   } catch (error) {

    return res.status(401).json({

        status: "error",
        mensaje: "No se han encontrado resultados con el id proporcionado"
    })
    
   }

   return res.status(500).josn({

        status: "error",
        mensaje: "Error del servidor al obtener resultados"
   })

}

module.exports = {saveAlbumHandler, getAlbumsHandler};