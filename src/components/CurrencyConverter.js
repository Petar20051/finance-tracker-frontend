import React, { useState } from "react";
import { convertCurrency } from "../api/expense";
import "../styles/CurrencyConverter.css";

const CurrencyConverter = () => {
  const [conversion, setConversion] = useState({
    fromCurrency: "",
    toCurrency: "",
    amount: "",
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConversion({ ...conversion, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    try {
      const response = await convertCurrency(conversion);
      if (response?.convertedAmount !== undefined) {
        setResult(response.convertedAmount.toFixed(2));
      } else {
        setError("Invalid response from the server. Please check your input and try again.");
      }
    } catch (err) {
      setError("Failed to convert currency. Please try again later.");
      console.error("Error converting currency:", err);
    }
  };

  return (
    <div className="currency-converter">
      <h2 className="converter-title">Convert Your Currency</h2>
      <p className="converter-description">
        Enter the details below to convert an amount from one currency to another.
      </p>
      <form onSubmit={handleSubmit} className="converter-form">
        <div className="form-group">
          <label htmlFor="fromCurrency">From Currency:</label>
          <input
            id="fromCurrency"
            name="fromCurrency"
            value={conversion.fromCurrency}
            onChange={handleChange}
            placeholder="e.g., USD"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="toCurrency">To Currency:</label>
          <input
            id="toCurrency"
            name="toCurrency"
            value={conversion.toCurrency}
            onChange={handleChange}
            placeholder="e.g., EUR"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            id="amount"
            name="amount"
            type="number"
            value={conversion.amount}
            onChange={handleChange}
            placeholder="e.g., 100"
            required
          />
        </div>
        <button type="submit" className="convert-button">
          Convert
        </button>
      </form>
      {result && <p className="result">Converted Amount: {result}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default CurrencyConverter;
