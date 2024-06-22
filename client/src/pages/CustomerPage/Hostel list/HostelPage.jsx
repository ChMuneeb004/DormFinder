import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import HostelCard from './HostelCard';
import Header from '../Header';


const HostelPage = () => {
    const location = useLocation();
    const [hostels, setHostels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHostels = async () => {
            const queryParams = new URLSearchParams(location.search);
            const university = queryParams.get('university');

            if (!university) {
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                    params: {
                        address: university,
                        key: 'AIzaSyB9ehHDgZXPz2uOE6Tjfwiapo329zBVsKI'
                    }
                });

                const { lat, lng } = response.data.results[0].geometry.location;

                const hostelsResponse = await axios.get('http://localhost:3001/searchHostels', {
                    params: {
                        latitude: lat,
                        longitude: lng,
                        radius: 1.5 // radius in kilometers
                    },
                    responseType: 'json'
                });

                // Log the hostelsResponse to check its structure
                console.log('Hostels response:', hostelsResponse.data);

                const formattedHostels = hostelsResponse.data.map(hostel => ({
                    images: hostel.images.map(image => ({
                        contentType: image.contentType,
                        data: bufferToBase64(image.data.data)
                    })),
                    name: hostel.name || '',
                    description: hostel.description.join(' ') || '', // Convert array to string
                    location: hostel.location || '',
                    number_of_rooms: hostel.number_of_rooms || '',
                    contact: hostel.contact || ''
                }));

                console.log('Formatted Hostels:', formattedHostels);

                setHostels(formattedHostels);
            } catch (error) {
                setError('Error fetching hostels');
            } finally {
                setLoading(false);
            }
        };

        fetchHostels();
    }, [location.search]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <Header />
            <div className="container my-4">
                <div></div>
                <h2>Search Results</h2>
                <div className="row">
                    {hostels.length > 0 ? (
                        hostels.map((hostel, index) => (
                            <div key={index} className="col-md-4 mb-4">
                                <HostelCard hostel={hostel} />
                            </div>
                        ))
                    ) : (
                        <p>No hostels found for your search.</p>
                    )}
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

export default HostelPage;
