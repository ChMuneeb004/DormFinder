import React from 'react';
import { Container, Row, Col, InputGroup, FormControl, Button, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import universities from './universities.jsx';
import Student from '../../../public/Student Image.png'

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [hostels, setHostels] = useState([]);
    const [filteredUniversities, setFilteredUniversities] = useState([]);
    const [selectedUniversity, setSelectedUniversity] = useState(null);
    const [activeIndex, setActiveIndex] = useState(-1);
    const listRef = useRef(null);
    const navigate = useNavigate();

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
        setActiveIndex(-1);
    };

    const handleSearch = async () => {
        if (selectedUniversity) {
            navigate(`/hostelList?university=${selectedUniversity.name}`);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            setActiveIndex((prevIndex) => {
                const newIndex = Math.min(prevIndex + 1, filteredUniversities.length - 1);
                scrollToActiveItem(newIndex);
                return newIndex;
            });
        } else if (e.key === 'ArrowUp') {
            setActiveIndex((prevIndex) => {
                const newIndex = Math.max(prevIndex - 1, 0);
                scrollToActiveItem(newIndex);
                return newIndex;
            });
        } else if (e.key === 'Enter') {
            if (activeIndex >= 0 && activeIndex < filteredUniversities.length) {
                handleSelectUniversity(filteredUniversities[activeIndex]);
            } else {
                handleSearch();
            }
        }
    };

    const scrollToActiveItem = (index) => {
        const list = listRef.current;
        if (list && list.children[index]) {
            list.children[index].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'start',
            });
        }
    };

    return (
        <div>
            <style>
                {`
                    body {
                        font-family: 'Helvetica Neue', Arial, sans-serif;
                    }

                    .search-heading {
                        font-size: 2.3rem;
                        color: #343a40;
                        font-weight: 600;
                        margin-bottom: 20px;
                        font-family: 'Poppins', sans-serif;
                    }

                    .search-subheading {
                        font-size: 1.25rem;
                        color: #6c757d;
                        margin-bottom: 20px;
                        font-family: 'Poppins', sans-serif;
                    }

                    .search-input {
                        padding: 10px;
                        font-size: 1rem;
                        border-radius: 20px 0 0 20px;
                        font-family: 'Poppins', sans-serif;
                    }

                    .search-button {
                        border-radius: 0 20px 20px 0;
                        background-color: #f0ad4e;
                        border: none;
                        font-family: 'Poppins', sans-serif;
                    }

                    .search-button i {
                        color: white;
                    }

                    .university-list {
                        position: absolute;
                        top: 100%;
                        width: 100%;
                        z-index: 1000;
                        max-height: 200px;
                        overflow-y: auto;
                    }

                    .university-item {
                        font-family: 'Poppins', sans-serif;
                        font-size: 1rem;
                    }

                    .university-item.active {
                        background-color: #f0ad4e;
                        color: white;
                    }
                `}
            </style>
            <Container className="text-center my-4">
                <Row className="justify-content-center align-items-center">
                    <Col xs={10} sm={10} md={6} lg={6} xl={6} className="text-md-left text-center mt-3 mt-md-0 order-2 order-md-1">
                        <div className="d-flex justify-content-center justify-content-md-start">
                            <img src={Student} alt="Image" className="img-fluid mr-2" />
                            <div className="d-flex flex-column justify-content-center">
                                {/* You can add additional content here if needed */}
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6} xl={6} className=" order-1 order-md-2">
                        <h1 className="search-heading">The Home of Student Accommodation</h1>
                        <p className="search-subheading">Find your perfect student home with ease</p>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Search by city or university"
                                aria-label="Search by city or university"
                                className="search-input"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setSelectedUniversity(null);
                                    setActiveIndex(-1);
                                }}
                                onKeyDown={handleKeyDown}
                            />
                            <Button onClick={handleSearch} className="search-button">
                                <i className='fa fa-search'></i>
                            </Button>
                            {filteredUniversities.length > 0 && (
                                <ListGroup ref={listRef} className="university-list rounded-3">
                                    {filteredUniversities.map((university, index) => (
                                        <ListGroup.Item 
                                            key={index} 
                                            action 
                                            onClick={() => handleSelectUniversity(university)} 
                                            className={`university-item ${index === activeIndex ? 'active' : ''}`}
                                        >
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
