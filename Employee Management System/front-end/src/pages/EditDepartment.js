import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditDepartment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState();
  const [department, setDepartment] = useState();
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const jwt = localStorage.getItem('jwt');
        const config = {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        };
        const res = await axios.get(`http://localhost:1337/api/departments/${id}`, config);
        const dept = res.data.data;
        setName(dept.name || '');
        setDescription(dept.description || ''); 
      } catch (err) {
        console.error('Error fetching department:', err);
        setErrorMsg('Failed to fetch department');
      } finally {
        setLoading(false);
      }
    };

    fetchDepartment();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const jwt = localStorage.getItem('jwt');

      const config = {
          headers: {
              Authorization: `Bearer ${jwt}`
          }
      };
      await axios.put(
        `http://localhost:1337/api/departments/${id}`,
        {
          data: { name, description },
        },
       config
      );
      navigate('/departments'); 
    } catch (err) {
      console.error('Error updating department:', err);
      setErrorMsg('Failed to update department');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: '1rem', maxWidth: '400px' }}>
      <h2>Edit Department</h2>
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
          onChange={(e) => setDepartment(e.target.value)}
          placeholder="Department Description"
          required
        />
        <button type="submit" style={{ marginTop: '1rem' }}>
          Update Department
        </button>
      </form>
    </div>
  );
};

export default EditDepartment;
