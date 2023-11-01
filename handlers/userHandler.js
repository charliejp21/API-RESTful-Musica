const validateRegisterUser = require("../services/validate")
const registerUserHandler = (req, res) =>{

    //Recoger datos de la petición
    const {name, surname, nick, email, password} = req.body;

    //Comprobar que me llegan bien
    if(!name || !nick || !email || !password){

        return res.status(400).json({

            status: "error",
            mensaje: "Faltan datos por enviar"
    
        })

    }

    //Validar los datos
    try {
        
        validateRegisterUser(req.body)

        
    } catch (error) {

        return res.status(400).json({

            status: "error",
            mensaje: "Validación de registro no superada"
    
        })
        
    }


    //Control de usuarios duplicados

    //Cifrar la contraseña

    //Crear objtos del usuario

    //Guardar usuario en la bd

    //Limpiar el objeto a devolver

    //Devolver un resultado

    return res.status(200).json({

        status: "success",
        mensaje: "Ruta userRegister"

    })

}

module.exports = registerUserHandler;