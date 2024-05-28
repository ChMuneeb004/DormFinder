import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    return (
        <Navbar bg="white" expand="md" style={styles.navbar}>
            <Navbar.Brand href="#" style={styles.brand}>
                <img
                    src="Logo.png" 
                    width="50"
                    height="50"
                    className="d-inline-block align-center"
                    alt="Logo"
                    style={styles.logo}
                />
                <span style={styles.brandText}>
                    Dorm Finder
                </span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" style={{backgroundColor:'white'}}>
                <Nav className="ml-auto justify-content-end" style={{ flexWrap: 'nowrap', backgroundColor:'white' }}>
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
    },
    brand: {
        display: 'flex',
        alignItems: 'center',
    },
    logo: {
        marginRight: '8px',
    },
    brandText: {
        fontSize: '1.25rem',
        color: '#e27125',
    },
    navLink: {
        color: '#333',
        marginRight: '1rem',
        backgroundColor:'white'
    },
    landlordsAgentsLink: {
        border: '1px solid #ccc',
        borderRadius: '20px',
        padding: '5px 15px',
        marginLeft: '10px',
    },
};

export default Header;
