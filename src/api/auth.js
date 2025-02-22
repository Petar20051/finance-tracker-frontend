// auth.js
import axios from "axios";

const API_BASE_URL = "https://localhost:7109/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const login = async (email, password) => {
  try {
    const payload = { Email: email, Password: password };
    const response = await apiClient.post("/Auth/login", payload);
    console.log("Login response:", response);

    
    const { token, userId } = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);

    return { token, userId };
  } catch (error) {
    console.error("Login failed:", error.response?.data?.Message || error.message);
    throw new Error(error.response?.data?.Message || "Login failed");
  }
};

export const register = async (email, password, fullName) => {
  try {
    // Use keys matching your RegisterModel (Email, Password, FullName)
    const payload = { Email: email, Password: password, FullName: fullName };
    const response = await apiClient.post("/Auth/register", payload);
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error.response?.data?.Errors || error.message);
    throw new Error(error.response?.data?.Errors || "Registration failed");
  }
};

// (The remaining functions – fetchProfileDetails and updateProfile – remain unchanged)
export const fetchProfileDetails = async () => {
  try {
    const response = await apiClient.get("/Auth/details");
    return response.data;
  } catch (error) {
    console.error("Error fetching profile details:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch profile details");
  }
};

export const updateProfile = async (profileData) => {
  try {
    const response = await apiClient.put("/Auth/update", profileData);
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to update profile");
  }
};

export default apiClient;
