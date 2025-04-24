import React, { useState } from 'react';
import axios from 'axios';

const CreateEmployeeForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    Email: '',
    phone: '',
    hireDate: '',
    isStatus: false,
  });

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const jwt = localStorage.getItem('jwt');

      const config = {
          headers: {
              Authorization: `Bearer ${jwt}`
          }
      };
      const response = await axios.post(
        'http://localhost:1337/api/employees',
        {
          data: formData, 
        },config
        
      );

      setSuccessMsg('Employee created successfully!');
      setErrorMsg('');
      setFormData({
        firstName: '',
        lastName: '',
        Email: '',
        phone: '',
        hireDate: '',
        isStatus: false,
      });
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to create employee.');
      setSuccessMsg('');
    }
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '500px' }}>
      <h2>Create Employee</h2>
      {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      <form onSubmit={handleSubmit}>
        {/* <input name="documentId" value={formData.documentId} onChange={handleChange} placeholder="Document ID" required /> */}
        <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
        <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
        <input type="email" name="Email" value={formData.Email} onChange={handleChange} placeholder="Email" required />
        <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
        <input type="date" name="hireDate" value={formData.hireDate} onChange={handleChange} required />
        <label>
          <input type="checkbox" name="isStatus" checked={formData.isStatus} onChange={handleChange} />
          Active
        </label>
        <button type="submit" style={{ display: 'block', marginTop: '1rem' }}>
          Create Employee
        </button>
      </form>
    </div>
  );
};

export default CreateEmployeeForm;
