const mongoosePagination = require("mongoose-pagination")

const Artist = require("../models/ArtistModel");

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

module.exports = {saveArtistController, getArtistController, getAllArtistsController, updateArtistController, removeArtistController};