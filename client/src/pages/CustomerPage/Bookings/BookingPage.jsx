import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

const BookingPage = () => {
    const { id: hostelId } = useParams(); // Get hostel ID from route parameters
    const navigate = useNavigate();

    const generateToken = () => {
        return `DFTK${Math.floor(1000 + Math.random() * 9000)}`;
    };

    // State for form inputs
    const [name, setName] = useState('');
    const [roomType, setRoomType] = useState('');
    const [address, setAddress] = useState('');
    const [cnic, setCnic] = useState('');
    const [token, setToken] = useState(generateToken());
    
    // State for modal
    const [showModal, setShowModal] = useState(false);
    const [bookingDetails, setBookingDetails] = useState({
        token: '',
        name: '',
        hostelName: '',
        roomType: '',
        roomPrice: '',
    });

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Send booking request to backend
            const response = await axios.post(`http://localhost:3001/book-room/${hostelId}`, {
                name,
                roomType,
                address,
                cnic,
                token_number: token
            });

            console.log('Booking successful:', response.data);
            // Set booking details for the modal
            setBookingDetails({
                token,
                name,
                hostelName: response.data.booking.hostelName, // Adjust according to your response structure
                roomType,
                roomPrice: response.data.booking.roomPrice // Adjust according to your response structure
            });
            // Show the modal
            setShowModal(true);
        } catch (error) {
            console.error('Error booking room:', error);
        }
    };

    return (
        <div className="container">
            <h2>Book a Room</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="roomType" className="form-label">Select Room Type:</label>
                    <select className="form-control" id="roomType" value={roomType} onChange={(e) => setRoomType(e.target.value)} required>
                        <option value="">Select Room Type</option>
                        <option value="double">Double Room</option>
                        <option value="triple">Triple Room</option>
                        <option value="quad">Quad Room</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input
                        type="text"
                        className="form-control"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>CNIC</label>
                    <input
                        type="text"
                        className="form-control"
                        value={cnic}
                        onChange={(e) => setCnic(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Token</label>
                    <input
                        type="text"
                        className="form-control"
                        value={token}
                        readOnly
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            {/* Booking Confirmation Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Booking Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><strong>Token Number:</strong> {bookingDetails.token}</p>
                    <p><strong>Name:</strong> {bookingDetails.name}</p>
                    <p><strong>Hostel Name:</strong> {bookingDetails.hostelName}</p>
                    <p><strong>Room Type:</strong> {bookingDetails.roomType}</p>
                    <p><strong>Room Price:</strong> {bookingDetails.roomPrice}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => navigate('/')}>
                        Go to Home
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BookingPage;
