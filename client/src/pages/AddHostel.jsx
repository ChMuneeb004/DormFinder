import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState, useContext } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../dashbordComp/Sidebar';
import '../css_folder/AddHostel.css'
import { AuthContext } from '../contexts/AuthContext';

const AddHostel = () => {
    const { auth } = useContext(AuthContext);
    const [hostel, setHostel] = useState({
        name: '',
        location: '',
        description: '',
        images: [],
        number_of_rooms: '',
        contact: ''
    });

    const handleChange = (e) => {
        const { id, value, files } = e.target;
        if (files) {
            setHostel({
                ...hostel,
                [id]: Array.from(files),
            });
        } else {
            setHostel({
                ...hostel,
                [id]: value
            });
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

        for (const image of hostel.images) {
            formData.append('images', image);
        }

        for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }


        try {
            const response = await axios.post(import.meta.env.VITE_REACT_APP_BASEURL+"/listHostel", formData, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Hostel added successfully:', response.data);
        } catch (error) {
            console.error('There was an error adding the hostel!', error);
        }
    };

        return (
            <div className="d-flex">
            <Sidebar />
            <Container fluid className="content">
                <Row>
                    <Col>
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
                                <Form.Label>Hostel Images</Form.Label>
                                <Form.Control
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

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
        );


};

export default AddHostel;