import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { AuthContext } from '../contexts/AuthContext';
import Sidebar from '../dashbordComp/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
    const { auth } = useContext(AuthContext);
    const [userData, setUserData] = useState({
        email: '',
        username: '',
        password: '',
        contactNumber: '',
        dateOfBirth: '',
        cnic: '',
        userType: ''
    });
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('http://localhost:3001/profile', {
                    headers: {
                        'Authorization': `Bearer ${auth.token}`
                    }
                });
                setUserData({
                    email: response.data.email,
                    username: response.data.username,
                    contactNumber: response.data.contactNumber,
                    dateOfBirth: response.data.dateOfBirth,
                    cnic: response.data.cnic,
                    userType: response.data.userType,
                    password: ''
                });
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, [auth.token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('http://localhost:3001/profile', userData, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            });
            alert('Profile updated successfully!');
            setModalShow(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        }
    };

    const ProfileForm = () => (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input type="text" value={userData.email} readOnly />
            </div>
            <div>
                <label>Username:</label>
                <input type="text" name="username" value={userData.username} onChange={handleChange} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password" value={userData.password} onChange={handleChange} />
            </div>
            <div>
                <label>Contact Number:</label>
                <input type="text" name="contactNumber" value={userData.contactNumber} onChange={handleChange} />
            </div>
            <div>
                <label>Date of Birth:</label>
                <input type="date" name="dateOfBirth" value={userData.dateOfBirth} onChange={handleChange} />
            </div>
            <div>
                <label>CNIC:</label>
                <input type="text" value={userData.cnic} readOnly />
            </div>
            <div>
                <label>User Type:</label>
                <input type="text" value={userData.userType} readOnly />
            </div>
            <button type="submit">Save Changes</button>
        </form>
    );

    const MyVerticallyCenteredModal = (props) => (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Profile
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ProfileForm />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );

    return (
        <div className="d-flex">
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                        <Sidebar onProfileClick={() => setModalShow(true)} />
                    </div>
                    <div className="col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9 ">
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                <h1>User Profile</h1>
                                <Button variant="primary" onClick={() => setModalShow(true)}>
                                    Edit Profile
                                </Button>
                                <MyVerticallyCenteredModal
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
