const User = require("../models/UserModel")
const bcrypt = require('bcrypt')
const userDuplicatedController = (email, nick) => {

    if(email && nick){

        return User.find({ $or: [ // si un email existe o un nick name existe no se cumple la condicion, para eso funciona el $or
                
                {email: email.toLowerCase()},
                    
                {nick: nick.toLowerCase()} 
            
            ]}).exec()
        }


}

const saveUserController = async(name, surname, nick, email, password) => {

    const pwd = await bcrypt.hash(password, 10)

    password = pwd;

    const registerUser = new User({

        name,
        surname,
        nick, 
        email, 
        password

    })

    return registerUser.save();

}

module.exports = {userDuplicatedController, saveUserController};