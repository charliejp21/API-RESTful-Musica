const fs = require("fs")
const path = require("path")
const {saveArtistController, getArtistController, getAllArtistsController, updateArtistController, removeArtistController, updateImgArtistController} = require("../controllers/artistController")
const saveArtistHandler = async(req, res) => {

    //Recoger datos del body
    const {name, description} = req.body;

    if(!name || !description){

        return res.status(400).json({
            status: "error", 
            mensaje: "Faltan datos por enviar"
        })
    }

    //Crear objeto a guardar
    try {
        
        const saveArtisDb = await saveArtistController(req.body);

        return res.status(200).json({
            status: "success", 
            mensaje: "Artista guardado exitosamente"
        })


    } catch (error) {
     
        return res.status(500).json({
            status: "error", 
            mensaje: "Error del servidor al guardar el artista"
        })
    
    }

}

const getArtistHandler = async(req, res) => {

    //Sacar parametro por la ur
    const {id} = req.params;

    try {

        const findArtistDb = await getArtistController(id);

        if(findArtistDb){

            return res.status(200).json({

                status: "success", 
                mensaje: "Se ha obtenido el artista exitosamente",
                artista: findArtistDb
            })


        }else{

            return res.status(404).json({

                status: "error", 
                mensaje: "No se ha encontrado el artista con ese id"
            })

        }

        
    } catch (error) {
        
        return res.status(500).json({

            status: "error", 
            mensaje: "Ha fallado el servidor al buscar el artista",
     
        })
    }

}

const getAllArtistsHandler = async(req, res) => {

    //Sacar la posible página
    let {page} = req.params;

    if(!page){

        page = 1

    }

    try {

        const getAllArtistsDB = await getAllArtistsController(page);

        if(!getAllArtistsDB.length){

            return res.status(404).json({

                status: "error", 
                mensaje: "No se han encontrado artistas"
            })
            
        }else{

            return res.status(200).json({

                status: "success", 
                mensaje: "Se han encontrado artistas extosamente",
                artistas: getAllArtistsDB
            })
        }
        
    } catch (error) {

        return res.status(500).json({

            status: "error",
            mensaje: "Error del servidor al obtener los artistas"

        })
        
    }

}

const updateArtistHandler = async(req, res) => {

    // Recoger id del  artista url
    const {id} = req.params;

    // Recoger datos body
    const data = req.body;

    //Buscar y actualizar artista
    try {

        const updateArtistDB = await updateArtistController(id, data);

        if(updateArtistDB){

            return res.status(200).json({

                status: "success",
                mensaje: "Artista actualizado correctamente",
                artista: updateArtistDB
                
            })

        }

    } catch (error) {

        return res.status(404).json({

            status: "error",
            mensaje: "No se ha encontrado el artista, prueba con otro id"

        })
        
    }

    return res.status(500).json({

        status: "error",
        mensaje: "Error del servidor al actualizar el artista"

    })

}

const removeArtistHandler = async (req, res) => {

    //Sacar el id del artista de la url
    const {id} = req.params;

    //Hacer consulta para buscar y eliminar el artista con un await

    try {

        const removeArtistDb = await removeArtistController(id);

        if(removeArtistDb){

            return res.status(200).json({

                status: "success", 
                mensaje: "Artista eliminado exitosamente",
                artista: removeArtistDb
            })

        }
        
    } catch (error) {
        
        return res.status(400).json({

            status: "error", 
            mensaje: "No se ha encontrado el artista con el id proporcionado"
        })
        
    }

    //Devolver el resultado
    return res.status(500).json({

        status: "error", 
        mensaje: "Error del servidor al borrar el artista"
    })

}

const updateImgArtistHandler = async (req, res) => {

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

        const updateAvatarDB = await updateImgArtistController(id, req.file)

        return res.status(200).json({

            status: "success", 
            mensaje: "Se ha actualizado la imagen del artista exitosamente",
            file: req.file.filename,
            ruta: req.file.path
        })
        
    } catch (error) {

        return res.status(500).json({

            status: "success", 
            mensaje: "Error del servidor al actualizar el artista"

        })
        
    }
   
}

const getImgArtistHandler = async (req, res) => {

    //Sacar el parametro de la url
    const {file} = req.params;

    //Montar el path real de la imagen
    const filePath = "./uploads/artists/" + file;

    //Comprobar que existe el fichero
    fs.stat(filePath, (error, exists) => {

        if(error || !exists){

            return res.status(404).json({

                status: "error", 
                mensaje: "Imagen no encontrada"
            })
        }

        return res.sendFile(path.resolve(filePath));

    })

}

module.exports = {saveArtistHandler, getArtistHandler, getAllArtistsHandler, updateArtistHandler, removeArtistHandler, updateImgArtistHandler, getImgArtistHandler};