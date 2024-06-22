import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const HostelCard = ({ hostel }) => {
    if (!hostel) {
        console.error('Hostel prop is undefined');
        return null;
    }

    const { images = [], name = '', description = '', location = '', number_of_rooms = '', contact = '' } = hostel;

    const firstImage = Array.isArray(images) && images.length > 0 ? images[0] : null;
    let imageUrl = '';
    if (firstImage && firstImage.data) {
        imageUrl = `data:${firstImage.contentType};base64,${firstImage.data}`;
    }

    return (
        <div className="card h-100">
            {firstImage && <img src={imageUrl} className="card-img-top" alt={name} />}
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><strong>Location:</strong> {location}</p>
                <p className="card-text"><strong>Number of Rooms:</strong> {number_of_rooms}</p>
                <p className="card-text"><strong>Contact:</strong> {contact}</p>
            </div>
        </div>
    );
};

export default HostelCard;