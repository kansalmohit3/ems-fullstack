import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DepartmentsPage = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const jwt = localStorage.getItem('jwt');

        const config = {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        };
        const res = await axios.get('http://localhost:1337/api/departments', config);
        setDepartments(res.data.data);
      } catch (err) {
        console.error('Error fetching departments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Departments</h2>


      <button>
                    <Link to={`/create-department`}>Create Department</Link>
      </button>

      {loading ? (
        <p>Loading departments...</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Description</th>
              <th style={thStyle}>Location</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept) => (
              <tr key={dept.id}>
                <td style={tdStyle}>{dept.id}</td>
                <td style={tdStyle}>{dept.name || 'N/A'}</td>
                <td style={tdStyle}>{dept.description || 'N/A'}</td>
                <td style={tdStyle}>{dept.location || 'N/A'}</td>
                <td style={tdStyle}>
                  <button>
                    <Link to={`/edit-department/${dept.documentId}`}>Edit</Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
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

export default DepartmentsPage;
