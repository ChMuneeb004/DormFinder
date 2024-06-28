import React, { useEffect, useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../css_folder/sidebar.css';
import ProfileImg from '../media/Profile.jpg';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Profile from './Profile';
import { AuthContext } from '../contexts/AuthContext';

function Sidebar() {
    const { auth } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [isMobile, setIsMobile] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [userDetails, setUserDetails] = useState({
        fullName: '',
        email: '',
        bio: ''
    });

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get('http://localhost:3001/getUserDetails', {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });
                if (response.data) {
                    setUserDetails({
                        fullName: response.data.fullName,
                        email: response.data.email,
                        bio: response.data.bio
                    });
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        const fetchUsername = async () => {
            try {
                const response = await axios.get('http://localhost:3001/getUsername', {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });
                if (response.data && response.data.username) {
                    setUsername(response.data.username);
                }
            } catch (error) {
                console.error('Error fetching username:', error);
            }
        };

        fetchUserDetails();
        fetchUsername();

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 767);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [auth.token]);

    const profileImageClasses = "img-thumbnail rounded-circle mx-auto d-block";

    if (isMobile) {
        return (
            <>
                <Profile show={showModal} onHide={() => setShowModal(false)} />
                <div className='text-center align-content-center' style={{ margin: '5px', padding: '3px', borderWidth: '1px', border: '1px', borderStyle: 'groove', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '5px' }}>
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
                <Navbar expand="lg" className="mobile-navbar p-0">
                    <Navbar.Brand className="p-2 d-flex align-items-center" onClick={() => setShowModal(true)} style={{ cursor: 'pointer' }}>
                        <img src={ProfileImg} alt="profile" className={profileImageClasses} style={{ width: '70px', height: '70px', objectFit: 'cover' }} />
                        <div className="profile-info m-2">
                            <h3 className='username text-black'>{username || 'Loading...'}</h3>
                            <p className='role'>Owner</p>
                        </div>
                    </Navbar.Brand>
                    <Navbar.Toggle className="m-2 btn btn-primary text-white" aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link as={Link} to="/Dashboard/Home"><i className='fa fa-home'></i>Home</Nav.Link>
                            <Nav.Link as={Link} to="/bookings"><i className='fa fa-bookmark'></i>Booking</Nav.Link>
                            <Nav.Link as={Link} to="/hostel"><i className='fa fa-building'></i>Hostel</Nav.Link>
                            <Nav.Link as={Link} to="/Payment"><i className='fa fa-dollar'></i>Payment</Nav.Link>
                            <Nav.Link as={Link} to="/Query"><i className='fa fa-file-text'></i>Report</Nav.Link>
                        </Nav>
                        <Nav className="logout-button">
                            <Nav.Link as={Link} to="/login" className="btn btn-danger">
                                <i className="fa fa-sign-out"></i> Logout
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    
                </Navbar>
            </>
        );
    }

    return (
        <>
            <Profile show={showModal} onHide={() => setShowModal(false)} />
            <div className="fixed-bottom fixed-top navbar-nav-scroll w-25 bg p-3 d-flex flex-column" style={{ minHeight: '100vh' }}>
                <div className="text-center mb-4 p-2 border rounded d-flex align-items-center justify-content-center" style={{ borderWidth: '1px', borderStyle: 'groove' }}>
                    <img
                        src="Logo.png"
                        width="25"
                        height="25"
                        className="d-inline-block align-center"
                        alt="Logo"
                        style={{ verticalAlign: 'middle',marginBottom:'7px'}}
                    />
                    <span className="ml-2" style={{ fontSize: '22px' }}>
                        Dorm Finder
                    </span>
                </div>

                <div
                    className="text-center mb-4"
                    onClick={() => setShowModal(true)}
                    role="button"
                    tabIndex="0"
                    style={{ cursor: 'pointer' }}
                >
                    <img src={ProfileImg} alt="profile" className={profileImageClasses} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                    <h3 className="font-weight-bold">{username || 'Loading...'}</h3>
                    <p className="text-warning">Owner</p>
                </div>

                <Nav className="flex-column">
                    <Nav.Link as={Link} to="/Dashboard/Home" className="nav-link">
                        <i className="fa fa-home"></i>
                        <span>Home</span>
                    </Nav.Link>
                    <Nav.Link as={Link} to="/bookings" className="nav-link">
                        <i className="fa fa-bookmark"></i>
                        <span>Booking</span>
                    </Nav.Link>
                    <Nav.Link as={Link} to="/hostel" className="nav-link">
                        <i className="fa fa-building"></i>
                        <span>Hostel</span>
                    </Nav.Link>
                    <Nav.Link as={Link} to="/payment" className="nav-link">
                        <i className="fa fa-dollar"></i>
                        <span>Payment</span>
                    </Nav.Link>
                    <Nav.Link as={Link} to="/report" className="nav-link">
                        <i className="fa fa-file-text"></i>
                        <span>Query</span>
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
        </>
    );
}

export default Sidebar;
