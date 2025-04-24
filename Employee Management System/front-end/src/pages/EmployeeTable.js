import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmployeeTable = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const jwt = localStorage.getItem('jwt');
                const config = {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                };
                const res = await axios.get('http://localhost:1337/api/employees', config);
                setEmployees(res.data.data);
            } catch (err) {
                console.error('Failed to fetch employees:', err);
            } finally {
                setLoading(false);
            }
        };
    
        fetchEmployees();
    }, []); // <-- empty dependency array means it runs only once
    

    

  
    const filteredEmployees = employees && employees.filter((emp) => {
        console.log("Employee", emp)
        const matchesSearch = emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || emp.lastName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || (filterStatus === 'active' && emp.isStatus) || (filterStatus === 'inactive' && !emp.isStatus);
        return matchesSearch && matchesStatus;
    });

    if (loading) return <p>Loading employees...</p>;

    return (
        <div style={{ padding: '1rem' }}>
            <h2>Employee Directory</h2>
            <button>
                <Link to="/create-new-employee" style={{ textDecoration: 'none' }}>
                    Add Employee
                </Link>
            </button>


            <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: '10px', padding: '8px', width: '200px' }}
            />

            <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{ marginBottom: '10px', padding: '8px' }}
            >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
            </select>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={thStyle}>ID</th>
                        <th style={thStyle}>First Name</th>
                        <th style={thStyle}>Last Name</th>
                        <th style={thStyle}>Email</th>
                        <th style={thStyle}>Phone</th>
                        <th style={thStyle}>Hire Date</th>
                        <th style={thStyle}>Status</th>
                        <th style={thStyle}>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.length > 0 ? (
                        filteredEmployees && filteredEmployees.map((emp) => (
                            <tr key={emp.id}>
                                <td style={tdStyle}>{emp.id}</td>
                                <td style={tdStyle}>{emp.firstName}</td>
                                <td style={tdStyle}>{emp.lastName}</td>
                                <td style={tdStyle}>{emp.Email}</td>
                                <td style={tdStyle}>{emp.phone}</td>
                                <td style={tdStyle}>{emp.hireDate}</td>
                                <td style={tdStyle}>{emp.isStatus ? 'Active' : 'Inactive'}</td>
                                <td style={tdStyle}>{<button><Link to={`/edit-employee/${emp.documentId}`}>Edit</Link></button>}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" style={tdStyle}>No employees found</td>
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

export default EmployeeTable;

