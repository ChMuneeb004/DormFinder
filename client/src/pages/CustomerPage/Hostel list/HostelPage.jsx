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

   

    useEffect(() => {
        const fetchHostels = async () => {
           
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
