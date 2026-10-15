import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 8000,
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

let handlingExpiredSession = false;

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const url = error.config?.url || "";
        const isAuthRoute = url.includes("/auth/login") || url.includes("/auth/register");
        if (
            status === 401 &&
            !isAuthRoute &&
            localStorage.getItem("token") &&
            !handlingExpiredSession
        ) {
            handlingExpiredSession = true;
            localStorage.removeItem("token");
            window.dispatchEvent(new Event("auth-change"));
            window.alert("Token kamu sudah kedaluwarsa. Silakan login ulang.");
            if (window.location.pathname !== "/auth") {
                window.location.href = "/auth";
            }
        }
        return Promise.reject(error);
    },
)

export default api;
