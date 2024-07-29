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
const fs = require('fs');
const { exec } = require('child_process');
const RoomImages = require('./models/uploadRooms');
const { Readable } = require('stream');
const FormData = require('form-data');
const BookingModel = require('./models/Bookings');


const app = express();
app.use(express.json());
app.use(cors());

app.use(cors(
    {
        origin: ["https://dormfinder.vercel.app"],
        methods: ["POST", "GET", "DELETE", "PUT"],
        credentials: true
    }
));
// app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 500 * 1024 * 1024 },
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

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://dormfinder2023:dormfinder@dormfinder.3vddaef.mongodb.net/?appName=dormfinder";
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);


mongoose.connect("mongodb+srv://dormfinder2023:dormfinder@dormfinder.3vddaef.mongodb.net/Dormfinder?retryWrites=true&w=majority&appName=dormfinder");

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

app.delete('/bookings/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Check if the ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid booking ID' });
        }

        // Find the booking by ID and delete it
        const booking = await BookingModel.findByIdAndDelete(id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        console.error('Error deleting booking:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});


app.post('/verifyToken', async (req, res) => {
    const { token_number } = req.body;
    console.log('Received request to verify token with token_number:', token_number);

    try {
        // Fetch the booking from database based on token_number
        const booking = await BookingModel.findOne({ token_number });
        console.log('Booking found:', booking);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        console.log(`Comparing booking token: ${booking.token_number} with provided token: ${token_number}`);

        if (booking.token_number === token_number) {
            // Token matches, update booking status or perform actions
            // For example, update booking status to verified
            booking.booking_status = 'confirmed';
            if (!booking.hostel_name) {
                const hostel = await HostelModel.findById(booking.hostel_id);
                if (hostel) {
                    booking.hostel_name = hostel.name;
                } else {
                    return res.status(500).json({ message: 'Hostel not found for booking' });
                }
            }
            await booking.save();

            res.status(200).json({ message: 'Token verified successfully' });
        } else {
            // Token does not match
            res.status(400).json({ message: 'Invalid token' });
        }
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});


app.get('/Customerbookings', async (req, res) => {
    try {
        const bookings = await BookingModel.find();
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});



// app.get('/bookings/:id', async (req, res) => {
//     try {
//         const { hostelId } = req.params;
//         const bookings = await BookingModel.find({ hostelId }).populate('hostelId');

//         if (!bookings) {
//             return res.status(404).json({ message: 'No bookings found for this hostel.' });
//         }

//         res.status(200).json(bookings);
//     } catch (error) {
//         console.error('Error fetching bookings:', error);
//         res.status(500).json({ message: 'Server error. Please try again later.' });
//     }
// });

app.post('/book-room/:id', async (req, res) => {
    const { name, roomType, cnic, token_number, contact, customer_email } = req.body; // Including email in the request body
    const { id } = req.params; // Hostel ID passed as a route parameter

    try {
        // Fetch hostel details by ID
        const hostel = await HostelModel.findById(id);
        if (!hostel) {
            return res.status(404).json({ error: 'Hostel not found' });
        }

        // Fetch room details for the hostel
        const room = await RoomModel.findOne({ hostel_id: id });
        if (!room) {
            return res.status(404).json({ error: 'Room not found for this hostel' });
        }

        // Find customer by email
        const customer = await CustomerModel.findOne({ email: customer_email });
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        console.log('Customer found:', customer);

        // Create new booking instance
        const newBooking = new BookingModel({
            token_number,
            customer_name: name,
            room_type: roomType,
            cnic: cnic,
            contact: contact,
            customer_email: customer_email, // Assign customer email
            hostel_id: id,
            room_id: room._id,
            hostel_name: hostel.name

        });

        // Save booking to database
        await newBooking.save();

        // Respond with success message and booking details
        res.status(201).json({
            message: 'Booking successful',
            booking: {
                _id: newBooking._id,
                hostelName: hostel.name,
                roomPrice: room.price
            }
        });
    } catch (error) {
        console.error('Error booking room:', error);
        res.status(500).json({ error: 'Booking failed' });
    }
});



// app.post('/stitch-room-images', (req, res) => {
//     upload.array('roomImages', 10)(req, res, async (err) => {
//       if (err instanceof multer.MulterError) {
//         return res.status(400).json({ error: err.message });
//       } else if (err) {
//         return res.status(400).json({ error: err.message });
//       }

//       const { hostelId } = req.body;
//       const roomImages = req.files;

//       if (!hostelId) {
//         return res.status(400).json({ error: 'hostelId is required' });
//       }

//       if (!roomImages || roomImages.length < 2) {
//         return res.status(400).json({ error: 'Need at least two images to stitch' });
//       }

//       const uploadsDir = path.join(__dirname, 'uploads');

//       // Ensure the uploads directory exists
//       if (!fs.existsSync(uploadsDir)) {
//         fs.mkdirSync(uploadsDir);
//       }

//       // Save the uploaded images to disk (if needed for stitching)
//       const imagePaths = roomImages.map((file, index) => {
//         const filePath = path.join(uploadsDir, `room_image_${index}.jpg`);
//         try {
//           fs.writeFileSync(filePath, file.buffer);
//           return filePath;
//         } catch (err) {
//           console.error(`Error writing file ${filePath}: ${err.message}`);
//           throw err;
//         }
//       });

//       // Run the Python script for stitching (example)
//       const pythonScript = path.join(__dirname, '360view.py');
//       const command = `python ${pythonScript} ${imagePaths.join(' ')}`;

//       exec(command, async (error, stdout, stderr) => {
//         if (error) {
//           console.error(`Error executing Python script: ${error.message}`);
//           return res.status(500).json({ error: 'Error stitching images' });
//         }

//         // Example: Reading stitched image from disk
//         const outputPath = path.join(uploadsDir, 'stitched_panorama.jpg');
//         try {
//           const stitchedImageData = fs.readFileSync(outputPath);

//           // Save the room images and stitched image to the database using RoomImages model
//           const newRoomImages = new RoomImages({
//             hostel_id: hostelId,
//             roomImages: roomImages.map(file => ({
//               data: file.buffer,
//               contentType: file.mimetype
//             })),
//             stitchedImages: {
//               data: stitchedImageData,
//               contentType: 'image/jpeg'
//             }
//           });

//           await newRoomImages.save().then(() => {
//             console.log('Room images and stitched image saved successfully.');
//             // Clean up the temporary images
//             imagePaths.forEach(filePath => fs.unlinkSync(filePath));
//             fs.unlinkSync(outputPath);

//             res.status(200).json({ panoramaUrl: `/uploads/stitched_panorama.jpg` });
//           }).catch(err => {
//             console.error('Error saving room images and stitched image:', err);
//             res.status(500).json({ error: 'Error saving images to the database' });
//           });
//         } catch (err) {
//           console.error(`Error reading file ${outputPath}: ${err.message}`);
//           res.status(500).json({ error: 'Error reading stitched image' });
//         }
//       });
//     });
//   });

// app.post('/stitch-room-images', upload.array('roomImages', 10), async (req, res) => {
//     const { hostelId } = req.body;
//     const roomImages = req.files;

//     if (!hostelId) {
//         return res.status(400).json({ error: 'hostelId is required' });
//     }

//     if (!roomImages || roomImages.length < 2) {
//         return res.status(400).json({ error: 'Need at least two images to stitch' });
//     }

//     const uploadsDir = path.join(__dirname, 'uploads');

//     // Ensure the uploads directory exists
//     if (!fs.existsSync(uploadsDir)) {
//         fs.mkdirSync(uploadsDir);
//     }

//     // Save the uploaded images to disk (if needed for stitching)
//     const imagePaths = roomImages.map((file, index) => {
//         const filePath = path.join(uploadsDir, `room_image_${index}.jpg`);
//         try {
//             fs.writeFileSync(filePath, file.buffer);
//             return filePath;
//         } catch (err) {
//             console.error(`Error writing file ${filePath}: ${err.message}`);
//             throw err;
//         }
//     });

//     // Run the Python script for stitching (example)
//     const pythonScript = path.join(__dirname, '360feature.py');
//     const command = `py ${pythonScript} ${imagePaths.join(' ')}`;

//     exec(command, async (error, stdout, stderr) => {
//         if (error) {
//             console.error(`Error executing Python script: ${error.message}`);
//             return res.status(500).json({ error: 'Error stitching images' });
//         }

//         // Example: Reading stitched image from disk
//         const outputPath = path.join(uploadsDir, 'stitched_panorama.jpg');
//         try {
//             const stitchedImageData = fs.readFileSync(outputPath);

//             // Save the room images and stitched image to the database using RoomImages model
//             const newRoomImages = new RoomImages({
//                 hostel_id: hostelId,
//                 roomImages: roomImages.map(file => ({
//                     data: file.buffer,
//                     contentType: file.mimetype
//                 })),
//                 stitchedImages: {
//                     data: stitchedImageData,
//                     contentType: 'image/jpeg'
//                 }
//             });
//             // console.log('Room images and stitched image:', newRoomImages);


//             await newRoomImages.save().then(() => {
//                 console.log('Room images and stitched image saved successfully.');
//                 // Clean up the temporary images
//                 imagePaths.forEach(filePath => fs.unlinkSync(filePath));
//                 fs.unlinkSync(outputPath);

//                 res.status(200).json({ panoramaUrl: `/uploads/stitched_panorama.jpg` });
//             }).catch(err => {
//                 console.error('Error saving room images and stitched image:', err);
//                 res.status(500).json({ error: 'Error saving images to the database' });
//             });
//         } catch (err) {
//             console.error(`Error reading file ${outputPath}: ${err.message}`);
//             res.status(500).json({ error: 'Error reading stitched image' });
//         }
//     });
// });

app.post('/stitch-room-images', upload.array('roomImages', 10), async (req, res) => {
    const { hostelId } = req.body;
    const roomImages = req.files;

    if (!hostelId) {
        return res.status(400).json({ error: 'hostelId is required' });
    }

    if (!roomImages || roomImages.length < 2) {
        return res.status(400).json({ error: 'Need at least two images to stitch' });
    }

    // Save the uploaded images to disk
    const uploadsDir = path.join(__dirname, 'uploads');

    // Ensure the uploads directory exists
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir);
    }

    // Save the uploaded images to disk (if needed for stitching)
    const imagePaths = roomImages.map((file, index) => {
        const filePath = path.join(uploadsDir, `room_image_${index}.jpg`);
        try {
            fs.writeFileSync(filePath, file.buffer);
            return filePath;
        } catch (err) {
            console.error(`Error writing file ${filePath}: ${err.message}`);
            throw err;
        }
    });

     // Run the Python script for stitching
     
     const pythonScript = path.join(__dirname, '360feature.py');
     const command = `python ${pythonScript} ${imagePaths.join(' ')}`;
 
     exec(command, async (error, stdout, stderr) => {
         if (error) {
             console.error(`Error executing Python script: ${error.message}`);
             return res.status(500).json({ error: 'Error stitching images' });
         }
 
         
         // Example: Reading stitched image from disk
         const outputPath = path.join(uploadsDir, 'stitched_panorama.jpg');
         try {
             const stitchedImageData = fs.readFileSync(outputPath);
 
             // Save the room images and stitched image to the database using RoomImages model
             const newRoomImages = new RoomImages({
                 hostel_id: hostelId,
                 roomImages: roomImages.map(file => ({
                     data: file.buffer,
                     contentType: file.mimetype
                 })),
                 stitchedImages: {
                     data: stitchedImageData,
                     contentType: 'image/jpeg'
                 }
             });
 
             await newRoomImages.save().then(() => {
                 console.log('Room images and stitched image saved successfully.');
                 // Clean up the temporary images
                 imagePaths.forEach(filePath => fs.unlinkSync(filePath));
                 fs.unlinkSync(outputPath);
         
                 res.status(200).json({ panoramaUrl: `/uploads/stitched_panorama.jpg` });
             }).catch(err => {
                 console.error('Error saving room images and stitched image:', err);
                 res.status(500).json({ error: 'Error saving images to the database' });
             });
         } catch (err) {
             console.error(`Error reading file ${outputPath}: ${err.message}`);
             res.status(500).json({ error: 'Error reading stitched image' });
         }
     });
 });



app.get('/hostel-detail/:id', async (req, res) => {
    const hostelId = req.params.id;
    try {
        const hostel = await HostelModel.findById(hostelId).lean();
        if (!hostel) {
            return res.status(404).send('Hostel not found');
        }

        // Fetch rooms, amenities, and stitched images using hostel._id
        const rooms = await RoomModel.find({ hostel_id: hostel._id }).lean();
        // console.log('Rooms fetched for hostel_id:', hostel_id, rooms);
        const amenities = await amenitiesModel.find({ hostel_id: hostel._id }).lean();
        // console.log('Amenities fetched for hostel_id:', hostel._id, amenities);
        const stitchedImages = await RoomImages.find({ hostel_id: hostel._id }).lean();
        console.log('Stitched images fetched for hostel_id:', hostel._id, stitchedImages);

        const hostelDetails = {
            ...hostel,
            rooms,
            amenities,
            stitchedImages
        };
        res.json(hostelDetails);
    } catch (error) {
        console.error('Error fetching hostel details:', error);
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

        const hostelIds = hostels.map(hostel => hostel._id);
        const rooms = await RoomModel.find({ hostel_id: { $in: hostelIds } }).lean();

        const hostelsWithRooms = hostels.map(hostel => {
            hostel.rooms = rooms.filter(room => room.hostel_id.equals(hostel._id));
            return hostel;
        });

        const totalHostels = await HostelModel.countDocuments({
            latitude: { $gte: latitude - latRadius, $lte: latitude + latRadius },
            longitude: { $gte: longitude - longRadius, $lte: longitude + longRadius }
        });


        const totalPages = Math.ceil(totalHostels / limit);

        res.status(200).json({ hostels: hostelsWithRooms, totalPages });
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
        const { name, location, description, number_of_rooms, contact, hostel_type } = req.body;
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
            hostel_type,
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
        const { email, userType } = req;
        let user;
        if (userType === 'owner') {
            user = await OwnerModel.findOne({ email }).lean();
        } else if (userType === 'customer') {
            user = await CustomerModel.findOne({ email }).lean();
        }
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
            updateData.password = password
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

app.post("/login", async (req, res) => {
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

//Muneeb
app.post('/verify-user', async (req, res) => {
    const { email, DOB, securityQuestion, userType } = req.body;
    try {
        let user;
        if (userType === 'customer') {
            user = await CustomerModel.findOne({ email, DOB, securityQuestion }).lean();
        } else if (userType === 'owner') {
            user = await OwnerModel.findOne({ email, DOB, securityQuestion }).lean();
        }

        if (!user) {
            return res.status(404).json({ message: 'User details do not match' });
        }

        res.status(200).json({ message: 'User verified', email: user.email });
    } catch (error) {
        console.error('Error verifying user:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

app.post('/reset-password', async (req, res) => {
    const { email, newPassword, userType } = req.body;
    try {
        let user;
        if (userType === 'customer') {
            user = await CustomerModel.findOneAndUpdate({ email }, { password: newPassword });
        } else if (userType === 'owner') {
            user = await OwnerModel.findOneAndUpdate({ email }, { password: newPassword });
        }

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

app.listen(3001, (err) => {
    if (err) {
        console.error('Error starting server:', err);
    } else {
        console.log('The server is running');
    }
})
