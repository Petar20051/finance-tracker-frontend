import React from 'react';
import PredictCategoryAndExpense from '../components/PredictExpenses';
import "../styles/PredictPage.css";

const AIPredictionsPage = () => (
  <div className="ai-predictions-page">
    <h1>AI Predictions</h1>
    <p>
      Welcome to the AI Predictions tool. Here you can gain valuable insights into your future expenses. Our advanced algorithms analyze your expense description and predict a relevant category along with an estimated cost for the next month—helping you plan your budget more effectively.
    </p>
    <PredictCategoryAndExpense />
  </div>
);

export default AIPredictionsPage;
