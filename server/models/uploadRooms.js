const mongoose = require("mongoose");

const RoomImagesSchema = new mongoose.Schema({
    RoomImages: [{
        data: Buffer,
        contentType: String
    }],
    stitchedImages: [{
        data: Buffer,
        contentType: String
    }],
    hostel_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hostel',
        required: [true, 'Hostel ID is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const UploadModel = mongoose.model("RoomImages", RoomImagesSchema);
module.exports = UploadModel
