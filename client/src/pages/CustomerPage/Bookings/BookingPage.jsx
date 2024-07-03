import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import Header from "../Header";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const BookingPage = () => {
    const { id: hostelId } = useParams(); // Get hostel ID from route parameters
    // const {cid: CustomerId } = useParams(); // Get customer ID from route parameters
    const navigate = useNavigate();

    const generateToken = () => {
        return `DFTK${Math.floor(1000 + Math.random() * 9000)}`;
    };

    // State for form inputs
    const [name, setName] = useState('');
    const [roomType, setRoomType] = useState('');
    const [customer_email, setcustomer_email] = useState('');
    const [cnic, setCnic] = useState('');
    const [contact, setContact] = useState('');
    const [token, setToken] = useState(generateToken());

    // State for modal
    const [showModal, setShowModal] = useState(false);
    const [bookingDetails, setBookingDetails] = useState({
        token: '',
        name: '',
        hostelName: '',
        roomType: '',
        roomPrice: '',
        contact: ''
    });

    // State for errors
    const [errors, setErrors] = useState({});
    const [submissionError, setSubmissionError] = useState(null);

    // Validate form inputs
    const validateForm = () => {
        const newErrors = {};
        if (!name) {
            newErrors.name = 'Name is required';
        } else if (name.length < 3) {
            newErrors.name = 'Name must be at least 3 characters long';
        } else if (!/^[a-zA-Z\s]+$/.test(name)) {
            newErrors.name = 'Name must contain only letters and spaces';
        }
        if (!roomType) newErrors.roomType = 'Room type is required';
        if (!customer_email) {
            newErrors.customer_email = 'Your account email is required';
        } else if (!customer_email.includes('@') || !customer_email.includes('.')) {
            newErrors.customer_email = 'Invalid email format';
        }
        if (!cnic) {
            newErrors.cnic = 'CNIC is required';
        } else if (!/^\d{13}$/.test(cnic)) {
            newErrors.cnic = 'CNIC must be exactly 13 digits';
        }
        if (!contact) {
            newErrors.contact = 'Contact is required';
        } else if (!/^(\+?\d{1,4}|\d{1,4})?\s?\d{10,14}$/.test(contact)) {
            newErrors.contact = 'Contact must be exactly 11 digits';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmissionError(null);

        if (!validateForm()) return;

        try {
            // Send booking request to backend
            const response = await axios.post(`http://localhost:3001/book-room/${hostelId}`, {
                name,
                roomType,
                cnic,
                token_number: token,
                contact,
                customer_email
            });

            console.log('Booking successful:', response.data);
            // Set booking details for the modal
            setBookingDetails({
                token,
                name,
                hostelName: response.data.booking.hostelName, // Adjust according to your response structure
                roomType,
                roomPrice: response.data.booking.roomPrice, // Adjust according to your response structure
                contact,
                customer_email
            });
            // Show the modal
            setShowModal(true);
        } catch (error) {
            console.error('Error booking room:', error);
            setSubmissionError('An error occurred while booking the room. Please try again.');
        }
    };

    const handlePhoneChange = (value) => {
        setContact(value);
    };

    return (
        <>
        <Header />
        <Container fluid className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#f8f9fa' }}>
            <style>
                {`
                .form-container {
                    background-color: white;
                    padding: 30px;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }

                .form-container h2 {
                    margin-bottom: 20px;
                    font-weight: bold;
                }

                .btn-primary {
                    background-color: #f0ad4e;
                    border-color: #f0ad4e;
                }

                .btn-primary:hover {
                    background-color: #ec971f;
                    border-color: #eb9316;
                }
                `}
            </style>
            <Row className="justify-content-center">
                <Col sm={12} xs={12} md={12} lg={12} xl={12}>
                    <div className="form-container">
                        <h2 className="text-center mb-4">Book a Room</h2>
                        <Form onSubmit={handleSubmit}>
                            {submissionError && <Alert variant="danger">{submissionError}</Alert>}
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    isInvalid={!!errors.name}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Select Room Type</Form.Label>
                                <Form.Select
                                    value={roomType}
                                    onChange={(e) => setRoomType(e.target.value)}
                                    isInvalid={!!errors.roomType}
                                    required
                                >
                                    <option value="">Select Room Type</option>
                                    <option value="double">Double Room</option>
                                    <option value="triple">Triple Room</option>
                                    <option value="quad">Quad Room</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.roomType}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Contact</Form.Label>
                                <PhoneInput
                                    country={'pk'}
                                    value={contact}
                                    onChange={handlePhoneChange} // Correctly update the state
                                    inputStyle={{ width: '100%' }}
                                    inputProps={{
                                        required: true,
                                    }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.contact}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={customer_email}
                                    onChange={(e) => setcustomer_email(e.target.value)}
                                    isInvalid={!!errors.address}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.address}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>CNIC</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={cnic}
                                    onChange={(e) => setCnic(e.target.value)}
                                    isInvalid={!!errors.cnic}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.cnic}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Token</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={token}
                                    readOnly
                                />
                            </Form.Group>
                            <Button type="submit" variant="primary" className="w-100 text-white">Book</Button>
                        </Form>
                    </div>
                </Col>
            </Row>

            {/* Booking Confirmation Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Booking Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><strong>Token Number:</strong> {bookingDetails.token}</p>
                    <p><strong>Name:</strong> {bookingDetails.name}</p>
                    <p><strong>Email:</strong> {bookingDetails.customer_email}</p>
                    <p><strong>Hostel Name:</strong> {bookingDetails.hostelName}</p>
                    <p><strong>Room Type:</strong> {bookingDetails.roomType}</p>
                    <p><strong>Room Price:</strong> {bookingDetails.roomPrice}</p>
                    <p><strong>Contact:</strong> {bookingDetails.contact}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" className='text-white' onClick={() => navigate('/')}>
                        Go to Home
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
        </>
    );
};

export default BookingPage;
