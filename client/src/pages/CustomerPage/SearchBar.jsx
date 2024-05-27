import React from 'react';
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
// import studentImage from '../assets/student.jpg'; //

const SearchBar = () => {
    return (
        <div>
            <Container className="text-center my-4">
                <Row className="justify-content-center align-items-center">
                    <Col xs={12} md={8} lg={6}>
                        <h1>The home of student accommodation</h1>
                        <p>Search UK's No1 Student Accommodation Website</p>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Search by city or university"
                                aria-label="Search by city or university"
                            />
                            <Button variant="warning">Search</Button>
                        </InputGroup>
                    </Col>
                    <Col xs={12} md={4} className="text-md-left text-center mt-3 mt-md-0">
                        <div className="d-flex justify-content-center justify-content-md-start">
                            <img src="students.png" alt="Trustpilot" className="img-fluid mr-2" />
                            <div className="d-flex flex-column justify-content-center">
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default SearchBar;
