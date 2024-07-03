import React, { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import { Container, Row, Col, Button, Table, Pagination } from 'react-bootstrap';
import axios from 'axios';
import Sidebar from '../dashbordComp/Sidebar';
import '../css_folder/Bookings.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [totalBookings, setTotalBookings] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, [currentPage]);

    const fetchBookings = async () => {
                try {
                    const response = await axios.get('http://localhost:3001/Customerbookings');
                    setBookings(response.data);
                    setLoading(false);

                } catch (error) {
                    console.error('Error fetching bookings:', error);
                    setLoading(false);
                }
    };

    const handleVerifyToken = async (token_number) => {
        debugger;
        if (!token_number) {
            console.error('Token number is required');
            return; // Exit the function if token_number is not provided
        }
        try {
            const response = await axios.post('http://localhost:3001/verifyToken', {
                token_number
            });
            if (response.status === 200 && response.data && response.data.message === 'Token verified successfully') {
                console.log('Token verified:', response.data);
                fetchBookings(); // Refresh bookings after verification
            } else {
                // Handle cases where the token verification is not successful
                console.error('Token verification failed:', response.data.message);
            }
        } catch (error) {
            console.error('Error verifying token:', error);
        }
    };

    const handleDeleteBooking = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3001/bookings/${id}`);
            console.log('Booking deleted:', response.data);
            // Refresh the bookings list after deletion
            fetchBookings();
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    };
        
    // const fetchBookings = useCallback(async () => {
    //     setLoading(true);
    //     try {
    //         const response = await axios.get(`http://localhost:3001//Customerbookings`, {
    //             // headers: {
    //             //     'Authorization': `Bearer ${auth.token}`
    //             // },
    //             params: {
    //                 page: currentPage,
    //                 limit: itemsPerPage
    //             }
    //         });
    //         setBookings(response.data);
    //         setTotalBookings(response.data.length); // Assuming response.data is an array of bookings
    //     } catch (error) {
    //         console.error('Error fetching bookings:', error);
    //     } finally {
    //         setLoading(false);
    //     }
    // }, [currentPage, itemsPerPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPaginationItems = useMemo(() => {
        const totalPages = Math.ceil(totalBookings / itemsPerPage);
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
    }, [totalBookings, itemsPerPage, currentPage]);

    
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
                                                <th className='m-5 p-3 px-2 text-black' style={{fontFamily: 'sans-serif', fontSize: '14px', backgroundColor: '#F2EAE1' }}>Customer Name</th>
                                                <th className='m-5 p-3 px-2 text-black' style={{fontFamily: 'sans-serif', fontSize: '14px', backgroundColor: '#F2EAE1' }}>Hostel Name</th>
                                                <th className='m-5 p-3 px-2 text-black' style={{fontFamily: 'sans-serif', fontSize: '14px', backgroundColor: '#F2EAE1' }}>Phone</th>
                                                <th className='m-5 p-3 px-2 text-black' style={{fontFamily: 'sans-serif', fontSize: '14px', backgroundColor: '#F2EAE1' }}>Room</th>
                                                <th className='m-5 p-3 px-2 text-black' style={{fontFamily: 'sans-serif', fontSize: '14px', backgroundColor: '#F2EAE1', textAlign: 'center' }}>Actions</th>
                                                <th className='m-5 p-3 px-2 text-black' style={{fontFamily: 'sans-serif', fontSize: '14px', backgroundColor: '#F2EAE1', textAlign: 'center' }}></th>
                                                <th className='m-5 p-3 px-2 text-black' style={{fontFamily: 'sans-serif', fontSize: '14px', backgroundColor: '#F2EAE1', textAlign: 'center' }}></th>
                                                <th className='m-5 p-3 px-2 text-black' style={{fontFamily: 'sans-serif', fontSize: '14px', backgroundColor: '#F2EAE1', textAlign: 'center' }}></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loading
                                                ? Array.from({ length: itemsPerPage }).map((_, index) => (
                                                    <SkeletonRow key={index} />
                                                ))
                                                : bookings.map((booking) => (
                                                    <tr key={booking._id}>
                                                        <td>{booking.customer_name}</td>
                                                        <td>{booking.hostel_name}</td>
                                                        <td>{booking.contact}</td>
                                                        <td>{booking.room_type}</td>
                                                        <td>{booking.booking_status}</td>
                                                        <td><input type="text" className="form-control" placeholder="Token" style={{ minWidth: "170px", width: "100%" }} /></td>
                                                        <td><button className="btn btn-success text-white" onClick={() => handleVerifyToken(booking.token_number)}>Check</button></td>
                                                        <td><button style={{ backgroundColor: 'transparent', border: 'transparent' }} onClick={() => handleDeleteBooking(booking._id)} ><i className="fa fa-trash-o" aria-hidden="true" style={{ color: 'red', fontSize: 25 }}></i></button></td>
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


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Table, Button } from 'react-bootstrap';
// // import SkeletonRow from './SkeletonRow'; // Assume you have a SkeletonRow component for loading state

// const Bookings = () => {
//     const [bookings, setBookings] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetchBookings();
//     }, []);

//     const fetchBookings = async () => {
//         try {
//             const response = await axios.get('http://localhost:3001/Customerbookings');
//             setBookings(response.data);
//             setLoading(false);
//         } catch (error) {
//             console.error('Error fetching bookings:', error);
//             setLoading(false);
//         }
//     };

//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`http://localhost:3001/Customerbookings/${id}`);
//             // Remove deleted booking from state
//             setBookings(bookings.filter(booking => booking._id !== id));
//         } catch (error) {
//             console.error('Error deleting booking:', error);
//         }
//     };

//     return (
//         <div className="container mt-4">
//             <h2>Bookings</h2>
//             {/* {loading ? (
//                 <SkeletonRow />
//             ) : ( */}
//                 <Table striped bordered hover>
//                     <thead>
//                         <tr>
//                             <th>Booking ID</th>
//                             <th>Hostel Name</th>
//                             <th>Room Type</th>
//                             <th>Customer Name</th>
//                             <th>Booking Status</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {bookings.map((booking) => (
//                             <tr key={booking._id}>
//                                 <td>{booking.booking_id}</td>
//                                 <td>{booking.hostel_id.name}</td>
//                                 <td>{booking.room_type}</td>
//                                 <td>{booking.customer_name}</td>
//                                 <td>{booking.booking_status}</td>
//                                 <td>
//                                     <Button variant="info" href={`/edit-booking/${booking._id}`}>Edit</Button>{' '}
//                                     <Button variant="danger" onClick={() => handleDelete(booking._id)}>Delete</Button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </Table>
//             {/* )} */}
//         </div>
//     );
// };

// export default Bookings;

