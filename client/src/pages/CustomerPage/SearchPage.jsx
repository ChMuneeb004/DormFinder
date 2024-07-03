import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../CustomerPage/Header';
import SearchBar from '../CustomerPage/SearchBar';
import 'font-awesome/css/font-awesome.min.css';
// import { AuthContext } from '../../contexts/AuthContext';
// import { useNavigate, useContext } from 'react-router-dom';

const SearchPage = () => {
    // const navigate = useNavigate();
    // const { auth } = useContext(AuthContext);

    // useEffect(() => {
    //     // Check if token exists in local storage
    //     const token = localStorage.getItem('token');
    //     if (!token) {
    //         // If no token, redirect to login page
    //         navigate('/login');
    //     }
    // }, [navigate]);

    return (
        <div>
            <Header />
            <SearchBar />
            <div className="bg-light py-4">
                <div className="container text-center mb-4">
                    <div className="row">
                        <div className="col-md-3 col-sm-6 mb-4">
                            <div className="card h-100 shadow-sm border-0">
                                <div className="card-body align-content-center">
                                    <div className="icon mb-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                                        </svg>
                                    </div>
                                    <h5 className="card-title">Students' top choice</h5>
                                    <p className="card-text">Providing tailored solutions to meet student accommodation needs</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 col-sm-6 mb-4">
                            <div className="card h-100 shadow-sm border-0">
                                <div className="card-body align-content-center">
                                    <div className="icon mb-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-houses" viewBox="0 0 16 16">
                                            <path d="M5.793 1a1 1 0 0 1 1.414 0l.647.646a.5.5 0 1 1-.708.708L6.5 1.707 2 6.207V12.5a.5.5 0 0 0 .5.5.5.5 0 0 1 0 1A1.5 1.5 0 0 1 1 12.5V7.207l-.146.147a.5.5 0 0 1-.708-.708zm3 1a1 1 0 0 1 1.414 0L12 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l1.854 1.853a.5.5 0 0 1-.708.708L15 8.207V13.5a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 4 13.5V8.207l-.146.147a.5.5 0 1 1-.708-.708zm.707.707L5 7.207V13.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V7.207z" />
                                        </svg>
                                    </div>
                                    <h5 className="card-title">The widest choice</h5>
                                    <p className="card-text">Browse high-quality, affordable accommodation near university</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 col-sm-6 mb-4">
                            <div className="card h-100 shadow-sm border-0">
                                <div className="card-body align-content-center">
                                    <div className="icon mb-3">
                                        <i style={{ color: '#FF914D' }}><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-shield-check" viewBox="0 0 16 16">
                                            <path d="M5.338 1.59a61 61 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.7 10.7 0 0 0 2.287 2.233c.346.244.652.42.893.533q.18.085.293.118a1 1 0 0 0 .101.025 1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56" />
                                            <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                                        </svg></i>
                                    </div>
                                    <h5 className="card-title">Only trusted providers</h5>
                                    <p className="card-text">We only list properties from verified accommodation providers</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-md-3 col-sm-6 mb-4">
                            <div className="card h-100 shadow-sm border-0">
                                <div className="card-body align-content-center">
                                    <div className="icon mb-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-chat-dots" viewBox="0 0 16 16">
                                            <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                            <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2" />
                                        </svg>
                                    </div>
                                    <h5 className="card-title">We're here to help</h5>
                                    <p className="card-text">Reach out to our friendly team of experts who are always on hand</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <style jsx>{`
                .card {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }

                .card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 6px 6px rgba(0, 0, 0, 0.16);
                }

                .card-title {
                    font-weight: bold;
                    color: #333;
                    font-family: 'Apax', 'ApaxSubset', Helvetica, Arial, sans-serif;
                    font-size: 1.2rem;
                    margin-top: 15px;
                }

                .card-text {
                    color: #666;
                    font-size: 1rem;
                    margin-top: 10px;
                }

                .icon {
                    color: #FF914D;
                }

                h2 {
                    font-size: 2rem;
                    font-weight: bold;
                    color: #343a40;
                    margin-bottom: 20px;
                }

                @media (max-width: 768px) {
                    .card-body {
                        padding: 1rem;
                    }
                    h2 {
                        font-size: 1.5rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default SearchPage;
