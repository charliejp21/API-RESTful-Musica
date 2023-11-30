const validateRegisterUser = require("../services/validate")
const createTokenUser = require("../services/jwt")
const fs = require("fs")
const path = require("path")
const {userDuplicatedController, saveUserController, findUserController, findUserByIdController, updateUserController, updateAvatarController} = require("../controllers/userController")
const { error } = require("console")
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
                usuario: findUser,
                token: token

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

}

const userProfileHandler = async(req, res) => {

    //Recoger id de usuario
    const {id} = req.params;

    //Consulta para sacar los datos del perfil
    try{

        const findUser = await findUserByIdController(id)
        
        if(findUser._id){

            //Devolver resultados
            return res.status(200).json({

                status: "success", 
                user: findUser
                
            })

        }

    }catch{

        return res.status(400).json({

            status: "error",
            mensaje: "No fue posible encontrar un perfil con el id indicado"
        })

    }

    return res.satus(500).json({

        status: "error",
        message: "Error del servidor al obtener el perfil con el id solicitado"
        
    })

}

const updateUserHandler = async (req, res) => {

    //Recoger datos del usuario identificado
    const user = req.user; 

    //Recoger datos a actualizar
    const{email, nick} = req.body;

    //Validar los datos
    try {
        
        validateRegisterUser(req.body)

        
    } catch (error) {

        return res.status(400).json({

            status: "error",
            mensaje: "Validación no superada"
    
        })
        
    }

    //Comprobar si el usuario
    try {

        const findUser = await userDuplicatedController(email, nick)

        if(findUser && findUser.length >= 1){

            return res.status(400).json({

                status: "error", 
                mensaje: "El usuario ya existe"
            })

        }else{

            const updateUser = await updateUserController(user, req.body);

            if(updateUser){

                return res.status(200).json({

                    status: "success",
                    mensaje: "Usuario actualizado exitosamente"
                })
            }

        }

    }catch(error){
         
        return res.status(500).json({

            status: "error",
            mensaje: "Error del servidor al crear el usuario"

        })


    } 

    
}

const updateAvatarHandler = async (req, res) => {

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

        const updateAvatarDB = await updateAvatarController(req.user.id, req.file)

        return res.status(200).json({

            status: "success", 
            mensaje: "Se ha actualizado el avatar exitosamente",
            file: req.file.filename,
            ruta: req.file.path
        })
        
    } catch (error) {

        return res.status(500).json({

            status: "success", 
            mensaje: "Error del servidor al actualizar el avatar"

        })
        
    }
   
}

const getAvatarHandler = async (req, res) => {

    //Sacar el parametro de la url
    const {file} = req.params;

    //Montar el path real de la imagen
    const filePath = "./uploads/avatars/" + file;

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

module.exports = {registerUserHandler, loginUserHandler, userProfileHandler,updateUserHandler, updateAvatarHandler, getAvatarHandler};