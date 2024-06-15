import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import Sidebar from '../dashbordComp/Sidebar';
import '../css_folder/Bookings.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Bookings = () => {
    const [hostels, setHostels] = useState([]);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        fetchHostels();
    }, [auth.token]);

    const fetchHostels = async () => {
        try {
            const response = await axios.get('http://localhost:3001/gethostels'
                , {
                    headers: {
                        'Authorization': `Bearer ${auth.token}`
                    }
                }
            );
            setHostels(response.data.hostels);
            console.log(`Bearer ${auth.token}`);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching hostels:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/hostels/${id}`);
            setHostels(hostels.filter(hostel => hostel._id !== id));
        } catch (error) {
            console.error('Error deleting hostel:', error);
        }
    };

    return (
        <div className="d-flex">
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                        <Sidebar />
                    </div>
                    <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9 ">
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
                                    {" "}
                                    {/* Wrap the table inside a div with class "table-responsive" */}
                                    <Table hover>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Location</th>
                                                <th>Phone</th>
                                                <th>Rooms</th>
                                                <th>Price</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {hostels.map((hostel) => (
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
                                                            {" "}
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
                                                                    fill-rule="evenodd"
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bookings;
