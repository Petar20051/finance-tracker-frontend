import axios from "axios";


const BASE_URL = "https://localhost:7109/api/Goals";


const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found in localStorage. Please login.");
    throw new Error("No token found in localStorage.");
  }
  return { Authorization: `Bearer ${token}` };
};


const apiRequest = async (method, url, data = {}, params = {}) => {
  try {
    const response = await axios({
      method,
      url,
      data,
      params,
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      `Error in API request (${method} ${url}):`,
      error.response?.data || error.message
    );
    throw error.response?.data || new Error(error.message);
  }
};


export const getGoals = () => apiRequest("get", BASE_URL);

export const createGoal = (goal) => apiRequest("post", BASE_URL, goal);

export const updateGoal = (id, updatedGoal) =>
  apiRequest("put", `${BASE_URL}/${id}`, updatedGoal);

export const deleteGoal = (id) => apiRequest("delete", `${BASE_URL}/${id}`);

export const getGoalSuggestions = async () => {
  try {
    
    const suggestions = await apiRequest("get", `${BASE_URL}/suggestions`);

   
    if (!Array.isArray(suggestions)) {
      console.error("Invalid response format: Expected an array.");
      throw new Error("Invalid response format: Expected an array.");
    }

    return suggestions;
  } catch (error) {
   
    console.error("Failed to fetch goal suggestions:", error.message || error);
    throw error; 
  }
};

