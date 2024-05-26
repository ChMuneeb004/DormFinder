import React from 'react';
import { Container, Row } from 'react-bootstrap';
import CityCard from './CityCard';

const cities = [
    { name: 'Manchester', properties: 142, image: 'manchester.jpg' },
    { name: 'London', properties: 226, image: 'london.jpg' },
    { name: 'York', properties: 32, image: 'york.jpg' },
    { name: 'Birmingham', properties: 196, image: 'birmingham.jpg' },
    { name: 'Nottingham', properties: 64, image: 'nottingham.jpg' },
    { name: 'Plymouth', properties: 42, image: 'plymouth.jpg' },
    { name: 'Newcastle', properties: 25, image: 'newcastle.jpg' },
    { name: 'Glasgow', properties: 58, image: 'glasgow.jpg' },
];

const CityList = () => {
    return (
        <Container>
            <Row className="justify-content-center">
                {cities.map((city, index) => (
                    <CityCard key={index} city={city} properties={city.properties} />
                ))}
            </Row>
        </Container>
    );
};

export default CityList;
