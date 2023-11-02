const validateRegisterUser = require("../services/validate")
const userDuplicatedController = require("../controllers/userController")
const registerUserHandler = async(req, res) =>{

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
    try {

        const userDuplicated = await userDuplicatedController(email, nick)

        if(userDuplicated && userDuplicated.length >= 1){

            return res.status(400).json({

                status: "error", 
                mensaje: "El usuario ya existe"
            })

        }else{

            return res.status(201).json({

                status: "success",
                mensaje: "Usuario creado",
             
            })
        }
        
    } catch (error) {
        
        return res.status(500).json({

            status: "error",
            mensaje: "Error del servidor al crear el usuario"

        })
        
    }

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