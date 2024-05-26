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
    token_amount: {
        type: Number,
        required: [true, 'Token amount is required']
    },
    booking_status: {
        type: String,
        required: [true, 'Booking status is required'],
        enum: ['confirmed', 'pending', 'cancelled'],
        default: 'pending'
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: [true, 'Customer ID is required']
    },
    room_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: [true, 'Room ID is required']
    },
    booking_date: {
        type: Date,
        default: Date.now,
        required: [true, 'Booking date is required']
    }
});

const BookingModel = mongoose.model("Booking", BookingSchema);
module.exports = BookingModel;
