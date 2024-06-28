import React, { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import { Container, Row, Col, Button, Table, Pagination } from 'react-bootstrap';
import axios from 'axios';
import Sidebar from '../dashbordComp/Sidebar';
import '../css_folder/Bookings.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Bookings = () => {
    const [hostels, setHostels] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [totalHostels, setTotalHostels] = useState(0);
    const [loading, setLoading] = useState(true);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        fetchHostels();
    }, [auth.token, currentPage]);

    const fetchHostels = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3001/gethostels', {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                },
                params: {
                    page: currentPage,
                    limit: itemsPerPage
                }
            });
            setHostels(response.data.hostels);
            setTotalHostels(response.data.count);
        } catch (error) {
            console.error('Error fetching hostels:', error);
        } finally {
            setLoading(false);
        }
    }, [auth.token, currentPage, itemsPerPage]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/hostels/${id}`);
            setHostels(prevHostels => prevHostels.filter(hostel => hostel._id !== id));
        } catch (error) {
            console.error('Error deleting hostel:', error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPaginationItems = useMemo(() => {
        const totalPages = Math.ceil(totalHostels / itemsPerPage);
        let items = [];
        for (let number = 1; number <= totalPages; number++) {
            items.push(
                <Pagination.Item
                    key={number}
                    active={number === currentPage}
                    onClick={() => handlePageChange(number)}
                >
                    {number}
                </Pagination.Item>
            );
        }
        return items;
    }, [totalHostels, itemsPerPage, currentPage]);

    return (
        <div className="d-flex">
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                        <Sidebar />
                    </div>
                    <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9">
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <h1>Booking Details</h1>
                                <Link to="/addHostel">
                                    <Button
                                        variant="primary"
                                        className="butons mb-3 text-white"
                                        href="/add-hostel"
                                    >
                                        Add New Hostel
                                    </Button>
                                </Link>
                                <div className="table-responsive">
                                    <Table hover>
                                        <thead>
                                            <tr>
                                                <th className='m-5 p-3 px-2 text-black' style={{fontFamily: 'sans-serif', fontSize: '14px', backgroundColor: '#F2EAE1' }}>Hostel Name</th>
                                                <th className='m-5 p-3 px-2 text-black' style={{fontFamily: 'sans-serif', fontSize: '14px', backgroundColor: '#F2EAE1' }}>Location</th>
                                                <th className='m-5 p-3 px-2 text-black' style={{fontFamily: 'sans-serif', fontSize: '14px', backgroundColor: '#F2EAE1' }}>Phone</th>
                                                <th className='m-5 p-3 px-2 text-black' style={{fontFamily: 'sans-serif', fontSize: '14px', backgroundColor: '#F2EAE1' }}>Rooms</th>
                                                <th className='m-5 p-3 px-2 text-black' style={{fontFamily: 'sans-serif', fontSize: '14px', backgroundColor: '#F2EAE1' }}>Price</th>
                                                <th className='m-5 p-3 px-2 text-black' style={{fontFamily: 'sans-serif', fontSize: '14px', backgroundColor: '#F2EAE1', textAlign: 'center' }}>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loading
                                                ? Array.from({ length: itemsPerPage }).map((_, index) => (
                                                    <SkeletonRow key={index} />
                                                ))
                                                : hostels.map((hostel) => (
                                                    <tr key={hostel._id}>
                                                        <td>{hostel.name}</td>
                                                        <td>{hostel.location}</td>
                                                        <td>{hostel.contact}</td>
                                                        <td>{hostel.number_of_rooms}</td>
                                                        <td>{hostel.price} Rs</td>
                                                        <td>
                                                            <Button
                                                                href={`/view-hostel/${hostel._id}`}
                                                                className="butons text-white"
                                                            >
                                                                View
                                                            </Button>
                                                            <Button
                                                                href={`/edit-hostel/${hostel._id}`}
                                                                className="butons m-2 text-white"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="16"
                                                                    height="16"
                                                                    fill="currentColor"
                                                                    className="bi bi-pencil-square"
                                                                    viewBox="0 0 16 16"
                                                                >
                                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                                                    />
                                                                </svg>
                                                            </Button>
                                                            <Button
                                                                onClick={() => handleDelete(hostel._id)}
                                                                className="butons text-white"
                                                            >
                                                                <i className="fa fa-trash-o" aria-hidden="true" style={{ color: 'red', fontSize: 20 }}></i>
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </Table>
                                </div>
                                <Pagination className="justify-content-center">
                                    {renderPaginationItems}
                                </Pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SkeletonRow = () => {
    return (
        <tr>
            <td><div className="skeleton skeleton-text"></div></td>
            <td><div className="skeleton skeleton-text"></div></td>
            <td><div className="skeleton skeleton-text"></div></td>
            <td><div className="skeleton skeleton-text"></div></td>
            <td><div className="skeleton skeleton-text"></div></td>
            <td><div className="skeleton skeleton-text"></div></td>
        </tr>
    );
};

export default Bookings;

// Add styles for skeleton loader and pagination directly in the same file
const styles = `
.skeleton {
    background: #ddd;
    border-radius: 4px;
    animation: pulse 1.5s infinite;
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

.pagination .page-item.active .page-link {
    background-color: #007bff;
    border-color: #007bff;
    color: white;
}

.pagination .page-link {
    color: #007bff;
}

.pagination .page-link:hover {
    background-color: #e9ecef;
}

.butons {
    background-color: #007bff;
    border-color: #007bff;
}

.butons:hover {
    background-color: #0056b3;
    border-color: #004085;
}

.table-responsive {
    margin-top: 20px;
}
`;

// Inject styles into the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
