import axios from "axios";

const api = axios.create({
    baseURL: "https://founder-ai-duio.onrender.com"
});

export default api;