import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

const ExportEmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/employees', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
          },
        });
        setEmployees(response.data.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };
    fetchEmployees();
  }, []);

  
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Employee Directory', 14, 20);
  
    doc.setFontSize(9);
    doc.text('ID', 14, 30);
    doc.text('First Name', 40, 30);
    doc.text('Last Name', 80, 30);
    doc.text('Email', 120, 30);
    doc.text('Phone', 160, 30);
  
    let yPosition = 40;
  
    employees.forEach((emp) => {
     
      const attrs = emp || {};
  
      doc.text(String(emp.id ?? ''), 14, yPosition);
      doc.text(String(attrs.firstName ?? ''), 40, yPosition);
      doc.text(String(attrs.lastName ?? ''), 80, yPosition);
      doc.text(String(attrs.email ?? ''), 120, yPosition);
      doc.text(String(attrs.phone ?? ''), 160, yPosition);
  
      yPosition += 10;
    });
  
    doc.save('employee_list.pdf');
  };
  

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Employee Directory</h2>
      
      <button onClick={generatePDF} style={{ padding: '10px', marginBottom: '20px' }}>
        Export to PDF
      </button>
      
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>First Name</th>
            <th style={thStyle}>Last Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Phone</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp.id}>
                <td style={tdStyle}>{emp.id}</td>
                <td style={tdStyle}>{emp.firstName}</td>
                <td style={tdStyle}>{emp.lastName}</td>
                <td style={tdStyle}>{emp.email}</td>
                <td style={tdStyle}>{emp.phone}</td>
                <td style={tdStyle}>{emp.isStatus ? 'Active' : 'Inactive'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={tdStyle}>No employees found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};


const thStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  backgroundColor: '#f2f2f2',
  textAlign: 'left',
};

const tdStyle = {
  border: '1px solid #ddd',
  padding: '8px',
};

export default ExportEmployeeList;
