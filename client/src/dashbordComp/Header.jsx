import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import hostel from "../media/Building.png";
import booking from "../media/bookmark 1.png";
import payment from "../media/usd-square 1.png";
import user from "../media/Vector.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

function Header() {
    const { auth } = useContext(AuthContext);
    const [data, setData] = useState({
        hostelCount: 0,
        totalPayments: 0,
        bookingAnalytics: 0,
        userAnalytics: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const hostelResponse = await axios.get("dorm-finder-api.vercel.app/gethostels", {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });

                setData({
                    hostelCount: hostelResponse.data.count,
                });
            } catch (error) {
                console.error("There was an error fetching the data!", error);
            }
        };

        fetchData();
    }, [auth.token]);

    const cardStyle = {
        border: '1px solid #e0e0e0',
        borderRadius: '10px',
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '15px',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        backgroundColor: '#fff',
    };

    const cardHoverStyle = {
        transform: 'translateY(-5px)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
    };

    const imgStyle = {
        maxWidth: '50px',
    };

    const titleStyle = {
        color: '#7a7a7a',
        fontSize: '16px',
        fontFamily: 'Montserrat',
        fontWeight: '500',
        marginTop: '15px',
        marginBottom: '10px',
    };

    const textStyle = {
        color: '#333',
        fontSize: '28px',
        fontFamily: 'Montserrat',
        fontWeight: '700',
        textTransform: 'uppercase',
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        margin: 0,
    };

    return (
        <header className="d-flex justify-content-center align-items-end">
            <Container className="mt-4">
                <Row className="justify-content-center">
                    <Col xs="12" sm="6" md="5" lg="3" className="mb-3 d-flex">
                        <Link to="/hostel" className="card btn btn-light" style={{ ...cardStyle, backgroundColor: '#F0F9FF'  }}>
                            <div className="card-body">
                                <img src={hostel} alt="Hostel" style={imgStyle} />
                                <h5 className="card-title" style={titleStyle}>Hostel</h5>
                                <p className="card-text" style={textStyle}>{data.hostelCount}</p>
                            </div>
                        </Link>
                    </Col>
                    <Col xs="12" sm="6" md="5" lg="3" className="mb-3 d-flex">
                        <Link to="/Payment" className="card btn btn-light" style={{ ...cardStyle, backgroundColor: '#FEFBEC' }}>
                            <div className="card-body">
                                <img src={payment} alt="Payment" style={imgStyle} />
                                <h5 className="card-title" style={titleStyle}>Payment Reports</h5>
                                <p className="card-text" style={textStyle}>$1000</p>
                            </div>
                        </Link>
                    </Col>
                    <Col xs="12" sm="6" md="5" lg="3" className="mb-3 d-flex">
                        <Link to="/bookings" className="card btn btn-light" style={{ ...cardStyle, backgroundColor: '#FEF6FB'  }}>
                            <div className="card-body">
                                <img src={booking} alt="Booking" style={imgStyle} />
                                <h5 className="card-title" style={titleStyle}>Booking Analytics</h5>
                                <p className="card-text" style={textStyle}>50</p>
                            </div>
                        </Link>
                    </Col>
                    <Col xs="12" sm="6" md="5" lg="3" className="mb-3 d-flex">
                        <Link to="" className="card btn btn-light" style={{ ...cardStyle, backgroundColor: '#F8D442'  }}>
                            <div className="card-body">
                                <img src={user} alt="User" style={imgStyle} />
                                <h5 className="card-title" style={titleStyle}>User Analytics</h5>
                                <p className="card-text" style={textStyle}>100</p>
                            </div>
                        </Link>
                    </Col>
                </Row>
            </Container>
            <style jsx>{`
                .card:hover {
                    ${Object.entries(cardHoverStyle).map(([key, value]) => `${key}: ${value};`).join(' ')}
                }
            `}</style>
        </header>
    );
}

export default Header;
