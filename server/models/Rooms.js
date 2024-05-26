const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
    room_id: {
        type: String,
        required: [true, 'Room ID is required'],
        default: () => 'RM' + Math.floor(Math.random() * 10000)
    },
    room_type: {
        type: String,
        required: [true, 'Room type is required']
    },
    availability: {
        type: Boolean,
        required: [true, 'Availability is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    hostel_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hostel',
        required: [true, 'Hostel ID is required']
    }
});

const RoomModel = mongoose.model("Room", RoomSchema);
module.exports = RoomModel;
