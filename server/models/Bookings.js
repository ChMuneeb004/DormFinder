const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    booking_id: {
        type: String,
        required: [true, 'Booking ID is required'],
        default: () => 'BK' + Math.floor(Math.random() * 10000)
    },
    token_number: {
        type: String,
        required: [true, 'Token number is required']
    },
    booking_status: {
        type: String,
        required: [true, 'Booking status is required'],
        enum: ['confirmed', 'pending', 'cancelled'],
        default: 'pending'
    },
    customer_name: {
        type: String,
        required: [true, 'Customer name is required']
    },
    room_type: {
        type: String,
        required: [true, 'Room type is required']
    },
    cnic: {
        type: String,
        required: [true, 'CNIC is required']
    },
    customer_email: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: Number,
        required: [true, 'Contact is required']
    },
    hostel_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hostel',
        required: [true, 'Hostel ID is required']
    },
    room_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: [true, 'Room ID is required']
    },
    hostel_name: {
        type: String,
        required: [true, 'Hostel name is required']
    },
    booking_date: {
        type: Date,
        default: Date.now,
        required: [true, 'Booking date is required']
    }
});

const BookingModel = mongoose.model("Booking", BookingSchema);
module.exports = BookingModel;
