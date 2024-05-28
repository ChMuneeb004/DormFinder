import React from 'react';
import Header from '../CustomerPage/Header';
import SearchBar from '../CustomerPage/SearchBar';
import CityList from '../CustomerPage/CityList';
import 'font-awesome/css/font-awesome.min.css';

const SearchPage = () => {
    return (
        <div>
            <Header />
            <SearchBar />
            <div className="bg-light py-4">
                <div className="container text-center mb-4">
                    <div className="row">
                        <div className="col-md-3 col-sm-6 mb-4">
                            <div className="card h-100 shadow-sm border-0">
                                <div className="card-body">
                                    <div className="icon mb-3">
                                        <i className="fas fa-star fa-2x" style={{ color: '#FF914D' }}></i>
                                    </div>
                                    <h5 className="card-title">Trusted by 1m+ students</h5>
                                    <p className="card-text">Every year, we help over a million students find their ideal place</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 mb-4">
                            <div className="card h-100 shadow-sm border-0">
                                <div className="card-body">
                                    <div className="icon mb-3">
                                        <i className="fas fa-home fa-2x" style={{ color: '#FF914D' }}></i>
                                    </div>
                                    <h5 className="card-title">The widest choice</h5>
                                    <p className="card-text">Browse high-quality, affordable accommodation near university</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 mb-4">
                            <div className="card h-100 shadow-sm border-0">
                                <div className="card-body">
                                    <div className="icon mb-3">
                                        <i className="fas fa-comments fa-2x" style={{ color: '#FF914D' }}></i>
                                    </div>
                                    <h5 className="card-title">We're here to help</h5>
                                    <p className="card-text">Reach out to our friendly team of experts who are always on hand</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 mb-4">
                            <div className="card h-100 shadow-sm border-0">
                                <div className="card-body">
                                    <div className="icon mb-3">
                                        <i className="fas fa-shield fa-2x" style={{ color: '#FF914D' }}></i>
                                    </div>
                                    <h5 className="card-title">Only trusted providers</h5>
                                    <p className="card-text">We only list properties from verified accommodation providers</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center py-4">
                <h2>Explore popular student cities</h2>
                <CityList />
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
