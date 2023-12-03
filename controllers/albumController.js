const mongoosePagination = require("mongoose-pagination")

const Album = require("../models/AlbumModel")

const saveAlbumController = async (albumData) => {

    const album = new Album(albumData);

    return await album.save();
    
}

const getAlbumsController = async(id) => {

    return await Album.findById(id).populate({path: "artist"}).exec()

}


module.exports = {saveAlbumController, getAlbumsController};