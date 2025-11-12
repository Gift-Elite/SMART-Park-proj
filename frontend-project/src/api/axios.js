import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const authAPI = {
  register: (username, password) => api.post('/auth/register', { username, password }),
  login: (username, password) => api.post('/auth/login', { username, password }),
  logout: () => api.post('/auth/logout'),
  checkSession: () => api.get('/auth/check-session'),
};

export const employeeAPI = {
  getAll: () => api.get('/employees'),
  create: (data) => api.post('/employees', data),
  getById: (id) => api.get(`/employees/${id}`),
};

export const departmentAPI = {
  getAll: () => api.get('/departments'),
  create: (data) => api.post('/departments', data),
  getByCode: (code) => api.get(`/departments/${code}`),
};

export const salaryAPI = {
  getAll: () => api.get('/salaries'),
  create: (data) => api.post('/salaries', data),
  getById: (id) => api.get(`/salaries/${id}`),
  update: (id, data) => api.put(`/salaries/${id}`, data),
  delete: (id) => api.delete(`/salaries/${id}`),
  getMonthlyPayroll: (month) => api.get('/salaries/report/monthly', { params: { month } }),
};

export default api;
