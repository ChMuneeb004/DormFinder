const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        maxlength: 15,
        minlength: 8
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    DOB: {
        type: Date,
        required: true
    },
    Phone: {
        type: Number,
        required: true,
        maxlength: 11,
        minlength: 10
    },
    CNIC: {
        type: Number,
        required: true,
        maxlength: 13,
        minlength: 13
    },
    userType:{
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const CustomerModel = mongoose.model("customer", CustomerSchema);
module.exports = CustomerModel
