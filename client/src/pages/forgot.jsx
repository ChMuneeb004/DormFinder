import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css_folder/custom.css';
import '../css_folder/App.css';

const ForgotPassword = ({ show, onHide }) => {
  const [email, setEmail] = useState('');
  const [DOB, setDOB] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [message, setMessage] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    else if (name === 'DOB') setDOB(value);
    else if (name === 'securityQuestion') setSecurityQuestion(value);
    else if (name === 'newPassword') setNewPassword(value);
    else if (name === 'userType') setUserType(value);
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/verify-user', { email, DOB, securityQuestion, userType });
      setMessage(response.data.message);
      setShowNewPassword(true);
    } catch (error) {
      console.error('Error verifying user:', error);
      setMessage('Failed to verify user');
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/reset-password', { email, newPassword, userType });
      setMessage(response.data.message);
      setShowNewPassword(false);
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage('Failed to reset password');
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
        <Modal.Title id="contained-modal-title-vcenter">Forgot Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showNewPassword ? (
          <form onSubmit={handleResetPasswordSubmit} className="forgot-password-form">
            <div className="form-group">
              <label className='pull-left'>Enter New Password</label>
              <input
                type="password"
                className="form-control"
                name="newPassword"
                placeholder="Enter new password"
                value={newPassword}
                onChange={handleChange}
                required
              />
            </div>
            <Button variant="primary" type="submit" className="btn-block btn-custom text-white">Reset Password</Button>
          </form>
        ) : (
          <form onSubmit={handleVerificationSubmit} className="forgot-password-form">
            <div className="form-group">
              <label className='pull-left'>User Type</label>
              <select
                className="form-control"
                name="userType"
                value={userType}
                onChange={handleChange}
                required
              >
                <option value="">Select User Type</option>
                <option value="customer">Customer</option>
                <option value="owner">Owner</option>
              </select>
            </div>
            <div className="form-group">
              <label className='pull-left'>Enter your Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className='pull-left'>Enter your Date of Birth</label>
              <input
                placeholder="DOB"
                type="date"
                name="DOB"
                value={DOB}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className='pull-left'>What is your favorite food?</label>
              <input
                placeholder="Security Question"
                type="text"
                name="securityQuestion"
                value={securityQuestion}
                onChange={handleChange}
                required
              />
            </div>
            <Button variant="primary" type="submit" className="btn-block btn-custom text-white">Verify</Button>
          </form>
        )}
        {message && <div className="alert alert-info mt-3">{message}</div>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ForgotPassword;
