const {Schema, model} = require("mongoose");

const AlbumSchema = Schema({

    artist: {

        type: Schema.ObjectId,
        ref: "Artist"
    },
    title: {

        type: String, 
        required: true
    },
    description: String,
    year: {

        type: Number, 
        required: true
    },
    img:{

        type: String,
        default: "default.png"
    },
    created_at: {
        type: Date,
        default: Date.now()
    }

})

module.exports = model("Album", AlbumSchema, "albums")