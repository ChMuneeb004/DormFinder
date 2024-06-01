// src/HostelCard.js
import React from 'react';
import '../../../css_folder/HostelCard.css';

const HostelCard = ({ hostel }) => {
  return (
    <div className="hostel-card">
      <img src={hostel.image} alt={hostel.name} className="hostel-image" />
      <div className="hostel-info">
        <h3>{hostel.name}</h3>
        <p>{hostel.location}</p>
        <p>From {hostel.price}/week</p>
        <button>Book Now</button>
      </div>
    </div>
  );
};

export default HostelCard;
