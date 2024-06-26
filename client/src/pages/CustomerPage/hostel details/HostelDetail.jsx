import React, { useEffect, useState, useCallback  } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import Header from '../Header';


const HostelDetail = () => {
    const { id } = useParams();
    const [hostel, setHostel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            } catch (error) {
                setError('Error fetching hostel details');
            } finally {
                setLoading(false);
            }
        };

        fetchHostel();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!hostel) {
        return <div>No hostel found</div>;
    }
    const { images = [], name = '', description = '', location = '', number_of_rooms = '', contact = '', rooms = [], amenities = [] } = hostel;

    // Adjust the way you call bufferToBase64 based on the structure of images[0].data
    // const DesData = description[0].data.data ? description[0].data.data : description[0].data;
    // const des = `data:${description[0].contentType};base64,${bufferToBase64(DesData)}`;

    const des = `data:${description.contentType};base64,${bufferToBase64(description.data)}`

    return (
        <>
            <Header />
            <div className="container my-4">

                <div className="row">
                    <div className="col-md-6">
                        <Carousel>
                            {images.map((image, index) => (
                                <Carousel.Item key={index}>
                                    <img
                                        className="d-block w-100"
                                        src={`data:${image.contentType};base64,${bufferToBase64(image.data.data)}`}
                                        alt={`${name} - Image ${index}`}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                    <h2>{name}</h2>
                    <div className="col-md-6">
                        <p><strong>Location:</strong> {location}</p>
                        <p><strong>Number of Rooms:</strong> {number_of_rooms}</p>
                        <p><strong>Contact:</strong> {contact}</p>
                        <p><strong>Amenities:</strong></p>
                        <ul>
                            {amenities.map((amenity, index) => (
                                <li key={index}>{amenity.name}</li>
                            ))}
                        </ul>
                        <p><strong>Description:</strong> {des}</p>
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
