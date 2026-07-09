import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api"
});

API.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// ---------- AUTH ----------

export const registerUser = (userData) => {
    return API.post("/auth/register", userData);
};

export const loginUser = (userData) => {
    return API.post("/auth/login", userData);
};

// ---------- TASK ----------

export const getTasks = () => {
    return API.get("/tasks");
};

export const createTask = (taskData) => {
    return API.post("/tasks", taskData);
};

export const updateTask = (id, taskData) => {
    return API.put(`/tasks/${id}`, taskData);
};

export const deleteTask = (id) => {
    return API.delete(`/tasks/${id}`);
};

export const getTaskStats = () => {
    return API.get("/tasks/stats");
};

export const getTodayTasks = () => {
    return API.get("/tasks/today");
};

export const getOverdueTasks = () => {
    return API.get("/tasks/overdue");
};

export const markComplete = (id) => {
    return API.put(`/tasks/${id}/complete`);
};

export default API;