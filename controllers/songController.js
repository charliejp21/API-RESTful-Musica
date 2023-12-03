
const Song = require("../models/SongModel")

const saveSongController = async (songData) => {

    const song = new Song(songData);

    return await song.save();
    
}

const getSongController = async(id) => {

    return await Song.findById(id).populate("album").exec()

}

const getSongsController = async(id) => {

   return await Song.find({album: id})
                    .populate({path: "album",
                               populate: {
                                path: "artist",
                                model: "Artist"
                               }             
                             })
                    .sort("track")
                    .exec()

}

module.exports = {saveSongController, getSongController, getSongsController};