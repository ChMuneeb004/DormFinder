import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css_folder/custom.css';

const ForgotPassword = ({ show, onHide }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/forgot-password', { email });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error sending reset link:', error);
      setMessage('Failed to send reset link');
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
        <form onSubmit={handleSubmit} className="forgot-password-form">
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleChange}
            required
          />
          <Button variant="primary" type="submit" className="btn-block btn-custom text-white">Send Reset Link</Button>
        </form>
        {message && <div className="alert alert-info mt-3">{message}</div>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ForgotPassword;
