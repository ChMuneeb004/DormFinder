import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css_folder/App.css';
import '../css_folder/Signup.css';

const validatePassword = (password) => {
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordPattern.test(password);
};

const Popup = ({ message, onClose }) => {
  const popupStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const popupInnerStyles = {
    background: 'white',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
  };

  const popupInnerButtonStyles = {
    padding: '10px 20px',
    border: 'none',
    background: '#007bff',
    color: 'white',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <div style={popupStyles}>
      <div style={popupInnerStyles}>
        <p>{message}</p>
        <button style={popupInnerButtonStyles} onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const ForgotPassword = ({ show, onHide }) => {
  const [email, setEmail] = useState('');
  const [DOB, setDOB] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [message, setMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      setMessage({ text: response.data.message, type: 'success' });
      setShowNewPassword(true);
    } catch (error) {
      console.error('Error verifying user:', error);
      if (error.response && error.response.status === 404) {
        setMessage({ text: 'User details do not match.', type: 'error' });
      } else {
        setMessage({ text: 'Failed to verify user. Please try again later.', type: 'error' });
      }
    }
    setTimeout(() => {
      setMessage('');
    }, 5000);
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(newPassword)) {
      setPasswordError('Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.');
      return;
    } else {
      setPasswordError('');
    }
    try {
      const response = await axios.post('http://localhost:3001/reset-password', { email, newPassword, userType });
      setMessage({ text: response.data.message, type: 'success' });
      setShowNewPassword(false);
      clearForm();
      onHide();
    } catch (error) {
      console.error('Error resetting password:', error);
      if (error.response && error.response.status === 404) {
        setMessage({ text: 'User not found.', type: 'error' });
      } else {
        setMessage({ text: 'Failed to reset password. Please try again later.', type: 'error' });
      }
    }
    setTimeout(() => {
      setMessage('');
    }, 5000);
  };

  const clearForm = () => {
    setEmail('');
    setDOB('');
    setSecurityQuestion('');
    setNewPassword('');
    setUserType('');
    setMessage('');
    setPasswordError('');
    setShowNewPassword(false);
  };

  useEffect(() => {
    if (!show) {
      clearForm();
    }
  }, [show]);

  const getAlertStyles = (type) => {
    switch (type) {
      case 'success':
        return { backgroundColor: '#d4edda', color: '#155724' };
      case 'error':
        return { backgroundColor: '#f8d7da', color: '#721c24' };
      case 'warning':
        return { backgroundColor: '#fff3cd', color: '#856404' };
      default:
        return {};
    }
  };

  const modalBodyStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
  };

  const titleStyles = {
    fontFamily: 'Poppins, sans-serif',
    marginBottom: '10px',
    fontSize: '35px',
    fontWeight: 'normal',
  };

  const formStyles = {
    marginTop: '25px',
    width: '100%',
    maxWidth: '300px',
  };

  const formGroupStyles = {
    marginBottom: '1rem',
  };

  const labelStyles = {
    marginBottom: '0.5rem',
    fontWeight: 'normal',
    marginLeft: '5px',
    fontSize: '14px',
  };

  const inputStyles = {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    width: '100%',
    boxSizing: 'border-box',
  };

  const buttonStyles = {
    backgroundColor: '#F4BF96',
    borderColor: '#F4BF96',
    width: '100%',
    borderRadius: '15px',
    color: '#fff',
    fontWeight: 'bold',
    padding: '10px 25px',
    transition: 'background-color 0.3s, transform 0.3s, box-shadow 0.3s',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    boxSizing: 'border-box',
  };

  const buttonHoverStyles = {
    backgroundColor: '#F6635C',
    borderColor: '#ff6f61',
    transform: 'translateY(-3px)',
    boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.15)',
  };

  const buttonFocusStyles = {
    outline: 'none',
    boxShadow: '0px 0px 8px rgba(255, 105, 97, 0.5)',
  };

  const passwordContainerStyles = {
    position: 'relative',
    width: '100%',
  };

  const togglePasswordStyles = {
    position: 'absolute',
    top: '50%',
    right: '10px',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
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
        <Modal.Title id="contained-modal-title-vcenter" style={titleStyles}>Forgot Password</Modal.Title>
      </Modal.Header>
      <Modal.Body style={modalBodyStyles}>
        {showNewPassword ? (
          <form onSubmit={handleResetPasswordSubmit} style={formStyles}>
            <div style={formGroupStyles}>
              <label style={labelStyles}>Enter New Password</label>
              <div style={passwordContainerStyles}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  style={inputStyles}
                  name="newPassword"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={handleChange}
                  required
                />
                <span style={togglePasswordStyles} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <i className='fa fa-eye-slash'></i> : <i className='fa fa-eye'></i>}
                </span>
              </div>
              {passwordError && <div style={{ ...getAlertStyles('error'), padding: '10px', marginTop: '10px' }}>{passwordError}</div>}
            </div>
            <button
              type="submit"
              style={{ ...buttonStyles, ...(isHovered ? buttonHoverStyles : {}) }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onFocus={() => setIsHovered(true)}
              onBlur={() => setIsHovered(false)}
            >
              Reset Password
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerificationSubmit} style={formStyles}>
            <div style={formGroupStyles}>
              <label style={labelStyles}>User Type</label>
              <select
                style={inputStyles}
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
            <div style={formGroupStyles}>
              <label style={labelStyles}>Enter your Email</label>
              <input
                type="email"
                style={inputStyles}
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleChange}
                required
              />
            </div>
            <div style={formGroupStyles}>
              <label style={labelStyles}>Enter your Date of Birth</label>
              <input
                placeholder="DOB"
                type="date"
                style={inputStyles}
                name="DOB"
                value={DOB}
                onChange={handleChange}
                required
              />
            </div>
            <div style={formGroupStyles}>
              <label style={labelStyles}>What is your favorite food?</label>
              <input
                placeholder="Security Question"
                type="text"
                style={inputStyles}
                name="securityQuestion"
                value={securityQuestion}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              style={{ ...buttonStyles, ...(isHovered ? buttonHoverStyles : {}) }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onFocus={() => setIsHovered(true)}
              onBlur={() => setIsHovered(false)}
            >
              Verify
            </button>
          </form>
        )}
        {message && <div style={{ ...getAlertStyles(message.type), padding: '10px', marginTop: '10px' }}>{message.text}</div>}
      </Modal.Body>
    </Modal>
  );
};

export default ForgotPassword;
