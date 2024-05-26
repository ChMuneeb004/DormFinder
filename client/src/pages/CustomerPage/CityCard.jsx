import React from 'react';
import { Card } from 'react-bootstrap';

const CityCard = ({ city, properties }) => {
    return (
        <Card className="m-2" style={{ width: '18rem' }}>
            <Card.Img variant="top" src={city.image} />
            <Card.Body>
                <Card.Title>{city.name}</Card.Title>
                <Card.Text>
                    {properties} properties
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default CityCard;
