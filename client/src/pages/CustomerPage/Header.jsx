import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    return (
        <Navbar bg="white" expand="lg" style={styles.navbar}>
            <Navbar.Brand href="#" style={styles.brand}>
                <img
                    src="path/to/logo.png" // Replace with the correct path to your logo
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="Accommodation for Students logo"
                    style={styles.logo}
                />
                <span style={styles.brandText}>
                    accommodation <strong style={styles.strongText}>for students</strong>
                </span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav nav" className="justify-content-end">
                <Nav>
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
    strongText: {
        fontWeight: 'bold',
        color: '#333',
    },
    navLink: {
        color: '#333',
        marginRight: '1rem',
    },
    landlordsAgentsLink: {
        border: '1px solid #ccc',
        borderRadius: '20px',
        padding: '5px 15px',
        marginLeft: '10px',
    },
};

export default Header;
