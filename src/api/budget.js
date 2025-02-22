import axios from "axios";


const BASE_URL = "https://localhost:7109/api/Budget";


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


export const getBudgets = () =>  apiRequest("get", BASE_URL);

export const addBudget = (budget) => apiRequest("post", BASE_URL, budget);


export const updateBudget = (id, updatedBudget) =>
  apiRequest("put", `${BASE_URL}/${id}`, updatedBudget);

export const deleteBudget = (id) => apiRequest("delete", `${BASE_URL}/${id}`);

export const filterBudgets = (category) =>
  apiRequest("get", `${BASE_URL}/filter`, {}, { category });

export const getBudgetSummary = () =>
  apiRequest("get", `${BASE_URL}/report/budget-summary`);

export const getBudgetPerformance = () =>
  apiRequest("get", `${BASE_URL}/report/budget-performance`);
