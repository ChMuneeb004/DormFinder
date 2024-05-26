import React from 'react';
import Header from '../CustomerPage/Header';
import SearchBar from '../CustomerPage/SearchBar';
import CityList from '../CustomerPage/CityList';

const SearchPage = () => {
    return (
        <div>
            <Header />
            <SearchBar />
            <div className="bg-light py-4">
                <div className="text-center mb-4">
                    <div className="d-inline-block mx-3">Trusted by 1m+ students</div>
                    <div className="d-inline-block mx-3">The widest choice</div>
                    <div className="d-inline-block mx-3">We're here to help</div>
                    <div className="d-inline-block mx-3">Only trusted providers</div>
                </div>
            </div>
            <div className="text-center py-4">
                <h2>Explore popular student cities</h2>
                <CityList />
            </div>
        </div>
    );
};

export default SearchPage;
