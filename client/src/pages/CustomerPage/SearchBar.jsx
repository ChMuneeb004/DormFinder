import React from 'react';
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
// import students from '../CustomerPage/students.jpg';

const SearchBar = () => {
    return (
        <div>
            <Container className="text-center my-4">
                <Row>
                    <Col>
                        <h1>The home of student accommodation</h1>
                        <p>Search UK's No1 Student Accommodation Website</p>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Search by city or university"
                                aria-label="Search by city or university"
                            />
                            <Button variant="warning">Search</Button>
                        </InputGroup>
                        <div>
                            <img src="../CustomerPage/students.jpg" alt="Trustpilot" className="mr-2"/>
                            <span>Great</span>
                            <span className="ml-2">Trustpilot</span>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default SearchBar;
