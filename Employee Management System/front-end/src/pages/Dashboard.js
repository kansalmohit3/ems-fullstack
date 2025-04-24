// import React, { useEffect, useState } from 'react';
// import { fetchEmployeeStats } from '../services/api';

// export default function Dashboard() {
//   const [stats, setStats] = useState(null);

//   useEffect(() => {
//     const loadStats = async () => {
//       const data = await fetchEmployeeStats();
//       setStats(data);
//     };
//     loadStats();
//   }, []);

//   if (!stats) return <p>Loading dashboard...</p>;

//   return (
//     <div>
//       <h2>Employee Dashboard</h2>
//       <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
//         <StatCard title="Total Employees" value={stats.totalEmployees} />
//         <StatCard title="Active Employees" value={stats.activeEmployees} />
//         <StatCard title="Inactive Employees" value={stats.inactiveEmployees} />
//         <StatCard title="Departments" value={stats.departmentsCount} />
//       </div>
//     </div>
//   );
// }

// function StatCard({ title, value }) {
//   return (
//     <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
//       <h4>{title}</h4>
//       <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{value}</p>
//     </div>
//   );
// }
