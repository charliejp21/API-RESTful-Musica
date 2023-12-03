const mongoosePagination = require("mongoose-pagination")

const Album = require("../models/AlbumModel")

const saveAlbumController = async (albumData) => {

    const album = new Album(albumData);

    return await album.save();
    
}

const getAlbumsController = async(id) => {

    return await Album.findById(id).populate({path: "artist"}).exec()

}

const getAlbumsArtistController = async(id) => {

    return await Album.find({

        artist: id

    }).populate("artist").exec()

}

const updateAlbumController = async(id, data) => {

    return Album.findByIdAndUpdate(id, data, {new:true})
    
}
const updateImgAlbumController = async(albumId, img) => {

    return await Album.findOneAndUpdate(
        {_id : albumId},
        {img: img.filename}, 
        {new: true}
    )

}

module.exports = {saveAlbumController, getAlbumsController, getAlbumsArtistController, updateAlbumController, updateImgAlbumController};