import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import profile from '../../media/Profile.jpg';
import UserProfile from './UserProfile';

const Header = () => {
    const [expanded, setExpanded] = useState(false);
    const navbarRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    

    const handleToggle = () => setExpanded(!expanded);

    const handleClickOutside = (event) => {
        if (navbarRef.current && !navbarRef.current.contains(event.target)) {
            setExpanded(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <UserProfile show={showModal} onHide={() => setShowModal(false)} />
            <Navbar ref={navbarRef} bg="white" expand={false} expanded={expanded} style={styles.navbar}>
                <Navbar.Brand href="#" style={styles.brand}>
                    <img
                        src="Logo.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-center"
                        alt="Logo"
                        style={styles.logo}
                    />
                    <span style={styles.brandText}>
                        Dorm Finder
                    </span>
                </Navbar.Brand>
                <div style={styles.toggleAndProfile}>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle} style={styles.navbarToggle}>
                        <span style={{ ...styles.togglerIcon, ...(expanded ? styles.togglerIconExpanded : {}) }}></span>
                        <span style={{ ...styles.togglerIcon, ...(expanded ? styles.togglerIconExpanded : {}) }}></span>
                        <span style={{ ...styles.togglerIcon, ...(expanded ? styles.togglerIconExpanded : {}) }}></span>
                    </Navbar.Toggle>
                    <Dropdown alignRight>
                        <Dropdown.Toggle as="a" id="dropdown-custom-components" style={styles.profileToggle}>
                            <img
                                src={profile}
                                className="profile-icon"
                                alt="Profile"
                                style={styles.profileIcon}
                            />
                            <span className="profile-text" style={styles.profileText}>Dawood</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={styles.dropdownMenu}>
                            <Dropdown.Item
                                onClick={() => setShowModal(true)}
                                style={styles.dropdownItem}>
                                <i className="fa fa-user" style={styles.dropdownIcon}></i> Profile
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-2" style={styles.dropdownItem}>
                                <i className="fa fa-gear" style={styles.dropdownIcon}></i> Settings
                            </Dropdown.Item>
                            <Dropdown.Item href="/login" style={styles.dropdownItem}>
                                <i className="fa fa-sign-out" style={styles.dropdownIcon}></i> Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <Navbar.Collapse id="basic-navbar-nav" style={styles.navbarCollapse}>
                    <Nav className="ml-auto justify-content-end bg-white" style={styles.nav}>
                        <Nav.Link href="/home" style={styles.navLink}>Home</Nav.Link>
                        <Nav.Link href="/aboutus" style={styles.navLink}>About Us</Nav.Link>
                        <Nav.Link href="#" style={styles.navLink}>Bookings</Nav.Link>
                        <Nav.Link href="#" style={{ ...styles.navLink, ...styles.ContactUS }}>
                            Contact Us
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <style jsx>{`
                @media (max-width: 576px) {
                    .profile-text {
                        display: none;
                    }
                }
            `}</style>
        </>
    );
};

const styles = {
    navbar: {
        borderBottom: '1px solid #ddd',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 15px',
    },
    brand: {
        display: 'flex',
        alignItems: 'center',
    },
    logo: {
        marginRight: '8px',
        marginLeft: '8px',
    },
    brandText: {
        fontSize: '1.55rem',
        color: '#e27125',
        marginTop: '9px',
    },
    navbarToggle: {
        color: '#333',
        marginRight: '1rem',
        backgroundColor: 'white',
        padding: '8px 15px',
        borderRadius: '20px',
        transition: 'all 0.3s ease',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
        border: '1px solid #ccc',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    togglerIcon: {
        width: '22px',
        height: '1.5px',
        backgroundColor: '#333',
        margin: '2px 0',
        transition: 'all 0.3s ease',
    },
    togglerIconExpanded: {
        backgroundColor: '#e27125',
    },
    toggleAndProfile: {
        display: 'flex',
        alignItems: 'center',
    },
    nav: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'nowrap',
    },
    navLink: {
        color: '#333',
        marginRight: '1rem',
        backgroundColor: 'white',
        padding: '8px 15px',
        borderRadius: '20px',
        transition: 'all 0.3s ease',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
        textDecoration: 'none',
        width: 'auto',
        alignItems: 'center'
    },
    ContactUS: {
        border: '1px solid #ccc',
        borderRadius: '20px',
        padding: '5px 15px',
        background: 'linear-gradient(45deg, #ff6f61, #de2d4f)',
        color: 'white',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    },
    profileToggle: {
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        padding: 0,
        marginLeft: '10px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    },
    profileIcon: {
        width: '30px',
        height: '30px',
        objectFit: 'cover',
        borderRadius: '50%',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
        marginRight: '8px',
    },
    profileText: {
        color: '#333',
        fontSize: '1rem',
        fontWeight: 'bold',
    },
    dropdownMenu: {
        left: 'auto',
        right: '0',
        border: 'none',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        padding: '10px 0',
    },
    dropdownItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 20px',
        color: '#333',
        transition: 'all 0.3s ease',
        textDecoration: 'none',
    },
    dropdownIcon: {
        marginRight: '10px',
    },
};

export default Header;
