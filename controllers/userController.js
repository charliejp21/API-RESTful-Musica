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

const findUserController = async (email, password) => {

    if(email && password){

        const findUser = await User.findOne({email: email})
        
        if(findUser){

            const pwdMatch = await bcrypt.compareSync(password, findUser.password)

            if(pwdMatch){

                const newUser = {

                    _id: findUser._id,
                    name: findUser.name,
                    nick: findUser.nick
                }
    
                return newUser
            }
        }
    
    }

}

const findUserByIdController = async(id) => {

    const findUserDb = await User.findById(id).select({password: 0})

    if(findUserDb){

        return findUserDb;
    }

}

module.exports = {userDuplicatedController, saveUserController, findUserController, findUserByIdController};