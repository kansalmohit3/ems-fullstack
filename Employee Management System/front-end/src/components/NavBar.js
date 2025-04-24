import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    window.location.href = '/login';
  };

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userRole, setUserRole] = useState('');

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">EmployeeApp</Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
        
            <li className="nav-item">
            <Link className="nav-link" to="/employees">Employees</Link>
          </li>
         

            <li className="nav-item">
            <Link className="nav-link" to="/departments">Departments</Link>
          </li>
            <li className="nav-item">
            <Link className="nav-link" to="/download-employee-list">Export Employees</Link>
          </li>
        
          <li className="nav-item">
            <button className="btn btn-outline-danger ml-2" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
