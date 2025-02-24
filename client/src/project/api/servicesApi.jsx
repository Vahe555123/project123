import axiosInstance from './axiosInstance';

const productApi = {
    signUp: (data) => axiosInstance.post(`/auth/register`, data),
    signIn: (data) => axiosInstance.post(`/auth/login`, data),
    verify: (data) => axiosInstance.post(`/auth/verify`, data),
    profile: (token) => axiosInstance.get(`/auth/profile`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }),

    getProduct: () => axiosInstance.get(`/phone`),
    addToBasket: (token, id) => axiosInstance.post(`/basket/${id}`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }),
    getBasket: (token) => axiosInstance.get(`/basket`,  {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }),
   
};

export default productApi;
