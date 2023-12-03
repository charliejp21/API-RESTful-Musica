const mongoosePagination = require("mongoose-pagination")

const Album = require("../models/AlbumModel")

const saveAlbumController = async (albumData) => {

    const album = new Album(albumData);

    return await album.save();
    
}

const editAlbumController = async(id) => {

    return await Artist.findById(id);

}


module.exports = {saveAlbumController, editAlbumController};