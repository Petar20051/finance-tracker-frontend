import React, { useState } from "react";
import { predictCategoryAndExpense } from "../api/expense";
import "../styles/Predict.css";

const PredictCategoryAndExpense = () => {
  const [description, setDescription] = useState("");
  const [predictedCategory, setPredictedCategory] = useState(null);
  const [predictedAmount, setPredictedAmount] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPredictedCategory(null);
    setPredictedAmount(null);
    setError(null);
    setLoading(true);

    try {
      console.log("Submitting description:", description);
      const response = await predictCategoryAndExpense(description);
  
      if (!response || !response.category || response.predictedAmount === undefined) {
        throw new Error("Invalid response from the API.");
      }
  
      setPredictedCategory(response.category);
      setPredictedAmount(parseFloat(response.predictedAmount).toFixed(2));
    } catch (err) {
      console.error("Error during prediction:", err.message || err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Predict Category and Expense</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a description"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Predicting..." : "Predict"}
        </button>
      </form>
      {loading && <p>Loading prediction results...</p>}
      {predictedCategory && (
        <p>
          Predicted Category: <strong>{predictedCategory}</strong>
        </p>
      )}
      {predictedAmount && (
        <p>
          Expected Cost Next Month: <strong>${predictedAmount}</strong>
        </p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default PredictCategoryAndExpense;
