import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../css_folder/sidebar.css'; 
import ProfileImg from '../media/profile.png';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Sidebar({ onProfileClick }) {
    const [username, setUsername] = useState('');
    const [navVisible, setNavVisible] = useState(false);

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
    }, []);

    const handleToggle = () => {
        setNavVisible(!navVisible);
    };

    return (
        <div className="side">
            <div className="profiles" onClick={onProfileClick}>
                <img src={ProfileImg} alt="profile" className="profiles-picture" />
                <h3 className='text-body-emphasis username'>{username}</h3>
                <p className='role'>Owner</p>
            </div>
            <button className="nav-toggle border-1" onClick={handleToggle}>
                <i className="fa fa-bars text-white"></i>
            </button>
            <Nav className={`Navv  flex-column flex-sm-fill flex-fill ${navVisible ? 'show' : ''}`}>
                <Nav.Link href="/Dashboard/Home" className="nav-link">Home</Nav.Link>
                <Nav.Link href="/bookings" className="nav-link">Booking</Nav.Link>
                <Nav.Link href="/hostel" className="nav-link">Hostel</Nav.Link>
                <Nav.Link href="/payment" className="nav-link">Payment</Nav.Link>
                <Nav.Link href="/report" className="nav-link">Report</Nav.Link>
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
