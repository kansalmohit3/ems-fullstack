import React, { useEffect, useState } from 'react';
import { fetchEmployeeById, updateEmployee } from '../services/api';

export default function EmployeeProfile({ userId }) {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await fetchEmployeeById(userId);
      setEmployee(res.data.data);
    };
    load();
  }, [userId]);

  const handleUpdate = async () => {
    await updateEmployee(userId, employee.attributes);
    alert('Updated!');
  };

  return employee ? (
    <div>
      <h2>My Profile</h2>
      <input value={employee.attributes.firstName} onChange={(e) => setEmployee({ ...employee, attributes: { ...employee.attributes, firstName: e.target.value } })} />
      <button onClick={handleUpdate}>Save</button>
    </div>
  ) : <p>Loading...</p>;
}