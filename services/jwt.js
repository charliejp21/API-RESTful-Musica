//Importar dependcias
const jwt = require("jwt-simple")
const moment = require("moment")
require('dotenv').config();
const {SECRET_JWT} = process.env;

const createTokenUser = (user) =>{
    
    const payload = {

        id: user._id,
        name: user.name,
        nick: user.nick,
        iat: moment().unix(),
        exp: moment().add(30, "days").unix()
    }

    //Devolver token
    return jwt.encode(payload, SECRET_JWT)
}

module.exports = createTokenUser;