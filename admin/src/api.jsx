import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

export const getPhones = () => api.get('/phone');
export const getPhoneById = (id) => api.get(`/phone/${id}`);
export const createPhone = (data) => api.post('/phone', data);
export const updatePhone = (id, data) => api.put(`/phone/${id}`, data);
export const deletePhone = (id, token) => api.delete(`/phone/${id}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
export const adminLogin = (data) => api.post("/auth/login/admin", data)
export const adminProfile = (token) => api.get("/auth/profile/admin", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
export default api;
