import axios from 'axios';

const env = process.env;

export const authAxios = axios.create({
    baseURL: env.REACT_APP_AUTH_BASE_URL
})

export const resourceAxios = axios.create({
    baseURL: env.REACT_APP_RESOURCE_BASE_URL
})

export const privateResourceAxios = axios.create({
    baseURL: env.REACT_APP_RESOURCE_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
})