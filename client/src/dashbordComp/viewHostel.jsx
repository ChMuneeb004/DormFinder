import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import Sidebar from '../dashbordComp/Sidebar';
import { Row, Col, ListGroup } from 'react-bootstrap';

const HostelDetails = () => {
    const { id } = useParams();
    const { auth } = useContext(AuthContext);
    const [hostel, setHostel] = useState(null);
    
    useEffect(() => {
        const fetchHostelDetails = async () => {
            try {
                console.log('Token:', auth.token);
                const response = await axios.get(`http://localhost:3001/hostels/${id}`, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });
                setHostel(response.data);
            } catch (error) {
                console.error('Error fetching hostel details:', error);
            }
        };
    
        fetchHostelDetails();
    }, [id, auth.token]);
    
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
                                    <p><strong>Contact:</strong> {hostel.contact}</p>
                                    <p><strong>Price:</strong> {hostel.price} Rs</p>

                                    <h3>Room Types</h3>
                                    <ListGroup>
                                        {hostel.roomTypes.map((roomType) => (
                                            <ListGroup.Item key={roomType._id}>
                                                <h4>{roomType.name}</h4>
                                                <p><strong>Number of Rooms:</strong> {roomType.numberOfRooms}</p>
                                                <p><strong>Price per Room:</strong> {roomType.pricePerRoom} Rs</p>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>

                                    <h3>Amenities</h3>
                                    <ListGroup>
                                        {hostel.amenities.map((amenity) => (
                                            <ListGroup.Item key={amenity._id}>
                                                {amenity.name}
                                            </ListGroup.Item>
                                        ))}
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
