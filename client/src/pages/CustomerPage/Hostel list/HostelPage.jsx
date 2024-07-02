import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import HostelCard from './HostelCard';
import Header from '../Header';

const HostelPage = () => {
    const location = useLocation();
    const [hostels, setHostels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        fetchHostels();
    }, [location.search, currentPage]);

    const fetchHostels = useCallback(async () => {
        setLoading(true);

        const queryParams = new URLSearchParams(location.search);
        const university = queryParams.get('university');

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
                    limit: 8 // items per page
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

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <Header />
            <div className="container my-4">
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

// Add styles for skeleton loader directly in the same file
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
