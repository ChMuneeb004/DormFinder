import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import Sidebar from '../dashbordComp/Sidebar';
import { Row, Col, ListGroup, Image } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';


const HostelDetails = () => {
    const { id } = useParams();
    const { auth } = useContext(AuthContext);
    const [hostel, setHostel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchHostelDetails = async () => {
            try {
                if (!auth) {
                    throw new Error('Authentication failed');
                }

                const response = await axios.get(`http://localhost:3001/hostel-detail/${id}`, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });

                if (!response.data) {
                    throw new Error('Hostel not found');
                }

                setHostel(response.data);
            } catch (error) {
                setError('Error fetching hostel details');
            } finally {
                setLoading(false);
            }
        };

        fetchHostelDetails();
    }, [id, auth]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!hostel) {
        return <div>No hostel found</div>;
    }

    const getImageUrl = (image) => {
        if (image && image.data) {
            return `data:${image.contentType};base64,${image.data}`;
        }
        return '';
    };

    function getAmenityNames(amenity) {
        let amenityNames = [];
        if (amenity.air_condition_check) amenityNames.push("Air Condition");
        if (amenity.air_cooler_check) amenityNames.push("Air Cooler");
        if (amenity.kitchen_check) amenityNames.push("Kitchen");
        if (amenity.gasoline_check) amenityNames.push("Gasoline");
        if (amenity.water_cooler_check) amenityNames.push("Water Cooler");
        if (amenity.attached_bathroom_check) amenityNames.push("Attached Bathroom");
        return amenityNames;
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
                            <div className="col-12">
                                <h1>Hostel Details</h1>
                                <div>
                                    <h2>{hostel.name}</h2>
                                    <p><strong>Location:</strong> {hostel.location}</p>
                                    {/* <p><strong>Description:</strong> {hostel.description}</p> */}
                                    <p><strong>Contact:</strong> {hostel.contact}</p>
                                    <p><strong>Price:</strong> {hostel.price} Rs</p>

                                    <h3>Images</h3>
                                    <Carousel>
                                        {hostel.images.map((image, index) => (
                                            <Carousel.Item key={index}>
                                                <img
                                                    src={getImageUrl(image)}
                                                    className="d-block w-100"
                                                    alt={`Slide ${index}`}
                                                />
                                            </Carousel.Item>
                                        ))}
                                    </Carousel>

                                    <h3>Room Types</h3>
                                    <ListGroup>
                                        {hostel.rooms.map((room, index) => (
                                            <ListGroup.Item key={index}>
                                                <h4>{room.name}</h4>
                                                <p><strong>Number of Rooms:</strong> {room.number_of_rooms}</p>
                                                <p><strong>Price per Room:</strong> {room.price} Rs</p>
                                                <p><strong>Availability:</strong> {room.availability ? 'Available' : 'Not Available'}</p>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>

                                    <h3>Amenities</h3>
                                    <ListGroup>
                                    <ul>
                                        {hostel.amenities.map((amenity, index) => (
                                            getAmenityNames(amenity).map((name, nameIndex) => (
                                                <li key={`${index}-${nameIndex}`}>{name}</li>
                                            ))
                                        ))}
                                    </ul>
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
