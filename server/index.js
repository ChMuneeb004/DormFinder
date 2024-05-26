const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const OwnerModel = require("./models/Owner")
const bodyParser = require("body-parser")
const CustomerModel = require("./models/Customer")
const HostelModel = require("./models/Hostel")
const multer = require("multer")
const path = require("path")
const jwt = require('jsonwebtoken')
const RoomModel = require("./models/Rooms")
const amenitiesModel = require("./models/facility")


const app = express()
app.use(express.json())
app.use(cors())
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
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized', message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, 'secret_key');
        req.userType = decoded.userType;
        req.email = decoded.email;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ error: 'Unauthorized', message: 'Invalid token' });
    }
}




// app.post('/listHostel', upload.array('images'), async (req, res) => {
//     console.log(req.files, req.body);
//     try {
//         const { name, location, description, number_of_rooms, contact } = req.body;
//         let images = [];
        
//         if (req.files && req.files.length > 0) {
//             images = req.files.map(file => ({ data: file.buffer, contentType: file.mimetype }));
//         } else {
//             return res.status(400).json({ error: 'No files were sent in the request.' });
//         }

//         const hostel = await HostelModel.create({ name, location, description, images, number_of_rooms, contact });
//         res.status(201).json(hostel);
//     } catch (err) {
//         console.error('Error creating hostel:', err);
//         if (err.name === 'ValidationError') {
//             return res.status(400).json({ error: 'Validation Error', message: err.message });
//         }
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

app.post('/listHostel', verifyToken, upload.array('images'), async (req, res) => {
    if (req.userType !== 'owner') {
        return res.status(403).json({ error: 'Forbidden', message: 'Only owners can add hostels' });
    }

    try {
        const { name, location, description, number_of_rooms, contact } = req.body;
        let images = [];
        

        if (req.files && req.files.length > 0) {
            images = req.files.map(file => ({ data: file.buffer, contentType: file.mimetype }));
        } else {
            return res.status(400).json({ error: 'No files were sent in the request.' });
        }

        
        const hostel = await HostelModel.create({
            name,
            location,
            description,
            images,
            number_of_rooms,
            contact,
            // amenities,
            // rooms,
            ownerEmail: req.email // associate hostel with the owner's email
        });
        res.status(201).json(hostel);
        
    } catch (err) {
        console.error('Error creating hostel:', err);
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
            hostel_id: hostelId, // Use the id of the hostel
            room_type: room.type, // Use the type of the room
            price: room.price, // Use the price of the room
            availability: room.availability // Use the availability of the room
        })));
        res.status(201).json(roomsWithIds);
    } catch (err) {
        console.error('Error creating rooms:', err);
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
        console.error('Error creating amenities:', err);
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: 'Validation Error', message: err.message });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// app.post('/listHostel', verifyToken, upload.array('images'), async (req, res) => {
//     if (req.userType !== 'owner') {
//         return res.status(403).json({ error: 'Forbidden', message: 'Only owners can add hostels' });
//     }

//     try {
//         const { name, location, description, number_of_rooms, contact, amenities: amenitiesString, rooms: roomsString } = req.body;
//         let images = [];

//         if (req.files && req.files.length > 0) {
//             images = req.files.map(file => ({ data: file.buffer, contentType: file.mimetype }));
//         } else {
//             return res.status(400).json({ error: 'No files were sent in the request.' });
//         }

//         const amenities = amenitiesString ? JSON.parse(amenitiesString) : {};
//         const rooms = roomsString ? JSON.parse(roomsString).map(room => ({
//             type: room.type,
//             price: room.price,
//             availability: room.availability
//         })) : [];

//         const hostel = await HostelModel.create({
//             name,
//             location,
//             description,
//             images,
//             number_of_rooms,
//             contact,
//             ownerEmail: req.email // associate hostel with the owner's email
//         });

//         await RoomModel.insertMany(rooms.map(room => ({ ...room, hostel: hostel._id })));
//         const amenitiesData = {
//             ...amenities,
//             hostel: hostel._id,
//             attached_bathroom_check: amenities.attached_bathroom,
//             water_cooler_check: amenities.water_cooler,
//             gasoline_check: amenities.gasoline,
//             kitchen_check: amenities.kitchen,
//             air_cooler_check: amenities.air_cooler,
//             air_condition_check: amenities.air_condition
//         };
//         await amenitiesModel.create(amenitiesData);

//         res.status(201).json(hostel);
//     } catch (err) {
//         console.error('Error creating hostel:', err);
//         if (err.name === 'ValidationError') {
//             return res.status(400).json({ error: 'Validation Error', message: err.message });
//         }
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// });



app.get('/gethostels', verifyToken, async (req, res) => {
    if (req.userType !== 'owner') {
        return res.status(403).json({ error: 'Forbidden', message: 'Only owners can view hostels' });
    }

    try {
        const hostels = await HostelModel.find({ ownerEmail: req.email }); // get hostels for the logged-in owner
        res.status(200).json(hostels);
    } catch (err) {
        console.error('Error retrieving hostels:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// app.get('/gethostels', async (req, res) => {
//     try {
//         const hostels = await HostelModel.find();
//         res.status(200).json(hostels);
//     } catch (err) {
//         console.error('Error retrieving hostels:', err);
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

app.get('/hostels/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const hostel = await HostelModel.findById(id);
        if (!hostel) {
            return res.status(404).json({ error: 'Not Found', message: 'Hostel not found' });
        }
        res.status(200).json(hostel);
    } catch (err) {
        console.error('Error retrieving hostel:', err);
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
        console.error('Error deleting hostel:', err);
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
        console.error('Error updating hostel:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});



app.get('/getUsername', verifyToken, async (req, res) => {
    try {
        const { email } = req;
        console.log('Email:', email);
        const user = await OwnerModel.findOne({ email });
        console.log('User:', user);
        if (!user) {
            return res.status(404).json({ error: 'Not Found', message: 'User not found' });
        }
        const username = user.username;
        res.status(200).json({ username });
    } catch (err) {
        console.error('Error retrieving username:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/signupOwner', async (req, res) => {
    try {
        const owner = await OwnerModel.create(req.body);
        res.status(201).json(owner);
    } catch (err) {
        console.error('Error creating user:', err);
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
        console.error('Error creating user:', err);
            if (err.code === 11000 && err.keyPattern.email === 1) {
                return res.status(400).json({ error: 'Validation Error', message: 'Email address already in use' });
            }
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: 'Validation Error', message: err.message });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});



app.post("/login", async (req, res) =>{ 
    const { email, password } = req.body;
    try {
        const owner = await OwnerModel.findOne({ email });
        if (owner) {
            if (owner.password === password) {
                const token = jwt.sign({ userType: 'owner', email }, 'secret_key');
                res.json({ userType: 'owner', message: 'success', token });
                console.log(token);
            } else {
                res.json({ message: 'incorrect password' });
            }
        } else {
            const customer = await CustomerModel.findOne({ email });
            if (customer) {
                if (customer.password === password) {
                    const token = jwt.sign({ userType: 'customer', email }, 'secret_key');
                    res.json({ userType: 'customer', message: 'success', token });
                    console.log(token);
                } else {
                    res.json({ message: 'incorrect password' });
                }
            } else {
                res.json({ message: 'No record existed' });
            }
        }
    } catch (error) {
        console.error('Error during login:', error);
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