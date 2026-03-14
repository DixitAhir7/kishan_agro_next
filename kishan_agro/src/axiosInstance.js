import axios from 'axios'
import React from 'react'

const axiosInstance = axios.create({
    baseURL: "https://kishan-agro-next.vercel.app/api/"
})

export default axiosInstance;
