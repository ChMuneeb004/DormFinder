import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';

const HostelCard = ({ hostel }) => {
    if (!hostel) {
        console.error('Hostel prop is undefined');
        return null;
    }

    const { images = [], name = '', description = '', location = '', number_of_rooms = '', contact = '' } = hostel;

    const getImageUrl = (image) => {
        if (image && image.data) {
            return `data:${image.contentType};base64,${image.data}`;
        }
        return '';
    };

    return (
        <>
            <style>
                {`
                    .hostel-card {
                        transition: transform 0.3s ease-in-out;
                        overflow: hidden;
                        border-radius: 10px;
                    }

                    .hostel-card:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
                    }

                    .carousel-item img {
                        object-fit: cover;
                        width: 100%;
                        height: 200px; /* Adjust to 3:2 aspect ratio (example: 300x200, 600x400, etc.) */
                        border-top-left-radius: 10px;
                        border-top-right-radius: 10px;
                    }

                    .carousel-container {
                        height: 200px; /* Adjust to 3:2 aspect ratio */
                        overflow: hidden;
                        border-top-left-radius: 10px;
                        border-top-right-radius: 10px;
                    }

                    .card-title {
                        font-size: 1.25rem;
                        font-weight: 600;
                    }

                    .card-text {
                        font-size: 0.95rem;
                    }

                    .card-body {
                        background-color: #f8f9fa;
                    }
                `}
            </style>
            <div className="card h-100 shadow-lg border-0 hostel-card">
                {images.length > 0 && (
                    <div className="carousel-container">
                        <Carousel interval={null} indicators={false}>
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
                )}
                <div className="card-body d-flex flex-column p-4">
                    <h5 className="card-title mb-3">{name}</h5>
                    <p className="card-text flex-grow-1">{description}</p>
                    <div className="mt-auto">
                        <p className="card-text mb-2"><strong>Location:</strong> {location}</p>
                        <p className="card-text mb-2"><strong>Number of Rooms:</strong> {number_of_rooms}</p>
                        <p className="card-text mb-2"><strong>Contact:</strong> {contact}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HostelCard;
