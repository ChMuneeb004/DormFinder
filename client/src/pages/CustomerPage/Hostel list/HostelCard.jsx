// src/HostelCard.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const HostelCard = ({ hostel }) => {
    return (
        <div className="card h-100">
            <img src={hostel.imageUrl} className="card-img-top" alt={hostel.name} />
            <div className="card-body">
                <h5 className="card-title">{hostel.name}</h5>
                <p className="card-text">{hostel.description}</p>
                <p className="card-text"><strong>Location:</strong> {hostel.location}</p>
                <p className="card-text"><strong>Number of Rooms:</strong> {hostel.number_of_rooms}</p>
                <p className="card-text"><strong>Contact:</strong> {hostel.contact}</p>
            </div>
        </div>
    );
};

export default HostelCard;
