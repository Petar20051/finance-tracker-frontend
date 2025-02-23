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
      const response = await predictCategoryAndExpense(description);

      if (!response || !response.category || response.predictedAmount === undefined) {
        throw new Error("Invalid response from the API.");
      }

      setPredictedCategory(response.category);
      setPredictedAmount(parseFloat(response.predictedAmount).toFixed(2));
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="predict-category-expense">
      <h1>Predict Your Expense</h1>
      <p>
        Use our AI-powered prediction tool to get insights into your spending habits. Simply describe an expense, and our system will suggest an appropriate category along with an estimated cost for the next month.
      </p>
      <ol>
        <li>
          <strong>Step 1:</strong> Enter a brief description of your expense (e.g., "Dinner at a restaurant" or "Monthly grocery shopping").
        </li>
        <li>
          <strong>Step 2:</strong> Click the "Get Prediction" button.
        </li>
        <li>
          <strong>Step 3:</strong> Review the suggested category and estimated cost.
        </li>
      </ol>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="description">Expense Description</label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter expense description..."
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Predicting..." : "Get Prediction"}
        </button>
      </form>
      {loading && <p>Processing your prediction...</p>}
      {predictedCategory && (
        <p>
          <strong>Predicted Category:</strong> {predictedCategory}
        </p>
      )}
      {predictedAmount && (
        <p>
          <strong>Estimated Expense Next Month:</strong> ${predictedAmount}
        </p>
      )}
      {error && <p className="error" style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default PredictCategoryAndExpense;
