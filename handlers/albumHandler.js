const {saveAlbumController, getAlbumsController,getAlbumsArtistController } = require("../controllers/albumController")
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

const listAlbumsArtistHandler = async(req, res) => {

    //Sacar el id del artista
    const {artistId} = req.params;

    if(!artistId){

        return res.status(400).json({

            status: "error", 
            mensaje: "No se ha proporcionado el id del artista"
        })
    }
    
    //Sacar todos los albumes de la bd del artista
    try {

        const getAlbumsDb = await getAlbumsArtistController(artistId)

        if(getAlbumsDb){

            return res.status(200).json({

                status: "success",
                resultados: getAlbumsDb
            })

        }
        
    } catch (error) {

        return res.status(400).json({

            status: "error", 
            mensaje: "No se han encontrado resultados con el id proporcionado"
        })
        
    }

    return res.status(500).json({

        status: "error", 
        mensaje: "error del servidor al buscar los albums del artista"
    })

}

module.exports = {saveAlbumHandler, getAlbumsHandler, listAlbumsArtistHandler};