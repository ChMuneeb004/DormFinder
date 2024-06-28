import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';

const ContactUs = () => {
    return (
        <div>
            <Header />
            <div className="hero-section text-white d-flex align-items-center justify-content-center">
                <div className="container text-center">
                    <h1 className="display-2">Contact Us</h1>
                    <p className="lead">We are here to help you with any questions or concerns.</p>
                </div>
            </div>
            <div className="container my-5">
                <div className="row mb-5">
                    <div className="col-md-4 mb-4">
                        <div className="card text-center shadow-lg h-100">
                            <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                <i className="fa fa-map mb-3 text-primary icon-responsive"></i>
                                <h5 className="card-title font-weight-bold">Our Location</h5>
                                <p className="card-text">123 Student Lane, University City, ST 12345</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card text-center shadow-lg h-100">
                            <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                <i className="fa fa-phone mb-3 text-primary icon-responsive"></i>
                                <h5 className="card-title font-weight-bold">Call Us</h5>
                                <p className="card-text">(123) 456-7890</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card text-center shadow-lg h-100">
                            <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                <i className="fa fa-envelope mb-3 text-primary icon-responsive"></i>
                                <h5 className="card-title font-weight-bold">Email Us</h5>
                                <p className="card-text">info@dormfinder.com</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center mb-0">
                    <div className="col-lg-8 mb-4">
                        <div className="card shadow-lg">
                            <div className="card-body">
                                <h2 className="display-4 font-weight-bold text-center mb-4">Send Us a Message</h2>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" className="form-control" id="name" placeholder="Your Name" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" className="form-control" id="email" placeholder="Your Email" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="message">Message</label>
                                        <textarea className="form-control" id="message" rows="7" placeholder="Your Message"></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block btn-lg text-white">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .hero-section {
                    background: url('../../../public/Banner.jpg') no-repeat center center;
                    background-size: cover;
                    height: 70vh;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                }
                .hero-section::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.6);
                    z-index: 1;
                }
                .hero-section .container {
                    position: relative;
                    z-index: 2;
                }
                .display-2, .lead {
                    color: #ffffff !important;
                    opacity: 1 !important;
                    font-weight: bold;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                }
                .display-2 {
                    font-family: 'Poppins', sans-serif;
                    font-size: 4rem;
                }
                .lead {
                    font-family: 'Poppins', sans-serif;
                    font-size: 1.5rem;
                }
                .display-4 {
                    font-family: 'Poppins', sans-serif;
                    color: #2c3e50;
                    font-weight: 700;
                    margin-bottom: 1rem;
                    position: relative;
                }
                .display-4::after {
                    content: '';
                    position: absolute;
                    left: 0;
                    bottom: -10px;
                    width: 60px;
                    height: 3px;
                    background-color: #3498db;
                }
                .shadow-lg {
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                }
                .text-primary {
                    color: #3498db;
                }
                .icon-responsive {
                    font-size: 3rem;
                }
                @media (max-width: 768px) {
                    .display-2 {
                        font-size: 2.5rem;
                    }
                    .lead {
                        font-size: 1.25rem;
                    }
                    .display-4 {
                        font-size: 2rem;
                    }
                    .card-title {
                        font-size: 1.25rem;
                    }
                    .card-text {
                        font-size: 1rem;
                    }
                    .icon-responsive {
                        font-size: 2rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default ContactUs;
