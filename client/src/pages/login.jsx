import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css_folder/App.css';
import { BrowserRouter, useNavigate as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from '../contexts/AuthContext';
import {jwtDecode} from 'jwt-decode';
import ForgotPassword from './forgot.jsx';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
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
    }
  };

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
                  <div className="form-group mb-4">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <div className="password-container">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <i className='fa fa-eye-slash'></i>: <i className='fa fa-eye'></i> }
                      </span>
                    </div>
                  </div>
                  <div className="form-check mb-3 w-100 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-center">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        style={{ marginTop: '6px' }}
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <label className="form-check-label p-0" htmlFor="rememberMe">
                        Remember Me
                      </label>
                    </div>
                    <div
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
