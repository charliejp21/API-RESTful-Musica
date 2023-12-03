
const Song = require("../models/SongModel")

const saveSongController = async (songData) => {

    const song = new Song(songData);

    return await song.save();
    
}

const getSongController = async(id) => {


}

module.exports = {saveSongController, getSongController};