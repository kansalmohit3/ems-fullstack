import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    documentId: '',
    firstName: '',
    lastName: '',
    Email: '',
    phone: '',
    hireDate: '',
    isStatus: false,
  });

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const jwt = localStorage.getItem('jwt');

        const config = {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        };
        const res = await axios.get(`http://localhost:1337/api/employees/${id}`, config );
        const emp = res.data.data;

        setFormData({
          documentId: emp.documentId,
          firstName: emp.firstName,
          lastName: emp.lastName,
          Email: emp.Email,
          phone: emp.phone,
          hireDate: emp.hireDate,
          isStatus: emp.isStatus,
        });
      } catch (err) {
        console.error('Error fetching employee:', err);
        setErrorMsg('Failed to fetch employee');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('user_jwt');
      await axios.put(
        `http://localhost:1337/api/employees/${id}`,
        { data: formData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate('/'); 
    } catch (err) {
      console.error('Error updating employee:', err);
      setErrorMsg('Failed to update employee');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: '1rem', maxWidth: '500px' }}>
      <h2>Edit Employee</h2>
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      <form onSubmit={handleSubmit}>
        
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
          Update Employee
        </button>
      </form>
    </div>
  );
};

export default EditEmployee;
