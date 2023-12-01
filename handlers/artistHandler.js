const {saveArtistController, getArtistController, getAllArtistsController} = require("../controllers/artistController")
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

module.exports = {saveArtistHandler, getArtistHandler, getAllArtistsHandler};