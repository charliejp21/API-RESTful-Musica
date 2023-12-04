
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

const updateSongController = async(id, data) => {

    return await Song.findByIdAndUpdate(id, data, {new:true})


}

const deleteSongController = async(id) => {

   return await Song.findByIdAndRemove(id);

}

const uploadSongController = async(songId, song) => {

    return await Song.findOneAndUpdate(
        {_id : songId},
        {file: song.filename}, 
        {new: true}
    )

}

    
module.exports = {saveSongController, getSongController, getSongsController, updateSongController, deleteSongController, uploadSongController};