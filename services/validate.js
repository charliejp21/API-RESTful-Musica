const validator = require("validator")

const validateRegisterUser = (params) => {

    let resultado = false;

    const {name, surname, nick, email, password} = params;

    let nameValidation = !validator.isEmpty(name) &&
                          validator.isLength(name, {min: 3, max: undefined}) &&
                          validator.isAlpha(name, "es-ES"); 

    let nickValidation = !validator.isEmpty(nick) &&
                          validator.isLength(nick, {min: 2, max: 60}); 

    let emailValidation = !validator.isEmpty(email) &&
                           validator.isEmail(email);

    let passwordValidation = !validator.isEmpty(password);  

    if(surname){

        let surnameValidation = !validator.isEmpty(surname) &&
                                 validator.isLength(surname, {min: 3, max: undefined}) &&
                                 validator.isAlpha(surname, "es-ES"); 

        if(!surnameValidation){

            throw new Error("No se ha superado la validación del apellido")

        }else{

            console.log("Validación del apellido superada")
            
        }
    }

    if(!nameValidation || !nickValidation || !emailValidation || ! passwordValidation){

        throw new Error("No se ha superado la validación")

    }else{

        console.log("Validación superada")

        resultado = true;

    }

    return resultado;
}

module.exports = validateRegisterUser;