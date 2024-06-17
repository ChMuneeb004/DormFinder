import React from 'react';
import { Container, Row, Col, InputGroup, FormControl, Button, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import universities from './universities.jsx';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [hostels, setHostels] = useState([]);
    const [filteredUniversities, setFilteredUniversities] = useState([]);
    const [selectedUniversity, setSelectedUniversity] = useState(null);

    useEffect(() => {
        if (searchTerm) {
            const filtered = universities.filter(university =>
                university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                university.location.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredUniversities(filtered);
        } else {
            setFilteredUniversities([]);
        }
    }, [searchTerm]);

    const handleSelectUniversity = (university) => {
        setSelectedUniversity(university);
        setSearchTerm(university.name);
        setFilteredUniversities([]);
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    address: searchTerm,
                    key: 'AIzaSyB9ehHDgZXPz2uOE6Tjfwiapo329zBVsKI'
                }
            });
            const { lat, lng } = response.data.results[0].geometry.location;

            const hostelsResponse = await axios.get('http://localhost:3001/searchHostels', {
                params: {
                    latitude: lat,
                    longitude: lng,
                    radius: 1.5 // radius in kilometers
                }
            });

            // setHostels(hostelsResponse.data);
        } catch (error) {
            console.error('Error fetching hostels:', error);
        }
    };
    
    return (
        <div>
            <Container className="text-center my-4">
                <Row className="justify-content-center align-items-center">
                    <Col xs={10} sm={10} md={6} lg={6} xl={6} className="text-md-left text-center mt-3 mt-md-0 order-2 order-md-1">
                        <div className="d-flex justify-content-center justify-content-md-start">
                            <img src="Student Image.png" alt="Image" className="img-fluid mr-2" />
                            <div className="d-flex flex-column justify-content-center">
                                {/* You can add additional content here if needed */}
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6} xl={6} className=" order-1 order-md-2">
                        <h1 style={{ fontSize: '2.5rem', color: '#343a40', fontWeight: 'bold', marginBottom: '20px' }}>The home of student accommodation</h1>
                        <p style={{ fontSize: '1.25rem', color: '#6c757d', marginBottom: '20px' }}>Search PK's No.1 Student Accommodation Website</p>
                        <InputGroup className="mb-3">
                        <FormControl
                                placeholder="Search by city or university"
                                aria-label="Search by city or university"
                                style={{ padding: '10px', fontSize: '1rem', borderRadius: '20px 0 0 20px' }}
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setSelectedUniversity(null);
                                }}
                            />
                            
                            <Button onClick={handleSearch} variant="warning" style={{ borderRadius: '0 20px 20px 0' }}> {/* Updated borderRadius */}
                                <i className='fa fa-search'></i>
                            </Button>
                            {filteredUniversities.length > 0 && (
                                <ListGroup style={{ position: 'absolute', top: '100%', width: '100%', zIndex: '1000' }}>
                                    {filteredUniversities.map((university, index) => (
                                        <ListGroup.Item key={index} action onClick={() => handleSelectUniversity(university)}>
                                            {university.name} - {university.location}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </InputGroup>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default SearchBar;
