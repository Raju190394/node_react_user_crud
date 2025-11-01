import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL + '/users'
});

// export const fetchUsers = () => API.get('/');
export const fetchUser = (id) => API.get(`/${id}`);
export const createUser = (formData) => API.post('/', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateUser = (id, formData) => API.put(`/${id}`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});

export const fetchUsers = async (page = 1, limit = 10) => {
  const res = await API.get(`?page=${page}&limit=${limit}`);
  console.log('API URL:', process.env.REACT_APP_API_URL);
  console.log(res);
  return res; // return full axios response
};

export const deleteUser = (id) => API.delete(`/${id}`);
export const getUploadUrl = () => process.env.REACT_APP_UPLOAD_URL || 'http://localhost:5000/uploads';