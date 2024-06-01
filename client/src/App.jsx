import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import vectors from './media/Vectors.png';
import './css_folder/App.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
//import { useState } from 'react';
import SignupPage from './pages/Signup.jsx';
import OwnerDashboard from './pages/Dashboard.jsx';
import LoginPage from './pages/login.jsx';
import HomePage from './pages/home.jsx';
//import SignupPageOwner from './pages/SignupOwner.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/animate.min.css';
import './assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0';
import './assets/css/demo.css';
import AddHostel from './pages/AddHostel.jsx';
import HostelList from './dashbordComp/hostellist.jsx';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './contexts/ProtectedRoute';
import DashboardHomePage from './pages/Dashboard.jsx';
import Profiles from './dashbordComp/Profile.jsx';
import HostelDetails from './dashbordComp/viewHostel.jsx';
import HostelPage from './pages/CustomerPage/Hostel list/HostelPage.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><OwnerDashboard /></ProtectedRoute>} />
          <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/addHostel" element={<AddHostel />} />
          <Route path="/hostel" element={<HostelList />} />
          <Route path="/Dashboard/Home" element={<DashboardHomePage />} />
          <Route path="/Profile-settings" element={<Profiles />} />
          <Route path="/view-hostel/:id" element={<HostelDetails/>} />
          <Route path="/hostel-page" element={<HostelPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
