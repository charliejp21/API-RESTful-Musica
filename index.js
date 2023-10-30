require('dotenv').config();
const {PORT} = process.env;
//Importar conexión a base de datos
const conection = require("./database/conection")

//Importar dependecias
const express = require("express")

const cors = require("cors")

//Mensaje de bienvenida
console.log("API REST con node para la app de musica arrancada")

//Ejecutar conexión a la bd
conection()

//Crear servidor de node
const app = express();

//Configurar cors
app.use(cors())

//Convertir los datos del body a objetos de js
app.use(express.json())
app.use(express.urlencoded({extended: true}));

//Cargar configuraciones de rutas

//Ruta de prueba

//Poner el servidor a escuchar peticiones http
app.listen(PORT, () => {

    console.log("Servidor de node está escuchando en el puerto:", PORT)

})