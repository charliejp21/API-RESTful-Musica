//Importar modulos
const jwt = require("jwt-simple")
const moment = require("moment")
//Importar clave secreta
require('dotenv').config();
const {SECRET_JWT} = process.env;

//Crear middleare(método o función)
exports.auth = (req, res, next) => {
    //Comprobar si me llega la cabecera de autencticación
    if(!req.headers.authorization){

        return res.status(400).json({

            status: "error", 
            mensaje: "La petición no tiene la cabecera de autenticación"
        })
    }

    //Limṕiar token 
    let token = req.headers.authorization.replace(/['"]+/g, "")


    //Decodificar el token
    try {

        let payload = jwt.decode(token, SECRET_JWT)
        //Comprobar la expiración del token
        if(payload.exp <= moment().unix()){

            return res.status(401),json({

                status: "error", 
                mensaje: "Token expirado"

            })

        }

        //Agregar datos del usuario a la request
        req.user = payload
        
    } catch (error) {

        return res.status(404).json({

            status: "error", 
            mensaje: "Token inválido"
        })
        
    }

    next()

}