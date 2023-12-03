
const Song = require("../models/SongModel")

const saveSongController = async (songData) => {

    const song = new Song(songData);

    return await song.save();
    
}

const getSongController = async(id) => {

    return await Song.findById(id).populate("album").exec()

}

module.exports = {saveSongController, getSongController};