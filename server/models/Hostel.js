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
    description: {
        type: [Buffer],
        required: [true, 'Description is required'],
        minlength: [50, 'Description should be at least 50 characters long']
    },
    images: [{
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
                return /^\+923\d{2}-\d{7}$/.test(v);
            },
            message: 'Contact should be in the format +923XX-XXXXXXX'
        }
    },
    ownerEmail: {
        type: String,
        required: [true, 'Owner email is required']
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

const HostelModel = mongoose.model("Hostel", HostelSchema);
module.exports = HostelModel;

// const mongoose = require("mongoose");

// const RoomSchema = new mongoose.Schema({
//     type: {
//         type: String,
//         required: [true, 'Room type is required']
//     },
//     price: {
//         type: Number,
//         required: [true, 'Room price is required']
//     },
//     availability: {
//         type: Boolean,
//         required: [true, 'Room availability is required']
//     }
// });

// const AmenitiesSchema = new mongoose.Schema({
//     air_condition: {
//         type: Boolean,
//         default: false
//     },
//     air_cooler: {
//         type: Boolean,
//         default: false
//     },
//     kitchen: {
//         type: Boolean,
//         default: false
//     },
//     gasoline: {
//         type: Boolean,
//         default: false
//     },
//     water_cooler: {
//         type: Boolean,
//         default: false
//     },
//     attached_bathroom: {
//         type: Boolean,
//         default: false
//     }
// });

// const HostelSchema = new mongoose.Schema({
//     hostel_id: {
//         type: String,
//         required: [true, 'Hostel ID is required'],
//         default: () => 'HT' + Math.floor(Math.random() * 10000)
//     },
//     name: {
//         type: String,
//         required: [true, 'Name is required']
//     },
//     location: {
//         type: String,
//         required: [true, 'Address is required']
//     },
//     description: {
//         type: String,
//         required: [true, 'Description is required'],
//         minlength: [50, 'Description should be at least 50 characters long']
//     },
//     images: [{
//         data: Buffer,
//         contentType: String
//     }],
//     number_of_rooms: {
//         type: Number,
//         required: [true, 'Number of rooms is required']
//     },
//     contact: {
//         type: String,
//         required: [true, 'Contact is required'],
//         validate: {
//             validator: function(v) {
//                 return /^\+923\d{2}-\d{7}$/.test(v);
//             },
//             message: 'Contact should be in the format +923XX-XXXXXXX'
//         }
//     },
//     ownerEmail: {
//         type: String,
//         required: [true, 'Owner email is required']
//     },
//     rooms: [RoomSchema],
//     amenities: AmenitiesSchema,
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// const HostelModel = mongoose.model("Hostel", HostelSchema);
// module.exports = HostelModel;
