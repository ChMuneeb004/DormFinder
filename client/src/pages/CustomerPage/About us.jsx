import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';

const AboutUs = () => {
    return (
        <div>
            <Header />
            <div className="hero-section text-white d-flex align-items-center justify-content-center">
                <div className="container text-center">
                    <h1 className="display-2">About Us</h1>
                    <p className="lead">Your trusted partner in finding the perfect student accommodation.</p>
                </div>
            </div>
            <div className="container my-5">
                <div className="row mb-5 align-items-center">
                    <div className="col-md-6 mb-4">
                        <h2 className="display-4">Our Mission</h2>
                        <p className="text-muted">At Dorm Finder, our mission is to provide students with a seamless and reliable platform to find the best accommodation options. We are committed to helping students make informed decisions and find a place they can call home during their academic journey. Our team works tirelessly to ensure that every student has access to safe, affordable, and comfortable housing, tailored to their unique needs and preferences.</p>
                    </div>
                    <div className="col-md-6 mb-4">
                        <img src="../../../public/AB2.jpg" alt="Our Mission" className="img-fluid rounded shadow" />
                    </div>
                </div>
                <div className="row mb-5 align-items-center">
                    <div className="col-md-6 order-md-2 mb-4">
                        <h2 className="display-4">Our Vision</h2>
                        <p className="text-muted">We envision a world where every student has access to safe, affordable, and comfortable accommodation. By connecting students with trusted providers, we aim to enhance the student experience and contribute to their academic success. Our goal is to revolutionize the student housing market through innovation, transparency, and unwavering commitment to quality.</p>
                    </div>
                    <div className="col-md-6 order-md-1 mb-4">
                        <img src="../../../public/AB3.jpg" alt="Our Vision" className="img-fluid rounded shadow" />
                    </div>
                </div>
                <div className="row mb-5 align-items-center">
                    <div className="col-md-6 mb-4">
                        <h2 className="display-4">Our Values</h2>
                        <p className="text-muted">Our core values guide everything we do. These principles drive our mission and vision forward, ensuring that we consistently deliver the best possible service to our students and partners.</p>
                        <ul className="list-unstyled">
                            <li className="mb-3"><i className="fa fa-check-circle mr-2 text-primary"></i><strong>Integrity:</strong> We uphold the highest standards of integrity in all of our actions.</li>
                            <li className="mb-3"><i className="fa fa-check-circle mr-2 text-primary"></i><strong>Transparency:</strong> We are committed to being transparent with our users, providing clear and honest information at every step.</li>
                            <li className="mb-3"><i className="fa fa-check-circle mr-2 text-primary"></i><strong>Commitment:</strong> We are dedicated to meeting the needs of our students and exceeding their expectations.</li>
                            <li className="mb-3"><i className="fa fa-check-circle mr-2 text-primary"></i><strong>Innovation:</strong> We continuously seek new and innovative solutions to improve the student housing experience.</li>
                        </ul>
                    </div>
                    <div className="col-md-6 mb-4">
                        <img src="../../../public/AB4.jpg" alt="Our Values" className="img-fluid rounded shadow" />
                    </div>
                </div>
            </div>
            <style jsx>{`
                .hero-section {
                    background: url('../../../public/AB1.jpg') no-repeat center center;
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
                    font-weight: 600;
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
                .text-muted {
                    color: #6c757d;
                    font-size: 1.1rem;
                    line-height: 1.7;
                }
                .img-fluid {
                    max-width: 100%;
                    height: auto;
                }
                .shadow {
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
                }
                .rounded {
                    border-radius: 0.5rem;
                }
                .text-primary {
                    color: #3498db;
                }
                .list-unstyled {
                    padding-left: 0;
                    list-style: none;
                }
                .list-unstyled li {
                    font-size: 1.1rem;
                    line-height: 1.7;
                    color: #2c3e50;
                }
                .fa-check-circle {
                    color: #3498db;
                }
                .mr-2 {
                    margin-right: 0.5rem;
                }
                .mb-4 {
                    margin-bottom: 1.5rem;
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
                }
            `}</style>
        </div>
    );
};

export default AboutUs;
