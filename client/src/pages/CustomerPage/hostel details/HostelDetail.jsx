import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import Header from '../Header';
import panorama from './imagestitching2.jpg';
import panorama2 from './stitchedOutput.jpg';



const HostelDetail = () => {
    const { id } = useParams();
    const [hostel, setHostel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stitchedImageUrl, setStitchedImageUrl] = useState('');

    useEffect(() => {

        const fetchHostel = async () => {
            try {
                if (!id) {
                    throw new Error('Invalid hostel ID');
                }

                const response = await axios.get(`http://localhost:3001/hostel-detail/${id}`);
                if (!response.data) {
                    throw new Error('Hostel not found');
                }

                setHostel(response.data);
                setStitchedImageUrl(response.data.panoramaUrl);
            } catch (error) {
                setError('Error fetching hostel details');
            } finally {
                setLoading(false);
            }
        };

        fetchHostel();
    }, [id]);

    useEffect(() => {
        if (!loading && hostel) {
            const loadPannellum = async () => {
                const css = document.createElement('link');
                css.rel = 'stylesheet';
                css.href = 'https://cdn.jsdelivr.net/npm/pannellum/build/pannellum.css';
                document.head.appendChild(css);

                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/pannellum/build/pannellum.js';
                script.onload = () => {
                    pannellum.viewer('panorama', {
                        "type": "equirectangular",
                        "panorama": panorama2,
                        "autoLoad": true
                    });
                };
                document.body.appendChild(script);
            };

            loadPannellum();
        }
    }, [loading, hostel]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!hostel) {
        return <div>No hostel found</div>;
    }
    const { images = [], roomImages = [], name = '', description = '', location = '', number_of_rooms = '', contact = '', rooms = [], amenities = [] } = hostel;

    // Adjust the way you call bufferToBase64 based on the structure of images[0].data
    // const DesData = description[0].data.data ? description[0].data.data : description[0].data;
    // const des = `data:${description[0].contentType};base64,${bufferToBase64(DesData)}`;

    const des = `data:${description.contentType};base64,${bufferToBase64(description.data)}`

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

    const getImageUrl = (image) => {
        if (image && image.data) {
            return `data:${image.contentType};base64,${image.data}`;
        }
        return '';
    };


    return (
        <>
        <Header />
        <div className="container my-4">
            <div className="row mb-4">
                <div className="col-md-7">
                    <Carousel>
                        {images.map((image, index) => (
                            <Carousel.Item key={index}>
                                <img
                                    src={getImageUrl(image)}
                                    className="d-block w-100"
                                    alt={`Slide ${index}`}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
                <div className="col-md-5">
                    <h2 className="mb-3">{name}</h2>
                    <div className="card p-3">
                        <p><strong>Location:</strong> {location}</p>
                        <p><strong>Number of Rooms:</strong> {number_of_rooms}</p>
                        <p><strong>Contact:</strong> {contact}</p>
                        <p><strong>Description:</strong> {des}</p>
                        <p><strong>Amenities:</strong></p>
                        <ul>
                            {amenities.map((amenity, index) => (
                                getAmenityNames(amenity).map((name, nameIndex) => (
                                    <li key={`${index}-${nameIndex}`}>{name}</li>
                                ))
                            ))}
                        </ul>
                        <h3>Room Types and Prices</h3>
                        <ul>
                            {rooms.map((room, index) => (
                                <li key={index}>
                                    Type: {room.room_type}, Price: {room.price}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-12">
                    <h3>360° View</h3>
                    <div id="panorama" style={{ width: '100%', height: '500px' }}></div>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-12">
                    <h3>Overview</h3>
                    <p>{des}</p>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-12">
                    <h3>Location</h3>
                    <div>
                        <iframe
                            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyB9ehHDgZXPz2uOE6Tjfwiapo329zBVsKI&q=${encodeURIComponent(location)}`}
                            width="100%"
                            height="450"
                            allowFullScreen=""
                            loading="lazy"
                            title="Google Maps"
                        ></iframe>
                    </div>
                </div>
            </div>
            
            <div className="row mb-4">
                <div className="col-12">
                    <h3>Amenities</h3>
                    <ul>
                        {amenities.map((amenity, index) => (
                            getAmenityNames(amenity).map((name, nameIndex) => (
                                <li key={`${index}-${nameIndex}`}>{name}</li>
                            ))
                        ))}
                    </ul>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-12">
                    <h3>Bedrooms</h3>
                    <div className="row">
                        {rooms.map((room, index) => (
                            <div key={index} className="col-md-6 mb-3">
                                <div className="card p-3">
                                    <h5>{`Bedroom ${index + 1}`}</h5>
                                    <p>Type: {room.room_type}</p>
                                    <p>Price: {room.price}</p>
                                    <p>Deposit: £{room.deposit}</p>
                                    <button className="btn btn-primary">Book now</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </>
    );
};

function bufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

export default HostelDetail;
