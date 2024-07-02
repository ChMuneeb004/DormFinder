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
                  <th className='m-5 p-3 px-2 text-black' style={{fontFamily: 'sans-serif', fontSize: '14px', backgroundColor: '#F2EAE1' }}>Name</th>
                  <th className='m-5 p-3 px-2 text-black' style={{fontFamily: 'sans-serif', fontSize: '14px', backgroundColor: '#F2EAE1' }}>Email</th>
                  <th className='m-5 p-3 px-2 text-black' style={{fontFamily: 'sans-serif', fontSize: '14px', backgroundColor: '#F2EAE1' }}>Phone</th>
                  <th className='m-5 p-3 px-2 text-black' style={{fontFamily: 'sans-serif', fontSize: '14px', backgroundColor: '#F2EAE1' }}>Date of Booking</th>
                  <th className='m-5 p-3 px-2 text-black' style={{fontFamily: 'sans-serif', fontSize: '14px', backgroundColor: '#F2EAE1' }}>Token</th>
                  <th className='m-5 p-3 px-2 text-black' style={{fontFamily: 'sans-serif', fontSize: '14px', backgroundColor: '#F2EAE1' }}></th>
                  <th className='m-5 p-3 px-2 text-black' style={{fontFamily: 'sans-serif', fontSize: '14px', backgroundColor: '#F2EAE1' }}></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Hashir</td>
                  <td>hashir01@gmail.com</td>
                  <td>+923054777605</td>
                  <td>08-Dec, 2023</td>
                  <td><input type="text" className="form-control" placeholder="Token" style={{ minWidth: "170px", width: "100%" }} /></td>
                  <td><button className="btn btn-success text-white">Check</button></td>
                  <td><button style={{ backgroundColor: 'transparent', border: 'transparent' }}><i className="fa fa-trash-o" aria-hidden="true" style={{ color: 'red', fontSize: 25 }}></i></button></td>
                </tr>
                <tr>
                  <td>Ali Raza</td>
                  <td>ali.raza44@gmail.com</td>
                  <td>+923132471210</td>
                  <td>02-Oct, 2023</td>
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