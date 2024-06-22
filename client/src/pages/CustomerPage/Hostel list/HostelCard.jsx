import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
const HostelCard = ({ hostel }) => {
    if (!hostel) {
        console.error('Hostel prop is undefined');
        return null;
    }

    // Ensure each property is properly accessed
    const { images = [], name = '', description = '', location = '', number_of_rooms = '', contact = '' } = hostel;

    // Handle images property correctly
    const hasImages = Array.isArray(images) && images.length > 0;

    return (
        <div className="col-lg-8 col-md-6 col-sm-12 mb-4 d-flex align-items-stretch">
            <div className="card h-100 shadow-sm">
                {hasImages ? (
                    <Carousel interval={null} className="card-img-top">
                        {images.map((image, index) => {
                            const imageUrl = `data:${image.contentType};base64,${image.data.base64}`;
                            return (
                                <Carousel.Item key={index}>
                                    <img src={imageUrl} className="d-block w-100" alt={`Slide ${index}`} />
                                </Carousel.Item>
                            );
                        })}
                    </Carousel>
                ) : (
                    <img src="https://via.placeholder.com/150" className="card-img-top" alt="Default Image" />
                )}
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-primary">{name}</h5>
                    <p className="card-text flex-grow-1">{description}</p>
                    <p className="card-text"><strong>Location:</strong> {location}</p>
                    <p className="card-text"><strong>Number of Rooms:</strong> {number_of_rooms}</p>
                    <p className="card-text"><strong>Contact:</strong> {contact}</p>
                </div>
            </div>
        </div>
    );
};

export default HostelCard;
