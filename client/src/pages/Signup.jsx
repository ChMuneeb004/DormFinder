import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css_folder/Signup.css';
import '../css_folder/App.css';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Popup = ({ message, onClose }) => {
  return (
    <div className="popup">
      <div className="popup-inner">
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profile, setProfile] = useState('');
  const [username, setUsername] = useState('');
  const [CNIC, setCNIC] = useState('');
  const [DOB, setDOB] = useState('');
  const [Phone, setPhone] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validateCNIC = (cnic) => {
    const cnicPattern = /^[0-9]{13}$/;
    return cnicPattern.test(cnic);
  };

  const validatePhoneNumber = (phone) => {
    const phonePattern = /^\+[0-9]{10,14}$/;
    return phonePattern.test(phone);
  };

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!CNIC || !Phone || !email || !password || !username || !DOB || !securityQuestion) {
      setMessage('Please fill in all required fields.');
      setShowPopup(true);
      return;
    }

    if (!validateEmail(email)) {
      setMessage('Please enter a valid email address.');
      setShowPopup(true);
      return;
    }

    if (!validateCNIC(CNIC)) {
      setMessage('Please enter a valid CNIC number.');
      setShowPopup(true);
      return;
    }

    if (!validatePhoneNumber(Phone)) {
      setMessage('Please enter a valid phone number.');
      setShowPopup(true);
      return;
    }

    if (!validatePassword(password)) {
      setMessage('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.');
      setShowPopup(true);
      return;
    }

    const userData = {
      username,
      password,
      email,
      DOB,
      CNIC,
      Phone,
      securityQuestion,
      userType: profile,
    };

    let signupEndpoint = '';
    if (profile === 'Customer') {
      signupEndpoint = 'http://localhost:3001/signupCustomer';
    } else if (profile === 'Owner') {
      signupEndpoint = 'http://localhost:3001/signupOwner';
    } else {
      setMessage('Invalid profile type selected.');
      setShowPopup(true);
      return;
    }

    try {
      const response = await axios.post(signupEndpoint, userData);
      console.log(response.data);
      setMessage('Your account has been successfully created');
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
        navigate('/login');
      }, 2000); // Wait for 2 seconds before navigating to login page

    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Error creating account. Please try again.');
      }
      setShowPopup(true);
    }

    setEmail('');
    setPassword('');
    setUsername('');
    setCNIC('');
    setDOB('');
    setPhone('');
    setProfile('');
    setSecurityQuestion('');
  };

  const handleProfileChange = (e) => {
    setProfile(e.target.value);
  };

  return (
    <div className="container-fluid main-container mt-3 mb-3">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4">
          <div className="card login-card shadow-sm">
            <div className="signupPage card-body d-flex flex-column centered-div justify-content-center" style={{ alignItems: "center", placeItems: "center" }}>
              <h1>Create an Account</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className=' pull-left'>What is your Email?</label>
                  <input
                    placeholder="Email"
                    type="text"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className=' pull-left'>What's your Password?</label>
                  <div className="password-container">
                    <input
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <i className='fa fa-eye-slash'></i> : <i className='fa fa-eye'></i>}
                    </span>
                  </div>
                </div>
                <div className="form-group">
                  <label className=' pull-left' htmlFor="profile">Choose a Profile</label>
                  <select
                    name="Profile Type"
                    placeholder="Profile Type"
                    id="profile"
                    className="profile"
                    value={profile}
                    onChange={handleProfileChange}
                  >
                    <option value="">Select Profile</option>
                    <option value="Owner">Property Owner</option>
                    <option value="Customer">Customer</option>
                  </select>
                </div>
                {profile && (
                  <>
                    <div className="form-group">
                      <label className=' pull-left'>Enter your Username</label>
                      <input
                        placeholder="Username"
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className=' pull-left'>Enter your Date of Birth</label>
                      <input
                        placeholder="DOB"
                        type="date"
                        id="DOB"
                        name="DOB"
                        value={DOB}
                        onChange={(e) => setDOB(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className=' pull-left'>Provide your CNIC Number</label>
                      <input
                        placeholder="CNIC"
                        type="text"
                        id="CNIC"
                        name="CNIC"
                        value={CNIC}
                        onChange={(e) => setCNIC(e.target.value)}
                      />
                    </div>
                  </>
                )}
                <div className="form-group">
                  <label className=' pull-left'>Enter your Phone number</label>
                  <PhoneInput
                    className='phone'
                    international
                    defaultCountry="PK"
                    value={Phone}
                    onChange={setPhone}
                  />
                </div>
                <div className="form-group">
                  <label className=' pull-left'>What is your favorite food?</label>
                  <input
                    placeholder="Security Question"
                    type="text"
                    id="securityQuestion"
                    name="securityQuestion"
                    value={securityQuestion}
                    onChange={(e) => setSecurityQuestion(e.target.value)}
                  />
                </div>
                <button type="submit" className="Create-Acc">Create Account</button>
                <Link to="/login">
                  <button type="button" className="login-button mb-2 mt-3 w-75">
                    Login Instead
                  </button>
                </Link>
              </form>
              {showPopup && <Popup message={message} onClose={() => setShowPopup(false)} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
