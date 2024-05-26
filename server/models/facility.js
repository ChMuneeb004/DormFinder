const mongoose = require("mongoose");

const AmenitiesSchema = new mongoose.Schema({
    amenities_id: {
        type: String,
        required: [true, 'Amenities ID is required'],
        default: () => 'AM' + Math.floor(Math.random() * 10000)
    },
    air_condition_check: {
        type: Boolean,
        required: [true, 'Air condition check is required']
    },
    air_cooler_check: {
        type: Boolean,
        required: [true, 'Air cooler check is required']
    },
    kitchen_check: {
        type: Boolean,
        required: [true, 'Kitchen check is required']
    },
    gasoline_check: {
        type: Boolean,
        required: [true, 'Gasoline check is required']
    },
    water_cooler_check: {
        type: Boolean,
        required: [true, 'Water cooler check is required']
    },
    attached_bathroom_check: {
        type: Boolean,
        required: [true, 'Attached bathroom check is required']
    },
    hostel_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hostel',
        required: [true, 'Hostel ID is required']
    }

});

const AmenitiesModel = mongoose.model("Amenities", AmenitiesSchema);
module.exports = AmenitiesModel;
