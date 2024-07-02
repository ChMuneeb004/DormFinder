const mongoose = require("mongoose");

const HostelSchema = new mongoose.Schema({
    hostel_id: {
        type: String,
        required: [true, 'Hostel ID is required'],
        default: () => 'HT' + Math.floor(Math.random() * 10000)
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    location: {
        type: String,
        required: [true, 'Address is required']
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minlength: [50, 'Description should be at least 50 characters long']
    },
    images: [{
        data: Buffer,
        contentType: String
    }],
    roomImages: [{
        data: Buffer,
        contentType: String
    }],
    number_of_rooms: {
        type: Number,
        required: [true, 'Number of rooms is required']
    },
    contact: {
        type: String,
        required: [true, 'Contact is required'],
        validate: {
            validator: function(v) {
                return /^\+?92 ?3\d{2}-?\d{7}$/.test(v);
            },
            message: 'Contact should be in the format +92 3XX-XXXXXXX'
        }
    },
    ownerEmail: {
        type: String,
        required: [true, 'Owner email is required']
    },
    hostel_type: {
        type: String,
        required: [true, 'hostel type is required'],
        enum: ['Boys', 'Girls']
    },


    // room:
    //  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }],

    // amenities:
    //  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Amenities' }],



    createdAt: {
        type: Date,
        default: Date.now
    }

});

const HostelModel = mongoose.model("Hostel", HostelSchema);
module.exports = HostelModel;

