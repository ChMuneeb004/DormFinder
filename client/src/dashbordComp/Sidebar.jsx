import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../css_folder/sidebar.css';
import ProfileImg from '../media/Profile.jpg';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Sidebar({ onProfileClick }) {
    const [username, setUsername] = useState('');
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3001/getUsername', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUsername(response.data.username);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsername();

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 767);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const profileImageClasses = "img-thumbnail rounded-circle mx-auto d-block";

    if (isMobile) {
        return (
            <Navbar expand="lg" className="mobile-navbar p-0">
                <Navbar.Brand className="p-2 d-flex align-items-center" onClick={onProfileClick} style={{ cursor: 'pointer' }}>
                    <img src={ProfileImg} alt="profile" className={profileImageClasses} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                    <div className="profile-info m-2">
                        <h3 className='username text-black'>{username}</h3>
                        <p className='role'>Owner</p>
                    </div>
                </Navbar.Brand>
                <div className='text-center align-content-center' style={{ marginBottom: '0px', padding: '4px', borderWidth: '1px', border: '1px', borderStyle:'groove', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius:'5px' }}>
                    <img
                        src="Logo.png"
                        width="20"
                        height="20"
                        className="d-inline-block align-center"
                        alt="Logo"
                        style={{ verticalAlign: 'middle' }}
                    />
                    <span style={{ display: 'inline-block', fontSize: '15px', marginLeft: '8px' }}>
                        Dorm Finder
                    </span>
                </div>
                <Navbar.Toggle className="m-2 btn btn-primary text-white" aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/Dashboard/Home"><i className='fa fa-home'></i>Home</Nav.Link>
                        <Nav.Link as={Link} to="/bookings"><i className='fa fa-bookmark'></i>Booking</Nav.Link>
                        <Nav.Link as={Link} to="/hostel"><i className='fa fa-building'></i>Hostel</Nav.Link>
                        <Nav.Link as={Link} to="/Payment"><i className='fa fa-dollar'></i>Payment</Nav.Link>
                        <Nav.Link as={Link} to="/report"><i className='fa fa-file-text'></i>Report</Nav.Link>
                    </Nav>
                    <Nav className="logout-button">
                        <Nav.Link as={Link} to="/login" className="btn btn-danger">
                            <i className="fa fa-sign-out"></i> Logout
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }

    return (
        <div className="bg p-3 d-flex flex-column" style={{ minHeight: '100vh' }}>
            <div className="text-center mb-4 p-2 border rounded d-flex align-items-center justify-content-center" style={{ borderWidth: '1px', borderStyle: 'groove' }}>
                <img
                    src="Logo.png"
                    width="25"
                    height="25"
                    className="d-inline-block align-center"
                    alt="Logo"
                    style={{ verticalAlign: 'middle' }}
                />
                <span className="ml-2" style={{ fontSize: '22px' }}>
                    Dorm Finder
                </span>
            </div>

            <div
                className="text-center mb-4"
                onClick={onProfileClick}
                role="button"
                tabIndex="0"
                style={{ cursor: 'pointer' }}
            >
                <img src={ProfileImg} alt="profile" className={profileImageClasses} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                <h3 className="font-weight-bold">{username}</h3>
                <p className="text-warning">Owner</p>
            </div>

            <Nav className="flex-column">
                <Nav.Link href="/Dashboard/Home" className="d-flex align-items-center mb-3">
                    <i className="fa fa-home mr-2"></i>
                    Home
                </Nav.Link>
                <Nav.Link href="/bookings" className="d-flex align-items-center mb-3">
                    <i className="fa fa-bookmark mr-2"></i>
                    Booking
                </Nav.Link>
                <Nav.Link href="/hostel" className="d-flex align-items-center mb-3">
                    <i className="fa fa-building mr-2"></i>
                    Hostel
                </Nav.Link>
                <Nav.Link href="/payment" className="d-flex align-items-center mb-3">
                    <i className="fa fa-dollar mr-2"></i>
                    Payment
                </Nav.Link>
                <Nav.Link href="/report" className="d-flex align-items-center mb-3">
                    <i className="fa fa-file-text mr-2"></i>
                    Report
                </Nav.Link>
            </Nav>

            <div className="mt-auto text-center">
                <Link to="/login">
                    <button className="btn btn-danger btn-block">
                        <i className="fa fa-sign-out mr-2"></i> Logout
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Sidebar;
