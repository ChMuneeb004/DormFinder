import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const HostelDetail = () => {
    const { id } = useParams();
    const [hostel, setHostel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) {
            setError('Invalid hostel ID');
            setLoading(false);
            return;
        }

        const fetchHostel = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/hostel-detail/${id}`);
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

    const { images = [], name = '', description = '', location = '', number_of_rooms = '', contact = '' } = hostel;

    return (
        <div className="container my-4">
            <h2>{name}</h2>
            <div className="row">
                <div className="col-md-6">
                    {images && images.length > 0 && (
                        <img
                            src={`data:${images[0].contentType};base64,${bufferToBase64(images[0].data.data)}`}
                            className="img-fluid"
                            alt={name}
                        />
                    )}
                </div>
                <div className="col-md-6">
                    <p><strong>Location:</strong> {location}</p>
                    <p><strong>Number of Rooms:</strong> {number_of_rooms}</p>
                    <p><strong>Contact:</strong> {contact}</p>
                    {/* <p><strong>Ratings:</strong> {ratings}</p> */}
                    {/* <p><strong>Prices:</strong> {prices}</p> */}
                    {/* <p><strong>Amenities:</strong> {amenities.join(', ')}</p> */}
                    <p><strong>Description:</strong> {description}</p>
                </div>
            </div>
        </div>
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