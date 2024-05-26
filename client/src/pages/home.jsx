import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css_folder/home.css';
import maps from "../media/maps.png";

export default function HomePage() {
    const [search, setSearch] = useState("");
  
    const handleSearch = () => {
        // Add functionality for search button
        console.log('Searching for:', search);
    };
  
    const handleBookings = () => {
        // Add functionality for bookings button
        console.log('Viewing bookings');
    };
    
    return (
        <div className='home'>
            <div className='background'>
                <div className='heading'><h1>Dorm finder</h1></div>
                <div className="form-group">
                    <input
                        placeholder="Search Accommodation"
                        type="text"
                        id="search"
                        name="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="form-control"
                        style={{ fontFamily: 'Poppins-Medium' }}
                    />
                </div>
                <button className="btn btn-primary" style={{ backgroundColor: '#F4BF96', color: 'white', opacity: 1, border: 'none', ':hover': { backgroundColor: '#F19148' }, fontFamily: 'Poppins-Medium', width: '130px' }}>Search</button>
            </div>
        </div>
    );
}