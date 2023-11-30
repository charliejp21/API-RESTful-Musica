const Artist = require("../models/ArtistModel");

const saveArtistController = async (artistData) => {

    const artist = new Artist(artistData);

    return await artist.save();
    
}

module.exports = saveArtistController;