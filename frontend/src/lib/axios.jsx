import axios from 'axios'

export const axiosInstanace = axios.create({
    baseURL: "http://localhost:7000/api",
    withCredentials:true,
})