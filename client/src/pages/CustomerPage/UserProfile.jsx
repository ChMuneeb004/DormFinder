import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { AuthContext } from '../../contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css_folder/custom.css';

const UserProfile = ({ show, onHide }) => {
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

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('http://localhost:3001/profile', {
                    headers: { 'Authorization': `Bearer ${auth.token}` }
                });
                setUserData(prev => ({ ...prev, ...response.data, password: '' }));
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        if (show) {
            fetchUserProfile();
        }
    }, [auth.token, show]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('http://localhost:3001/profile', userData, {
                headers: { 'Authorization': `Bearer ${auth.token}` }
            });
            alert('Profile updated successfully!');
            onHide();
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        }
    };

    return (
        <>
            <Modal
                show={show}
                onHide={onHide}
                aria-labelledby="contained-modal-title-vcenter"
                dialogClassName="modal-top custom-modal-style"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body-custom">
                    <form onSubmit={handleSubmit} className="profile-form">
                        <input type="text" className="form-control read-only" value={userData.email} readOnly />
                        <input type="text" className="form-control editable" name="username" placeholder="Username" value={userData.username} onChange={handleChange} />
                        <input type="password" className="form-control editable" name="password" placeholder="New Password" value={userData.password} onChange={handleChange} />
                        <input type="text" className="form-control editable" name="contactNumber" placeholder="Contact Number" value={userData.contactNumber} onChange={handleChange} />
                        <input type="date" className="form-control editable" name="dateOfBirth" value={userData.dateOfBirth} onChange={handleChange} />
                        <input type="text" className="form-control read-only" value={userData.cnic} readOnly />
                        <input type="text" className="form-control read-only" value={userData.userType} readOnly />
                        <Button variant="primary" type="submit" className="btn-block btn-custom">Save Changes</Button>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UserProfile;
