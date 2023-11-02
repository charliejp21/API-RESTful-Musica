const User = require("../models/UserModel")
const userDuplicatedController = (email, nick) => {

    if(email && nick){

        return User.find({ $or: [ // si un email existe o un nick name existe no se cumple la condicion, para eso funciona el $or
                
                {email: email.toLowerCase()},
                    
                {nick: nick.toLowerCase()} 
            
            ]}).exec()
        }


}

module.exports = userDuplicatedController;