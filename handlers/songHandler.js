const {saveSongController, getSongController, getSongsController, updateSongController} = require("../controllers/songController")
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

const getSongsHandler = async(req, res) => {

    const {albumId} = req.params;

    if(!albumId){

        return res.status(401).json({

            status: "error",
            mensaje: "No se ha proporcionado el id del album"
        })
    }

    try {
        
        const getSongsDB = await getSongsController(albumId);
        
        if(getSongsDB){

            return res.status(200).json({

                status: "success", 
                mensaje: "Canciones encontradas exitosamente",
                canciones: getSongsDB

            })

        }
    } catch (error) {
        
        return res.status(404).json({

            status: "error",
            mensaje: "No se han encontrado canciones para el album con el id proporcionado"
        })
        
    }

    return res.status(500).json({

        status: "error", 
        mensaje: "Error del servidor al buscar la canciones"
    })

} 

const updateSongHandler = async(req, res) => {

    //Recoger el id de canción 
    const {songId} = req.params;

    if(!songId){

        return res.status(401).json({

            status: "error", 
            mensaje: "Falta el id por enviar"
        })

    }

    //Recoger los datos para guardar

    //Búsqueda y actualización
    try {

        const updateSongDb = await updateSongController(songId, req.body)

        if(updateSongDb){

            return res.status(200).json({

                status: "success", 
                mensaje: "Canción actualizada exitosamente", 
                song: updateSongDb
            })

        }
        
    } catch (error) {

        return res.status(404).json({

            status: "error", 
            mensaje: "Se ha sido posible actualizar la canción con el id proporcionado"
        })
        
    }

    return res.status(500).json({

        status: "error", 
        mensaje: "Error del servidor al actualizar la canción"
    })


}

module.exports = {saveSongHandler, getSongHandler, getSongsHandler, updateSongHandler};