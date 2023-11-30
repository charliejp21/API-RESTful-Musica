const saveArtistController = require("../controllers/artistController")
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

module.exports = saveArtistHandler;