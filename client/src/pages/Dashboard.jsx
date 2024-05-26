import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Header from '../dashbordComp/Header';
import Sidebar from '../dashbordComp//Sidebar';
import MainContent from '../dashbordComp//MainContent';
import '../css_folder/Dashboard.css';

export default function Dashboard() {
    const [selectedTab, setSelectedTab] = useState('home');

    const handleTabChange = (tab) => {
                setSelectedTab(tab);
            };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 col-lg-3">
                    <Sidebar />
                </div>
                <div className="col-md-9 col-lg-9">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <Header />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-12">
                            <MainContent />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
