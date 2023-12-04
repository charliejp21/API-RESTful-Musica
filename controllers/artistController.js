const mongoosePagination = require("mongoose-pagination")

const Artist = require("../models/ArtistModel");
const Song = require("../models/SongModel")
const Album = require("../models/AlbumModel")

const saveArtistController = async (artistData) => {

    const artist = new Artist(artistData);

    return await artist.save();
    
}

const getArtistController = async(id) => {

    return await Artist.findById(id);

}

const getAllArtistsController = async (page) => {

    const itemsPerPage = 5;
    
    const skip = (page - 1) * itemsPerPage;

    return await Artist.find()
                       .sort("name")
                       .skip(skip)
                       .limit(itemsPerPage);

}

const updateArtistController = async (id, data) => {

    return await Artist.findByIdAndUpdate(id, data, {new: true})

}

const removeArtistController = async(id) => {

    const artistDelete = await Artist.findByIdAndDelete(id)

    const albumRemoved = await Album.find({

        artist: id,

    })

    // Usar Promise.all para esperar la finalización de todas las operaciones asincrónicas
    await Promise.all(albumRemoved.map(async (album) => {
        // Usar deleteMany para eliminar las canciones asociadas al álbum
        await Song.deleteMany({ album: album._id });
        // Usar deleteOne para eliminar el álbum
        await Album.deleteOne({ _id: album._id });
    }));

    return artistDelete;

}

const updateImgArtistController = async(artistId, img) => {

    return await Artist.findOneAndUpdate(
        {_id : artistId},
        {image: img.filename}, 
        {new: true}
    )

}


module.exports = {saveArtistController, getArtistController, getAllArtistsController, updateArtistController, removeArtistController, updateImgArtistController};