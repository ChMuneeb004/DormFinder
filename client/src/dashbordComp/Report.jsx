import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./Sidebar";

const Report = () => {
    return (
        <div>
            <div className="d-flex">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-3">
                            <Sidebar />
                        </div>
                        <div className="col-12 col-md-9">
                            <div className="row">
                                <div className="col-12 p-0">
                                    <div className="hero-section text-white d-flex align-items-center justify-content-center">
                                        <div className="container text-center">
                                            <h1 className="display-4">Contact Us</h1>
                                            <p className="lead">
                                                We're here to assist you.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="container my-5">
                                        <div className="row mb-4">
                                            <div className="col-md-4 mb-4">
                                                <div className="card text-center shadow-sm h-100">
                                                    <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                                        <i className="fa fa-map mb-3 text-primary icon-responsive"></i>
                                                        <h6 className="card-title font-weight-bold">
                                                            Our Location
                                                        </h6>
                                                        <p className="card-text text-wrap">
                                                            123 Student Lane, University City, ST 12345
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <div className="card text-center shadow-sm h-100">
                                                    <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                                        <i className="fa fa-phone mb-3 text-primary icon-responsive"></i>
                                                        <h6 className="card-title font-weight-bold">
                                                            Call Us
                                                        </h6>
                                                        <p className="card-text text-wrap">(123) 456-7890</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 mb-4">
                                                <div className="card text-center shadow-sm h-100">
                                                    <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                                        <i className="fa fa-envelope mb-3 text-primary icon-responsive"></i>
                                                        <h6 className="card-title font-weight-bold">
                                                            Email Us
                                                        </h6>
                                                        <p className="card-text text-wrap">info@dormfinder.com</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row justify-content-center">
                                            <div className="col-lg-6 mb-0">
                                                <div className="card shadow-sm">
                                                    <div className="card-body">
                                                        <h3 className="text-center mb-4">
                                                            Send Us a Message
                                                        </h3>
                                                        <form>
                                                            <div className="form-group">
                                                                <label htmlFor="name">Name</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="name"
                                                                    placeholder="Your Name"
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="email">Email</label>
                                                                <input
                                                                    type="email"
                                                                    className="form-control"
                                                                    id="email"
                                                                    placeholder="Your Email"
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="message">Message</label>
                                                                <textarea
                                                                    className="form-control"
                                                                    id="message"
                                                                    rows="4"
                                                                    placeholder="Your Message"
                                                                ></textarea>
                                                            </div>
                                                            <button
                                                                type="submit"
                                                                className="btn btn-primary btn-block text-white"
                                                            >
                                                                Submit
                                                            </button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .hero-section {
                    background: url("/Banner.jpg") no-repeat center center;
                    background-size: cover;
                    height: 30vh;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                }
                .hero-section::after {
                    content: "";
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
                .display-4,
                .lead {
                    color: #ffffff !important;
                    opacity: 1 !important;
                    font-weight: bold;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                }
                .display-4 {
                    font-family: "Poppins", sans-serif;
                    font-size: 1.75rem;
                }
                .lead {
                    font-family: "Poppins", sans-serif;
                    font-size: 0.875rem;
                }
                .card-title {
                    font-family: "Poppins", sans-serif;
                    font-size: 1rem;
                    color: #2c3e50;
                }
                .card-text {
                    font-size: 0.875rem;
                    color: #2c3e50;
                }
                .shadow-sm {
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                .btn-primary {
                    background-color: #3498db;
                    border-color: #3498db;
                    transition: background-color 0.3s ease, box-shadow 0.3s ease;
                }
                .btn-primary:hover {
                    background-color: #2980b9;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                }
                .card {
                    transition: transform 0.3s ease;
                }
                .card:hover {
                    transform: translateY(-5px);
                }
                .card-body {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                .icon-responsive {
                    font-size: 1.5rem;
                }
                .text-wrap {
                    word-wrap: break-word;
                }
                @media (max-width: 768px) {
                    .display-4 {
                        font-size: 1.5rem;
                    }
                    .lead {
                        font-size: 0.75rem;
                    }
                    .card-title {
                        font-size: 0.875rem;
                    }
                    .card-text {
                        font-size: 0.75rem;
                    }
                    .icon-responsive {
                        font-size: 1.25rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default Report;
