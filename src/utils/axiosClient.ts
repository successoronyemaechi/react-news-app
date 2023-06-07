/**
 * @author Successor Onyemaechi <successoronyemaechi@gmail.com>
 */

import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
    headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
    },
    withCredentials: true
})

export const axiosGetCrsf = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
})

export default axiosClient

