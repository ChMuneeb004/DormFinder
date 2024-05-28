import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState, useContext } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../dashbordComp/Sidebar';
import '../css_folder/AddHostel.css';
import { AuthContext } from '../contexts/AuthContext';

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', hostel.name);
        formData.append('location', hostel.location);
        formData.append('description', hostel.description);
        formData.append('number_of_rooms', hostel.number_of_rooms);
        formData.append('contact', hostel.contact);
        formData.append('roomTypes', JSON.stringify(hostel.roomTypes));
        formData.append('amenities', JSON.stringify(hostel.amenities));

        for (const image of hostel.images) {
            formData.append('images', image);
        }

        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        try {
            const hostelResponse = await axios.post("http://localhost:3001/listHostel", formData, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            const hostelId = hostelResponse.data._id;

            await axios.post("http://localhost:3001/listRooms", {
                rooms: JSON.stringify(hostel.rooms),
                hostelId
            }, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            await axios.post("http://localhost:3001/listAmenities", {
                amenities: JSON.stringify(hostel.amenities),
                hostelId
            }, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            console.log('Hostel, rooms, and amenities added successfully');
            console.log('Hostel added successfully:', hostelResponse.data);
        } catch (error) {
            console.error('There was an error adding the hostel!', error);
        }
    };

    return (
        <div className="d-flex">
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                        <Sidebar />
                    </div>
                    <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9 ">
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <h1 className="mb-4">Add Hostel</h1>
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
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="images">
                                        <Form.Label className="file-input-label">Hostel Images</Form.Label>
                                        <Form.Control
                                            className="file-input"
                                            type="file"
                                            multiple
                                            onChange={handleChange}
                                            required
                                        />
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
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter contact (+923XX-XXXXXXX)"
                                            value={hostel.contact}
                                            onChange={handleChange}
                                            required
                                            pattern="^\+923\d{2}-\d{7}$"
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Room Types</Form.Label>
                                        {hostel.rooms.map((room, index) => (
                                            <div key={index}>
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
                                            </div>
                                        ))}
                                    </Form.Group>

                                    <Form.Group className="amenities-group">
                                        <Form.Label>Amenities</Form.Label>
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
                                    </Form.Group>

                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddHostel;
