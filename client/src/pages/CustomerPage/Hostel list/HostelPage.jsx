import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, InputGroup, FormControl, Button, ListGroup, Form, Badge, Collapse } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import universities from '../universities';
import HostelCard from './HostelCard';
import Header from '../Header';

// Add styles for skeleton loader directly at the top level
const styles = `
.skeleton {
    background: #ddd;
    border-radius: 4px;
    animation: pulse 1.5s infinite;
}

.skeleton-card {
    margin-bottom: 1rem;
}

.skeleton-image {
    height: 150px;
    margin-bottom: 15px;
}

.skeleton-text {
    height: 20px;
    margin-bottom: 10px;
    width: 80%;
}

@keyframes pulse {
    0% {
        background-color: #ddd;
    }
    50% {
        background-color: #ccc;
    }
    100% {
        background-color: #ddd;
    }
}
`;

// Inject styles into the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

const HostelPage = () => {
    const location = useLocation();
    const [hostels, setHostels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUniversities, setFilteredUniversities] = useState([]);
    const [selectedUniversity, setSelectedUniversity] = useState(null);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [minPrice, setMinPrice] = useState(3000);
    const [maxPrice, setMaxPrice] = useState(40000);
    const [hostelType, setHostelType] = useState('');
    const [roomType, setRoomType] = useState('');
    const [filtersVisible, setFiltersVisible] = useState(false);
    const listRef = useRef(null);

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
        handleSearch(university);
    };

    const handleSearch = (university) => {
        const searchParams = new URLSearchParams();
        const selectedUni = university || selectedUniversity;
        if (selectedUni) {
            searchParams.append('university', selectedUni.name);
        }
        if (minPrice) searchParams.append('minPrice', minPrice);
        if (maxPrice) searchParams.append('maxPrice', maxPrice);
        if (hostelType) searchParams.append('hostelType', hostelType);
        if (roomType) searchParams.append('roomType', roomType);

        setSearchTerm(''); // Clear the search bar
        navigate(`/hostelList?${searchParams.toString()}`);
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

    useEffect( () => {
         fetchHostels();
    }, [location.search, currentPage]);

    const fetchHostels = useCallback(async () => {
        setLoading(true);

        const queryParams = new URLSearchParams(location.search);
        const university = queryParams.get('university');
        const minPrice = queryParams.get('minPrice');
        const maxPrice = queryParams.get('maxPrice');
        const hostelType = queryParams.get('hostelType');
        const roomType = queryParams.get('roomType');

        if (!university) {
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    address: university,
                    key: 'AIzaSyB9ehHDgZXPz2uOE6Tjfwiapo329zBVsKI'
                }
            });

            const { lat, lng } = response.data.results[0].geometry.location;

            const hostelsResponse = await axios.get('http://localhost:3001/searchHostels', {
                params: {
                    latitude: lat,
                    longitude: lng,
                    radius: 1.5, // radius in kilometers
                    page: currentPage,
                    limit: 8, // items per page
                    minPrice: minPrice || '',
                    maxPrice: maxPrice || '',
                    hostelType: hostelType || '',
                    roomType: roomType || ''
                },
                responseType: 'json'
            });
            
            const formattedHostels = hostelsResponse.data.hostels.map(hostel => ({
                id: hostel._id,
                images: hostel.images.map(image => ({
                    contentType: image.contentType,
                    data: image.data // This should be a base64 encoded string
                })),
                name: hostel.name || '',
                description: Array.isArray(hostel.description) ? hostel.description.join(' ') : hostel.description || '', // Handle both array and string cases
                location: hostel.location || '',
                number_of_rooms: hostel.number_of_rooms || '',
                contact: hostel.contact || ''
            }));

            setHostels(formattedHostels);
            setTotalPages(hostelsResponse.data.totalPages);
        } catch (error) {
            setError('Error fetching hostels');
        } finally {
            setLoading(false);
        }
    }, [location.search, currentPage]);

    const handleHostelClick = (hostelId) => {
        if (hostelId) {
            navigate(`/hostel-detail/${hostelId}`);
        } else {
            console.error('Invalid hostel ID');
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        if (name === 'hostelType') {
            setHostelType(value);
        } else if (name === 'roomType') {
            setRoomType(value);
        }
    };

    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        if (name === 'minPrice') {
            setMinPrice(Number(value));
        } else if (name === 'maxPrice') {
            setMaxPrice(Number(value));
        }
    };

    useEffect(() => {
        if (minPrice > maxPrice) {
            setMinPrice(maxPrice);
        }
    }, [minPrice, maxPrice]);

    const toggleFilters = () => {
        setFiltersVisible(!filtersVisible);
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

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

                    .filter-container {
                        background-color: #f8f9fa;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                        margin-bottom: 20px;
                    }

                    .filter-title {
                        font-size: 1.5rem;
                        font-weight: bold;
                        margin-bottom: 10px;
                        color: #343a40;
                        font-family: 'Poppins', sans-serif;
                    }

                    .filter-label {
                        font-size: 1rem;
                        font-weight: 600;
                        color: #343a40;
                        margin-bottom: 5px;
                        font-family: 'Poppins', sans-serif;
                    }

                    .price-range-inputs {
                        display: flex;
                        gap: 10px;
                    }

                    .filter-apply-button {
                        background-color: #28a745;
                        border: none;
                        font-family: 'Poppins', sans-serif;
                        font-size: 1rem;
                        padding: 10px 20px;
                        border-radius: 5px;
                        color: white;
                    }

                    .filter-apply-button:hover {
                        background-color: #218838;
                    }

                    @media (max-width: 768px) {
                        .filter-container {
                            padding: 10px;
                        }

                        .filter-title {
                            font-size: 1.25rem;
                        }

                        .filter-label {
                            font-size: 0.875rem;
                        }

                        .filter-apply-button {
                            font-size: 0.875rem;
                            padding: 8px 16px;
                        }
                    }
                `}
            </style>
            <Header />
            <div className="container my-4">
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
                <Button variant="secondary" onClick={toggleFilters} className="mb-3">Filter Results</Button>
                <Collapse in={filtersVisible}>
                    <div className="filter-container">
                        <div className="filter-title">Filters</div>
                        <div className='form w-100'>
                            <Row className="align-items-center">
                                <Col xs={12} md={6} lg={3}>
                                    <Form.Group controlId="priceRange">
                                        <Form.Label className="filter-label">Price Range</Form.Label>
                                        <div className="price-range-inputs d-flex flex-column flex-md-row">
                                            <FormControl
                                                type="number"
                                                name="minPrice"
                                                value={minPrice}
                                                onChange={handlePriceChange}
                                                placeholder="Min Price"
                                                min="3000"
                                                max={maxPrice}
                                                className="mb-2 mb-md-0 mr-md-2"
                                            />
                                            <FormControl
                                                type="number"
                                                name="maxPrice"
                                                value={maxPrice}
                                                onChange={handlePriceChange}
                                                placeholder="Max Price"
                                                min={minPrice}
                                                max="40000"
                                            />
                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6} lg={3}>
                                    <Form.Group controlId="hostelType">
                                        <Form.Label className="filter-label">Hostel Type</Form.Label>
                                        <Form.Control as="select" name="hostelType" value={hostelType} onChange={handleFilterChange}>
                                            <option value="">All</option>
                                            <option value="boys">Boys</option>
                                            <option value="girls">Girls</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6} lg={3}>
                                    <Form.Group controlId="roomType">
                                        <Form.Label className="filter-label">Room Type</Form.Label>
                                        <Form.Control as="select" name="roomType" value={roomType} onChange={handleFilterChange}>
                                            <option value="">All</option>
                                            <option value="double">Double</option>
                                            <option value="triple">Triple</option>
                                            <option value="quad">Quad</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6} lg={3} className="d-flex align-items-end mt-3 mt-md-0">
                                    <Button variant="primary" className="filter-apply-button w-100" onClick={handleSearch}>Apply</Button>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Collapse>

                <h2>Search Results</h2>
                <div className="row justify-content-center">
                    {loading
                        ? Array.from({ length: 8 }).map((_, index) => (
                            <div key={index} className="col-11 col-sm-6 col-md-4 col-lg-3 col-xl-4 col-xxl-3 mb-4">
                                <SkeletonCard />
                            </div>
                        ))
                        : hostels.length > 0 ? (
                            hostels.map((hostel, index) => (
                                <div key={index} className="col-11 col-sm-6 col-md-4 col-lg-3 col-xl-4 col-xxl-3 mb-4" onClick={() => handleHostelClick(hostel.id)}>
                                    <HostelCard hostel={hostel} />
                                </div>
                            ))
                        ) : (
                            <p>No hostels found for your search.</p>
                        )
                    }
                </div>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
        </div>
    );
};

const SkeletonCard = () => (
    <div className="card skeleton-card" style={{ width: '18rem' }}>
        <div className="card-body">
            <div className="skeleton skeleton-image"></div>
            <h5 className="card-title skeleton skeleton-text"></h5>
            <p className="card-text skeleton skeleton-text"></p>
            <p className="card-text skeleton skeleton-text"></p>
        </div>
    </div>
);

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => onPageChange(currentPage - 1)} aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </button>
                </li>
                {pageNumbers.map(number => (
                    <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                        <button onClick={() => onPageChange(number)} className="page-link">
                            {number}
                        </button>
                    </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => onPageChange(currentPage + 1)} aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default HostelPage;
