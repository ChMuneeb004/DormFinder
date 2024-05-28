import React from 'react';
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import studentImage from '../assets/student.jpg'; //

const SearchBar = () => {
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
                                style={{ padding: '10px', fontSize: '1rem', borderRadius: '20px 0 0 20px' }} // Changed borderRadius to make it round
                            />
                            <Button variant="warning" style={{ borderRadius: '0 20px 20px 0' }}> {/* Updated borderRadius */}
                                <i className='fa fa-search'></i>
                            </Button>
                        </InputGroup>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default SearchBar;
