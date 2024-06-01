// src/App.js
import React from 'react';
import HostelList from './HostelList.jsx';
import '../../../css_folder/HostelPage.css';

function HostelPage() {
  return (
    <div className="App">
      <h1>Hostel Booking</h1>
      <HostelList />
    </div>
  );
}

export default HostelPage;
