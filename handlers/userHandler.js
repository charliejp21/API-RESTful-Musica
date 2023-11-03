const validateRegisterUser = require("../services/validate")
const createTokenUser = require("../services/jwt")
const {userDuplicatedController, saveUserController, findUserController} = require("../controllers/userController")
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

            const registerUser = await saveUserController(name, surname, nick, email, password)

             //Devolver el resultado
             return res.status(201).json({

                status: "success",
                mensaje: "Usuario creado",
                user: registerUser.name,
                email: registerUser.email
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

}

const loginUserHandler = async(req, res) => {

    //Recoger los parametros de la petición
    const {email, password} = req.body

    //Comprobar que me llegan
    if(!email || !password){

        return res.status(400).json({

            status: "error", 
            mensaje: "Faltan datos por enviar para el login"

        })
        
    }

    //Buscar en la bd si existe el mail
    try {

        const findUser = await findUserController(email, password)
    
        if(findUser){
            
            const token = createTokenUser(findUser)

            return res.status(200).json({

                status: "success",
                mensaje: "Te has identificado exitosamente",
                usuario: {
                    id: findUser._id,
                    name:findUser.name,
                    nick: findUser.nick,
                    token: token,
                }

            })

        }else{

            return res.status(400).send({

                status: "error",
                mensaje: "La información proporcionada no coincide"

            })
        }

    } catch (error) {

        return res.status(500).send({

            status: "error",
            mensaje: "Error del servidor al ejecutar el login"

        })
        
    }

    //Comprobar su contraseña

    //Conseguir token jwt(Crear un servicio que nos permita crear el token)

    //Devolver datos del usuario y token

    return res.status(200).json({

        status: "success", 
        mensaje: "ruta del login"
    })

}

module.exports = {registerUserHandler, loginUserHandler};