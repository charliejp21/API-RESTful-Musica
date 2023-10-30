require('dotenv').config();
const {DB_NAME} = process.env;
//Importar mongoose
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

//Metodo de conexion
const conection = async() => {

    try {

        await mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`)

        console.log("Se ha establecido una conexión exitosa a la base de datos")
        
    } catch (error) {

        console.log(error)

        throw new Error("No se ha establecido la conexion a la base de datos")
        
    }
}

//Exportar conexion

module.exports = conection;

