import React from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    return (
        <Navbar bg="white" expand="md" style={styles.navbar}>
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
                <Navbar.Toggle aria-controls="basic-navbar-nav" style={styles.navbarToggle} />
                <Dropdown alignRight>
                    <Dropdown.Toggle as="a" id="dropdown-custom-components" style={styles.profileToggle}>
                        <img
                            src="Profile.jpg"
                            className="profile-icon"
                            alt="Profile"
                            style={styles.profileIcon}
                        />
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={styles.dropdownMenu}>
                        <Dropdown.Item href="#/action-1">
                            <i className="fa fa-user"></i> Profile
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                            <i className="fa fa-gear"></i> Settings
                        </Dropdown.Item>
                        <Dropdown.Item href="/login">
                            <i className="fa fa-sign-out"></i> Logout
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <Navbar.Collapse id="basic-navbar-nav" style={styles.navbarCollapse}>
                <Nav className="ml-auto justify-content-end bg-white" style={styles.nav}>
                    <Nav.Link href="#" style={styles.navLink}>Guides</Nav.Link>
                    <Nav.Link href="#" style={styles.navLink}>Blog</Nav.Link>
                    <Nav.Link href="#" style={styles.navLink}>Utilities</Nav.Link>
                    <Nav.Link href="#" style={styles.navLink}>Advertise</Nav.Link>
                    <Nav.Link href="#" style={{ ...styles.navLink, ...styles.landlordsAgentsLink }}>
                        Landlords / Agents
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
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
        border: 'none',
        backgroundColor: 'transparent',
        marginRight: '10px',
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
    },
    landlordsAgentsLink: {
        border: '1px solid #ccc',
        borderRadius: '20px',
        padding: '5px 15px',
        marginLeft: '10px',
    },
    profileToggle: {
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        padding: 0,
        marginLeft: '10px',
    },
    profileIcon: {
        width: '30px',
        height: '30px',
        objectFit: 'cover',
        borderRadius: '50%',
    },
    dropdownMenu: {
        left: 'auto',
        right: '0',
    },
};

export default Header;
