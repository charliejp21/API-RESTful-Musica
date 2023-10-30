//Acción de prueba

const prueba = (req, res) => {

    return res.status(200).json({

        status: "success",
        mensaje: "Prueba exitosa desde user"
    })

}

module.exports = prueba;