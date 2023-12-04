const fs = require("fs")
const path = require("path")

const {saveAlbumController, getAlbumsController,getAlbumsArtistController, updateAlbumController, updateImgAlbumController, deleteAlbumController} = require("../controllers/albumController")
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

const updateAlbumHandler = async(req, res) => {

    const {id} = req.params;

    if(!id){

        return res.status(400).json({

            status: "error", 
            mensaje: "Falta el id para buscar en la bd"
        })
    }

    try {

        const updateAlbumDb = await updateAlbumController(id, req.body)

        if(updateAlbumDb){

            return res.status(200).json({

                status: "success",
                mensaje: "Album actualizado exitosamente",
                album: updateAlbumDb
            })
        }
        
    } catch (error) {
        
        return res.status(400).json({

            status: "error",
            mensaje: "No se ha podido encontrar el album con el id proporcionado"
        })
        
    }
    
    return res.status(500).json({

        status: "error", 
        mensaje: "Error del servidor al actualizar el album"
    })

}

const updateImgAlbumHandler = async (req, res) => {

    const {id} = req.params

    //Configuración de subida(multer)

    //Recoger el ficheri de imagen y comparar si existe
    if(!req.file){

        return res.status(404).json({
            status: "error",
            mensaje: "La petición no incluye la imagen"
        })
    }

    //Conseguir el nombre del archivo
    const originalName = req.file.originalname;

    //Sacar info de la imagen
    const imgExtension = originalName.split("\.");
    const extension = imgExtension.length > 1 ? imgExtension.reverse()[0] : null;

    //Comprobar si la extension es valida
    if(extension != "png" && extension != "jpg" && extension != "jpeg" && extension != "gif"){

        //Borrar archivo y devolver error
        const filePath = req.file.path;
        
        fs.unlinkSync(filePath)

        return res.status(401).json({

            status: "success", 
            mensaje: "La extensión de la imgen no es válida"
        })

    }

    //Si es correcto guardar la imagen en la bd
    try {

        const updateImgAlbumDB = await updateImgAlbumController(id, req.file)

        return res.status(200).json({

            status: "success", 
            mensaje: "Se ha actualizado la imagen del album exitosamente",
            file: req.file.filename,
            ruta: req.file.path
        })
        
    } catch (error) {

        return res.status(500).json({

            status: "success", 
            mensaje: "Error del servidor al actualizar el album"

        })
        
    }
   
}

const getImgAlbumHandler = async (req, res) => {

    //Sacar el parametro de la url
    const {file} = req.params;

    //Montar el path real de la imagen
    const filePath = "./uploads/albums/" + file;

    //Comprobar que existe el fichero
    fs.stat(filePath, (error, exists) => {

        if(error || !exists){

            return res.status(404).json({

                status: "error", 
                mensaje: "Imagen del album no encontrada"
            })
        }

        return res.sendFile(path.resolve(filePath));

    })

}

const removeAlbumHandler = async(req, res) => {

    const {id} = req.params;

    if(!id){

        return res.status(401).json({

            status: "error", 
            mensaje: "Falta el id del album"
        })
    }

    try {

        const deleteAlbumDb = await deleteAlbumController(id);

        if(deleteAlbumDb){

            return res.status(200).json({

                status: "success", 
                mensaje: "Album borrado exitosamente"
            })
        }
        
    } catch (error) {

        return res.status(404).json({

            status: "error", 
            mensaje: "No ha sido posible borrar el album con el id proporcionado"
        })
        
    }

    return res.status(500).json({

        status: "error", 
        mensaje: "Error del servidor al borrar el album"
    })


}

module.exports = {saveAlbumHandler, getAlbumsHandler, listAlbumsArtistHandler, updateAlbumHandler, updateImgAlbumHandler, getImgAlbumHandler, removeAlbumHandler};