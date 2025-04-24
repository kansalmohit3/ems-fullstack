import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import EmployeeProfile from './pages/EmployeeProfile';
import DepartmentPage from './pages/DepartmentPage';
import EmployeeTable from './pages/EmployeeTable';
import CreateEmployeeForm from './pages/CreateEmployeeForm';
import EditEmployee from './pages/EditEmployee';
import EditDepartment from './pages/EditDepartment';
import HomePage from './pages/HomePage';
import Navbar from './components/NavBar';
import ExportEmployeeList from './pages/ExportEmployeeList';
import CreateDepartment from './pages/CreateDepartment';


function App() {
  const [token, setToken] = useState(localStorage.getItem('jwt') || '');
  const [userId, setUserId] = useState(localStorage.getItem('userId') || null);

  const saveToken = (jwt, id) => {
    localStorage.setItem('jwt', jwt);
    localStorage.setItem('userId', id);
    setToken(jwt);
    setUserId(id);
  };

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
         
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomePage />} />


          {token && (
            <>
              <Route path="/employees" element={<EmployeeTable  />} />
              <Route path="/download-employee-list" element={<ExportEmployeeList  />} />
              <Route path="/departments" element={<DepartmentPage />} />
              <Route path="/profile" element={<EmployeeProfile userId={userId} />} />
              <Route path="/employee-list" element={<EmployeeTable />} />
              <Route path="/create-new-employee" element={<CreateEmployeeForm />} />
              <Route path="/edit-employee/:id" element={<EditEmployee />} />
              <Route path="/edit-department/:id" element={<EditDepartment />} />
              <Route path="/create-department/" element={<CreateDepartment />} />
              <Route path="/" element={<HomePage />} />
            </>
          )}
        </Routes>
      </Router>
    </>
  );
}

export default App;