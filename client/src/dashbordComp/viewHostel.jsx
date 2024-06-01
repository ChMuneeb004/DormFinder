import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import Sidebar from '../dashbordComp/Sidebar';
import { Row, Col, ListGroup, Image } from 'react-bootstrap';

const HostelDetails = () => {
    const { id } = useParams();
    const { auth } = useContext(AuthContext);
    const [hostel, setHostel] = useState(null);

    useEffect(() => {
        if (auth) {
            const fetchHostelDetails = async () => {
                try {
                    debugger
                    console.log('Token:', auth.token);
                    const response = await axios.get(`http://localhost:3001/hostels/${id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    setHostel(response.data);
                } catch (error) {
                    console.error('Error fetching hostel details:', error);
                }
            };

            fetchHostelDetails();
        }
    }, [id, auth]);

    if (!hostel) {
        return <div>Loading...</div>;
    }


    return (
        <div className="d-flex">
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                        <Sidebar />
                    </div>
                    <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <h1>Hostel Details</h1>
                                <div>
                                    <h2>{hostel.name}</h2>
                                    <p><strong>Location:</strong> {hostel.location}</p>
                                    <p><strong>Description:</strong> {hostel.description}</p>
                                    <p><strong>Contact:</strong> {hostel.contact}</p>
                                    <p><strong>Price:</strong> {hostel.price} Rs</p>

                                    <h3>Images</h3>
                                    <Row>
                                        <Col md={4}>
                                            <Image src={hostel.images[0]} fluid />
                                        </Col>
                                        <Col md={4}>
                                            <Image src={hostel.images[1]} fluid />
                                        </Col>
                                        <Col md={4}>
                                            <Image src={hostel.images[2]} fluid />
                                        </Col>
                                    </Row>

                                    <h3>Room Types</h3>
                                    <ListGroup>
                                        <ListGroup.Item>
                                            <h4>{hostel.room[0]?.name}</h4>
                                            <p><strong>Number of Rooms:</strong> {hostel.room[0].numberOfRooms}</p>
                                            <p><strong>Price per Room:</strong> {hostel.room[0].pricePerRoom} Rs</p>
                                            <p><strong>Availability:</strong> {hostel.room[0].isAvailable ? 'Available' : 'Not Available'}</p>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <h4>{hostel.room[1].name}</h4>
                                            <p><strong>Number of Rooms:</strong> {hostel.room[1].numberOfRooms}</p>
                                            <p><strong>Price per Room:</strong> {hostel.room[1].pricePerRoom} Rs</p>
                                            <p><strong>Availability:</strong> {hostel.room[1].isAvailable ? 'Available' : 'Not Available'}</p>
                                        </ListGroup.Item>
                                    </ListGroup>

                                    <h3>Amenities</h3>
                                    <ListGroup>
                                        <ListGroup.Item>
                                            {hostel.amenities[0]}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            {hostel.amenities[1]}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            {hostel.amenities[2]}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HostelDetails;
