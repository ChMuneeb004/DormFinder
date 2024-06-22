// src/HostelList.js
import React from 'react';
import HostelCard from '../Hostel list/HostelCard';
import '../../../css_folder/Hostels.css';

const hostels = [
  {
    name: 'Studio',
    location: '3 Stockmore St, City Centre, Oxford',
    price: '£275',
    image: 'image1.jpg',
  },
  // Add more hostel objects here based on the provided data
];

const HostelList = ({ hostels }) => {
    return (
        <div className="container">
            <div className="row">
                {hostels.map((hostel, index) => (
                    <HostelCard key={index} hostel={hostel} />
                ))}
            </div>
        </div>
    );
};

export default HostelList;
