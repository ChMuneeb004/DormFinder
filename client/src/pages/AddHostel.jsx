import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../dashbordComp/Sidebar';
import '../css_folder/AddHostel.css';
import { AuthContext } from '../contexts/AuthContext';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const AddHostel = () => {
    const { auth } = useContext(AuthContext);
    const [hostel, setHostel] = useState({
        name: '',
        location: '',
        description: '',
        images: [],
        number_of_rooms: '',
        contact: '',
        rooms: [
            { type: 'double', price: '', availability: false },
            { type: 'triple', price: '', availability: false },
            { type: 'quadruple', price: '', availability: false },
        ],
        amenities: {
            air_condition_check: false,
            air_cooler_check: false,
            kitchen_check: false,
            gasoline_check: false,
            water_cooler_check: false,
            attached_bathroom_check: false
        }
    });
    const [alert, setAlert] = useState({ show: false, message: '', variant: '' });

    const handleChange = (e) => {
        const { id, value, files, type, checked, name } = e.target;
        if (files) {
            setHostel({
                ...hostel,
                [id]: Array.from(files),
            });
        } else if (type === 'checkbox') {
            if (name.startsWith('room')) {
                const index = parseInt(name.split('-')[1], 10);
                setHostel(prevState => ({
                    ...prevState,
                    rooms: prevState.rooms.map((room, i) =>
                        i === index ? { ...room, availability: checked } : room
                    )
                }));
            } else {
                setHostel(prevState => ({
                    ...prevState,
                    amenities: {
                        ...prevState.amenities,
                        [id]: checked
                    }
                }));
            }
        } else if (name.startsWith('room')) {
            const index = parseInt(name.split('-')[1], 10);
            const field = name.split('-')[2];
            setHostel(prevState => ({
                ...prevState,
                rooms: prevState.rooms.map((room, i) =>
                    i === index ? { ...room, [field]: value } : room
                )
            }));
        } else {
            setHostel(prevState => ({
                ...prevState,
                [id]: value
            }));
        }
    };

    const handlePhoneChange = (value) => {
        setHostel(prevState => ({
            ...prevState,
            contact: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', hostel.name);
        formData.append('location', hostel.location);
        formData.append('description', hostel.description);
        formData.append('number_of_rooms', hostel.number_of_rooms);
        formData.append('contact', hostel.contact);
        formData.append('rooms', JSON.stringify(hostel.rooms));
        formData.append('amenities', JSON.stringify(hostel.amenities));

        for (const image of hostel.images) {
            formData.append('images', image);
        }

        try {
            const hostelResponse = await axios.post("http://localhost:3001/listHostel", formData, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            const hostelId = hostelResponse.data._id;

            // Create Rooms
            await axios.post("http://localhost:3001/listRooms", {
                rooms: JSON.stringify(hostel.rooms),
                hostelId
            }, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            // Create Amenities
            await axios.post("http://localhost:3001/listAmenities", {
                amenities: JSON.stringify(hostel.amenities),
                hostelId
            }, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            setAlert({ show: true, message: 'Hostel, rooms, and amenities added successfully', variant: 'success' });
        } catch (error) {
            setAlert({ show: true, message: 'There was an error adding the hostel!', variant: 'danger' });
        }
    };

    const handleCustomButtonClick = () => {
        document.getElementById('images').click();
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setHostel(prevState => ({
            ...prevState,
            images: files
        }));
    };

    return (
        <div className="d-flex">
            <Container fluid>
                <Row>
                    <Col xs={12} sm={12} md={5} lg={4} xl={3}>
                        <Sidebar />
                    </Col>
                    <Col xs={12} sm={10} md={7} lg={8} xl={9}>
                        <div className='p-4'>
                            <h1 className="mb-4">Add Hostel</h1>
                            {alert.show && <Alert variant={alert.variant} onClose={() => setAlert({ show: false, message: '', variant: '' })} dismissible>{alert.message}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="name">
                                    <Form.Label>Hostel Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter hostel name"
                                        value={hostel.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="location">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter address"
                                        value={hostel.location}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter description (min 50 characters)"
                                        value={hostel.description}
                                        onChange={handleChange}
                                        required
                                        minLength={50}
                                        style={{ width: '100%', height: '200px' }}
                                    />
                                </Form.Group>

                                <Form.Group controlId="images">
                                    <Form.Label>Hostel Images</Form.Label>
                                    <Card className="mb-3">
                                        <Card.Body>
                                            <Form.Control
                                                type="file"
                                                id="images"
                                                style={{ display: 'none' }}
                                                multiple
                                                onChange={handleImageChange}
                                                required
                                            />
                                            <Button variant="warning" onClick={handleCustomButtonClick}>
                                                Upload Images
                                            </Button>
                                            {hostel.images.length > 0 && (
                                                <div className="mt-2">
                                                    {hostel.images.map((file, index) => (
                                                        <div key={index}>{file.name}</div>
                                                    ))}
                                                </div>
                                            )}
                                        </Card.Body>
                                    </Card>
                                </Form.Group>

                                <Form.Group controlId="number_of_rooms">
                                    <Form.Label>Number of Rooms</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter number of rooms"
                                        value={hostel.number_of_rooms}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="contact">
                                    <Form.Label>Contact</Form.Label>
                                    <PhoneInput
                                        country={'pk'}
                                        value={hostel.contact}
                                        onChange={handlePhoneChange}
                                        inputStyle={{ width: '100%' }}
                                        inputProps={{
                                            required: true,
                                            autoFocus: true
                                        }}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Room Types</Form.Label>
                                    {hostel.rooms.map((room, index) => (
                                        <Card key={index} className="mb-3">
                                            <Card.Body>
                                                <Form.Check
                                                    type="checkbox"
                                                    label={`${room.type.charAt(0).toUpperCase() + room.type.slice(1)} Room`}
                                                    name={`room-${index}`}
                                                    checked={room.availability}
                                                    onChange={handleChange}
                                                />
                                                {room.availability && (
                                                    <Form.Control
                                                        type="number"
                                                        placeholder="Enter price"
                                                        name={`room-${index}-price`}
                                                        value={room.price}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                )}
                                            </Card.Body>
                                        </Card>
                                    ))}
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Amenities</Form.Label>
                                    <Card className="mb-3">
                                        <Card.Body>
                                            <Row>
                                                <Col xs={12} md={6}>
                                                    <Form.Check
                                                        type="checkbox"
                                                        label="Air Condition"
                                                        id="air_condition_check"
                                                        checked={hostel.amenities.air_condition_check}
                                                        onChange={handleChange}
                                                    />
                                                    <Form.Check
                                                        type="checkbox"
                                                        label="Air Cooler"
                                                        id="air_cooler_check"
                                                        checked={hostel.amenities.air_cooler_check}
                                                        onChange={handleChange}
                                                    />
                                                    <Form.Check
                                                        type="checkbox"
                                                        label="Kitchen"
                                                        id="kitchen_check"
                                                        checked={hostel.amenities.kitchen_check}
                                                        onChange={handleChange}
                                                    />
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    <Form.Check
                                                        type="checkbox"
                                                        label="Gasoline"
                                                        id="gasoline_check"
                                                        checked={hostel.amenities.gasoline_check}
                                                        onChange={handleChange}
                                                    />
                                                    <Form.Check
                                                        type="checkbox"
                                                        label="Water Cooler"
                                                        id="water_cooler_check"
                                                        checked={hostel.amenities.water_cooler_check}
                                                        onChange={handleChange}
                                                    />
                                                    <Form.Check
                                                        type="checkbox"
                                                        label="Attached Bathroom"
                                                        id="attached_bathroom_check"
                                                        checked={hostel.amenities.attached_bathroom_check}
                                                        onChange={handleChange}
                                                    />
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AddHostel;
