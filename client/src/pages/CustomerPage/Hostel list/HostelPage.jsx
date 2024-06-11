// src/HostelPage.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import HostelCard from './HostelCard'; // Assume you have a HostelCard component for displaying hostel details
import 'bootstrap/dist/css/bootstrap.min.css';

const HostelPage = () => {
    const location = useLocation();
    const [hostels, setHostels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getQueryParams = () => {
        return new URLSearchParams(location.search);
    };

    useEffect(() => {
        const fetchHostels = async () => {
            const query = getQueryParams().get('query');
            if (!query) {
                setError('No search query provided.');
                setLoading(false);
                return;
            }

            try {
                // Get coordinates from AccuWeather API
                const locationResponse = await axios.get('http://dataservice.accuweather.com/locations/v1/cities/geoposition/search', {
                    params: {
                        q: query,
                        apikey: 'geocodeHostels&q=lat%2Clon'
                    }
                });

                if (locationResponse.data.length === 0) {
                    setError('Invalid address. Unable to fetch coordinates.');
                    setLoading(false);
                    return;
                }

                const { Latitude, Longitude } = locationResponse.data.GeoPosition;

                // Fetch hostels from backend using coordinates
                const hostelsResponse = await axios.get('http://localhost:3001/api/hostels/search', {
                    params: {
                        latitude: Latitude,
                        longitude: Longitude,
                        radius: 1.5 // 1.5 kilometers
                    }
                });

                setHostels(hostelsResponse.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching hostels:', err);
                setError('Failed to fetch hostels.');
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
        <div className="container my-4">
            <h2>Search Results</h2>
            {hostels.length === 0 ? (
                <p>No hostels found for your search.</p>
            ) : (
                <div className="row">
                    {hostels.map((hostel, index) => (
                        <div key={index} className="col-md-4 mb-4">
                            <HostelCard hostel={hostel} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HostelPage;
