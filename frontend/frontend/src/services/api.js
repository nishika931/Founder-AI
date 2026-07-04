import axios from "axios";

const api = axios.create({
    baseURL: "https://founder-ai-6e6u.onrender.com"
});

export default api;