import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:1337/api' });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('jwt');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});


export const login = async (identifier, password) => {
  const res = await fetch('http://localhost:1337/api/auth/local', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ identifier, password }),
  });

  if (!res.ok) {
    throw new Error('Login failed');
  }

  return res.json(); 
};


export const fetchEmployees = (search = '', status = '', department = '', page = 1) =>
  API.get(
    `/employees?pagination[page]=1&pagination[pageSize]=10&sort=firstName:asc`

  );

export const fetchEmployeeById = (id) =>
  API.get(`/employees/${id}?populate=profilePicture`);

export const updateEmployee = (id, data) =>
  API.put(`/employees/${id}`, { data });

// export const uploadProfilePicture = async (employeeId, file) => {
//   const formData = new FormData();
//   formData.append('files', file);

//   const uploadRes = await API.post('/upload', formData);
//   const uploadedImageId = uploadRes.data[0].id;

//   return API.put(`/employees/${employeeId}`, {
//     data: {
//       profilePicture: uploadedImageId,
//     },
//   });
// };


export const fetchDepartments = () =>
  API.get('/departments');

// export const createDepartment = (data) =>
//   API.post('/departments', { data });

export const updateDepartment = (id, data) =>
  API.put(`/departments/${id}`, { data });

export const deleteDepartment = (id) =>
  API.delete(`/departments/${id}`);


export const fetchEmployeeStats = async () => {
  const all = await API.get('/employees');
  const employees = all.data.data;

  const total = employees.length;
  const active = employees.filter(e => e.attributes.status === 'Active').length;
  const inactive = employees.filter(e => e.attributes.status === 'Inactive').length;

  const departmentsRes = await API.get('/departments');
  const departments = departmentsRes.data.data;

  return {
    totalEmployees: total,
    activeEmployees: active,
    inactiveEmployees: inactive,
    departmentsCount: departments.length,
  };
};
