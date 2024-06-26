const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const OwnerModel = require("./models/Owner");
const bodyParser = require("body-parser");
const CustomerModel = require("./models/Customer");
const HostelModel = require("./models/Hostel");
const multer = require("multer");
const path = require("path");
const jwt = require('jsonwebtoken');
const RoomModel = require("./models/Rooms");
const amenitiesModel = require("./models/facility");
const bcrypt = require('bcrypt');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Error: File upload only supports the following filetypes - " + filetypes);
    },
});

mongoose.connect("mongodb://127.0.0.1:27017/Dormfinder");

const secretKey = 'secret_key';

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized', message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.userType = decoded.userType;
        req.email = decoded.email;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized', message: 'Invalid token' });
    }
}

app.get('/hostel-detail/:id', async (req, res) => {
    const hostelId = req.params.id;
    try {
        const hostel = await HostelModel.findOne({ hostel_id: hostelId }).lean();
        if (!hostel) {
            return res.status(404).send('Hostel not found');
        }
        const rooms = await RoomModel.find({ hostel_id: hostel._id }).lean();
        const amenities = await amenitiesModel.find({ hostel_id: hostel._id }).lean();
        const hostelDetails = {
            ...hostel,
            rooms,
            amenities
        };
        res.json(hostelDetails);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

app.get('/searchHostels', async (req, res) => {
    let { latitude, longitude, radius, page = 1, limit = 8 } = req.query;

    latitude = parseFloat(latitude);
    longitude = parseFloat(longitude);
    radius = parseFloat(radius);
    page = parseInt(page);
    limit = parseInt(limit);

    if (!latitude || !longitude || !radius) {
        return res.status(400).json({ error: 'Latitude, longitude, and radius are required and must be valid numbers.' });
    }

    try {
        const latRadius = radius / 111;
        const longRadius = radius / (111 * Math.cos(latitude * (Math.PI / 180)));
        const skip = (page - 1) * limit;

        const hostels = await HostelModel.find({
            latitude: { $gte: latitude - latRadius, $lte: latitude + latRadius },
            longitude: { $gte: longitude - longRadius, $lte: longitude + longRadius }
        })
        .skip(skip)
        .limit(limit)
        .lean();

        const totalHostels = await HostelModel.countDocuments({
            latitude: { $gte: latitude - latRadius, $lte: latitude + latRadius },
            longitude: { $gte: longitude - longRadius, $lte: longitude + longRadius }
        });

        const totalPages = Math.ceil(totalHostels / limit);

        res.status(200).json({ hostels, totalPages });
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

const uploadFields = upload.fields([{ name: 'images', maxCount: 10 }, { name: 'roomImages', maxCount: 10 }]);
app.post('/listHostel', verifyToken, uploadFields, async (req, res) => {
    if (req.userType !== 'owner') {
        return res.status(403).json({ error: 'Forbidden', message: 'Only owners can add hostels' });
    }

    try {
        const { name, location, description, number_of_rooms, contact } = req.body;
        let images = [];
        let roomImages = [];

        if (req.files['images'] && req.files['images'].length > 0) {
            images = req.files['images'].map(file => ({ data: file.buffer, contentType: file.mimetype }));
        } else {
            return res.status(400).json({ error: 'No files were sent in the request for images.' });
        }

        if (req.files['roomImages'] && req.files['roomImages'].length > 0) {
            roomImages = req.files['roomImages'].map(file => ({ data: file.buffer, contentType: file.mimetype }));
        } else {
            return res.status(400).json({ error: 'No files were sent in the request for room images.' });
        }

        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: location,
                key: 'AIzaSyB9ehHDgZXPz2uOE6Tjfwiapo329zBVsKI'
            }
        });

        if (response.data.status !== 'OK') {
            return res.status(400).json({ error: 'Invalid address', message: 'Unable to fetch coordinates for the provided address.' });
        }

        const { lat, lng } = response.data.results[0].geometry.location;

        const hostel = await HostelModel.create({
            name,
            location,
            latitude: lat,
            longitude: lng,
            description,
            images,
            roomImages: roomImages,
            number_of_rooms,
            contact,
            ownerEmail: req.email
        });
        res.status(201).json(hostel);
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: 'Validation Error', message: err.message });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/listRooms', verifyToken, async (req, res) => {
    if (req.userType !== 'owner') {
        return res.status(403).json({ error: 'Forbidden', message: 'Only owners can add rooms' });
    }

    try {
        const { rooms: roomsString, hostelId } = req.body;
        const rooms = JSON.parse(roomsString);
        const roomsWithIds = await RoomModel.insertMany(rooms.map(room => ({
            ...room,
            hostel_id: hostelId,
            room_type: room.type,
            price: room.price,
            availability: room.availability
        })));
        res.status(201).json(roomsWithIds);
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: 'Validation Error', message: err.message });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/listAmenities', verifyToken, async (req, res) => {
    if (req.userType !== 'owner') {
        return res.status(403).json({ error: 'Forbidden', message: 'Only owners can add amenities' });
    }

    try {
        const { amenities, hostelId } = req.body;
        const amenitiesData = { ...JSON.parse(amenities), hostel_id: hostelId };
        const createdAmenities = await amenitiesModel.create(amenitiesData);
        res.status(201).json(createdAmenities);
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: 'Validation Error', message: err.message });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/gethostels', verifyToken, async (req, res) => {
    if (req.userType !== 'owner') {
        return res.status(403).json({ error: 'Forbidden', message: 'Only owners can view hostels' });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const hostels = await HostelModel.find({ ownerEmail: req.email })
            .skip(skip)
            .limit(limit)
            .lean();
        const hostelCount = await HostelModel.countDocuments({ ownerEmail: req.email });
        res.status(200).json({ hostels, count: hostelCount });
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/hostels/:id', verifyToken, async (req, res) => {
    try {
        let query = HostelModel.findById(req.params.id).lean();
        query = query.populate('room').populate('amenities');
        const hostel = await query;
        if (!hostel) {
            return res.status(404).json({ error: 'Hostel not found' });
        }
        res.status(200).json(hostel);
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/hostels/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const hostel = await HostelModel.findByIdAndDelete(id);
        if (!hostel) {
            return res.status(404).json({ error: 'Not Found', message: 'Hostel not found' });
        }
        res.status(200).json({ message: 'Hostel deleted successfully' });
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/hostels/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const hostel = await HostelModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!hostel) {
            return res.status(404).json({ error: 'Not Found', message: 'Hostel not found' });
        }
        res.status(200).json(hostel);
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/getUsername', verifyToken, async (req, res) => {
    try {
        const { email } = req;
        const user = await OwnerModel.findOne({ email }).lean();
        if (!user) {
            return res.status(404).json({ error: 'Not Found', message: 'User not found' });
        }
        const username = user.username;
        res.status(200).json({ username });
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/signupOwner', async (req, res) => {
    try {
        const owner = await OwnerModel.create(req.body);
        res.status(201).json(owner);
    } catch (err) {
        if (err.code === 11000 && err.keyPattern.email === 1) {
            return res.status(400).json({ error: 'Validation Error', message: 'Email address already in use' });
        }
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: 'Validation Error', message: err.message });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/signupCustomer', async (req, res) => {
    try {
        const customer = await CustomerModel.create(req.body);
        res.status(201).json(customer);
    } catch (err) {
        if (err.code === 11000 && err.keyPattern.email === 1) {
            return res.status(400).json({ error: 'Validation Error', message: 'Email address already in use' });
        }
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: 'Validation Error', message: err.message });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/profile', verifyToken, async (req, res) => {
    try {
        let user;
        if (req.userType === 'customer') {
            user = await CustomerModel.findOne({ email: req.email }).lean();
        } else if (req.userType === 'owner') {
            user = await OwnerModel.findOne({ email: req.email }).lean();
        }

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({
            email: user.email,
            username: user.username,
            contactNumber: user.Phone,
            dateOfBirth: user.DOB,
            cnic: user.CNIC,
            userType: user.userType
        });
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/profile', verifyToken, async (req, res) => {
    const { username, password, contactNumber, dateOfBirth } = req.body;
    try {
        const updateData = {
            username,
            Phone: contactNumber,
            DOB: dateOfBirth
        };

        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        let user;
        if (req.userType === 'customer') {
            user = await CustomerModel.findOneAndUpdate({ email: req.email }, updateData, { new: true }).lean();
        } else if (req.userType === 'owner') {
            user = await OwnerModel.findOneAndUpdate({ email: req.email }, updateData, { new: true }).lean();
        }

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post("/login", async (req, res) =>{ 
    const { email, password } = req.body;
    try {
        const owner = await OwnerModel.findOne({ email }).lean();
        if (owner) {
            if (owner.password === password) {
                const token = jwt.sign({ userType: 'owner', email }, 'secret_key');
                res.json({ userType: 'owner', message: 'success', token });
            } else {
                res.json({ message: 'incorrect password' });
            }
        } else {
            const customer = await CustomerModel.findOne({ email }).lean();
            if (customer) {
                if (customer.password === password) {
                    const token = jwt.sign({ userType: 'customer', email }, 'secret_key');
                    res.json({ userType: 'customer', message: 'success', token });
                } else {
                    res.json({ message: 'incorrect password' });
                }
            } else {
                res.json({ message: 'No record existed' });
            }
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen (3001, (err) => {
    if (err) {
        console.error('Error starting server:', err);
    } else {
        console.log('The server is running');
    }
})
