import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import hostel from "../media/Building.png";
import booking from "../media/bookmark 1.png";
import payment from "../media/usd-square 1.png";
import user from "../media/Vector.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import { AuthContext } from '../contexts/AuthContext';


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
                const hostelResponse = await axios.get("http://localhost:3001/gethostels", {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });
                // const paymentsResponse = await axios.get("http://localhost:3001/totalPayments", {
                //     headers: {
                //         Authorization: `Bearer ${auth.token}`
                //     }
                // });
                // const bookingsResponse = await axios.get("http://localhost:3001/bookingAnalytics", {
                //     headers: {
                //         Authorization: `Bearer ${auth.token}`
                //     }
                // });
                // const usersResponse = await axios.get("http://localhost:3001/userAnalytics", {
                //     headers: {
                //         Authorization: `Bearer ${auth.token}`
                //     }
                // });

                setData({
                    hostelCount: hostelResponse.data.count,
                    // totalPayments: paymentsResponse.data.total,
                    // bookingAnalytics: bookingsResponse.data.count,
                    // userAnalytics: usersResponse.data.count
                });
            } catch (error) {
                console.error("There was an error fetching the data!", error);
            }
        };

        fetchData();
    }, [auth.token]);




    const cardStyle = {
        border: 'none',
        borderRadius: '8px',
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-start',
        padding: '10px',
    };

    const imgStyle = {
        maxWidth: '50px',
    };

    const titleStyle = {
        color: '#6C6C6C',
        fontSize: '14px',
        fontFamily: 'Montserrat',
        fontWeight: '500',
        marginTop: '30px',
    };

    const textStyle = {
        color: 'black',
        fontSize: '30px',
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
                        <button className="card btn btn-light" style={{ ...cardStyle, backgroundColor: '#F0F9FF' }}>
                            <div className="card-body">
                                <img src={hostel} alt=".." style={imgStyle} />
                                <h5 className="card-title " style={titleStyle}>Hostel</h5>
                                <p className="card-text" style={textStyle}>{data.hostelCount}</p>
                            </div>
                        </button>
                    </Col>
                    <Col xs="12" sm="6" md="5" lg="3" className="mb-3 d-flex">
                        <button className="card btn btn-light" style={{ ...cardStyle, backgroundColor: '#FEFBEC' }}>
                            <div className="card-body">
                                <img src={payment} alt=".." style={imgStyle} />
                                <h5 className="card-title" style={titleStyle}>Payment Reports</h5>
                                <p className="card-text" style={textStyle}>$1000</p>
                            </div>
                        </button>
                    </Col>
                    <Col xs="12" sm="6" md="5" lg="3" className="mb-3 d-flex">
                        <button className="card btn btn-light" style={{ ...cardStyle, backgroundColor: '#FEF6FB' }}>
                            <div className="card-body">
                                <img src={booking} alt=".." style={imgStyle} />
                                <h5 className="card-title" style={titleStyle}>Booking Analytics</h5>
                                <p className="card-text" style={textStyle}>50</p>
                            </div>
                        </button>
                    </Col>
                    <Col xs="12" sm="6" md="5" lg="3" className="mb-3 d-flex">
                        <button className="card btn btn-light" style={{ ...cardStyle, backgroundColor: '#F8D442' }}>
                            <div className="card-body">
                                <img src={user} alt=".." style={imgStyle} />
                                <h5 className="card-title" style={titleStyle}>User Analytics</h5>
                                <p className="card-text" style={textStyle}>100</p>
                            </div>
                        </button>
                    </Col>
                </Row>
            </Container>
        </header>
    );
}

export default Header;