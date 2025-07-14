import axios from 'axios'

const API = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
})

export const login = (creds) => API.post('/auth/login', creds)
export const register = (data) => API.post('/auth/register', data)
