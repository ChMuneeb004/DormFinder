import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css_folder/MainContent.css";
import { BrowserRouter as Route, Link} from 'react-router-dom';

function MainContent() {
  return (
    <main className="container-fluid">
      <div className="row my-4">
        <div className="col">
          <h2>Booking History</h2>
          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-warning me-2 text-white">Check Token</button>
            <Link to="/addHostel">
              <button className="btn btn-primary text-white">Add New Hostel</button>
            </Link>
          </div>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Date of Booking</th>
                  <th>Token</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Bilal</td>
                  <td>SOMthin@gmnaill.com</td>
                  <td>03054777605</td>
                  <td>08-Dec, 2021</td>
                  <td><input type="text" className="form-control" placeholder="Token" style={{ minWidth: "170px", width: "100%" }} /></td>
                  <td><button className="btn btn-success text-white">Check</button></td>
                  <td><button style={{ backgroundColor: 'transparent', border: 'transparent' }}><i className="fa fa-trash-o" aria-hidden="true" style={{ color: 'red', fontSize: 25 }}></i></button></td>
                </tr>
                <tr>
                  <td>Bilal</td>
                  <td>SOMthin@gmnaill.com</td>
                  <td>03054777605</td>
                  <td>08-Dec, 2021</td>
                  <td><input type="text" className="form-control" placeholder="Token" style={{ minWidth: "170px", width: "100%" }} /></td>
                  <td><button className="btn btn-success text-white">Check</button></td>
                  <td><button style={{ backgroundColor: 'transparent', border: 'transparent' }}><i className="fa fa-trash-o" aria-hidden="true" style={{ color: 'red', fontSize: 25 }}></i></button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainContent;