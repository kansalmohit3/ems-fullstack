import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateDepartment = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const jwt = localStorage.getItem('jwt');
      const config = {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      };

      await axios.post(
        'http://localhost:1337/api/departments',
        {
          data: { name, description },
        },
        config
      );

      navigate('/departments');
    } catch (err) {
      console.error('Error creating department:', err);
      setErrorMsg('Failed to create department');
    }
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '400px' }}>
      <h2>Create Department</h2>
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Department Name"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Department Description"
          required
        />
        <button type="submit" style={{ marginTop: '1rem' }}>
          Create Department
        </button>
      </form>
    </div>
  );
};

export default CreateDepartment;
