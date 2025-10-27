import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL + '/staffs'
});

export const fetchStaffs = () => API.get('/');
export const fetchStaff = (id) => API.get(`/${id}`);
export const createStaff = (formData) => API.post('/', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateStaff = (id, formData) => API.put(`/${id}`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const deleteStaff = (id) => API.delete(`/${id}`);
export const getUploadUrl = () => process.env.REACT_APP_UPLOAD_URL || 'http://localhost:5000/uploads';