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

   return await Artist.findByIdAndDelete(id)

}

const updateImgArtistController = async(artistId, img) => {

    const albumRemoved = await Album.find({

        artist: artistId,

    }).remove()

    const songRemove = await Song.find({

        album: albumRemoved._id
        
    }).remove()

    return await Artist.findOneAndUpdate(
        {_id : artistId},
        {image: img.filename}, 
        {new: true}
    )

}


module.exports = {saveArtistController, getArtistController, getAllArtistsController, updateArtistController, removeArtistController, updateImgArtistController};