import axios from "axios";


const BASE_URL = "https://localhost:7109/api/Expense";


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
    console.log(`Sending ${method.toUpperCase()} request to ${url} with payload:`, data);

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



export const getExpenses = async () => {
  try {
    return await apiRequest("get", BASE_URL);
  } catch (error) {
    console.error("Error getting expenses:", error.message || error);
    throw error;
  }
};

export const addExpense = async (expense) => {
  if (!expense || typeof expense !== "object") {
    throw new Error("Expense data must be provided as an object.");
  }
  try {
    return await apiRequest("post", BASE_URL, expense);
  } catch (error) {
    console.error("Error adding expense:", error.message || error);
    throw error;
  }
};

export const updateExpense = async (id, expense) => {
  if (!id || isNaN(Number(id))) {
    throw new Error("Expense ID must be a valid number.");
  }

  try {
    return await apiRequest("put", `${BASE_URL}/${Number(id)}`, expense); 
  } catch (error) {
    console.error("Error updating expense:", error.message || error);
    throw error;
  }
};

export const deleteExpense = async (id) => {
  if (!id || isNaN(Number(id))) {
    throw new Error("Expense ID must be a valid number.");
  }

  try {
    await apiRequest("delete", `${BASE_URL}/${Number(id)}`); 
    return true; 
  } catch (error) {
    console.error("Error deleting expense:", error.message || error);
    throw error;
  }
};




export const filterExpenses = async (filters) => {
  if (!filters || typeof filters !== "object") {
    throw new Error("Filters must be provided as an object.");
  }
  try {
    return await apiRequest("get", `${BASE_URL}/filter`, {}, filters);
  } catch (error) {
    console.error("Error filtering expenses:", error.message || error);
    throw error;
  }
};

export const getCategorySummary = async (startDate, endDate) => {
  if (!startDate || !endDate) {
    console.error("Error: Both startDate and endDate are required.");
    throw new Error("Both startDate and endDate are required.");
  }

  try {
    
    return await apiRequest(
      "get",
      `${BASE_URL}/report/category-summary`,
      {}, 
      { startDate, endDate } 
    );
  } catch (error) {
    console.error("Error getting category summary:", error.message || error);
    throw new Error("Failed to fetch category summary.");
  }
};

export const getMonthlyTrends = async () => {
  try {
   
    return await apiRequest("get", `${BASE_URL}/report/monthly-trends`);
  } catch (error) {
    console.error("Error getting monthly trends:", error.message || error);
    throw new Error("Failed to fetch monthly trends.");
  }
};


export const predictCategoryAndExpense = async (description) => {
  if (!description || typeof description !== "string") {
    throw new Error("Description is required and must be a string.");
  }

  const trimmedDescription = description.trim();
  if (!trimmedDescription) {
    throw new Error("Description cannot be empty or whitespace.");
  }

  try {
    console.log("Predicting category with description:", trimmedDescription);
    const categoryResponse = await apiRequest("post", `${BASE_URL}/predict-category`, {
      description: trimmedDescription,
    });

    if (!categoryResponse || typeof categoryResponse.predictedCategory !== "string") {
      throw new Error("Failed to predict the category.");
    }

    const category = categoryResponse.predictedCategory.trim();
    console.log("Category prediction result:", category);

    console.log("Predicting expense with category:", category);
    const expenseResponse = await apiRequest("post", `${BASE_URL}/predict-next-month-expense`, {
      category,
    });

    if (!expenseResponse || expenseResponse.predictedAmount === undefined) {
      throw new Error("Failed to predict the expense.");
    }

    return {
      category,
      predictedAmount: expenseResponse.predictedAmount,
    };
  } catch (error) {
    console.error("Error in predictCategoryAndExpense:", error.message || error);
    throw error;
  }
};



export const convertCurrency = async (data) => {
  if (!data || typeof data !== "object") {
    throw new Error("Data for currency conversion must be provided as an object.");
  }
  try {
    return await apiRequest("post", `${BASE_URL}/convert`, data);
  } catch (error) {
    console.error("Error converting currency:", error.message || error);
    throw error;
  }
};

export const syncTransactions = async (data) => {
  if (!data || typeof data !== "object" || !data.connectionId) {
    throw new Error("Transaction data must be provided as a valid object with a connectionId.");
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/sync-transactions`,
      { ConnectionId: data.connectionId }, 
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, 
        },
      }
    );
    return response.data; // 
  } catch (error) {
    console.error("Error syncing transactions:", error.response?.data || error.message);
    throw error.response?.data || new Error(error.message);
  }
};

