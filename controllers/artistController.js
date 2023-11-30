const Artist = require("../models/ArtistModel");

const saveArtistController = async (artistData) => {

    const artist = new Artist(artistData);

    return await artist.save();
    
}

const getArtistController = async(id) => {

    return await Artist.findById(id);

}

module.exports = {saveArtistController, getArtistController};