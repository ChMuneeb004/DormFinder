import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { AuthContext } from '../../contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css_folder/custom.css';

const validatePassword = (password) => {
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordPattern.test(password);
};

const validateUsername = (username) => {
  return username.length > 2;
};

const validateContactNumber = (contactNumber) => {
  const phonePattern = /^[0-9]{10,14}$/;
  return phonePattern.test(contactNumber);
};

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
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

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
      setMessage(''); // Clear the message when the modal is opened
      setMessageType(''); // Clear the message type when the modal is opened
      setErrors({});
      fetchUserProfile();
    }
  }, [auth.token, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!validateUsername(userData.username)) {
      newErrors.username = 'Username must be at least 3 characters long.';
    }

    if (!validatePassword(userData.password) && userData.password) {
      newErrors.password = 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.';
    }

    if (!validateContactNumber(userData.contactNumber)) {
      newErrors.contactNumber = 'Contact Number must be a valid international number.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setMessage('Please correct the errors in the form.');
      setMessageType('error');
      return;
    }
    try {
      await axios.put('http://localhost:3001/profile', userData, {
        headers: { 'Authorization': `Bearer ${auth.token}` }
      });
      setMessage('Profile updated successfully!');
      setMessageType('success');
      setTimeout(() => {
        onHide(); // Close the modal after a short delay
      }, 1000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile');
      setMessageType('error');
    }
  };

  return (
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
        {message && (
          <div className={`alert ${messageType === 'success' ? 'alert-success' : 'alert-danger'}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="profile-form">
          <input type="text" className="form-control read-only" value={userData.email} readOnly />
          <input
            type="text"
            className="form-control editable"
            name="username"
            placeholder="Username"
            value={userData.username}
            onChange={handleChange}
          />
          {errors.username && <div className="text-danger">{errors.username}</div>}
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control editable"
              name="password"
              placeholder="New Password"
              value={userData.password}
              onChange={handleChange}
            />
            <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <i className='fa fa-eye-slash'></i> : <i className='fa fa-eye'></i>}
            </span>
          </div>
          {errors.password && <div className="text-danger">{errors.password}</div>}
          <input
            type="text"
            className="form-control editable"
            name="contactNumber"
            placeholder="Contact Number"
            value={userData.contactNumber}
            onChange={handleChange}
          />
          {errors.contactNumber && <div className="text-danger">{errors.contactNumber}</div>}
          <input
            type="date"
            className="form-control editable"
            name="dateOfBirth"
            value={userData.dateOfBirth}
            onChange={handleChange}
          />
          <input type="text" className="form-control read-only" value={userData.cnic} readOnly />
          <input type="text" className="form-control read-only" value={userData.userType} readOnly />
          <Button variant="primary" type="submit" className="btn-block btn-custom text-white">Save Changes</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default UserProfile;
