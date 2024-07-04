import { useState, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css_folder/App.css';
import { BrowserRouter, useNavigate as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from '../contexts/AuthContext';
import { jwtDecode } from 'jwt-decode';
import ForgotPassword from './forgot.jsx';


export default function LoginPage() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setrememberme] = useState(false);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const { login } = useContext(AuthContext);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //debugger;
      await login(email, password);
      // After successful login, check user type and redirect
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        if (decoded.userType === 'owner') {
          navigate('/dashboard');
        } else if (decoded.userType === 'customer') {
          navigate('/home');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      // Handle specific error messages or status codes
      // For example, show an alert or error message to the user
      // Here you can clear any state related to authentication like token
      // localStorage.removeItem('token'); // Optionally clear token on login failure
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Prepare the request body
  //   const requestData = {
  //     email: email,
  //     password: password
  //   };

  //   // Make a POST request to the login endpoint
  //   axios.post("http://localhost:3001/login", requestData)
  //     .then((response) => {
  //       const data = response.data;
  //       if (data.userType === 'owner') {
  //         // Successful login for owner, redirect to owner dashboard
  //         console.log('Login successful as owner');
  //         // Save the JWT token in local storage
  //         localStorage.setItem('token', data.token);
  //         navigate("/Dashboard");
  //       } else if (data.userType === 'customer') {
  //         // Successful login for customer, redirect to customer search page
  //         console.log('Login successful as customer');
  //         // Save the JWT token in local storage
  //         localStorage.setItem('token', data.token);
  //         navigate("/home");
  //       } else {
  //         // Login failed
  //         console.log('Login failed:', data.message);
  //       }
  //     })
  //     .catch((error) => {
  //       // Handle errors
  //       console.error('Error during login:', error);
  //     });

  //   // Reset email and password fields
  //   setemail("");
  //   setPassword("");
  // };

  return (
    <>
      <ForgotPassword show={showModal} onHide={() => setShowModal(false)} />
      <div className="container-fluid main-container">
        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4">
            <div className="card login-card shadow-sm">
              <div
                className="card-body d-flex flex-column centered-div justify-content-center"
                style={{ alignItems: "center", placeItems: "center" }}
              >
                <h1 className="login-heading text-center">Dorm Finder</h1>
                <p className="login-subtitle text-center">
                  Sign in and start searching
                </p>
                <form
                  onSubmit={handleSubmit}
                  style={{ alignItems: "center", placeItems: "center" }}
                  className="text-center align-items-center"
                >
                  {" "}
                  <div className="form-group mb-4">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-check mb-3 w-100 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-center">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        style={{
                          marginTop: '6px'
                        }}
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={(e) => setrememberme(e.target.checked)}
                      />
                      <label className="form-check-label p-0" htmlFor="rememberMe">
                        Remember Me
                      </label>
                    </div>
                    <div
                      to="/Forgot"
                      className="forgot-password float-end"
                      onClick={() => setShowModal(true)}
                      role="button"
                      tabIndex="0"
                      style={{ cursor: 'pointer' }}

                    >
                      Forgot password?
                    </div>
                  </div>
                  <div className="d-grid gap-2">
                    <button type="submit" className="login-button">
                      Login
                    </button>
                    <Link to="/signup">
                      <button type="button" className="signup-button mb-2 w-75">
                        Sign up
                      </button>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}