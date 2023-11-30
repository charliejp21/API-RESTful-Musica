const {Schema, model} = require("mongoose")

const ArtistSchema = Schema({

    name: {

        type: String,
        required: true
    },
    description: String,
    image: {
        type: String, 
        default: "default.jpg"
    }, 
    created_at:{
        type: Date,
        default: Date.now()
    }

})

module.exports = model("Artist", ArtistSchema, "artists");