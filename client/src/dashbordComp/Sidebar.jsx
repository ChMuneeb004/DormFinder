import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../css_folder/sidebar.css';
import ProfileImg from '../media/profile.png';
import { Navbar, Nav, NavDropdown, NavbarText } from 'react-bootstrap';
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
            setIsMobile(window.innerWidth <= 770);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (isMobile) {
        return (
            <Navbar expand="lg" className="mobile-navbar p-0">
                <Navbar.Brand className=" p-2 d-flex align-items-center" onClick={onProfileClick} style={{ cursor: 'pointer' }}>
                    <img src={ProfileImg} alt="profile" className="profiles-picture" />
                    <div className="profile-info m-2">
                        <h3 className='username text-black'>{username}</h3>
                        <p className='role'>Owner</p>
                    </div>
                </Navbar.Brand>
                <div>
                    <img
                        src="Logo.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-center"
                        alt="Logo"
                        style={{}}
                    />
                    <span style={{}}>
                        Dorm Finder
                    </span>
                </div>
                <Navbar.Toggle className=" m-2 btn btn-primary text-white" aria-controls="basic-navbar-nav" />
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
        <div className="side">
            <div>
                <img
                    src="Logo.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-center"
                    alt="Logo"
                    style={{}}
                />
                <span style={{ display: 'inline-block' }}>
                    Dorm Finder
                </span>
            </div>
            <div
                className="profiles"
                onClick={onProfileClick}
                role="button"
                tabIndex="0"
                style={{ cursor: 'pointer' }}
            >
                <img src={ProfileImg} alt="profile" className="profiles-picture" />
                <h3 className='text-body-emphasis username'>{username}</h3>
                <p className='role'>Owner</p>
            </div>
            <Nav className="Navv flex-column flex-sm-fill flex-fill">
                <Nav.Link href="/Dashboard/Home" className="nav-link"><i className='fa fa-home'></i>Home</Nav.Link>
                <Nav.Link href="/bookings" className="nav-link"><i className='fa fa-bookmark'></i>Booking</Nav.Link>
                <Nav.Link href="/hostel" className="nav-link"><i className='fa fa-building'></i>Hostel</Nav.Link>
                <Nav.Link href="/payment" className="nav-link"><i className='fa fa-dollar'></i>Payment</Nav.Link>
                <Nav.Link href="/report" className="nav-link"><i className='fa fa-file-text'></i>Report</Nav.Link>
            </Nav>
            <div className="logout-button">
                <Link to="/login">
                    <button className="btn btn-danger">
                        <i className="fa fa-sign-out"></i> Logout
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Sidebar;
