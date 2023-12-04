const fs = require("fs")
const path = require("path")

const {saveSongController, getSongController, getSongsController, updateSongController, deleteSongController, uploadSongController} = require("../controllers/songController")
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

const deleteSongHandler = async(req, res) => {

    const {songId} = req.params; 

    if(!songId){

        return res.status(401).json({

            status: "error", 
            mensaje: "Falta el id por enviar"
        })

    }

    try {

        const deleteSongDb = await deleteSongController(songId)

        if(deleteSongDb){

            return res.status(200).json({

                status: "success", 
                mensaje: "Canción borrada exitosamente", 
                song: deleteSongDb
            })

        }
        
    } catch (error) {

        return res.status(404).json({

            status: "error", 
            mensaje: "No ha sido posible borrar la canción con el id proporcionado"
        })
        
    }

    return res.status(500).json({

        status: "error", 
        mensaje: "Error del servidor al borrar la canción"
    })

}
const uploadSongHandler = async (req, res) => {

    const {id} = req.params;

    //Configuración de subida(multer)

    //Recoger el ficheri de imagen y comparar si existe
    if(!req.file){

        return res.status(404).json({
            status: "error",
            mensaje: "La petición no incluye la canción"
        })
    }

    //Conseguir el nombre del archivo
    const originalName = req.file.originalname;

    //Sacar info de la imagen
    const songExtension = originalName.split("\.");
    const extension = songExtension.length > 1 ? songExtension.reverse()[0] : null;

    //Comprobar si la extension es valida
    if(extension != "mp3" && extension != "ogg"){

        //Borrar archivo y devolver error
        const filePath = req.file.path;
        
        fs.unlinkSync(filePath)

        return res.status(401).json({

            status: "success", 
            mensaje: "La extensión de la canción no es válida"
        })

    }

    //Si es correcto guardar la imagen en la bd
    try {

        await uploadSongController(id, req.file)

        if(updateSongController){

            return res.status(200).json({

                status: "success", 
                mensaje: "La canción se ha guardado exitosamente",
                file: req.file.filename,
                ruta: req.file.path
            })

        }
        
    } catch (error) {

        return res.status(404).json({

            status: "error", 
            mensaje: "No se ha encontrado una canción con el id proporcionado"

        })
        
    }

    return res.status(500).json({

        status: "error", 
        mensaje: "Error del servidor al guardar la canción"

    })
   
}

const getSongFileHandler = async (req, res) => {

    //Sacar el parametro de la url
    const {idFile} = req.params;

    //Montar el path real de la imagen
    const filePath = "./uploads/songs/" + idFile;

    //Comprobar que existe el fichero
    fs.stat(filePath, (error, exists) => {

        if(error || !exists){

            return res.status(404).json({

                status: "error", 
                mensaje: "Canción no encontrada, prueba con otro id"
            })
        }

        return res.sendFile(path.resolve(filePath));

    })

}

module.exports = {saveSongHandler, getSongHandler, getSongsHandler, updateSongHandler, deleteSongHandler, uploadSongHandler, getSongFileHandler};