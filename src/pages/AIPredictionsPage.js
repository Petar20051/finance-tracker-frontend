import React from 'react';
import PredictCategoryAndExpense from '../components/PredictExpenses';
import "../styles/PredictPage.css";

const AIPredictionsPage = () => (
  <div className="ai-predictions-page">
    <h1>AI Predictions</h1>
    <PredictCategoryAndExpense />
  </div>
);

export default AIPredictionsPage;
